import { chargeCurrency } from "../../../../lib/payments/pricing";
import { createRazorpayOrder, razorpayConfig } from "../../../../lib/payments/razorpay";
import { getDb } from "../../../../lib/server/db";
import { handleCreateOrder } from "../../../../lib/server/routes/checkout";

// Creates a USD order on the server at the configured price (brief section 4). Handler: lib/server/routes/checkout.ts.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleCreateOrder(request, {
    db: getDb(),
    razorpay: razorpayConfig(process.env),
    now: new Date(),
    currency: chargeCurrency(process.env),
    createRazorpayOrder,
  });
}
