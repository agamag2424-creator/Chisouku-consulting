// Screenshot tests for the September design (PRD Epic 1, review decision 5). Production build only.
// The reference images come from the CI machine (GitHub's Ubuntu runner): text wraps a few pixels differently on
// other machines, so locally these run only with SCREENSHOTS=1. After an intended design change, take the
// "actual" images from the failed CI run's playwright-report artifact as the new references.
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
const preview = process.env.PREVIEW === "1";

const shots = [
  { name: "home-desktop", path: "/", width: 1280 },
  { name: "home-mobile", path: "/", width: 375 },
  { name: "pricing-desktop", path: "/pricing", width: 1280 },
  { name: "self-check-desktop", path: "/pmo-self-check", width: 1280 },
];

test.describe("screens", () => {
  test.skip(preview, "Screenshots are taken from the production build.");
  test.skip(!process.env.CI && !process.env.SCREENSHOTS, "Reference images are from CI; set SCREENSHOTS=1 to run locally.");
  for (const shot of shots) {
    test(shot.name, async ({ page }) => {
      await page.setViewportSize({ width: shot.width, height: 900 });
      await page.goto(base + shot.path, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${shot.name}.png`, { fullPage: true });
    });
  }
});
