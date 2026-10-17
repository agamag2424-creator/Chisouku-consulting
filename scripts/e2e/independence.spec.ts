// Independence and data (E6). Not part of the app build (tsconfig excludes scripts/e2e).
// The route stays off until the founder confirms every data statement (IN-4): in a production build the page is a
// 404; in a preview build (VERCEL_ENV=preview) it renders for review. Set PREVIEW=1 when testing a preview build.
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
const preview = process.env.PREVIEW === "1";

test("independence-and-data: 404 in production builds, full page in previews", async ({ page }) => {
  const response = await page.goto(base + "/independence-and-data");
  if (!preview) {
    expect(response?.status()).toBe(404);
    return;
  }
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Independence and data handling");
  for (const id of ["independence", "data-handling", "ai-use"]) await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.getByText("Deleted within 30 days of the final readout unless you ask us to keep it")).toBeVisible();
  await expect(page.getByText(/^Last updated: /)).toBeVisible();
  // No certification claims (PRD 8.6).
  const body = await page.locator("main").innerText();
  expect(body).not.toMatch(/SOC 2|ISO 27001|ISO\/IEC|certified|certification/i);
});

test("no link points to the page while it is off", async ({ page }) => {
  await page.goto(base + "/");
  await expect(page.locator('a[href="/independence-and-data"]')).toHaveCount(0);
});
