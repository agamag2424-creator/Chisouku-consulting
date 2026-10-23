// Market pages (E7). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const pages = [
  {
    path: "/go-live-readiness-uae",
    h1: "Go-live readiness in the UAE",
    country: "AE",
    dates: ["30 October 2026", "31 March 2027 and 1 July 2027", "1 January 2027", "End of 2027"],
    sources: ["https://tax.gov.ae/", "https://tax.gov.ae/", "https://tax.gov.ae/", "https://support.sap.com/"],
    whyNow: "Fixed dates are adding go-lives to UAE programmes.",
  },
  {
    path: "/go-live-readiness-saudi-arabia",
    h1: "Go-live readiness in Saudi Arabia",
    country: "SA",
    dates: ["1 February 2027", "End of 2027"],
    sources: ["https://zatca.gov.sa/", "https://support.sap.com/"],
  },
];

for (const market of pages) {
  test(`${market.path}: dated facts with sources, offers, brief CTA, Service JSON-LD`, async ({ page }) => {
    const response = await page.goto(base + market.path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(market.h1);

    // Every fact carries a visible link to its source, and dates are written in full.
    const facts = page.getByRole("heading", { name: "Why now" }).locator("..").getByRole("listitem");
    await expect(facts).toHaveCount(market.dates.length);
    for (const [index, date] of market.dates.entries()) {
      const fact = facts.nth(index);
      await expect(fact).toContainText(date);
      const link = fact.getByRole("link").first();
      await expect(link).toBeVisible();
      expect(await link.getAttribute("href")).toMatch(new RegExp("^" + market.sources[index].replace(/[.]/g, "\\.")));
    }
    if ("whyNow" in market) await expect(page.getByText(market.whyNow)).toBeVisible();

    await expect(page.getByText("Remote by default, on site by arrangement.")).toBeVisible();
    await expect(page.getByText("USD 5,000").first()).toBeVisible();
    await expect(page.getByText("USD 12,000").first()).toBeVisible();

    // Ends with the free readiness brief CTA.
    const closing = page.locator("main > section").last();
    await expect(closing.getByRole("link", { name: "Request a free readiness brief" })).toHaveAttribute(
      "href",
      "/contact?request=brief",
    );

    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const service = ld.map((text) => JSON.parse(text)).find((data) => data["@type"] === "Service");
    expect(service?.areaServed?.identifier).toBe(market.country);
    expect(service?.offers).toHaveLength(2);
  });

  test(`${market.path}: fits 360px without horizontal scroll`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(base + market.path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
}

test("homepage deadline band links to both market pages and wraps", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base + "/");
    const band = page.getByRole("complementary", { name: "Regulatory dates" });
    await expect(band.getByRole("link", { name: "UAE e-invoicing" })).toHaveAttribute("href", "/go-live-readiness-uae");
    await expect(band.getByRole("link", { name: "Saudi Arabia" })).toHaveAttribute("href", "/go-live-readiness-saudi-arabia");
    await expect(band).toContainText("31 Mar 2027");
    await expect(band).toContainText("1 Feb 2027");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
});
