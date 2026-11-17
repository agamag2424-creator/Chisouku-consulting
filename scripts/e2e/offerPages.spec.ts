// Offer pages. Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const pages = [
  {
    path: "/pmo-health-check",
    h1: "PMO Health Check",
    list: "USD 500",
    founding: null,
    steps: ["Documents arrive; the three interviews are booked", "Evidence review and the three short interviews", "Scorecard, top findings and the 30-day fix plan written", "45-minute readout"],
    sequenceTitle: "Five working days after documents arrive",
    navLabel: "Health Check",
    content: "health_check",
  },
  {
    path: "/pmo-health-audit",
    h1: "PMO Health Audit",
    list: "USD 5,000",
    founding: "USD 2,500",
    steps: ["Kickoff and document request", "Evidence review across the portfolio", "Interviews", "Scorecard and fix plan written", "Sponsor readout"],
    sequenceTitle: "Capped at 5 working days",
    navLabel: "Audit",
    content: "health_audit",
  },
];

for (const offer of pages) {
  test.describe(offer.path, () => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 360, height: 800 },
    ]) {
      test(`renders at ${viewport.width}px with published prices and no horizontal scroll`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const response = await page.goto(base + offer.path);
        expect(response?.status()).toBe(200);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(offer.h1);
        await expect(page.getByText(offer.list).first()).toBeVisible();
        if (offer.founding) await expect(page.getByText(offer.founding).first()).toBeVisible();
        const sequence = page.locator("section", { has: page.getByRole("heading", { name: offer.sequenceTitle, exact: true }) });
        for (const step of offer.steps) await expect(sequence.getByText(step, { exact: true })).toBeVisible();
        await expect(page.getByText("credited in full against the PMO Health Audit if the Audit is signed within 60 days", { exact: false }).first()).toBeVisible();
        expect(await page.locator("main").innerText()).not.toMatch(/refund/i);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }

    test("hero: Book a 20-minute call, then the PMO self-check", async ({ page }) => {
      await page.goto(base + offer.path);
      const hero = page.locator("main > section").first();
      const book = hero.getByRole("link", { name: "Book a 20-minute call" });
      await expect(book).toHaveAttribute(
        "href",
        `https://calendly.com/chisokulabs/discovery-call?utm_source=chisokulabs&utm_medium=website&utm_campaign=discovery_call&utm_content=${offer.content}`,
      );
      await expect(book).toHaveAttribute("target", "_blank");
      await expect(hero.getByText("Take the PMO self-check (5 minutes)")).toBeVisible();
    });

    test("is linked from the nav and has Service JSON-LD at the list price", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(base + "/");
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: offer.navLabel, exact: true }).click();
      await expect(page).toHaveURL(base + offer.path);
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      const service = ld.map((json) => JSON.parse(json)).find((data) => data["@type"] === "Service");
      expect(service.name).toBe(offer.h1);
      expect(service.offers.price).toBe(offer.path.endsWith("check") ? 500 : 5000);
      expect(service.areaServed).toEqual(["United Kingdom", "United Arab Emirates"]);
    });
  });
}
