// Metadata, JSON-LD and llms.txt (E8.4). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const routes = [
  "/",
  "/readiness-evidence-check",
  "/go-live-decision-review",
  "/method",
  "/see-it-first",
  "/pricing",
  "/independence-and-data",
  "/go-live-readiness-uae",
  "/go-live-readiness-saudi-arabia",
  "/faq",
  "/glossary",
  "/guides/s4hana-go-no-go-checklist",
  "/guides/is-my-erp-ready-to-go-live",
  "/guides/independent-assurance-vs-si-readiness-review",
  "/contact",
  "/privacy",
];

for (const route of routes) {
  test(`${route}: title ≤ 60, description ≤ 155, canonical, one H1, no removed services in JSON-LD`, async ({ request, page }) => {
    const html = await (await request.get(base + route)).text();
    const title = /<title>(.*?)<\/title>/.exec(html)?.[1] ?? "";
    const description = /<meta name="description" content="(.*?)"/.exec(html)?.[1] ?? "";
    const decode = (text: string) => text.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
    expect(decode(title).length).toBeGreaterThan(0);
    expect(decode(title).length).toBeLessThanOrEqual(60);
    expect(decode(description).length).toBeGreaterThan(0);
    expect(decode(description).length).toBeLessThanOrEqual(155);
    expect(html).toMatch(/<link rel="canonical" href="https:\/\/www\.chisokulabs\.com/);

    await page.goto(base + route);
    await expect(page.locator("h1")).toHaveCount(1);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n");
    expect(ld).not.toMatch(/PMO|Diagnostic|Automation Audit|Implementation/);
    const org = (await page.locator('script[type="application/ld+json"]').allTextContents())
      .map((text) => JSON.parse(text))
      .find((data) => data["@type"] === "Organization");
    expect(org.areaServed).toEqual(["United Arab Emirates", "Saudi Arabia"]);
    expect(org.legalName).toBe("ChisokuLab Private Limited");
    expect(JSON.stringify(org)).not.toMatch(/founder/i);
    if (route === "/privacy") {
      await expect(page.getByText("intellectual property of ChisokuLab Private Limited")).toBeVisible();
    }
  });
}

test("llms.txt and llms-full.txt: new answers from config, live pages only, nothing internal", async ({ request }) => {
  const short = await (await request.get(base + "/llms.txt")).text();
  const full = await (await request.get(base + "/llms-full.txt")).text();
  for (const text of [short, full]) {
    expect(text).toContain("Readiness Evidence Check");
    expect(text).toContain("USD 12,000");
    expect(text).toContain("Legal name: ChisokuLab Private Limited");
    expect(text).not.toContain("ChisokuLabs" + " Pvt Ltd");
    expect(text).not.toContain("Chisokulab" + " Pvt Ltd");
    expect(text).not.toMatch(/PMO|Diagnostic|Automation Audit|operator|probe/i);
  }
  expect(full).toContain("## FAQ");
  expect(full).toContain("### READINESS-5");
});

test("sitemap lists exactly the live routes; robots disallows /_ui", async ({ request }) => {
  const xml = await (await request.get(base + "/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replace("https://www.chisokulabs.com", "") || "/");
  expect(urls.sort()).toEqual([...routes].sort());
  const robots = await (await request.get(base + "/robots.txt")).text();
  expect(robots).toContain("Disallow: /_ui");
});

test("offers, method and see-it-first have their own 1200x630 share image", async ({ request, page }) => {
  const images: Record<string, string> = {
    "/readiness-evidence-check": "/og-evidence-check.png",
    "/go-live-decision-review": "/og-decision-review.png",
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
