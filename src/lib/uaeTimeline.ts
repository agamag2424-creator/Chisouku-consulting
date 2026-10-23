// UAE e-invoicing dates (brief A2). Both wordings live here and switch at 31 October 2026, 00:00 GST (UTC+4).

/** The instant the ASP appointment deadline is treated as passed: 31 October 2026, 00:00 Gulf Standard Time. */
export const ASP_DEADLINE_PASSED_AT = "2026-10-31T00:00:00+04:00";

/** True from 31 October 2026 00:00 GST onwards. Pass `now` in tests; otherwise the clock is read here. */
export function aspDeadlinePassed(now: Date = new Date()): boolean {
  return now.getTime() >= Date.parse(ASP_DEADLINE_PASSED_AT);
}

export const uaeEInvoicingSource = {
  label:
    "UAE Ministry of Finance: Ministerial Decision No. 244 of 2025, as amended by Ministerial Resolution No. 66 of 2026",
  url: "https://tax.gov.ae/Datafolder/Files/Pdf/2026/legislation/Ministerial%20Decision%20No.%20244%20of%202025%20on%20The%20Implementation%20of%20the%20Electronic%20Invoicing%20System%20-%20publishing%20-%2007%202026.pdf",
} as const;

export const uaeFinanceAnnouncement = {
  label: "Ministry of Finance announcement",
  url: "https://mof.gov.ae/en/news/ministry-of-finance-announces-the-issuance-of-two-ministerial-decisions-on-the-scope-of-obligations-and-the-timelines-for-implementing-the-electronic-invoicing-system-2/",
} as const;

export type DatedCard = { date: string; title: string; text: string };

/** First e-invoicing card on the UAE page. The date stays; the heading and body change once the deadline has passed. */
export function aspAppointmentCard(now: Date = new Date()): DatedCard {
  if (aspDeadlinePassed(now)) {
    return {
      date: "30 October 2026",
      title: "ASP appointment deadline passed",
      text: "The deadline for businesses with revenue of AED 50 million or more to appoint an Accredited Service Provider was 30 October 2026. They must go live with e-invoicing by 1 January 2027.",
    };
  }
  return {
    date: "30 October 2026",
    title: "Appoint an e-invoicing Accredited Service Provider (ASP)",
    text: "For businesses with revenue of AED 50 million or more. They must then go live with e-invoicing by 1 January 2027.",
  };
}

/** AED 50m+ clause in the homepage band. The smaller-business and Saudi clauses do not change. */
export function homepageAed50Clause(now: Date = new Date()): string {
  return aspDeadlinePassed(now)
    ? "AED 50m+ businesses go live by 1 Jan 2027"
    : "businesses with revenue of AED 50m or more appoint an ASP by 30 Oct 2026 and go live by 1 Jan 2027";
}

export const homepageSmallerClause = "smaller businesses appoint by 31 Mar 2027 and go live by 1 Jul 2027";

export const homepageSaudiClause = "ZATCA Wave 25 integration by 1 Feb 2027";
