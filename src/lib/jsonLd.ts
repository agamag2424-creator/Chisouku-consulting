import { siteConfig } from "./siteConfig";
import type { FaqItem } from "./aeoContent";
import { healthAudit, healthCheck } from "../content/offer";

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
    description: siteConfig.schemaDescription,
    areaServed: [siteConfig.markets.primary, ...siteConfig.markets.others],
    logo: `${siteUrl}/brand/favicon-mark.png`,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.schemaDescription,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

/** Service + Offer for one of the two fixed-fee offers, from config. List price only; the founding rate is a promotion. */
export function offerServiceJsonLd(offer: "healthCheck" | "healthAudit", description: string): JsonLd {
  const data = siteConfig.offers[offer];
  const url = `${siteUrl}${data.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    serviceType: data.serviceType,
    description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteUrl },
    areaServed: [siteConfig.markets.primary, ...siteConfig.markets.others],
    url,
    offers: {
      "@type": "Offer",
      url,
      price: data.listPrice,
      priceCurrency: siteConfig.currency,
      description: offer === "healthCheck" ? `${healthCheck.timing}. ${healthCheck.payment}` : `${healthAudit.cap} ${healthAudit.payment}`,
    },
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
    name: "ChisokuLabs PMO health glossary",
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


export { stringifyJsonLd } from "./safeJson";
