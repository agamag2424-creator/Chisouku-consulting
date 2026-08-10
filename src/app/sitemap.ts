import type { MetadataRoute } from "next";

const base = "https://chisokulabs.com";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /** Stable ISO date — bump when the page meaningfully changes */
  lastModified: string;
};

const entries: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1, lastModified: "2026-08-10" },
  {
    path: "/pmo-automation-audit",
    changeFrequency: "weekly",
    priority: 0.95,
    lastModified: "2026-08-10",
  },
  {
    path: "/free-pmo-diagnostic",
    changeFrequency: "weekly",
    priority: 0.9,
    lastModified: "2026-08-10",
  },
  {
    path: "/pmo-reporting-automation",
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: "2026-08-10",
  },
  {
    path: "/diagnostic-vs-audit",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
  {
    path: "/pmo-automation-singapore",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
  {
    path: "/pmo-automation-gcc",
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: "2026-08-10",
  },
  { path: "/method", changeFrequency: "monthly", priority: 0.75, lastModified: "2026-08-10" },
  {
    path: "/implementation",
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: "2026-08-10",
  },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-10" },
  { path: "/glossary", changeFrequency: "monthly", priority: 0.65, lastModified: "2026-08-10" },
  {
    path: "/sample-outputs",
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: "2026-08-10",
  },
  {
    path: "/founder-track-record",
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: "2026-08-10",
  },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-10" },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2, lastModified: "2026-08-05" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: `${base}${entry.path === "/" ? "" : entry.path}`,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
