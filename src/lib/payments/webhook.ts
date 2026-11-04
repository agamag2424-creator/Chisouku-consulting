import type { Email } from "../email/send";
import { opsReportAlert, opsReviewAlert, packDownload, reportConfirmation } from "../email/templates";
import type { Db } from "../server/db";
import { downloadExpiry, newDownloadToken, upgradeEligibility, type Order } from "./orders";
import { markPaid, markRefunded, orderById, orderByRazorpayId, recordEvent, setDownloadLink } from "./store";

// Razorpay webhook events (brief section 4). Delivery happens only here, on `payment.captured`; the checkout callback
// is never treated as payment. Every step is safe to repeat: a replayed event finds the order already moved on.

export type WebhookDeps = {
  db: Db;
  now: Date;
  siteUrl: string;
  sendEmail: (email: Email) => Promise<boolean>;
  /** ADMIN_API_TOKEN; when set, the ops alert links to the private delivery page. */
  adminToken?: string;
};

export type WebhookOutcome =
  | "paid"
  | "needs_review"
  | "duplicate"
  | "unknown_order"
  | "refunded"
  | "refund_unknown"
  | "ignored";

type PaymentEntity = { id?: unknown; order_id?: unknown; amount?: unknown; currency?: unknown };
type RefundEntity = { payment_id?: unknown };

type RazorpayEvent = {
  event?: unknown;
  payload?: { payment?: { entity?: PaymentEntity }; refund?: { entity?: RefundEntity } };
};

const text = (value: unknown) => (typeof value === "string" && value.length > 0 && value.length <= 64 ? value : null);

export async function handleRazorpayEvent(event: RazorpayEvent, deps: WebhookDeps): Promise<WebhookOutcome> {
  // order.paid carries the same payment entity; some Razorpay dashboards offer it instead of payment.captured.
  // Either or both may arrive: the order is marked paid once, and a second event is a duplicate.
  if (event.event === "payment.captured" || event.event === "order.paid") return paymentCaptured(event.payload?.payment?.entity ?? {}, deps);
  if (event.event === "refund.processed") return refundProcessed(event.payload?.refund?.entity ?? {}, deps);
  return "ignored";
}

async function paymentCaptured(payment: PaymentEntity, deps: WebhookDeps): Promise<WebhookOutcome> {
  const paymentId = text(payment.id);
  const razorpayOrderId = text(payment.order_id);
  if (!paymentId || !razorpayOrderId) return "ignored";

  const order = await orderByRazorpayId(deps.db, razorpayOrderId);
  if (!order) return "unknown_order";

  // The amount and currency come from our own order row; anything else paid is a mismatch to look at by hand.
  const reasons: string[] = [];
  if (payment.amount !== order.amount_cents || payment.currency !== order.currency) reasons.push("amount or currency mismatch");
  let daysSinceReport: number | null = null;
  if (order.product === "pack_upgrade_100") {
    const report = order.source_report_order_id ? await orderById(deps.db, order.source_report_order_id) : null;
    const check = upgradeEligibility(report, deps.now);
    if (check.eligible) daysSinceReport = check.daysSinceReport;
    else reasons.push(`upgrade no longer eligible (${check.reason})`);
  }

  const paid = await markPaid(deps.db, razorpayOrderId, paymentId, reasons.length ? "needs_review" : "paid", deps.now);
  if (!paid) return "duplicate";

  await recordEvent(deps.db, "purchase", paid.id, { product: paid.product, amount_cents: paid.amount_cents });
  if (paid.product === "pack_upgrade_100") {
    await recordEvent(deps.db, "pack_upgrade", paid.id, {
      days_since_report: daysSinceReport,
      credit_applied: daysSinceReport !== null,
    });
  }

  if (paid.product === "report_149") {
    await deps.sendEmail(reportConfirmation(paid));
    await deps.sendEmail(opsReportAlert(paid, deps.now, deliverPageUrl(deps, paid.id)));
  } else {
    await deliverPack(paid, deps);
  }
  if (reasons.length) await deps.sendEmail(opsReviewAlert(paid, reasons.join("; ")));
  return reasons.length ? "needs_review" : "paid";
}

/** The private report delivery page for one order, or null when no admin token is configured. */
function deliverPageUrl(deps: WebhookDeps, orderId: string): string | null {
  const key = deps.adminToken?.trim();
  if (!key || key.length < 32) return null;
  return `${deps.siteUrl}/ops/deliver?order=${orderId}&key=${encodeURIComponent(key)}`;
}

/** Pack and upgrade orders: a 30-day download link, emailed and shown on the thank-you page. */
async function deliverPack(order: Order, deps: WebhookDeps): Promise<void> {
  const token = newDownloadToken();
  const withLink = await setDownloadLink(deps.db, order.id, token, downloadExpiry(deps.now), deps.now);
  if (withLink) await deps.sendEmail(packDownload(withLink, `${deps.siteUrl}/download/${token}`));
}

async function refundProcessed(refund: RefundEntity, deps: WebhookDeps): Promise<WebhookOutcome> {
  const paymentId = text(refund.payment_id);
  if (!paymentId) return "ignored";
  const refunded = await markRefunded(deps.db, paymentId);
  if (!refunded) return "refund_unknown";
  await recordEvent(deps.db, "refunded", refunded.id, { product: refunded.product });
  return "refunded";
}
