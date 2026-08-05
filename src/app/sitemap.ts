import type { MetadataRoute } from "next";

const base = "https://chisokulabs.com";

const paths = [
  "/",
  "/pmo-automation-audit",
  "/free-pmo-diagnostic",
  "/founder-track-record",
  "/sample-outputs",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified,
  }));
}
