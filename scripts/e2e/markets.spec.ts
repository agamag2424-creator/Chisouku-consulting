// UAE and Saudi Arabia pages (September port PRD, Story 6.1): new addresses, the same ladder, indexed.
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const pages = [
  { path: "/pmo-uae", old: "/go-live-readiness-uae", h1: "PMO Health Check in the UAE" },
  { path: "/pmo-saudi-arabia", old: "/go-live-readiness-saudi-arabia", h1: "PMO Health Check in Saudi Arabia" },
];

for (const market of pages) {
  test(`${market.path}: the ladder and the three problems, indexed, prices in GBP`, async ({ page, request }) => {
    const response = await page.goto(base + market.path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(market.h1);
    await expect(page.locator("[data-ladder-step]")).toHaveCount(3);
    await expect(page.getByText("£395").first()).toBeVisible();
    await expect(page.getByText("£3,950").first()).toBeVisible();
    await expect(page.getByText("RAID logs nobody acts on").first()).toBeVisible();
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/go-live|readiness|e-invoicing|ZATCA|Fatoora|briefing/i);
    const html = await (await request.get(base + market.path)).text();
    expect(html).not.toMatch(/noindex/);
  });

  test(`${market.old} 301s to ${market.path}`, async ({ request }) => {
    const response = await request.get(base + market.old, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers()["location"]).toBe(market.path);
  });

  test(`${market.path}: fits 360px without horizontal scroll`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(base + market.path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
}

test("the three go-live guides are retired with 301s to the homepage", async ({ request }) => {
  for (const guide of ["/guides/s4hana-go-no-go-checklist", "/guides/is-my-erp-ready-to-go-live", "/guides/independent-assurance-vs-si-readiness-review"]) {
    const response = await request.get(base + guide, { maxRedirects: 0 });
    expect(response.status(), guide).toBe(301);
    expect(response.headers()["location"]).toBe("/");
  }
});

test("/about links the market pages", async ({ page }) => {
  await page.goto(base + "/about");
  await expect(page.locator('main a[href="/pmo-uae"]')).toHaveCount(1);
  await expect(page.locator('main a[href="/pmo-saudi-arabia"]')).toHaveCount(1);
});
