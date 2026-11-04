import { sendEmail } from "../../../../lib/email/send";
import { getDb } from "../../../../lib/server/db";
import { handleWebhook, siteUrl } from "../../../../lib/server/routes/orders";

// Razorpay webhook: payment.captured (pay and deliver) and refund.processed (refund and revoke). The signature is
// checked against the raw body with RAZORPAY_WEBHOOK_SECRET. Handler: lib/server/routes/orders.ts.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleWebhook(request, {
    db: getDb(),
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET?.trim() || null,
    now: new Date(),
    siteUrl: siteUrl(process.env),
    sendEmail: (email) => sendEmail(email),
    adminToken: process.env.ADMIN_API_TOKEN,
  });
}
