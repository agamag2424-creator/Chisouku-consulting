// Pricing and comparison (E5). Not part of the app build (tsconfig excludes scripts/e2e).
//
// Run against a local production build (see hero.spec.ts):
//   HERO_URL=http://localhost:3100/ npx -y @playwright/test@1.56.1 test scripts/e2e
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 360, height: 800 },
]) {
  test(`pricing at ${viewport.width}px: prices, terms, comparison, FAQ, no horizontal scroll`, async ({ page }) => {
    await page.setViewportSize(viewport);
    expect((await page.goto(base + "/pricing"))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Pricing");
    for (const price of ["USD 5,000", "USD 2,500", "USD 12,000", "USD 6,000", "From USD 6,000 / month", "From USD 3,000 / month"]) {
      await expect(page.getByText(price, { exact: true }).first()).toBeVisible();
    }
    await expect(page.getByText("50% on signature, 50% on delivery").first()).toBeVisible();
    await expect(page.getByText("Founding-client places remaining: 3.", { exact: false }).first()).toBeVisible();
    const table = page.getByRole("table", { name: /How ChisokuLabs compares/ });
    await expect(table.locator('th[scope="row"]')).toHaveCount(6);
    await expect(page.getByText("Comparisons describe typical market practice, not specific firms.")).toBeVisible();
    await expect(page.locator("details")).toHaveCount(9);
    await page.getByText("What if our programme is larger?").click();
    await expect(page.getByText("Multi-entity reviews are quoted after a scoping call.", { exact: false })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("homepage shows the compact comparison (4 rows) and links to pricing", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const table = page.getByRole("table", { name: /How ChisokuLabs compares/ });
  await expect(table.locator('th[scope="row"]')).toHaveCount(4);
  await page.getByRole("main").getByRole("link", { name: "Pricing", exact: true }).click();
  await expect(page).toHaveURL(base + "/pricing");
});
