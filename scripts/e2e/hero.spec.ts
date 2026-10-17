// Hero Evidence Check (E1.2). Not part of the app build (tsconfig excludes scripts/e2e).
//
// Run against a local production build:
//   npm run build && PORT=3100 npm run start &
//   HERO_URL=http://localhost:3100/ npx -y @playwright/test@1.56.1 test scripts/e2e
// HERO_URL defaults to the homepage; before E1.3 point it at /_ui (preview or `next dev` only).
import { expect, test } from "@playwright/test";

const url = process.env.HERO_URL ?? "http://localhost:3100/";
const scores = ["3 of 5 evidenced", "2 of 5 evidenced", "0 of 5 evidenced"];
const contradiction = "The 98% excludes 3 interfaces never tested end to end.";
const summary = "Check complete: 1 of 3 claims has most of its evidence; 1 contradiction found";

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("plays once and ends in the PRD 7 final state", async ({ page }) => {
      await page.goto(url);
      const started = Date.now();
      const hero = page.locator(".ec").first();
      // Before the sequence: reported statuses visible, nothing resolved yet.
      // (Pending marks are hidden with opacity, which Playwright still counts as visible, so assert state.)
      await expect(hero.getByText(/^(Reported: )?Green$/).filter({ visible: true }).first()).toBeVisible();
      await expect(hero).toHaveAttribute("data-phase", "idle");
      expect(await hero.locator('[data-on="true"]').count()).toBe(0);
      // The sequence ends within 4.5 s of load (allowing 1 s for navigation and hydration).
      await expect(hero).toHaveAttribute("data-phase", "done", { timeout: 5500 });
      expect(Date.now() - started).toBeLessThan(5500);
      expect(await hero.locator('[data-on="false"]').count()).toBe(0);
      // Exact final state of PRD 7: badges, contradiction, completion announcement, replay.
      for (const score of scores) {
        await expect(hero.getByText(score).filter({ visible: true })).toHaveCount(1, { timeout: 5000 });
      }
      await expect(hero.getByText(contradiction).filter({ visible: true })).toBeVisible();
      await expect(hero.getByRole("status")).toHaveText(summary);
      await expect(hero.getByRole("button", { name: "Run the check again" })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
      await hero.screenshot({ path: `test-results/hero-${viewport.name}.png` });
    });

    test("replays from the start", async ({ page }) => {
      await page.goto(url);
      const hero = page.locator(".ec").first();
      const replay = hero.getByRole("button", { name: "Run the check again" });
      await expect(replay).toBeVisible({ timeout: 6000 });
      await replay.click();
      await expect(hero).toHaveAttribute("data-phase", "idle");
      expect(await hero.locator('[data-on="true"]').count()).toBe(0);
      await expect(hero).toHaveAttribute("data-phase", "done", { timeout: 5000 });
    });
  });
}

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("shows the final state immediately and hides replay", async ({ page }) => {
    await page.goto(url);
    const hero = page.locator(".ec").first();
    // CSS shows the final state at first paint, before hydration: marks and scores fully opaque, no pending markers.
    const finals = hero.locator(".ec-final").filter({ visible: true });
    expect(await finals.count()).toBeGreaterThan(0);
    for (const opacity of await finals.evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity))) {
      expect(opacity).toBe("1");
    }
    expect(await hero.locator(".ec-pending").filter({ visible: true }).count()).toBe(0);
    for (const score of scores) {
      await expect(hero.getByText(score).filter({ visible: true })).toHaveCount(1);
    }
    // After hydration the state machine agrees, without playing the sequence.
    await expect(hero).toHaveAttribute("data-phase", "done", { timeout: 2000 });
    await expect(hero.getByText(contradiction).filter({ visible: true })).toBeVisible({ timeout: 300 });
    await expect(hero.getByRole("button", { name: "Run the check again" })).toBeHidden();
    await hero.screenshot({ path: "test-results/hero-reduced-motion.png" });
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("table and reported statuses are readable", async ({ page }) => {
    await page.goto(url);
    const table = page.locator(".ec table").first();
    await expect(table).toBeVisible();
    await expect(table.getByText("SIT complete, 98% pass rate")).toBeVisible();
    await expect(table.getByText("Green", { exact: true })).toHaveCount(3);
  });
});
