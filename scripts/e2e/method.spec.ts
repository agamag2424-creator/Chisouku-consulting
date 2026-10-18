// Method page (E3). Not part of the app build (tsconfig excludes scripts/e2e).
//
// Run against a local production build (see hero.spec.ts):
//   HERO_URL=http://localhost:3100/ npx -y @playwright/test@1.56.1 test scripts/e2e
import { expect, test } from "@playwright/test";

const url = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "") + "/method";

for (const viewport of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 360, height: 800 },
]) {
  test.describe(viewport.name, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("shows READINESS-5 with sample-pack examples and no old method", async ({ page }) => {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("READINESS-5: how we test a go-live claim");
      for (const name of ["Status", "Owner", "Evidence", "Date", "Action"]) {
        await expect(page.getByRole("heading", { level: 3, name, exact: true })).toBeVisible();
      }
      await expect(page.getByText("What failure looks like").filter({ visible: true })).toHaveCount(5);
      // Register (10 claims), contradiction types (4) and conditions (3), whichever layout is visible.
      await expect(page.getByText("SAR 2.1M unresolved", { exact: false }).filter({ visible: true }).first()).toBeVisible();
      await expect(page.getByText("Pass rate on reduced scope").filter({ visible: true })).toHaveCount(1);
      await expect(page.getByText("Headline status not traceable to workstream status").filter({ visible: true })).toHaveCount(1);
      for (const by of ["D-10", "D-14", "D-7"]) {
        await expect(page.getByText(by, { exact: true }).filter({ visible: true })).toHaveCount(1);
      }
      // E3.2 claim-flow diagram: one accessible SVG visible per width, with title and description.
      const flow = page.getByRole("img", { name: "How one claim is tested" }).filter({ visible: true });
      await expect(flow).toHaveCount(1);
      await expect(flow).toHaveAccessibleDescription(/3 of 5 evidenced/);
      const body = await page.locator("main").innerText();
      for (const old of ["Assess", "Architect", "Activate", "Accelerate", "AI Impact Model", "PMO"]) {
        expect(body).not.toContain(old);
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}
