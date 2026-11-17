/**
 * Single source for offers, prices, markets and feature flags.
 * Pages, JSON-LD and llms.txt read these values; never repeat prices in JSX.
 *
 * Pricing (17 Nov 2026): the PMO Health Audit is list USD 5,000 and founding USD 2,500,
 * capped at 5 working days. Extra days are quoted separately at the same day rate.
 * The PMO Health Check is a single price of USD 500, credited in full against the audit.
 */
export const siteConfig = {
  name: "ChisokuLabs",
  /** Registered entity. The trading name stays `name`. */
  legalName: "ChisokuLab Private Limited",
  url: "https://www.chisokulabs.com",
  email: "hello@chisokulabs.com",
  phone: "+91 9277482755",
  /** Registered office address (legal / policy pages). */
  address: "190X/6/1, Kalindipuram, Prayagraj, U.P. 211011, India",
  calendlyUrl: "https://calendly.com/chisokulabs/discovery-call",
  /** Sender for form emails; chisokulabs.com is verified in Resend. Replies go to the visitor. */
  formSender: "ChisokuLabs website <website@chisokulabs.com>",
  tagline: "PMO Health Audit",
  positioning: "Is your PMO giving leadership the truth, early enough to act?",
  /** Organization and WebSite JSON-LD description. */
  schemaDescription: "PMO Health Audit: an independent, fixed-price check of how your programmes are run.",
  heroSub:
    "A fixed-price, independent check of how one programme or portfolio is governed, reported and run, with a 30-day fix plan. Led by a PMO lead with 11+ years running programmes.",
  footerTagline:
    "A fixed-price, independent check of how one programme or portfolio is governed, reported and run. UK first; the UAE by arrangement.",
  markets: { primary: "United Kingdom", secondary: "United Arab Emirates" },
  /** Homepage strip. Not a vendor list. */
  homeStrip: ["Governance", "RAID", "Reporting", "Cadence", "Portfolio"],
  currency: "USD",
  offers: {
    healthCheck: {
      name: "PMO Health Check",
      navLabel: "Health Check",
      days: 5,
      /** One price. There is no list/founding split on the pilot. */
      listPrice: 500,
      foundingPrice: null,
      path: "/pmo-health-check",
      priceCaption: "Price",
      payment: "USD 500 in full on signature",
      foundingApplies: false,
      serviceType: "PMO health check",
    },
    healthAudit: {
      name: "PMO Health Audit",
      navLabel: "Audit",
      days: 5,
      listPrice: 5000,
      foundingPrice: 2500,
      path: "/pmo-health-audit",
      priceCaption: "List price",
      payment: "50% on signature, 50% on delivery",
      foundingApplies: true,
      serviceType: "PMO health audit",
    },
  },
  feeCreditDays: 60,
  foundingSlotsRemaining: 3,
  /** The 12-question check stays reachable for old links. It is not linked or indexed. */
  selfCheck: { live: true, url: null as string | null },
  samplePackPath: "/documents/chisokulabs-go-live-decision-pack-illustrative.pdf",
  slipEstimator: {
    defaults: { people: 40, dayRate: 600, weeks: 4, parallelRunMonthly: 0 },
    workingDaysPerWeek: 5,
  },
  principalBlock: true,
} as const;

/** The approved credit. It is a credit against the audit, and it is not a refund. */
export const feeCreditSentence =
  "The full USD 500 Health Check fee is credited against the PMO Health Audit if signed within 60 days of the Health Check readout. The credit is not a refund.";

/**
 * The audit is capped at 5 working days. Day rates follow the published prices:
 * USD 5,000 / 5 days and USD 2,500 / 5 days.
 */
export const extraDaysSentence =
  "The audit is capped at 5 working days. Extra days are quoted separately at the same day rate: USD 1,000 a day at list price, USD 500 a day at the founding-client rate.";

export type CalendlyContent =
  | "header"
  | "hero"
  | "readiness_result"
  | "pricing"
  | "health_check"
  | "health_audit"
  | "health_check_price"
  | "health_audit_price"
  | "closing"
  | "brief"
  | "estimator"
  | "see_it_first"
  | "market_hero"
  | "market_close"
  | "contact";

