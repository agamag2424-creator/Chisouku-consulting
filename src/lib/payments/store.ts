import type { Db } from "../server/db";
import type { Order, OrderStatus } from "./orders";
import type { ProductId } from "./pricing";

// SQL for the paid funnel (tables in db/migrations/001_paid_funnel.sql). Every query is parameterised.
// State changes are conditional updates, so a replayed webhook finds nothing left to change and does nothing.

export type NewOrder = {
  razorpay_order_id: string;
  product: ProductId;
  amount_cents: number;
  currency: string;
  email: string;
  assessment_id: string | null;
  readiness_band: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  credit_applied: boolean;
  source_report_order_id: string | null;
};

const orderColumns = [
  "razorpay_order_id",
  "product",
  "amount_cents",
  "currency",
  "email",
  "assessment_id",
  "readiness_band",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "credit_applied",
  "source_report_order_id",
] as const satisfies readonly (keyof NewOrder)[];

export async function insertOrder(db: Db, order: NewOrder): Promise<Order> {
  const placeholders = orderColumns.map((_, index) => `$${index + 1}`).join(", ");
  const { rows } = await db.query<Order>(
    `insert into orders (${orderColumns.join(", ")}) values (${placeholders}) returning *`,
    orderColumns.map((column) => order[column]),
  );
  return rows[0];
}

export async function orderById(db: Db, id: string): Promise<Order | null> {
  const { rows } = await db.query<Order>("select * from orders where id = $1", [id]);
  return rows[0] ?? null;
}

export async function orderByRazorpayId(db: Db, razorpayOrderId: string): Promise<Order | null> {
  const { rows } = await db.query<Order>("select * from orders where razorpay_order_id = $1", [razorpayOrderId]);
  return rows[0] ?? null;
}

export async function orderByPaymentId(db: Db, paymentId: string): Promise<Order | null> {
  const { rows } = await db.query<Order>("select * from orders where payment_id = $1", [paymentId]);
  return rows[0] ?? null;
}

export async function orderByDownloadToken(db: Db, token: string): Promise<Order | null> {
  const { rows } = await db.query<Order>("select * from orders where download_token = $1", [token]);
  return rows[0] ?? null;
}

/**
 * Marks a created order paid with its payment id. Returns the updated row, or null when the order was already
 * processed (a replayed `payment.captured`): only an order still in `created` changes.
 */
export async function markPaid(
  db: Db,
  razorpayOrderId: string,
  paymentId: string,
  status: Extract<OrderStatus, "paid" | "needs_review">,
  now: Date,
): Promise<Order | null> {
  const { rows } = await db.query<Order>(
    `update orders set status = $3, payment_id = $2, paid_at = $4
     where razorpay_order_id = $1 and status = 'created' and payment_id is null
     returning *`,
    [razorpayOrderId, paymentId, status, now.toISOString()],
  );
  return rows[0] ?? null;
}

/** Adds the Pack download link to a paid order and marks it delivered. */
export async function setDownloadLink(db: Db, orderId: string, token: string, expiresAt: string, now: Date): Promise<Order | null> {
  const { rows } = await db.query<Order>(
    `update orders set download_token = $2, link_expires_at = $3, delivered_at = $4,
       status = case when status = 'paid' then 'delivered' else status end
     where id = $1 and download_token is null and status in ('paid', 'needs_review')
     returning *`,
    [orderId, token, expiresAt, now.toISOString()],
  );
  return rows[0] ?? null;
}

/** Report orders: ops sends the PDF, then this records the delivery. Only paid (or reviewed) reports move. */
export async function markReportDelivered(db: Db, orderId: string, now: Date): Promise<Order | null> {
  const { rows } = await db.query<Order>(
    `update orders set status = 'delivered', delivered_at = $2
     where id = $1 and product = 'report_149' and status in ('paid', 'needs_review') returning *`,
    [orderId, now.toISOString()],
  );
  return rows[0] ?? null;
}

/** Refunds win over every other state, once. Returns null if the payment is unknown or already refunded. */
export async function markRefunded(db: Db, paymentId: string): Promise<Order | null> {
  const { rows } = await db.query<Order>(
    `update orders set status = 'refunded' where payment_id = $1 and status <> 'refunded' returning *`,
    [paymentId],
  );
  return rows[0] ?? null;
}

/** Records the first download only. Returns true the first time. */
export async function markFirstDownload(db: Db, orderId: string, now: Date): Promise<boolean> {
  const { rowCount } = await db.query(
    "update orders set downloaded_at = $2 where id = $1 and downloaded_at is null",
    [orderId, now.toISOString()],
  );
  return (rowCount ?? 0) > 0;
}

export type FunnelEvent = "purchase" | "pack_upgrade" | "pack_downloaded" | "refunded";

/** Server-side funnel event. `purchase` is unique per order in the database, so a repeat is ignored. */
export async function recordEvent(db: Db, name: FunnelEvent, orderId: string, props: Record<string, unknown> = {}): Promise<void> {
  await db.query(
    "insert into analytics_events (name, order_id, props) values ($1, $2, $3) on conflict do nothing",
    [name, orderId, JSON.stringify(props)],
  );
}
