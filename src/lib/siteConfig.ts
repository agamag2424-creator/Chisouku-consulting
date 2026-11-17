/**
 * Single source for offers, prices, markets and feature flags.
 * Pages, JSON-LD and llms.txt read these values; never repeat prices in JSX.
 *
 * Pricing (17 Nov 2026, in GBP from about USD 1 = GBP 0.75): the PMO Health Audit is £3,950 list and £1,950 founding,
 * capped at 5 working days. Extra days are quoted separately at the same day rate.
 * with extra days at £795 (list) or £395 (founding). The PMO Health Check is a single price of £395, credited in full
 * against the Audit.
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
  /** Company Identification Number (Ministry of Corporate Affairs, India). */
  cin: "U62099UP2025PTC237187",
  /** Registered office, written out in full for the footer company line. */
  registeredOffice: "190X/6/1, Kalindipuram, Prayagraj, Uttar Pradesh 211011, India",
  /** The named consultant (change 1, 17 Nov 2026). Photo: square WebP, about 320 px shown. */
  founder: {
    name: "Agam Agrawwal",
    title: "Founder and Director",
    linkedin: "https://www.linkedin.com/in/agamagrawwal",
    /** Set to "/images/founder/agam-agrawwal.webp" once the photo file is in public/. */
    photo: null as string | null,
  },
  /** Sender for form emails; chisokulabs.com is verified in Resend. Replies go to the visitor. */
  formSender: "ChisokuLabs website <website@chisokulabs.com>",
  tagline: "PMO Health Check",
  positioning: "RAID logs nobody acts on. Status that turns Red too late. Forums that cannot decide",
  /** Organization and WebSite JSON-LD description. */
  schemaDescription:
    "Fixed-price PMO Health Checks and Audits: a free PMO self-check, a £395 PMO Health Check of one programme, and a PMO Health Audit of the whole portfolio.",
  heroSub: "A fixed-price PMO Health Check finds which one is yours, with evidence, in five working days.",
  footerTagline:
    "Fixed-price PMO Health Checks and Audits for organisations running a PMO. UK first; the UAE and Saudi Arabia too.",
  markets: { primary: "United Kingdom", others: ["United Arab Emirates", "Saudi Arabia"] },
  /** Homepage strip. Not a vendor list. */
  homeStrip: ["Governance", "RAID", "Reporting", "Cadence", "Portfolio"],
  currency: "GBP",
  offers: {
    healthCheck: {
      name: "PMO Health Check",
      navLabel: "Health Check",
      days: 5,
      /** One price, paid in full on signature. No list/founding split. */
      listPrice: 395,
      foundingPrice: null,
      path: "/pmo-health-check",
      priceCaption: "Price",
      payment: "£395, paid in full on signature",
      foundingApplies: false,
      serviceType: "PMO health check",
    },
    healthAudit: {
      name: "PMO Health Audit",
      navLabel: "Audit",
      days: 5,
      listPrice: 3950,
      foundingPrice: 1950,
      /** Extra days beyond the 5-day cap. Rounded GBP prices, so not list / 5. */
      extraDay: { list: 795, founding: 395 },
      path: "/pmo-health-audit",
      priceCaption: "List price",
      payment: "Paid 50/50: half on signature, half on delivery",
      foundingApplies: true,
      serviceType: "PMO health audit",
    },
  },
  feeCreditDays: 60,
  foundingSlotsRemaining: 3,
  principalBlock: true,
  /**
   * Umami Cloud website ID (public; it appears in the page source anyway). Empty means no Umami script loads.
   * Set it to the ID from cloud.umami.is (Settings, Websites) to switch analytics on in production.
   */
  umamiWebsiteId: "b053024b-1cdc-4ec9-b284-a6dceb5e5ece",
} as const;

/** The approved credit (source-of-truth table). The Health Check fee is never described as refundable. */
export const feeCreditSentence =
  "The £395 Health Check fee is credited in full against the PMO Health Audit if the Audit is signed within 60 days.";

/** The Audit's 5-day cap and the extra-day rates, from config. */
export const extraDaysSentence = `The Audit is capped at ${siteConfig.offers.healthAudit.days} working days. Extra days are quoted separately at ${formatPrice(siteConfig.offers.healthAudit.extraDay.list)} a day (list) or ${formatPrice(siteConfig.offers.healthAudit.extraDay.founding)} a day (founding).`;

export type CalendlyContent =
  | "header"
  | "hero"
  | "self_check_result"
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
  "/payment-terms": true,
  "/pmo-health-check": true,
  "/pmo-health-audit": true,
  "/see-it-first": true,
  "/pricing": true,
  "/independence-and-data": true,
  "/pmo-uae": true,
  "/pmo-saudi-arabia": true,
  "/pmo-self-check": true,
  "/pmo-self-check/methodology": true,
} as const;

/** Live pages that stay reachable but are unlinked, noindexed and left out of the sitemap. */
export const routeUnlisted = {} as const satisfies Partial<Record<string, true>>;

export type SiteRoute = keyof typeof routeLive;

/** True when a path (query and hash ignored) is a route that may be linked and indexed. */
export function isRouteLive(href: string): boolean {
  const path = href.split(/[?#]/)[0] as SiteRoute;
  return routeLive[path] ?? false;
}

/** True when a live route should appear in nav, footer, sitemap and llms.txt. */
export function isRouteListed(href: string): boolean {
  const path = href.split(/[?#]/)[0];
  return isRouteLive(href) && !(path in routeUnlisted);
}

/**
 * Whether a route's page may render. A live route always renders; a route that is not live yet renders only in
 * development and on Vercel previews (for review), and returns 404 in production. Fails closed when the environment
 * is unknown.
 */
export function routeRenders(href: string, env: { NODE_ENV?: string; VERCEL_ENV?: string } = process.env): boolean {
  return isRouteLive(href) || env.NODE_ENV === "development" || env.VERCEL_ENV === "preview";
}

/** "£3,950": every displayed price goes through here. Never "GBP 3,950". */
export function formatPrice(amount: number): string {
  return `£${amount.toLocaleString("en-GB")}`;
}

/** Founding-client prices show only while places remain. */
export function foundingActive(slotsRemaining: number = siteConfig.foundingSlotsRemaining): boolean {
  return slotsRemaining > 0;
}

export type OfferPriceLabel = {
  /** "£3,950" or "£395" */
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
