// Unlisted market pages. Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const pages = [
  {
    path: "/go-live-readiness-uae",
    h1: "PMO health in the UAE",
    whyNow: "The UK is first. The UAE is by arrangement, remote by default.",
  },
  {
    path: "/go-live-readiness-saudi-arabia",
    h1: "PMO health in Saudi Arabia",
    whyNow: "The UK is first. Work in Saudi Arabia is remote, and by arrangement.",
  },
];

for (const market of pages) {
  test(`${market.path}: PMO copy, noindex, no go-live offer, no Service schema`, async ({ page }) => {
    const response = await page.goto(base + market.path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(market.h1);
    await expect(page.getByText(market.whyNow)).toBeVisible();
    await expect(page.getByText("Remote by default, on site by arrangement.")).toBeVisible();
    await expect(page.getByText("USD 500").first()).toBeVisible();
    await expect(page.getByText("USD 5,000").first()).toBeVisible();
    await expect(page.getByText("USD 12,000")).toHaveCount(0);
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/go-live|e-invoicing|READINESS-5|ZATCA|Fatoora/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const closing = page.locator("main > section").last();
    await expect(closing.getByRole("link", { name: "Request a free briefing" })).toHaveAttribute(
      "href",
      "/contact?request=brief",
    );
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text));
    expect(ld.some((data) => data["@type"] === "Service")).toBe(false);
  });

  test(`${market.path}: fits 360px without horizontal scroll`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(base + market.path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
}

test("homepage does not link the market pages or an e-invoicing band", async ({ page }) => {
  await page.goto(base + "/");
  await expect(page.getByRole("complementary", { name: "Regulatory dates" })).toHaveCount(0);
  await expect(page.locator('a[href="/go-live-readiness-uae"]')).toHaveCount(0);
  await expect(page.locator('a[href="/go-live-readiness-saudi-arabia"]')).toHaveCount(0);
});
