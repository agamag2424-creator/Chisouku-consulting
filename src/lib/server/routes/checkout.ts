import { randomUUID } from "node:crypto";
import { cleanCampaign, cleanEmail, isUuid, upgradeEligibility } from "../../payments/orders";
import { CURRENCY, products, type ProductId } from "../../payments/pricing";
import type { RazorpayConfig, RazorpayOrder } from "../../payments/razorpay";
import { verifyPaymentSignature } from "../../payments/razorpay";
import { insertOrder, orderById, orderByRazorpayId } from "../../payments/store";
import type { Db } from "../db";

// POST /api/checkout/create-order and POST /api/checkout/verify (brief section 4).
// The price always comes from lib/payments/pricing.ts; any amount in the request is ignored.

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const productFor = { report: "report_149", pack: "pack_249", upgrade: "pack_upgrade_100" } as const satisfies Record<string, ProductId>;

const isBand = (value: unknown): value is "not_ready" | "partly_ready" | "ready" =>
  value === "not_ready" || value === "partly_ready" || value === "ready";

export type CreateOrderDeps = {
  db: Db | null;
  razorpay: RazorpayConfig | null;
  now: Date;
  createRazorpayOrder: (
    config: RazorpayConfig,
    order: { amount: number; currency: string; receipt: string; notes: Record<string, string> },
  ) => Promise<RazorpayOrder>;
};

export async function handleCreateOrder(request: Request, deps: CreateOrderDeps): Promise<Response> {
  if (!deps.db || !deps.razorpay) return json({ error: "checkout_unavailable" }, 503);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return json({ error: "bad_request" }, 400);
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const requested = typeof body.product === "string" ? body.product : "";
  if (!Object.hasOwn(productFor, requested)) return json({ error: "unknown_product" }, 400);
  const product: ProductId = productFor[requested as keyof typeof productFor];

  const email = cleanEmail(body.email);
  if (!email) return json({ error: "invalid_email" }, 400);

  // The upgrade is checked against the buyer's report order. Ineligible: the page offers the full-price Pack instead.
  let sourceReportOrderId: string | null = null;
  if (product === "pack_upgrade_100") {
    if (!isUuid(body.ref)) return json({ error: "not_eligible", reason: "not_found" }, 409);
    const check = upgradeEligibility(await orderById(deps.db, body.ref), deps.now);
    if (!check.eligible) return json({ error: "not_eligible", reason: check.reason }, 409);
    sourceReportOrderId = body.ref;
  }

  const amount = products[product].amountCents;
  const campaign = {
    utm_source: cleanCampaign(body.utm_source),
    utm_medium: cleanCampaign(body.utm_medium),
    utm_campaign: cleanCampaign(body.utm_campaign),
    utm_content: cleanCampaign(body.utm_content),
  };
  const assessmentId = cleanCampaign(body.assessment_id);
  const readinessBand = isBand(body.band) ? body.band : null;

  const notes: Record<string, string> = { product, email };
  for (const [key, value] of Object.entries({ ...campaign, assessment_id: assessmentId, readiness_band: readinessBand, source_report_order_id: sourceReportOrderId })) {
    if (value) notes[key] = value;
  }

  let razorpayOrder: RazorpayOrder;
  try {
    razorpayOrder = await deps.createRazorpayOrder(deps.razorpay, { amount, currency: CURRENCY, receipt: randomUUID(), notes });
  } catch {
    console.error("[checkout] Razorpay order creation failed");
    return json({ error: "checkout_unavailable" }, 502);
  }

  const order = await insertOrder(deps.db, {
    razorpay_order_id: razorpayOrder.id,
    product,
    amount_cents: amount,
    currency: CURRENCY,
    email,
    assessment_id: assessmentId,
    readiness_band: readinessBand,
    ...campaign,
    credit_applied: product === "pack_upgrade_100",
    source_report_order_id: sourceReportOrderId,
  });

  return json({
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    keyId: deps.razorpay.keyId,
    amount,
    currency: CURRENCY,
    productName: products[product].name,
    email,
  });
}

/**
 * Checks the signature Razorpay Checkout returns to the browser, then tells the browser which thank-you page to open.
 * This never marks an order paid; only the webhook does.
 */
export async function handleVerify(request: Request, deps: { db: Db | null; razorpay: RazorpayConfig | null }): Promise<Response> {
  if (!deps.db || !deps.razorpay) return json({ error: "checkout_unavailable" }, 503);
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  const orderId = typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "";
  const paymentId = typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
  if (!verifyPaymentSignature(orderId, paymentId, body.razorpay_signature, deps.razorpay.keySecret)) {
    return json({ error: "invalid_signature" }, 400);
  }
  const order = await orderByRazorpayId(deps.db, orderId);
  if (!order) return json({ error: "unknown_order" }, 404);
  return json({ ok: true, orderId: order.id });
}
