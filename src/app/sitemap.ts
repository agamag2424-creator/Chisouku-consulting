import type { MetadataRoute } from "next";

const base = "https://chisokulabs.com";

const paths = [
  "/",
  "/ai-governance",
  "/ai-solutions",
  "/ai-governance-course",
  "/contact",
  "/insights",
  "/privacy",
  "/aeva",
  "/aeva/framework",
  "/aeva/case-studies",
  "/aeva/90-day-plan",
  "/aeva/book",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${base}${path === "/" ? "/" : path}`,
    lastModified,
  }));
}
