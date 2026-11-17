// See it first. The sample pack stays hidden until a PMO sample exists.
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 360, height: 800 },
]) {
  test(`see-it-first at ${viewport.width}px: briefing, no pack viewer, no horizontal scroll`, async ({ page }) => {
    await page.setViewportSize(viewport);
    expect((await page.goto(base + "/see-it-first"))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("See the work before you talk to us");
    await expect(page.locator("#sample-pack")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Download the PDF" })).toHaveCount(0);
    await expect(page.locator('a[href="/contact?request=brief"]').first()).toBeVisible();
    await expect(page.getByText("Prepared from public information", { exact: true })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("homepage does not link a sample decision pack", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/");
  await expect(page.getByRole("link", { name: "See a full sample decision pack" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Request a free briefing" }).first()).toBeVisible();
});
