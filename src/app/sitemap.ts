import type { MetadataRoute } from "next";
import { routeLive, siteConfig } from "../lib/siteConfig";

// PRD 10 (E8.5): the sitemap lists exactly the live routes. Bump the date when the site changes meaningfully.
const lastModified = new Date("2026-10-17");

/** Higher for the homepage and the two offers; lowest for legal pages. */
const priority = (path: string) =>
  path === "/" ? 1 : Object.values(siteConfig.offers).some((offer) => "path" in offer && offer.path === path) ? 0.9 : path === "/privacy" ? 0.2 : 0.7;

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(routeLive)
    .filter(([, live]) => live)
    .map(([path]) => ({
      url: `${siteConfig.url}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: path === "/privacy" ? "yearly" : "monthly",
      priority: priority(path),
    }));
}
