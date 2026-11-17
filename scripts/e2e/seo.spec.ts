// Metadata, JSON-LD and llms.txt. Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const listed = [
  "/",
  "/pmo-health-check",
  "/pmo-health-audit",
  "/method",
  "/see-it-first",
  "/pricing",
  "/independence-and-data",
  "/faq",
  "/glossary",
  "/contact",
  "/about",
  "/privacy",
  "/terms",
  "/refund-policy",
  "/shipping-policy",
];

const unlisted = [
  "/pmo-self-check",
  "/go-live-readiness-uae",
  "/go-live-readiness-saudi-arabia",
  "/guides/s4hana-go-no-go-checklist",
  "/guides/is-my-erp-ready-to-go-live",
  "/guides/independent-assurance-vs-si-readiness-review",
];

const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

for (const route of [...listed, ...unlisted]) {
  test(`${route}: canonical on www, one H1, PMO schema`, async ({ request, page }) => {
    const html = await (await request.get(base + route)).text();
    const title = decode(/<title>(.*?)<\/title>/.exec(html)?.[1] ?? "");
    const description = decode(/<meta name="description" content="(.*?)"/.exec(html)?.[1] ?? "");
    expect(title.length).toBeGreaterThan(0);
    expect(description.length).toBeGreaterThan(0);
    expect(html).toMatch(/<link rel="canonical" href="https:\/\/www\.chisokulabs\.com/);
    if (unlisted.includes(route)) expect(html).toMatch(/noindex/);

    await page.goto(base + route);
    await expect(page.locator("h1")).toHaveCount(1);
    const blocks = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text));
    const org = blocks.find((data) => data["@type"] === "Organization");
    expect(org.description).toBe("PMO Health Audit: an independent, fixed-price check of how your programmes are run.");
    expect(org.areaServed).toEqual(["United Kingdom", "United Arab Emirates"]);
    expect(org.legalName).toBe("ChisokuLab Private Limited");
    expect(JSON.stringify(org)).not.toMatch(/founder/i);
    if (route === "/privacy") {
      await expect(page.getByText("Digital Personal Data Protection Act, 2023")).toBeVisible();
    }
  });
}

test("llms.txt names the PMO offers and the published prices", async ({ request }) => {
  const short = await (await request.get(base + "/llms.txt")).text();
  const full = await (await request.get(base + "/llms-full.txt")).text();
  for (const text of [short, full]) {
    expect(text).toContain("PMO Health Audit");
    expect(text).toContain("PMO Health Check");
    expect(text).toContain("USD 5,000");
    expect(text).toContain("USD 2,500");
    expect(text).toContain("USD 500");
    expect(text).not.toContain("USD 12,000");
    expect(text).toContain("Legal name: ChisokuLab Private Limited");
    expect(text).not.toMatch(/Readiness Evidence Check|Go-Live Decision Review/);
  }
  expect(full).toContain("## FAQ");
  expect(full).toContain("HEALTH-5");
});

test("sitemap lists the indexed routes only; robots disallows /_ui and points at www", async ({ request }) => {
  const xml = await (await request.get(base + "/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replace("https://www.chisokulabs.com", "") || "/");
  expect(urls.sort()).toEqual([...listed].sort());
  expect(xml).not.toMatch(/readiness|guides\/|go-live-readiness/);
  const robots = await (await request.get(base + "/robots.txt")).text();
  expect(robots).toContain("Disallow: /_ui");
  expect(robots).toContain("Host: https://www.chisokulabs.com");
});

test("offers, method and see-it-first have their own 1200x630 share image", async ({ request, page }) => {
  const images: Record<string, string> = {
    "/pmo-health-check": "/og-evidence-check.png",
    "/pmo-health-audit": "/og-decision-review.png",
    "/method": "/og-method.png",
    "/see-it-first": "/og-see-it-first.png",
    "/": "/og.png",
  };
  for (const [route, image] of Object.entries(images)) {
    await page.goto(base + route);
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toBe("https://www.chisokulabs.com" + image);
    expect(await page.locator('meta[property="og:image:width"]').getAttribute("content")).toBe("1200");
    const response = await request.get(base + image);
    expect(response.status()).toBe(200);
  }
});
