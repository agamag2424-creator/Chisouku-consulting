import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://chisokulab.com/",
      lastModified: new Date(),
    },
    {
      url: "https://chisokulab.com/ai-governance",
      lastModified: new Date(),
    },
    {
      url: "https://chisokulab.com/ai-solutions",
      lastModified: new Date(),
    },
    {
      url: "https://chisokulab.com/contact",
      lastModified: new Date(),
    },
  ];
}
