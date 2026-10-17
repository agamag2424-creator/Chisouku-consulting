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
  // PRD 6.1 prices approved (IN-1, 17 Oct 2026)
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
  // PRD 9.11; example values approved (IN-7, 17 Oct 2026)
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
  "/readiness-evidence-check": true,
  "/go-live-decision-review": true,
  "/see-it-first": true,
  "/pricing": true,
  "/independence-and-data": true,
  "/go-live-readiness-uae": true,
  "/go-live-readiness-saudi-arabia": false,
  "/guides/s4hana-go-no-go-checklist": false,
  "/guides/is-my-erp-ready-to-go-live": false,
  "/guides/independent-assurance-vs-si-readiness-review": false,
} as const;

export type SiteRoute = keyof typeof routeLive;

/** True when a path (query and hash ignored) is a route that may be linked. */
export function isRouteLive(href: string): boolean {
  const path = href.split(/[?#]/)[0] as SiteRoute;
  return routeLive[path] ?? false;
}

/**
 * Whether a route's page may render. A live route always renders; a route that is not live yet renders only in
 * development and on Vercel previews (for review), and returns 404 in production. Fails closed when the environment
 * is unknown (backlog rule 14).
 */
export function routeRenders(href: string, env: { NODE_ENV?: string; VERCEL_ENV?: string } = process.env): boolean {
  return isRouteLive(href) || env.NODE_ENV === "development" || env.VERCEL_ENV === "preview";
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

/** Primary navigation (PRD 4.3). Nav and footer show only links whose route is live. */
export const navLinks = [
  { href: "/go-live-decision-review", label: "Decision Review" },
  { href: "/readiness-evidence-check", label: "Evidence Check" },
  { href: "/method", label: "Method" },
  { href: "/see-it-first", label: "See it first" },
  { href: "/pricing", label: "Pricing" },
] as const;
