import type { MetadataRoute } from "next";

/** Allow all crawlers; llms.txt / llms-full.txt are public discovery surfaces. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/_ui",
      },
    ],
    sitemap: "https://www.chisokulabs.com/sitemap.xml",
    host: "https://www.chisokulabs.com",
  };
}
