import type { Metadata } from "next";
import { markets } from "../content/markets";
import { formatPrice, siteConfig } from "./siteConfig";

// Per-route titles and descriptions. Home title follows the approved offer wording.
export const defaultTitle =
  "PMO Health Check: RAID logs, late Red status and forums that cannot decide | ChisokuLabs";

export const defaultDescription = siteConfig.heroSub;

/** The default share image: the hero headline on paper (public/og.png). Offers, the self-check, method and see-it-first have their own. */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.schemaDescription}`,
};

const { healthCheck, healthAudit } = siteConfig.offers;
const checkPrice = formatPrice(healthCheck.listPrice);
const auditList = formatPrice(healthAudit.listPrice);
const auditFounding = formatPrice(healthAudit.foundingPrice ?? healthAudit.listPrice);
const marketDescription = (market: (typeof markets)[keyof typeof markets]) =>
  `For organisations in ${market.inName} running a PMO: a free self-check, a ${checkPrice} PMO Health Check of one programme, and a PMO Health Audit of the whole portfolio. ${market.delivery}`;

export const routeSeo = {
  "/": {
    title: "PMO Health Check: RAID logs, late Red status and forums that cannot decide",
    description: siteConfig.heroSub,
  },
  [healthCheck.path]: {
    title: healthCheck.name,
    description:
      `A fixed-price check of one programme, ${checkPrice}. The PMO Health Scorecard filled in with evidence, the top findings, a 30-day fix plan and a 45-minute readout, five working days after documents arrive.`,
    image: "/og-health-check.png",
  },
  [healthAudit.path]: {
    title: healthAudit.name,
    description:
      `The whole portfolio, scored with evidence on the ten PMO Health Scorecard dimensions. ${auditList} list, ${auditFounding} founding, capped at 5 working days. Most clients start with the ${checkPrice} Health Check.`,
    image: "/og-health-audit.png",
  },
  "/method": {
    title: "Method: the PMO Health Scorecard, ten dimensions scored on evidence",
    description:
      "Ten dimensions on five levels, from governance and decision rights to PMO value perception. Where the three problems show up, how evidence is checked, and the 30-day fix plan.",
    image: "/og-method.png",
  },
  "/see-it-first": {
    title: "See it first: a sample PMO Health Scorecard and 30-day fix plan",
    description:
      "A sample PMO Health Scorecard and a sample 30-day fix plan for a fictional organisation: what a PMO Health Check gives you.",
    image: "/og-see-it-first.png",
  },
  "/pricing": {
    title: "Pricing",
    description:
      `PMO Health Check ${checkPrice}, paid in full on signature and credited against the Audit if signed within 60 days. PMO Health Audit ${auditList} list, ${auditFounding} founding. The PMO self-check is free.`,
  },
  "/independence-and-data": {
    title: "Independence and data handling",
    description:
      "No implementation fees, no software resale, no system integrator partnerships or referral fees. How client evidence is handled, and how AI is used.",
  },
  [markets.uae.path]: { title: markets.uae.name, description: marketDescription(markets.uae) },
  [markets.saudiArabia.path]: { title: markets.saudiArabia.name, description: marketDescription(markets.saudiArabia) },
  "/faq": {
    title: "FAQ",
    description:
      "PMO Health Check and Audit: price, the fee credit, timing, the documents we need, confidentiality, and whether this is an accredited assessment.",
  },
  "/contact": {
    title: "Contact Us",
    description:
      "Email hello@chisokulabs.com or call +91 9277482755. Registered office in Prayagraj, India. We reply within 2 business days.",
  },
  "/about": {
    title: "About Us",
    description:
      "Fixed-price PMO Health Checks and Audits for UK organisations running a PMO, and in the UAE and Saudi Arabia. 11+ years in programme delivery.",
  },
  "/terms": {
    title: "Terms of Service",
    description:
      "Terms that apply when you use chisokulabs.com or buy from ChisokuLabs: services, prices, payment, liability, governing law and contact.",
  },
  "/refund-policy": {
    title: "Refund and Cancellation Policy",
    description:
      "What happens if you cancel the PMO Health Check or the PMO Health Audit, and how to ask hello@chisokulabs.com.",
  },
  "/shipping-policy": {
    title: "Shipping and Delivery Policy",
    description:
      "We do not ship physical goods. How and when the PMO Health Check and the PMO Health Audit are delivered, and contact details.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "How ChisokuLabs handles personal data under India's DPDP Act: what we collect, payments via Razorpay, retention, rights and grievance officer.",
  },
  "/glossary": {
    title: "Glossary",
    description: "PMO health terms: the PMO Health Scorecard, its five levels, RAID log, status evidence, decision forum and the 30-day fix plan.",
  },
  "/pmo-self-check": {
    title: "PMO self-check: score your PMO on ten dimensions in five minutes",
    description:
      "A free, five-minute PMO self-check on the ten dimensions of the PMO Health Scorecard. Computed in your browser; nothing is sent.",
    image: "/og-self-check.png",
  },
  "/pmo-self-check/methodology": {
    title: "PMO self-check methodology note",
    description:
      "How the PMO self-check was built and scored, the public material it is informed by, and why it is not an accredited assessment.",
  },
} as const satisfies Record<string, { title: string; description: string; image?: string }>;

export type SeoRoute = keyof typeof routeSeo;

/** Title, description, canonical, Open Graph and Twitter card for one route, from `routeSeo`. */
export function pageMetadata(path: SeoRoute): Metadata {
  const entry: { title: string; description: string; image?: string } = routeSeo[path];
  const { title, description } = entry;
  const image = { ...ogImage, url: entry.image ?? ogImage.url, alt: `${title} | ${siteConfig.name}` };
  const fullTitle = path === "/" ? defaultTitle : `${title} | ${siteConfig.name}`;
  const url = path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: fullTitle, description, url, images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
