import { createHmac, timingSafeEqual } from "node:crypto";

// Razorpay Standard Checkout on server-created Orders (paid funnel brief, section 4). Server only: the key secret and
// webhook secret are read from the environment here and never sent to a browser. No SDK; the Orders API is one call.

export type RazorpayMode = "test" | "live";

export type RazorpayConfig = {
  keyId: string;
  keySecret: string;
  webhookSecret: string | null;
  mode: RazorpayMode;
};

/** Test mode unless RAZORPAY_MODE is exactly "live". */
export function razorpayMode(env: Record<string, string | undefined>): RazorpayMode {
  return env.RAZORPAY_MODE?.trim() === "live" ? "live" : "test";
}

/** Null when the key pair is missing, or when a test key is used in live mode (or the reverse). */
export function razorpayConfig(env: Record<string, string | undefined>): RazorpayConfig | null {
  const keyId = env.RAZORPAY_KEY_ID?.trim();
  const keySecret = env.RAZORPAY_KEY_SECRET?.trim();
  if (!keyId || !keySecret) return null;
  const mode = razorpayMode(env);
  if (!keyId.startsWith(mode === "live" ? "rzp_live_" : "rzp_test_")) return null;
  return { keyId, keySecret, webhookSecret: env.RAZORPAY_WEBHOOK_SECRET?.trim() || null, mode };
}

function hmacHex(secret: string, message: string): string {
  return createHmac("sha256", secret).update(message).digest("hex");
}

/** Constant-time comparison of two hex signatures. */
function sameSignature(expected: string, received: unknown): boolean {
  if (typeof received !== "string" || !/^[0-9a-f]+$/i.test(received)) return false;
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(received.toLowerCase(), "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Checkout callback: HMAC-SHA256 of "order_id|payment_id" with the key secret. */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: unknown,
  keySecret: string,
): boolean {
  if (!orderId || !paymentId || !keySecret) return false;
  return sameSignature(hmacHex(keySecret, `${orderId}|${paymentId}`), signature);
}

/** Webhook: HMAC-SHA256 of the raw request body with the webhook secret, from the X-Razorpay-Signature header. */
export function verifyWebhookSignature(rawBody: string, signature: unknown, webhookSecret: string | null): boolean {
  if (!webhookSecret) return false;
  return sameSignature(hmacHex(webhookSecret, rawBody), signature);
}

export type RazorpayOrder = { id: string; amount: number; currency: string; status: string };

/** Creates an order through the Orders API. Notes are limited to 15 string values by Razorpay. */
export async function createRazorpayOrder(
  config: RazorpayConfig,
  order: { amount: number; currency: string; receipt: string; notes: Record<string, string> },
): Promise<RazorpayOrder> {
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    await response.body?.cancel().catch(() => undefined);
    throw new Error(`Razorpay order creation failed: ${response.status}`);
  }
  return (await response.json()) as RazorpayOrder;
}
