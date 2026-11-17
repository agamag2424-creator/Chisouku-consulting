// Screenshot tests for the September design (PRD Epic 1, review decision 5). Production build only.
// Update after an intended design change: npm run test:e2e -- screens --update-snapshots
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
  for (const shot of shots) {
    test(shot.name, async ({ page }) => {
      await page.setViewportSize({ width: shot.width, height: 900 });
      await page.goto(base + shot.path, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${shot.name}.png`, { fullPage: true });
    });
  }
});
