// See it first (PRD change 8): a sample scorecard and a sample 30-day fix plan for a fictional organisation.
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 360, height: 800 },
]) {
  test(`see-it-first at ${viewport.width}px: sample scorecard and fix plan, both labelled fictional`, async ({ page }) => {
    await page.setViewportSize(viewport);
    expect((await page.goto(base + "/see-it-first"))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("What a PMO Health Check gives you");
    await expect(page.getByRole("heading", { level: 2, name: "Sample PMO Health Scorecard" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Sample 30-day fix plan" })).toBeVisible();
    await expect(page.getByText("Sample. Fictional organisation.")).toHaveCount(2);
    await expect(page.locator('[data-sample="scorecard"] tbody tr')).toHaveCount(10);
    await expect(page.locator('[data-sample="fix-plan"] li')).toHaveCount(5);
    await expect(page.getByText("Harbour Lane Services (fictional)").first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("homepage sample scorecard links to /see-it-first", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/");
  await expect(page.getByText("Sample. Fictional organisation.").first()).toBeVisible();
  await page.getByRole("link", { name: "See the full sample scorecard and 30-day fix plan" }).click();
  await expect(page).toHaveURL(base + "/see-it-first");
});
