import type { MetadataRoute } from "next";

const base = "https://chisokulabs.com";

const paths = [
  "/",
  "/pmo-automation-audit",
  "/free-pmo-diagnostic",
  "/method",
  "/implementation",
  "/founder-track-record",
  "/sample-outputs",
  "/faq",
  "/glossary",
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
