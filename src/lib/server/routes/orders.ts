import { timingSafeEqual } from "node:crypto";
import { reportDelivery } from "../../email/templates";
import type { Email } from "../../email/send";
import { downloadLinkState, isDownloadToken, isUuid } from "../../payments/orders";
import { products } from "../../payments/pricing";
import { verifyWebhookSignature } from "../../payments/razorpay";
import { markFirstDownload, markReportDelivered, orderByDownloadToken, orderById, recordEvent } from "../../payments/store";
import { handleRazorpayEvent, type WebhookDeps } from "../../payments/webhook";
import { siteConfig } from "../../siteConfig";
import type { BlobConfig } from "../blob";
import type { Db } from "../db";

// Order status for the thank-you page, the Pack download, the Razorpay webhook and the ops delivery action.

const noStore = { "Cache-Control": "no-store" };
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: noStore });

/** Links in emails: SITE_URL, else the preview's own address on Vercel previews, else the live site. */
export function siteUrl(env: Record<string, string | undefined>): string {
  const configured = env.SITE_URL?.trim().replace(/\/+$/, "");
  if (configured && /^https:\/\//.test(configured)) return configured;
  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return siteConfig.url;
}

/** GET /api/orders/[id]: what the thank-you page needs, and nothing personal. */
export async function handleOrderStatus(id: string, deps: { db: Db | null; now: Date }): Promise<Response> {
  if (!deps.db) return json({ error: "unavailable" }, 503);
  if (!isUuid(id)) return json({ error: "not_found" }, 404);
  const order = await orderById(deps.db, id);
  if (!order) return json({ error: "not_found" }, 404);
  const linkReady = downloadLinkState(order, deps.now) === "ok";
  return json({
    status: order.status,
    product: order.product,
    kind: products[order.product].kind,
    downloadPath: linkReady && order.download_token ? `/download/${order.download_token}` : null,
  });
}

export type DownloadDeps = {
  db: Db | null;
  blob: BlobConfig | null;
  now: Date;
  signUrl: (config: BlobConfig, now: Date, minutes: number, fileName: string) => string;
};

/**
 * GET /download/[token]: checks the token, expiry and refunds, records the first download (the refund policy depends
 * on it), then redirects to a 10-minute signed link to the private ZIP.
 */
export async function handleDownload(token: string, deps: DownloadDeps): Promise<Response> {
  const unavailable = (reason: string) =>
    new Response(null, { status: 302, headers: { ...noStore, Location: `/download/unavailable?reason=${reason}` } });
  if (!deps.db || !deps.blob) return unavailable("not_ready");
  if (!isDownloadToken(token)) return unavailable("not_found");
  const order = await orderByDownloadToken(deps.db, token);
  const state = downloadLinkState(order, deps.now);
  if (!order || state !== "ok") return unavailable(order ? state : "not_found");
  if (await markFirstDownload(deps.db, order.id, deps.now)) {
    await recordEvent(deps.db, "pack_downloaded", order.id, { product: order.product });
  }
  const url = deps.signUrl(deps.blob, deps.now, 10, "chisokulabs-go-live-readiness-pack.zip");
  return new Response(null, { status: 302, headers: { ...noStore, Location: url } });
}

/** POST /api/webhooks/razorpay: signature on the raw body, then the event. 400 for a bad signature. */
export async function handleWebhook(
  request: Request,
  deps: Omit<WebhookDeps, "db"> & { db: Db | null; webhookSecret: string | null },
): Promise<Response> {
  const rawBody = await request.text();
  if (!verifyWebhookSignature(rawBody, request.headers.get("x-razorpay-signature"), deps.webhookSecret)) {
    return json({ error: "invalid_signature" }, 400);
  }
  if (!deps.db) return json({ error: "unavailable" }, 503);
  let event: unknown;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  try {
    const outcome = await handleRazorpayEvent(event as Parameters<typeof handleRazorpayEvent>[0], { ...deps, db: deps.db });
    return json({ ok: true, outcome });
  } catch {
    // A database error: Razorpay retries the webhook, and every step is safe to repeat.
    console.error("[webhook] event handling failed");
    return json({ error: "retry" }, 500);
  }
}

/** Bearer token check for the ops action. The token must be at least 32 characters. */
export function isAdmin(request: Request, adminToken: string | undefined): boolean {
  const expected = adminToken?.trim();
  const header = request.headers.get("authorization") ?? "";
  if (!expected || expected.length < 32 || !header.startsWith("Bearer ")) return false;
  const a = Buffer.from(header.slice(7));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * POST /api/admin/deliver-report (ops only): emails the report PDF with the Pack upgrade link, then records the
 * delivery date that starts the 60-day credit. Body: { orderId, pdfBase64, filename? }.
 */
export async function handleDeliverReport(
  request: Request,
  deps: { db: Db | null; adminToken: string | undefined; now: Date; siteUrl: string; sendEmail: (email: Email) => Promise<boolean> },
): Promise<Response> {
  if (!isAdmin(request, deps.adminToken)) return json({ error: "unauthorised" }, 401);
  if (!deps.db) return json({ error: "unavailable" }, 503);
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (!isUuid(body.orderId)) return json({ error: "bad_order" }, 400);
  if (typeof body.pdfBase64 !== "string" || body.pdfBase64.length < 100) return json({ error: "missing_pdf" }, 400);
  const order = await orderById(deps.db, body.orderId);
  if (!order || order.product !== "report_149") return json({ error: "not_a_report_order" }, 404);
  if (order.status !== "paid" && order.status !== "needs_review") return json({ error: `status_${order.status}` }, 409);

  const filename = typeof body.filename === "string" && /^[\w.-]{1,80}\.pdf$/.test(body.filename)
    ? body.filename
    : `chisokulabs-go-live-readiness-report-${order.id.slice(0, 8)}.pdf`;
  const sent = await deps.sendEmail(
    reportDelivery(order, `${deps.siteUrl}/readiness-pack/upgrade?ref=${order.id}`, { filename, content: body.pdfBase64 }),
  );
  if (!sent) return json({ error: "email_failed" }, 502);
  const delivered = await markReportDelivered(deps.db, order.id, deps.now);
  return json({ ok: true, deliveredAt: delivered?.delivered_at ?? null });
}
