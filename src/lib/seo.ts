import type { Metadata } from "next";
import { markets } from "../content/markets";
import { packMethodNote } from "../content/samplePack";
import { siteConfig } from "./siteConfig";

// Per-route titles and descriptions (PRD 10, E8.4): one map, so every page's metadata comes from here. Titles stay at
// 60 characters or fewer with " | ChisokuLabs", descriptions at 155 or fewer (scripts/e2e/seo.spec.ts checks).
export const defaultTitle = "Independent Go-Live Decision Assurance | ChisokuLabs";

export const defaultDescription = `${siteConfig.tagline} for ERP and core-platform programmes in the UAE and Saudi Arabia.`;

/** The default share image: the hero headline on ink (public/og.png). Offers, method and see-it-first have their own (E8.5). */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `ChisokuLabs: ${siteConfig.tagline.toLowerCase()}`,
};

const { evidenceCheck, decisionReview } = siteConfig.offers;
const marketDescription = (market: (typeof markets)[keyof typeof markets]) =>
  `Independent go-live decision assurance for ERP and core-platform programmes in ${market.inName}. ${market.whyNow}`;

export const routeSeo = {
  "/": {
    title: "Independent Go-Live Decision Assurance",
    description:
      "Before leadership approves an ERP or core-platform go-live, we test whether every critical readiness claim has the evidence to defend that decision.",
  },
  [evidenceCheck.path]: {
    title: evidenceCheck.name,
    description: `A five-day written review of your programme's readiness evidence. Fixed fee: ${siteConfig.currency} ${evidenceCheck.listPrice.toLocaleString("en-US")}.`,
    image: "/og-evidence-check.png",
  },
  [decisionReview.path]: {
    title: decisionReview.name,
    description:
      "A ten-day independent review that gives your steering committee a defensible go-live decision: Go, Conditional Go or No-Go.",
    image: "/og-decision-review.png",
  },
  "/method": { title: "READINESS-5: how we test a go-live claim", description: packMethodNote, image: "/og-method.png" },
  "/see-it-first": {
    title: "See the work before you talk to us",
    description:
      "View or download the full sample decision pack, no form. Or request a free readiness brief on your programme, prepared from public information.",
    image: "/og-see-it-first.png",
  },
  "/pricing": {
    title: "Pricing",
    description: `The full Evidence Check fee is credited against a Go-Live Decision Review signed within ${siteConfig.feeCreditDays} days of the Evidence Check report.`,
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
      "Independent go-live decision assurance: how it differs from an SI readiness review, timing, platforms, data handling, AI use, prices and the fee credit.",
  },
  "/guides/s4hana-go-no-go-checklist": {
    title: "S/4HANA go/no-go checklist",
    description:
      "Test every critical S/4HANA readiness claim before the go/no-go: testing, data migration, integration, cutover and governance, on READINESS-5.",
  },
  "/guides/is-my-erp-ready-to-go-live": {
    title: "Is my ERP ready to go live?",
    description:
      "How to tell whether an ERP is ready to go live: five questions for every critical claim, ten warning signs, and the risks between workstreams.",
  },
  "/guides/independent-assurance-vs-si-readiness-review": {
    title: "Independent assurance vs SI readiness review",
    description:
      "What a system integrator's readiness review does well, where it falls short, and what independent go-live assurance adds to the decision.",
  },
  "/contact": {
    title: "Contact Us",
    description:
      "Email hello@chisokulabs.com or call +91 9277482755. Registered office in Prayagraj, India. We reply within 2 business days.",
  },
  "/about": {
    title: "About Us",
    description:
      "ChisokuLabs provides independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia.",
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
    description:
      "Go-live readiness terms: go/no-go decision, Conditional Go, cutover, rollback point, hypercare, SIT, UAT, data migration reconciliation and READINESS-5.",
  },
  "/readiness": {
    title: "Go-live readiness check",
    description:
      "Your programme reports Green. These 12 questions test whether the evidence agrees.",
  },
  "/readiness-report": {
    title: "Go-Live Readiness Report",
    description:
      "A scored PDF report for e-invoicing go-lives in the UAE and Saudi Arabia: about 40 questions, seven areas, red flags and a 30-day fix list. USD 149.",
  },
  "/readiness-pack": {
    title: "Go-Live Readiness Pack",
    description:
      "Editable workbooks and a guide for the last 12 weeks before an e-invoicing go-live in Saudi Arabia or the UAE: checklist, runbook, RAID and Go/No-Go. USD 249.",
  },
} as const satisfies Record<string, { title: string; description: string; image?: string }>;

export type SeoRoute = keyof typeof routeSeo;

/** Title, description, canonical, Open Graph and Twitter card for one route, from `routeSeo`. */
export function pageMetadata(path: SeoRoute): Metadata {
  const entry: { title: string; description: string; image?: string } = routeSeo[path];
  const { title, description } = entry;
  const image = { ...ogImage, url: entry.image ?? ogImage.url, alt: `${title} | ${siteConfig.name}` };
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: fullTitle, description, url, images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
