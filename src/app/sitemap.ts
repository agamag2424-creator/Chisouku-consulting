import type { MetadataRoute } from "next";
import { getPublishedCaseStudies } from "@/lib/caseStudies";

const base = "https://chisokulabs.com";

const paths = [
  "/",
  "/case-studies",
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes = paths.map((path) => ({
    url: `${base}${path === "/" ? "/" : path}`,
    lastModified,
  }));

  const caseStudies = await getPublishedCaseStudies();
  const publishedCaseStudyRoutes = caseStudies.map((study) => ({
    url: `${base}/case-studies/${study.slug}`,
    lastModified: new Date(study.date || lastModified),
  }));

  return [...staticRoutes, ...publishedCaseStudyRoutes];
}
