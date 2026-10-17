// Independence and data (E6). Not part of the app build (tsconfig excludes scripts/e2e).
// Live since the founder confirmed every data statement (IN-4, 17 Oct 2026).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

test("independence-and-data: the full page renders", async ({ page }) => {
  const response = await page.goto(base + "/independence-and-data");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Independence and data handling");
  for (const id of ["independence", "data-handling", "ai-use"]) await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.getByText("Deleted within 30 days of the final readout unless you ask us to keep it")).toBeVisible();
  await expect(page.getByText(/^Last updated: /)).toBeVisible();
  // No certification claims (PRD 8.6).
  const body = await page.locator("main").innerText();
  expect(body).not.toMatch(/SOC 2|ISO 27001|ISO\/IEC|certified|certification/i);
});

test("the homepage links to the page and uses the same deletion wording", async ({ page }) => {
  await page.goto(base + "/");
  await expect(page.locator('main a[href="/independence-and-data"]')).toHaveCount(1);
  await expect(page.locator('footer a[href="/independence-and-data"]')).toHaveCount(1);
  const main = await page.locator("main").innerText();
  expect(main).not.toContain("end of the engagement");
  expect(main).toContain("within 30 days of the final readout");
});
