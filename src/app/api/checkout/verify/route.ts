import { razorpayConfig } from "../../../../lib/payments/razorpay";
import { getDb } from "../../../../lib/server/db";
import { handleVerify } from "../../../../lib/server/routes/checkout";

// Checks the Checkout callback signature and returns the thank-you order id. Never marks an order paid.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleVerify(request, { db: getDb(), razorpay: razorpayConfig(process.env) });
}
