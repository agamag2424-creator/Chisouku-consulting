import type { MetadataRoute } from "next";

/** Allow all crawlers; llms.txt / llms-full.txt are public discovery surfaces. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://chisokulabs.com/sitemap.xml",
    host: "https://chisokulabs.com",
  };
}
