import { randomBytes } from "node:crypto";
import { DOWNLOAD_LINK_DAYS, REPORT_CREDIT_DAYS, type ProductId } from "./pricing";

// Order rules that do not touch the network: upgrade eligibility, download-link state, and input cleaning.
// The database row is `public.orders` (supabase/migrations/20261104120000_paid_funnel.sql).

export type OrderStatus = "created" | "paid" | "delivered" | "refunded" | "needs_review";

export type Order = {
  id: string;
  razorpay_order_id: string;
  payment_id: string | null;
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
  status: OrderStatus;
  created_at: string;
  paid_at: string | null;
  delivered_at: string | null;
  downloaded_at: string | null;
  download_token: string | null;
  link_expires_at: string | null;
  credit_applied: boolean;
  source_report_order_id: string | null;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export type UpgradeCheck =
  | { eligible: true; daysSinceReport: number }
  | { eligible: false; reason: "not_found" | "not_report" | "refunded" | "not_delivered" | "expired" };

/**
 * Brief section 2: the USD 100 upgrade needs a report order (`report_149`) that is not refunded and was delivered
 * no more than 60 days ago. Day 60 counts; day 61 does not.
 */
export function upgradeEligibility(reportOrder: Pick<Order, "product" | "status" | "delivered_at"> | null, now: Date): UpgradeCheck {
  if (!reportOrder) return { eligible: false, reason: "not_found" };
  if (reportOrder.product !== "report_149") return { eligible: false, reason: "not_report" };
  if (reportOrder.status === "refunded") return { eligible: false, reason: "refunded" };
  if (!reportOrder.delivered_at || reportOrder.status !== "delivered") return { eligible: false, reason: "not_delivered" };
  const delivered = Date.parse(reportOrder.delivered_at);
  if (Number.isNaN(delivered)) return { eligible: false, reason: "not_delivered" };
  const daysSinceReport = Math.floor((now.getTime() - delivered) / DAY_MS);
  if (daysSinceReport < 0 || daysSinceReport > REPORT_CREDIT_DAYS) return { eligible: false, reason: "expired" };
  return { eligible: true, daysSinceReport };
}

/** A fresh, unguessable download token (256 bits, URL-safe). */
export function newDownloadToken(): string {
  return randomBytes(32).toString("base64url");
}

export function downloadExpiry(from: Date): string {
  return new Date(from.getTime() + DOWNLOAD_LINK_DAYS * DAY_MS).toISOString();
}

export type LinkState = "ok" | "expired" | "refunded" | "not_ready";

/** Whether a Pack download link may be used now. Refunds block it whatever the date. */
export function downloadLinkState(
  order: Pick<Order, "status" | "download_token" | "link_expires_at"> | null,
  now: Date,
): LinkState {
  if (!order || !order.download_token) return "not_ready";
  if (order.status === "refunded") return "refunded";
  if (order.status !== "delivered" && order.status !== "paid" && order.status !== "needs_review") return "not_ready";
  const expires = order.link_expires_at ? Date.parse(order.link_expires_at) : Number.NaN;
  if (Number.isNaN(expires) || now.getTime() >= expires) return "expired";
  return "ok";
}

/** Download tokens are 43 base64url characters. Anything else is rejected before a database lookup. */
export const isDownloadToken = (value: unknown): value is string =>
  typeof value === "string" && /^[A-Za-z0-9_-]{43}$/.test(value);

export const isUuid = (value: unknown): value is string =>
  typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

/** A plausible email address, trimmed and lower-cased, or null. Kept to 254 characters. */
export function cleanEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

/** UTM and similar campaign values: short, printable, and never an email address. */
export function cleanCampaign(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text || text.length > 120 || text.includes("@") || /[\u0000-\u001f\u007f]/.test(text)) return null;
  return text;
}
