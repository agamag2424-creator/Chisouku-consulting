// Offer pages (E2). Not part of the app build (tsconfig excludes scripts/e2e).
//
// Run against a local production build (see hero.spec.ts):
//   HERO_URL=http://localhost:3100/ npx -y @playwright/test@1.56.1 test scripts/e2e
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const pages = [
  {
    path: "/readiness-evidence-check",
    h1: "Readiness Evidence Check",
    list: "USD 5,000",
    founding: "USD 2,500",
    steps: ["Scoping call and document request", "Evidence review", "Written findings and readout"],
    navLabel: "Evidence Check",
  },
  {
    path: "/go-live-decision-review",
    h1: "Go-Live Decision Review",
    list: "USD 12,000",
    founding: "USD 6,000",
    steps: [
      "Kickoff and evidence request",
      "Evidence review and contradiction testing",
      "Targeted interviews",
      "Draft findings",
      "Sponsor readout",
    ],
    navLabel: "Decision Review",
  },
];

for (const offer of pages) {
  test.describe(offer.path, () => {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 360, height: 800 },
    ]) {
      test(`renders at ${viewport.width}px with config prices and no horizontal scroll`, async ({ page }) => {
        await page.setViewportSize(viewport);
        const response = await page.goto(base + offer.path);
        expect(response?.status()).toBe(200);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(offer.h1);
        await expect(page.getByText(offer.list).first()).toBeVisible();
        await expect(page.getByText(offer.founding).first()).toBeVisible();
        const sequence = page.locator("section", { has: page.getByRole("heading", { name: /^(How it runs|Timeline)$/ }) });
        for (const step of offer.steps) await expect(sequence.getByText(step, { exact: true })).toBeVisible();
        await expect(page.getByText(/The full Evidence Check fee is credited/)).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }

    test("is linked from the nav and has Service JSON-LD", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(base + "/");
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: offer.navLabel, exact: true }).click();
      await expect(page).toHaveURL(base + offer.path);
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(ld.some((json) => json.includes('"@type":"Service"') && json.includes(offer.h1))).toBe(true);
    });
  });
}
