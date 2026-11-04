// The one price list for the self-serve products (paid funnel brief, section 2). Amounts are in US cents.
// Orders are always created from this table on the server; an amount sent by a browser is never used.

export const CURRENCY = "USD";

export const products = {
  report_149: {
    name: "Go-Live Readiness Report",
    amountCents: 14900,
    path: "/readiness-report",
    kind: "report",
  },
  pack_249: {
    name: "Go-Live Readiness Pack",
    amountCents: 24900,
    path: "/readiness-pack",
    kind: "pack",
  },
  /** Unlisted: report buyers only, within 60 days of delivery. Linked only from the report delivery email. */
  pack_upgrade_100: {
    name: "Go-Live Readiness Pack (report credit applied)",
    amountCents: 10000,
    path: "/readiness-pack/upgrade",
    kind: "pack",
  },
} as const;

export type ProductId = keyof typeof products;

export const isProductId = (value: unknown): value is ProductId =>
  typeof value === "string" && Object.hasOwn(products, value);

/** Days after the report is delivered during which its USD 149 counts towards the Pack. */
export const REPORT_CREDIT_DAYS = 60;

/** How long a Pack download link stays active. */
export const DOWNLOAD_LINK_DAYS = 30;

/** "USD 149" from 14900. Whole dollars only; every price here is a whole number. */
export function formatUsd(amountCents: number): string {
  return `${CURRENCY} ${(amountCents / 100).toLocaleString("en-US")}`;
}
