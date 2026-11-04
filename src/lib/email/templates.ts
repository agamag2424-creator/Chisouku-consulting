import { formatUsd } from "../payments/pricing";
import type { Order } from "../payments/orders";
import { siteConfig } from "../siteConfig";
import type { Email } from "./send";

// Email wording for the paid funnel. Two sentences are verbatim from the brief: the report delivery subject, and the
// 60-day credit paragraph (brief 3a). The rest is draft wording for the owner to approve (listed in the PR).

export const creditParagraph =
  "If you buy the Go-Live Readiness Pack within 60 days of your report being delivered, the USD 149 you paid for the report is credited towards it, so the Pack costs you USD 100. The email that delivers your report includes the upgrade link. After 60 days, the Pack is at the full price of USD 249.";

const signOff = [
  "",
  `Questions: ${siteConfig.email}. Please include your order number.`,
  "",
  `ChisokuLabs is a trading name of ${siteConfig.legalName}, ${siteConfig.address}.`,
].join("\n");

const paidLine = (order: Order) => `Amount paid: ${formatUsd(order.amount_cents)}`;

/** Buyer confirmation for a report order. */
export function reportConfirmation(order: Order): Email {
  return {
    to: order.email,
    subject: `Order confirmed: Go-Live Readiness Report — ${order.id}`,
    text: [
      "Thank you for your order.",
      "",
      "Product: Go-Live Readiness Report",
      paidLine(order),
      `Order: ${order.id}`,
      "",
      "Your Go-Live Readiness Report will arrive by email within 48 hours of payment.",
      "We will email you the link to the questionnaire separately.",
      signOff,
    ].join("\n"),
  };
}

/** Buyer email with the Pack download link (full price or upgrade). */
export function packDownload(order: Order, downloadUrl: string): Email {
  return {
    to: order.email,
    subject: `Your Go-Live Readiness Pack — ${order.id}`,
    text: [
      "Thank you for your order.",
      "",
      "Product: Go-Live Readiness Pack",
      paidLine(order),
      `Order: ${order.id}`,
      "",
      `Download your Pack: ${downloadUrl}`,
      "",
      "The link stays active for 30 days. Email us if you need it re-sent.",
      "Pack buyers receive free updates until 1 July 2027 when an official date or requirement the Pack covers changes.",
      signOff,
    ].join("\n"),
  };
}

/** Report delivery, sent when ops marks the report delivered. Carries the unlisted upgrade link. */
export function reportDelivery(order: Order, upgradeUrl: string, pdf: { filename: string; content: string }): Email {
  return {
    to: order.email,
    subject: `Your Go-Live Readiness Report — ${order.id}`,
    text: [
      "Your Go-Live Readiness Report is attached.",
      "",
      "Going further: the Pack credit",
      creditParagraph,
      "",
      `Upgrade to the Pack for USD 100: ${upgradeUrl}`,
      signOff,
    ].join("\n"),
    attachments: [pdf],
  };
}

/** "6 November 2026, 14:05 IST" for the ops due time. */
export function istTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("day")} ${get("month")} ${get("year")}, ${get("hour")}:${get("minute")} IST`;
}

/**
 * Internal alert to the ops inbox for a new report order, with the 48-hour due time. `deliverUrl` is the private
 * delivery page (it carries the admin key, so this email must only ever go to the ops inbox).
 */
export function opsReportAlert(order: Order, paidAt: Date, deliverUrl: string | null): Email {
  const due = new Date(paidAt.getTime() + 48 * 60 * 60 * 1000);
  return {
    to: siteConfig.email,
    subject: `New report order ${order.id}, due by ${istTime(due)}`,
    text: [
      `New report order ${order.id}, due by ${istTime(due)}.`,
      "",
      `Buyer: ${order.email}`,
      paidLine(order),
      `Status: ${order.status}`,
      `Free check band: ${order.readiness_band ?? "none"}`,
      `Campaign: ${[order.utm_source, order.utm_medium, order.utm_campaign, order.utm_content].filter(Boolean).join(" / ") || "none"}`,
      "",
      ...(deliverUrl
        ? ["When the PDF is ready, open this private link, choose the PDF and press Send:", deliverUrl]
        : ["When the PDF is ready, deliver it with:", `node scripts/ops/deliver-report.mjs --order ${order.id} --pdf <path-to-report.pdf>`]),
    ].join("\n"),
  };
}

/** Internal alert when an order needs a manual look (for example, an upgrade that no longer qualified). */
export function opsReviewAlert(order: Order, reason: string): Email {
  return {
    to: siteConfig.email,
    subject: `Order needs review: ${order.id}`,
    text: [`Order ${order.id} (${order.product}, ${formatUsd(order.amount_cents)}) needs review.`, `Reason: ${reason}`, `Buyer: ${order.email}`].join("\n"),
  };
}
