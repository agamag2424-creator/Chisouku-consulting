import type { MetadataRoute } from "next";
import { isRouteListed, routeLive, siteConfig } from "../lib/siteConfig";

// Listed routes only. Unlisted pages stay live and noindexed, and are not submitted here.
const lastModified = new Date("2026-11-17");

const legalPaths = new Set([
  "/privacy",
  "/terms",
  "/refund-policy",
  "/shipping-policy",
  "/payment-terms",
  "/contact",
  "/about",
]);

/** Higher for the homepage and the two offers; lowest for legal pages. */
const priority = (path: string) =>
  path === "/"
    ? 1
    : Object.values(siteConfig.offers).some((offer) => "path" in offer && offer.path === path)
      ? 0.9
      : legalPaths.has(path)
        ? 0.2
        : 0.7;

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(routeLive)
    .filter(([path, live]) => live && isRouteListed(path))
    .map(([path]) => ({
      url: `${siteConfig.url}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: legalPaths.has(path) ? "yearly" : "monthly",
      priority: priority(path),
    }));
}
