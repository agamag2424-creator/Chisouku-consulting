import { siteConfig } from "./siteConfig";

// Site-wide metadata defaults (PRD 9.1 wording). E8.4 extends this module with the full SEO set.
export const defaultTitle = "Independent Go-Live Decision Assurance | ChisokuLabs";

export const defaultDescription = `${siteConfig.tagline} for ERP and core-platform programmes in the UAE and Saudi Arabia.`;

/** The share image: the hero headline on ink (public/og.png). */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `ChisokuLabs: ${siteConfig.tagline.toLowerCase()}`,
};
