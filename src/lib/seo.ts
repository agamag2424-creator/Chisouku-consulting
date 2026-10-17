import type { Metadata } from "next";
import { markets } from "../content/markets";
import { packMethodNote } from "../content/samplePack";
import { siteConfig } from "./siteConfig";

// Per-route titles and descriptions (PRD 10, E8.4): one map, so every page's metadata comes from here. Titles stay at
// 60 characters or fewer with " | ChisokuLabs", descriptions at 155 or fewer (scripts/siteConfig.test.mjs checks).
export const defaultTitle = "Independent Go-Live Decision Assurance | ChisokuLabs";

export const defaultDescription = `${siteConfig.tagline} for ERP and core-platform programmes in the UAE and Saudi Arabia.`;

/** The share image: the hero headline on ink (public/og.png). */
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
  },
  [decisionReview.path]: {
    title: decisionReview.name,
    description:
      "A ten-day independent review that gives your steering committee a defensible go-live decision: Go, Conditional Go or No-Go.",
  },
  "/method": { title: "READINESS-5: how we test a go-live claim", description: packMethodNote },
  "/see-it-first": {
    title: "See the work before you talk to us",
    description:
      "View or download the full sample decision pack, no form. Or request a free readiness brief on your programme, prepared from public information.",
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
  "/glossary": {
    title: "Glossary",
    description:
      "Go-live readiness terms: go/no-go decision, Conditional Go, cutover, rollback point, hypercare, SIT, UAT, data migration reconciliation and READINESS-5.",
  },
} as const satisfies Record<string, { title: string; description: string }>;

export type SeoRoute = keyof typeof routeSeo;

/** Title, description, canonical, Open Graph and Twitter card for one route, from `routeSeo`. */
export function pageMetadata(path: SeoRoute): Metadata {
  const { title, description } = routeSeo[path];
  const fullTitle = `${title} | ${siteConfig.name}`;
  const url = path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", title: fullTitle, description, url, images: [ogImage] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage.url] },
  };
}
