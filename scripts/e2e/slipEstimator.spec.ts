// The slipped go-live calculator is hidden. Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const url = process.env.HERO_URL ?? "http://localhost:3100/";

test("homepage does not show the slipped go-live calculator", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByText("What a slipped go-live costs")).toHaveCount(0);
  await expect(page.getByRole("spinbutton", { name: "Weeks the go-live could slip" })).toHaveCount(0);
  await expect(page.getByText("USD 480,000")).toHaveCount(0);
});
