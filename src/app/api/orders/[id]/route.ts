import { getDb } from "../../../../lib/server/db";
import { handleOrderStatus } from "../../../../lib/server/routes/orders";

// Order status for the thank-you page. Returns no personal data.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  const { id } = await params;
  return handleOrderStatus(id, { db: getDb(), now: new Date() });
}
