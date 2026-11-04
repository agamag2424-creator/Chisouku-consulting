import { sendEmail } from "../../../../lib/email/send";
import { getDb } from "../../../../lib/server/db";
import { handleDeliverReport, siteUrl } from "../../../../lib/server/routes/orders";

// Ops only (Bearer ADMIN_API_TOKEN): emails a report PDF and records its delivery. Used by scripts/ops/deliver-report.mjs.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleDeliverReport(request, {
    db: getDb(),
    adminToken: process.env.ADMIN_API_TOKEN,
    now: new Date(),
    siteUrl: siteUrl(process.env),
    sendEmail: (email) => sendEmail(email),
  });
}
