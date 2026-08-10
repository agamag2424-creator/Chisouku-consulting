import { auditPriceRange, siteConfig } from "./siteConfig";
import type { FaqItem } from "./aeoContent";

const siteUrl = siteConfig.url;

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: "ChisokuLabs Pvt Ltd",
    url: siteUrl,
    email: siteConfig.email,
    description: `${siteConfig.tagline}. ${siteConfig.subline}.`,
    areaServed: [siteConfig.markets.primary, siteConfig.markets.secondary],
    sameAs: [siteConfig.linkedIn],
    logo: `${siteUrl}/brand/favicon-mark.png`,
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: `${siteConfig.tagline}. ${siteConfig.subline}.`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
  };
}

export function auditServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PMO Automation Audit",
    serviceType: "PMO Automation Audit",
    description:
      "AI automation for delivery systems, starting with the PMO reporting layer. Map reporting drag, score AI automation fit, leave with a blueprint.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    areaServed: [siteConfig.markets.primary, siteConfig.markets.secondary],
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/pmo-automation-audit`,
      priceCurrency: siteConfig.pricing.currency,
      description: `Typical range ${auditPriceRange}; timeline ${siteConfig.pricing.timeline}.`,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: siteConfig.pricing.min,
        maxPrice: siteConfig.pricing.max,
        priceCurrency: siteConfig.pricing.currency,
      },
    },
    url: `${siteUrl}/pmo-automation-audit`,
  };
}

export function diagnosticServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free PMO Diagnostic",
    serviceType: "Free PMO Diagnostic",
    description:
      "Five-minute baseline of reporting maturity, operating drag, and AI automation fit.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    areaServed: [siteConfig.markets.primary, siteConfig.markets.secondary],
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: siteConfig.pricing.currency,
      url: siteConfig.diagnosticUrl,
    },
    url: `${siteUrl}/free-pmo-diagnostic`,
  };
}

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Agam Agrawwal",
    jobTitle: "Founder",
    url: `${siteUrl}/founder-track-record`,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    sameAs: [siteConfig.linkedIn],
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
        text: item.detail ? `${item.answer} ${item.detail}` : item.answer,
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

export function implementationServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PMO Reporting Implementation",
    serviceType: "AI automation implementation for PMO reporting",
    description:
      "Optional build after the PMO Automation Audit — AI automation into the pack cycle. Scope and commercial terms confirmed after the blueprint.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    areaServed: [siteConfig.markets.primary, siteConfig.markets.secondary],
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/implementation`,
      description: "Quoted after audit blueprint and fit conversation — not a fixed list price.",
    },
    url: `${siteUrl}/implementation`,
  };
}

export function definedTermSetJsonLd(
  terms: { id: string; term: string; definition: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "ChisokuLabs PMO reporting glossary",
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

export function stringifyJsonLd(data: JsonLd): string {
  return JSON.stringify(data);
}
