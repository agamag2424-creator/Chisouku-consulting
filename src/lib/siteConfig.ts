/**
 * Single source for offers, prices, markets, platforms and feature flags (PRD 6.4).
 * Pages, JSON-LD and llms.txt read these values; never repeat them in JSX.
 */
export const siteConfig = {
  name: "ChisokuLabs",
  url: "https://www.chisokulabs.com",
  email: "agam@chisokulabs.com", // INPUT NEEDED (IN-2): confirm a role address, e.g. hello@, given L4
  calendlyUrl: "https://calendly.com/chisokulab/discovery-call",
  tagline: "Independent go-live decision assurance",
  positioning: "Your programme reports Green. We test whether the evidence agrees.",
  markets: { primary: "United Arab Emirates", secondary: "Saudi Arabia" },
  platforms: ["SAP S/4HANA", "Oracle Fusion", "Microsoft Dynamics 365", "Salesforce", "Workday"],
  currency: "USD",
  offers: {
    evidenceCheck: {
      name: "Readiness Evidence Check",
      days: 5,
      listPrice: 5000,
      foundingPrice: 2500,
      path: "/readiness-evidence-check",
    },
    decisionReview: {
      name: "Go-Live Decision Review",
      days: 10,
      listPrice: 12000,
      foundingPrice: 6000,
      path: "/go-live-decision-review",
    },
    continuous: {
      name: "Continuous readiness assurance",
      listPriceFromMonthly: 6000,
      foundingPriceFromMonthly: 3000,
    },
  },
  feeCreditDays: 90,
  foundingSlotsRemaining: 3,
  selfCheck: { live: false, url: null as string | null },
  samplePackPath: "/documents/chisokulabs-go-live-decision-pack-illustrative.pdf",
  // PRD 9.11; example values pending founder approval (IN-7)
  slipEstimator: {
    defaults: { people: 40, dayRate: 600, weeks: 4, parallelRunMonthly: 0 },
    workingDaysPerWeek: 5,
  },
  // PRD 8.3 principal paragraph (IN-3 approved 17 Oct 2026)
  principalBlock: true,
} as const;

export type OfferKey = keyof typeof siteConfig.offers;

/**
 * Which routes may be linked. New routes switch on as their epic merges (E1.4);
 * links to routes that are not live render as plain text, never as dead links.
 */
export const routeLive = {
  "/": true,
  "/method": true,
  "/contact": true,
  "/faq": true,
  "/glossary": true,
  "/privacy": true,
  "/readiness-evidence-check": false,
  "/go-live-decision-review": false,
  "/see-it-first": false,
  "/pricing": false,
  "/independence-and-data": false,
  "/go-live-readiness-uae": false,
  "/go-live-readiness-saudi-arabia": false,
} as const;

export type SiteRoute = keyof typeof routeLive;

/** True when a path (query and hash ignored) is a route that may be linked. */
export function isRouteLive(href: string): boolean {
  const path = href.split(/[?#]/)[0] as SiteRoute;
  return routeLive[path] ?? false;
}

/** "USD 5,000": every displayed price goes through here. */
export function formatPrice(amount: number): string {
  return `${siteConfig.currency} ${amount.toLocaleString("en-US")}`;
}

/** Founding-client prices show only while places remain (PRD 6.3). */
export function foundingActive(slotsRemaining: number = siteConfig.foundingSlotsRemaining): boolean {
  return slotsRemaining > 0;
}

export type OfferPriceLabel = {
  /** "USD 5,000" or "From USD 6,000 / month" */
  list: string;
  /** Founding-client price, or null once no founding places remain. */
  founding: string | null;
};

/** List and (while places remain) founding price for an offer, formatted for display. */
export function offerPriceLabel(
  offer: OfferKey,
  slotsRemaining: number = siteConfig.foundingSlotsRemaining,
): OfferPriceLabel {
  const data: (typeof siteConfig.offers)[OfferKey] = siteConfig.offers[offer];
  const oneOff = "listPrice" in data;
  const list = oneOff ? formatPrice(data.listPrice) : `From ${formatPrice(data.listPriceFromMonthly)} / month`;
  const founding = oneOff
    ? formatPrice(data.foundingPrice)
    : `From ${formatPrice(data.foundingPriceFromMonthly)} / month`;
  return { list, founding: foundingActive(slotsRemaining) ? founding : null };
}

export const navLinks = [
  { href: "/pmo-automation-audit", label: "Audit" },
  { href: "/free-pmo-diagnostic", label: "Diagnostic" },
  { href: "/implementation", label: "Implementation" },
  { href: "/method", label: "Method" },
  { href: "/sample-outputs", label: "Outputs" },
] as const;
