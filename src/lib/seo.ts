import type { Metadata } from "next";
import { markets } from "../content/markets";
import { packMethodNote } from "../content/samplePack";
import { siteConfig } from "./siteConfig";

// Per-route titles and descriptions. Home title follows the approved offer wording.
export const defaultTitle =
  "PMO Health Audit: an independent, fixed-price check of how your programmes are run | ChisokuLabs";

export const defaultDescription = siteConfig.heroSub;

/** The default share image: the hero headline on ink (public/og.png). Offers, method and see-it-first have their own. */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.schemaDescription}`,
};

const { healthCheck, healthAudit } = siteConfig.offers;
const marketDescription = (market: (typeof markets)[keyof typeof markets]) =>
  `A fixed-price, independent check of how programmes in ${market.inName} are governed, reported and run. ${market.whyNow}`;

export const routeSeo = {
  "/": {
    title: "PMO Health Audit: an independent, fixed-price check of how your programmes are run",
    description: siteConfig.heroSub,
  },
  [healthCheck.path]: {
    title: healthCheck.name,
    description:
      "A five-day, USD 500 check of one programme: status pack, RAID log, governance calendar and plan, with a 30-day fix plan. The fee is credited against the PMO Health Audit if signed within 60 days.",
    image: "/og-evidence-check.png",
  },
  [healthAudit.path]: {
    title: healthAudit.name,
    description:
      "A 5 working day independent audit of how a programme or portfolio is governed, reported and run. Founding-client rate USD 2,500.",
    image: "/og-decision-review.png",
  },
  "/method": {
    title: "HEALTH-5: how we test a programme status claim",
    description: packMethodNote,
    image: "/og-method.png",
  },
  "/see-it-first": {
    title: "See the work before you talk to us",
    description:
      "Request a free one-page briefing on your programme, prepared from public information. We reply within two business days.",
    image: "/og-see-it-first.png",
  },
  "/pricing": {
    title: "Pricing",
    description:
      "PMO Health Check, USD 500, credited against the PMO Health Audit (founding-client rate USD 2,500) if signed within 60 days.",
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
      "PMO Health Audit and Health Check: how the work differs from hiring a Head of PMO, timing, data handling, AI use, prices and the fee credit.",
  },
  "/guides/s4hana-go-no-go-checklist": {
    title: "How to test a programme status claim",
    description:
      "HEALTH-5 tests whether a status claim is current, owned, evidenced, dated and actioned. A claim that fails any element is not treated as true.",
  },
  "/guides/is-my-erp-ready-to-go-live": {
    title: "Is the status being reported supported by evidence?",
    description:
      "A Green status is supported only when the claims behind it pass HEALTH-5 and the reports do not contradict each other.",
  },
  "/guides/independent-assurance-vs-si-readiness-review": {
    title: "An independent check, or a PMO who joins the team",
    description:
      "A Head of PMO is a hire. A day-rate PMO joins the team. An independent check stays outside delivery and leaves a score and a 30-day fix plan.",
  },
  "/contact": {
    title: "Contact Us",
    description:
      "Email hello@chisokulabs.com or call +91 9277482755. Registered office in Prayagraj, India. We reply within 2 business days.",
  },
  "/about": {
    title: "About Us",
    description:
      "ChisokuLabs provides a fixed-price, independent check of how programmes and portfolios are governed, reported and run. The UK is first; the UAE is by arrangement.",
  },
  "/terms": {
    title: "Terms of Service",
    description:
      "Terms that apply when you use chisokulabs.com or buy from ChisokuLabs: products, prices, licences, liability, governing law and contact.",
  },
  "/refund-policy": {
    title: "Refund and Cancellation Policy",
    description:
      "When you can cancel, when you get a refund for the Go-Live Readiness Report, Pack or consulting, and how to ask hello@chisokulabs.com.",
  },
  "/shipping-policy": {
    title: "Shipping and Delivery Policy",
    description:
      "We do not ship physical goods. Digital products and consulting are delivered electronically; timelines, re-sends and contact details.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "How ChisokuLabs handles personal data under India's DPDP Act: what we collect, payments via Razorpay, retention, rights and grievance officer.",
  },
  "/glossary": {
    title: "Glossary",
    description: "PMO health terms: status evidence, RAID log, governance, HEALTH-5 and the Project Health Scorecard.",
  },
  "/pmo-self-check": {
    // TODO: replace this description when the researched question bank is added.
    title: "PMO self-check",
    description: "The questions for this check are not published yet.",
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