/** Discovery-call URL with the existing UTM scheme. CtaTracker records where on the page the click happened. */
export function calendlyLink(content: CalendlyContent): string {
  return (
    siteConfig.calendlyUrl +
    "?utm_source=chisokulabs&utm_medium=website&utm_campaign=discovery_call&utm_content=" +
    content
  );
}

export type OfferKey = keyof typeof siteConfig.offers;

/**
 * Which routes may render. A route that is not live returns 404 in production.
 * Unlisted routes stay live for old links; they are not linked, indexed or sitemapped.
 */
export const routeLive = {
  "/": true,
  "/method": true,
  "/contact": true,
  "/about": true,
  "/faq": true,
  "/glossary": true,
  "/privacy": true,
  "/terms": true,
  "/refund-policy": true,
  "/shipping-policy": true,
  "/pmo-health-check": true,
  "/pmo-health-audit": true,
  "/see-it-first": true,
  "/pricing": true,
  "/independence-and-data": true,
  "/go-live-readiness-uae": true,
  "/go-live-readiness-saudi-arabia": true,
  "/guides/s4hana-go-no-go-checklist": true,
  "/guides/is-my-erp-ready-to-go-live": true,
  "/guides/independent-assurance-vs-si-readiness-review": true,
  "/readiness": true,
  /** Built in Epic 5 of the September port; live once the check works end to end. */
  "/pmo-self-check": false,
} as const;

/** Live pages that stay reachable but are unlinked, noindexed and left out of the sitemap. */
export const routeUnlisted = {
  "/readiness": true,
  "/go-live-readiness-uae": true,
  "/go-live-readiness-saudi-arabia": true,
  "/guides/s4hana-go-no-go-checklist": true,
  "/guides/is-my-erp-ready-to-go-live": true,
  "/guides/independent-assurance-vs-si-readiness-review": true,
} as const;

export type SiteRoute = keyof typeof routeLive;

/** True when a path (query and hash ignored) is a route that may be linked and indexed. */
export function isRouteLive(href: string): boolean {
  const path = href.split(/[?#]/)[0] as SiteRoute;
  return routeLive[path] ?? false;
}

/** True when a live route should appear in nav, footer, sitemap and llms.txt. */
export function isRouteListed(href: string): boolean {
  const path = href.split(/[?#]/)[0] as keyof typeof routeUnlisted;
  return isRouteLive(href) && !routeUnlisted[path];
}

/**
 * Whether a route's page may render. A live route always renders; a route that is not live yet renders only in
 * development and on Vercel previews (for review), and returns 404 in production. Fails closed when the environment
 * is unknown.
 */
export function routeRenders(href: string, env: { NODE_ENV?: string; VERCEL_ENV?: string } = process.env): boolean {
  return isRouteLive(href) || env.NODE_ENV === "development" || env.VERCEL_ENV === "preview";
}

/** "USD 5,000": every displayed price goes through here. */
export function formatPrice(amount: number): string {
  return `${siteConfig.currency} ${amount.toLocaleString("en-US")}`;
}

/** Founding-client prices show only while places remain. */
export function foundingActive(slotsRemaining: number = siteConfig.foundingSlotsRemaining): boolean {
  return slotsRemaining > 0;
}

export type OfferPriceLabel = {
  /** "USD 5,000" or "USD 500" */
  list: string;
  /** Founding-client price, or null when the offer has one price or no places remain. */
  founding: string | null;
};

/** List and (while places remain, and where a founding rate exists) founding price for an offer. */
export function offerPriceLabel(
  offer: OfferKey,
  slotsRemaining: number = siteConfig.foundingSlotsRemaining,
): OfferPriceLabel {
  const data = siteConfig.offers[offer];
  const founding =
    data.foundingPrice !== null && foundingActive(slotsRemaining) ? formatPrice(data.foundingPrice) : null;
  return { list: formatPrice(data.listPrice), founding };
}

/** Primary navigation (September port PRD, Story 1.2). Nav shows only listed routes. */
export const navLinks = [
  { href: "/pmo-health-check", label: "Health Check" },
  { href: "/pmo-health-audit", label: "Audit" },
  { href: "/pmo-self-check", label: "Self-check" },
  { href: "/method", label: "Method" },
  { href: "/about", label: "About" },
] as const;
