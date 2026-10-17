export const siteConfig = {
  name: "ChisokuLabs",
  url: "https://www.chisokulabs.com",
  email: "agam@chisokulabs.com",
  tagline: "AI automation for delivery systems",
  subline: "Starting with the PMO reporting layer",
  diagnosticUrl: "https://diagnostic.chisokulabs.com/",
  calendlyUrl: "https://calendly.com/chisokulab/discovery-call",
  pricing: {
    min: 4000,
    max: 5000,
    currency: "USD",
    timeline: "5-10 business days",
  },
  markets: {
    primary: "GCC",
    secondary: "Singapore",
  },
  systems: ["Jira", "Sheets", "Power BI", "Slack / Teams"] as const,
  // Offer keys from PRD 6.4, added early for PriceBlock (E0.3). E1.1 completes the schema.
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
} as const;

export type OfferKey = keyof typeof siteConfig.offers;

/** "USD 5,000" — every displayed price goes through here. */
export function formatPrice(amount: number): string {
  return `${siteConfig.currency} ${amount.toLocaleString("en-US")}`;
}

/** Founding-client prices show only while places remain (PRD 6.3). */
export function foundingActive(slotsRemaining: number = siteConfig.foundingSlotsRemaining): boolean {
  return slotsRemaining > 0;
}

/** Display form of the audit price, so quoted figures cannot drift from config. */
export const auditPriceRange = `${siteConfig.pricing.currency} ${siteConfig.pricing.min.toLocaleString(
  "en-US",
)}–${siteConfig.pricing.max.toLocaleString("en-US")}`;

export const navLinks = [
  { href: "/pmo-automation-audit", label: "Audit" },
  { href: "/free-pmo-diagnostic", label: "Diagnostic" },
  { href: "/implementation", label: "Implementation" },
  { href: "/method", label: "Method" },
  { href: "/sample-outputs", label: "Outputs" },
] as const;

export const impactPhases = [
  {
    key: "assess",
    name: "Assess",
    buyer: "Find drag",
    site: "Map the reporting system",
  },
  {
    key: "architect",
    name: "Architect",
    buyer: "Design fix",
    site: "Automation opportunity + blueprint",
  },
  {
    key: "activate",
    name: "Activate",
    buyer: "Build",
    site: "AI automation into the pack cycle",
  },
  {
    key: "accelerate",
    name: "Accelerate",
    buyer: "Scale",
    site: "Expand beyond reporting",
  },
] as const;
