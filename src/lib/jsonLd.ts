import { siteConfig } from "./siteConfig";
import type { FaqItem } from "./aeoContent";
import type { Market } from "../content/markets";

const siteUrl = siteConfig.url;

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl,
    email: siteConfig.email,
    description: `${siteConfig.tagline}. ${siteConfig.positioning}`,
    areaServed: [siteConfig.markets.primary, siteConfig.markets.secondary],
    logo: `${siteUrl}/brand/favicon-mark.png`,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: `${siteConfig.tagline}. ${siteConfig.positioning}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

/** Service + Offer for one of the two fixed-fee offers, from config (E2). List price only; the founding rate is a promotion. */
export function offerServiceJsonLd(offer: "evidenceCheck" | "decisionReview", description: string): JsonLd {
  const data = siteConfig.offers[offer];
  const url = `${siteUrl}${data.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    serviceType: "Go-live readiness assurance",
    description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteUrl },
    areaServed: [siteConfig.markets.primary, siteConfig.markets.secondary],
    url,
    offers: {
      "@type": "Offer",
      url,
      price: data.listPrice,
      priceCurrency: siteConfig.currency,
      description: `${data.days} business days`,
    },
  };
}

/** Service for a market page (E7): the country served, and both fixed-fee offers at list price from config. */
export function marketServiceJsonLd(market: Market, description: string): JsonLd {
  const url = `${siteUrl}${market.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: market.name,
    serviceType: "Go-live readiness assurance",
    description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteUrl },
    areaServed: { "@type": "Country", name: market.country.name, identifier: market.country.code },
    url,
    offers: (["evidenceCheck", "decisionReview"] as const).map((key) => {
      const offer = siteConfig.offers[key];
      return {
        "@type": "Offer",
        name: offer.name,
        url: `${siteUrl}${offer.path}`,
        price: offer.listPrice,
        priceCurrency: siteConfig.currency,
        description: `${offer.days} business days`,
      };
    }),
  };
}

export function faqPageJsonLd(items: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${siteUrl}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function definedTermSetJsonLd(
  terms: { id: string; term: string; definition: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "ChisokuLabs go-live readiness glossary",
    url: `${siteUrl}/glossary`,
    hasDefinedTerm: terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.term,
      description: term.definition,
      url: `${siteUrl}/glossary#${term.id}`,
      inDefinedTermSet: `${siteUrl}/glossary`,
    })),
  };
}

/** HowTo for a checklist guide (E8.3): one step per checklist domain, one direction per item. */
export function howToJsonLd(guide: {
  name: string;
  description: string;
  path: string;
  steps: readonly { name: string; items: readonly string[] }[];
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.name,
    description: guide.description,
    url: `${siteUrl}${guide.path}`,
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      url: `${siteUrl}${guide.path}#checklist`,
      itemListElement: step.items.map((item) => ({ "@type": "HowToDirection", text: item })),
    })),
  };
}

export { stringifyJsonLd } from "./safeJson";
