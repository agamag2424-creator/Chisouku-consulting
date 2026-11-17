// Offer pages. Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const pages = [
  {
    path: "/pmo-health-check",
    h1: "PMO Health Check",
    list: "USD 500",
    founding: null,
    steps: ["Scoping call and document request, plus the sponsor interview", "Evidence review and the two team interviews (45 minutes each, remote)", "Written findings and readout"],
    navLabel: "Health Check",
    content: "health_check",
  },
  {
    path: "/pmo-health-audit",
    h1: "PMO Health Audit",
    list: "USD 5,000",
    founding: "USD 2,500",
    steps: ["Kickoff and evidence request", "Evidence review", "Targeted interviews", "Draft findings", "Sponsor readout"],
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
        const sequence = page.locator("section", { has: page.getByRole("heading", { name: /^(How it runs|Timeline)$/ }) });
        for (const step of offer.steps) await expect(sequence.getByText(step, { exact: true })).toBeVisible();
        await expect(page.getByText("The credit is not a refund.")).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }

    test("books a 20-minute call beside Discuss your programme", async ({ page }) => {
      await page.goto(base + offer.path);
      const hero = page.locator("main > section").first();
      const book = hero.getByRole("link", { name: "Book a 20-minute call" });
      await expect(book).toHaveAttribute(
        "href",
        `https://calendly.com/chisokulabs/discovery-call?utm_source=chisokulabs&utm_medium=website&utm_campaign=discovery_call&utm_content=${offer.content}`,
      );
      await expect(book).toHaveAttribute("target", "_blank");
      await expect(hero.getByRole("link", { name: "Discuss your programme" })).toHaveAttribute(
        "href",
        "/contact?request=review",
      );
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
