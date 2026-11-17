// Method page (September port PRD, Story 6.1). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const url = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "") + "/method";

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 360, height: 800 },
]) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("shows the PMO Health Scorecard, the five checks and no old method", async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("The PMO Health Scorecard: ten dimensions, scored on evidence.");
      for (const level of ["Ad hoc", "Emerging", "Defined", "Measured", "Improving"]) {
        await expect(page.getByText(level, { exact: true }).first()).toBeVisible();
      }
      for (const name of ["Status", "Owner", "Evidence", "Date", "Action"]) {
        await expect(page.getByText(name, { exact: true }).first()).toBeVisible();
      }
      await expect(page.getByRole("heading", { level: 2, name: "Where the three problems show up" })).toBeVisible();
      await expect(page.getByRole("img", { name: /ten dimensions around one overall band/ })).toBeVisible();
      const body = await page.locator("main").innerText();
      for (const old of ["Assess", "Architect", "Activate", "Accelerate", "AI Impact Model", "READINESS-5", "HEALTH-5", "Needs attention"]) {
        expect(body).not.toContain(old);
      }
      await expect(page.getByRole("heading", { level: 2, name: "How we use AI, safely" })).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test("method AI section equals the FAQ answer verbatim", async ({ page }) => {
  const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
  await page.goto(base + "/faq");
  await page.locator("#ai-on-our-data > summary").click();
  const faq = (await page.locator("#ai-on-our-data p").innerText()).replace(/\s+/g, " ").trim();

  await page.goto(url);
  const method = (await page.locator("#how-we-use-ai p").innerText()).replace(/\s+/g, " ").trim();
  expect(method).toBe(faq);
  expect(method.length).toBeGreaterThan(0);
});
