// Homepage slipped go-live cost estimator (E1.5; sliders added in E1.6). Not part of the app build (tsconfig excludes scripts/e2e).
//
// Run against a local production build (see hero.spec.ts):
//   HERO_URL=http://localhost:3100/ npx -y @playwright/test@1.56.1 test scripts/e2e
import { expect, test, type Page } from "@playwright/test";

const url = process.env.HERO_URL ?? "http://localhost:3100/";
// Interact only after hydration, or React resets the inputs to the server-rendered values.
const settled = { waitUntil: "networkidle" } as const;

// The number field (each field also has a slider with the same label).
const field = (page: Page, label: string) => page.getByRole("spinbutton", { name: label });
const result = (page: Page, term: string) =>
  page.locator("dt", { hasText: term }).locator("xpath=following-sibling::dd[1]");

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("shows the example result from config", async ({ page }) => {
    await page.goto(url, settled);
    await expect(page.getByText("Example values. Replace them with yours.")).toBeVisible();
    await expect(result(page, "Cost per week of slip")).toHaveText("USD 120,000");
    await expect(result(page, "Cost of a 4-week slip")).toHaveText("USD 480,000");
    await expect(page.getByText(/about 0\.2 working days of your programme's run-rate/)).toBeVisible();
  });
});

test.describe("with JavaScript", () => {
  test("recalculates as the visitor types and announces the result", async ({ page }) => {
    await page.goto(url, settled);
    await field(page, "People working on the programme").fill("20");
    await field(page, "Weeks the go-live could slip").fill("6");
    await expect(result(page, "Cost per week of slip")).toHaveText("USD 60,000");
    await expect(result(page, "Cost of a 6-week slip")).toHaveText("USD 360,000");
    await expect(page.getByText(/about 0\.4 working days/)).toBeVisible();
    await expect(page.getByRole("status").filter({ hasText: "Cost per week of slip" })).toHaveText(
      "Cost per week of slip: USD 60,000. Cost of a 6-week slip: USD 360,000.",
    );
  });

  test("adds the parallel-run cost and hides the comparison at zero people", async ({ page }) => {
    await page.goto(url, settled);
    await field(page, "Monthly cost of keeping the current system running").fill("52000");
    await expect(result(page, "Cost per week of slip")).toHaveText("USD 132,000");
    await field(page, "People working on the programme").fill("0");
    await expect(result(page, "Cost per week of slip")).toHaveText("USD 12,000");
    await expect(page.getByText(/working days of your programme's run-rate/)).toHaveCount(0);
  });

  test("the slider moves the same value", async ({ page }) => {
    await page.goto(url, settled);
    await page.getByRole("slider", { name: "Weeks the go-live could slip" }).fill("10");
    await expect(field(page, "Weeks the go-live could slip")).toHaveValue("10");
    await expect(result(page, "Cost of a 10-week slip")).toHaveText("USD 1,200,000");
  });

  test("fits 360px without horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(url, settled);
    await field(page, "People working on the programme").scrollIntoViewIfNeeded();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
