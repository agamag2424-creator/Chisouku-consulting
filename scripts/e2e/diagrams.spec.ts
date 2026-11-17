// September diagrams (PRD Epic 2) on the review page /_ui/diagrams. That page exists only on previews and in dev,
// so this file runs only with PREVIEW=1. Each diagram fits 375 px and 1280 px and has a text alternative.
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
const preview = process.env.PREVIEW === "1";
const ids = ["health-map", "findings", "strip", "orbit", "orbit-flagged", "excerpt"];

test.describe("diagrams review page", () => {
  test.skip(!preview, "The /_ui pages render only on previews (PREVIEW=1).");

  for (const width of [375, 1280]) {
    test(`every diagram renders at ${width}px without sideways scrolling`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base + "/_ui/diagrams");
      for (const id of ids) await expect(page.locator(`[data-diagram="${id}"] figure`)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }

  test("each diagram has a screen-reader description", async ({ page }) => {
    await page.goto(base + "/_ui/diagrams");
    await expect(page.getByRole("img", { name: /PMO Health Map\. Your PMO sits in the centre/ })).toBeAttached();
    await expect(page.getByRole("figure", { name: /What we usually find, eight signals/ })).toBeVisible();
    await expect(page.getByRole("figure", { name: /PMO Health Check in five working days/ })).toBeVisible();
    await expect(page.getByRole("img", { name: /ten dimensions around one overall band/ }).first()).toBeVisible();
    await expect(page.getByRole("figure", { name: /Sample PMO Health Scorecard excerpt for a fictional organisation/ })).toBeVisible();
  });

  test("at 375px the health map is a readable list with the three problems marked", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(base + "/_ui/diagrams");
    const map = page.locator('[data-diagram="health-map"]');
    await expect(map.getByRole("img")).toBeHidden();
    const list = map.getByRole("listitem");
    await expect(list.filter({ hasText: "RAID log" }).first()).toBeVisible();
    await expect(list.filter({ hasText: "Decision forum" })).toBeVisible();
    await expect(map.getByText("Problem 1")).toBeAttached();
  });
});
