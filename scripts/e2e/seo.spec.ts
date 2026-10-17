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
    expect(JSON.stringify(org)).not.toMatch(/founder/i);
  });
}

test("llms.txt and llms-full.txt: new answers from config, live pages only, nothing internal", async ({ request }) => {
  const short = await (await request.get(base + "/llms.txt")).text();
  const full = await (await request.get(base + "/llms-full.txt")).text();
  for (const text of [short, full]) {
    expect(text).toContain("Readiness Evidence Check");
    expect(text).toContain("USD 12,000");
    expect(text).not.toMatch(/PMO|Diagnostic|Automation Audit|operator|probe/i);
    expect(text).not.toContain("/guides/");
  }
  expect(full).toContain("## FAQ");
  expect(full).toContain("### READINESS-5");
});
