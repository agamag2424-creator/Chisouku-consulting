// Hero Evidence Check (E1.2, reworked in E1.6 per PRD 7 v1.2). Not part of the app build (tsconfig excludes scripts/e2e).
//
// Run against a local production build:
//   npm run build && PORT=3100 npm run start &
//   HERO_URL=http://localhost:3100/ npx -y @playwright/test@1.56.1 test scripts/e2e
import { expect, test } from "@playwright/test";

const url = process.env.HERO_URL ?? "http://localhost:3100/";
const scores = ["3 of 5 evidenced", "2 of 5 evidenced", "0 of 5 evidenced"];
const contradiction = "The 98% excludes 3 interfaces never tested end to end.";
const summary = "Check complete: 1 of 3 claims has most of its evidence; 1 contradiction found";

const visible = <T extends { filter: (o: { visible: boolean }) => T }>(locator: T) => locator.filter({ visible: true });

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("opens as reported, then moves once to the evidenced view", async ({ page }) => {
      await page.goto(url);
      const hero = page.locator(".ec").first();
      const asReported = hero.getByRole("button", { name: "As reported" });
      const asEvidenced = hero.getByRole("button", { name: "As evidenced" });

      // Before the move: three Green badges, no scores, no contradiction.
      await expect(visible(hero.getByText(/^(Reported: )?Green$/))).toHaveCount(3);
      expect(await visible(hero.getByText(/of 5 evidenced$/)).count()).toBe(0);
      await expect(asReported).toHaveAttribute("aria-pressed", "true");

      // The move happens on its own and ends in the PRD 7 evidenced state.
      await expect(hero).toHaveAttribute("data-view", "evidenced", { timeout: 4000 });
      await expect(asEvidenced).toHaveAttribute("aria-pressed", "true");
      for (const score of scores) await expect(visible(hero.getByText(score))).toHaveCount(1);
      await expect(visible(hero.getByText(contradiction))).toHaveCount(1);
      expect(await visible(hero.getByText(/^(Reported: )?Green$/)).count()).toBe(0);
      await expect(hero.getByRole("status")).toHaveText(summary);
      await expect(visible(hero.getByText("T1 SIT complete, 98% pass rate: what the evidence shows"))).toBeVisible();

      // It does not move again.
      await page.waitForTimeout(2500);
      await expect(hero).toHaveAttribute("data-view", "evidenced");
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
    });

    test("the visitor can switch views and pick a claim", async ({ page }) => {
      await page.goto(url);
      const hero = page.locator(".ec").first();
      await hero.getByRole("button", { name: "As reported" }).click();
      await expect(hero).toHaveAttribute("data-view", "reported");
      await page.waitForTimeout(2500);
      await expect(hero).toHaveAttribute("data-view", "reported"); // a choice stops the automatic move
      await expect(visible(hero.getByText(/^(Reported: )?Green$/))).toHaveCount(3);

      // Picking a claim opens the evidenced view on that claim.
      await visible(hero.getByRole("button", { name: "Rollback plan in place" })).click();
      await expect(hero).toHaveAttribute("data-view", "evidenced");
      await expect(visible(hero.getByText("C2 Rollback plan in place: what the evidence shows"))).toBeVisible();
      await expect(visible(hero.getByRole("button", { name: "Rollback plan in place" }))).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
  });
}

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("shows the evidenced view at first paint, without the automatic move", async ({ page }) => {
    await page.goto(url, { waitUntil: "commit" });
    const hero = page.locator(".ec").first();
    // CSS shows the evidenced view before hydration ("auto" under reduced motion).
    await expect(hero).toHaveAttribute("data-view", /auto|evidenced/);
    for (const score of scores) await expect(visible(hero.getByText(score))).toHaveCount(1);
    await expect(visible(hero.getByText(contradiction))).toHaveCount(1);
    expect(await visible(hero.getByText(/^(Reported: )?Green$/)).count()).toBe(0);
    // After hydration the buttons agree and the switch still works.
    await expect(hero.getByRole("button", { name: "As evidenced" })).toHaveAttribute("aria-pressed", "true");
    await hero.getByRole("button", { name: "As reported" }).click();
    await expect(visible(hero.getByText(/^(Reported: )?Green$/))).toHaveCount(3);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("table and reported statuses are readable", async ({ page }) => {
    await page.goto(url);
    const table = page.locator(".ec table").first();
    await expect(table).toBeVisible();
    await expect(table.getByText("SIT complete, 98% pass rate")).toBeVisible();
    await expect(visible(table.getByText("Green", { exact: true }))).toHaveCount(3);
  });
});
