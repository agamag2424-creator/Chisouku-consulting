// Homepage (September port PRD, Epic 3): section order, offer wording, CTAs and the reporting-cost calculator.
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

test("hero: headline option 1, subline, both CTAs and the UK line", async ({ page }) => {
  await page.goto(base + "/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "RAID logs nobody acts on. Status that turns Red too late. Forums that cannot decide.",
  );
  await expect(page.getByText("A fixed-price PMO Health Check finds which one is yours, with evidence, in five working days.")).toBeVisible();
  await expect(page.getByText("For UK organisations running a PMO")).toBeVisible();
  const book = page.locator("main").getByRole("link", { name: "Book a 20-minute call" }).first();
  await expect(book).toHaveAttribute("href", /^https:\/\/calendly\.com\/chisokulabs\/discovery-call\?/);
  await expect(page.locator("main").getByText("Take the PMO self-check (5 minutes)").first()).toBeVisible();
});

test("sections follow the PRD order", async ({ page }) => {
  await page.goto(base + "/");
  const headings = await page.locator("main h2").allTextContents();
  expect(headings).toEqual([
    "Three problems we find in most PMOs.",
    "What your PMO reporting costs today",
    "The PMO Health Check, in five working days.",
    "What the scorecard looks like.",
    "Start free. Pay only for evidence.",
    "Who does the work",
    "Find out which of the three problems is yours.",
  ]);
});

test("offer wording and prices match the source of truth", async ({ page }) => {
  await page.goto(base + "/");
  const main = page.locator("main");
  await expect(main.getByText("Your status pack, RAID log, governance calendar and plan, plus three short interviews.")).toBeVisible();
  await expect(
    main.getByText("The PMO Health Scorecard filled in with evidence, the top findings, a 30-day fix plan and a 45-minute readout.").first(),
  ).toBeVisible();
  await expect(main.getByText("Five working days after documents arrive.")).toBeVisible();
  const ladder = main.locator("[data-ladder-step]");
  await expect(ladder).toHaveCount(3);
  await expect(ladder.nth(0)).toContainText("Free");
  await expect(ladder.nth(1)).toContainText("USD 500");
  await expect(ladder.nth(2)).toContainText("USD 5,000");
  await expect(ladder.nth(2)).toContainText("USD 2,500 founding");
  await expect(main.getByText("11+ years in programme delivery. Employed at Yamaha, Etihad, HCLTech and Coforge.", { exact: false })).toBeVisible();
});

test("calculator: defaults, your own numbers and the currency switch", async ({ page }) => {
  await page.goto(base + "/");
  const calc = page.locator('[data-calculator="reporting-cost"]');
  await expect(calc.locator('[data-result="hours"]')).toHaveText("768");
  await expect(calc.locator('[data-result="cost"]')).toHaveText("£57,600");

  await calc.getByLabel("People who prepare status packs and governance meetings (type a number)").fill("5");
  await calc.getByLabel("Hours each per week (type a number)").fill("12");
  await calc.getByLabel("Fully loaded hourly cost (type a number)").fill("90");
  await expect(calc.locator('[data-result="hours"]')).toHaveText("2,880");
  await expect(calc.locator('[data-result="cost"]')).toHaveText("£259,200");

  await calc.getByRole("radio", { name: "USD" }).click();
  await expect(calc.locator('[data-result="cost"]')).toHaveText("$259,200");
  await expect(calc.getByText("The PMO Health Check shows whether that time produces decisions, or just reports.")).toBeVisible();
  await expect(calc).not.toContainText(/saving|reclaim|after|%/i);
});

test("calculator sends nothing but an empty calculator_used event", async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) => route.fulfill({ status: 200, body: "" }));
  const bodies: string[] = [];
  page.on("request", (r) => {
    if (r.method() !== "GET") bodies.push(r.postData() ?? "");
  });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByLabel("Hours each per week (type a number)").fill("13");
  await page.waitForTimeout(500);
  expect(bodies.join("\n")).not.toContain("13");
  const events = await page.evaluate(() =>
    ((window as unknown as { vaq?: [string, { name?: string; data?: unknown }][] }).vaq ?? []).filter(([k]) => k === "event").map(([, p]) => p),
  );
  expect(events.filter((e) => e.name === "calculator_used")).toEqual([{ name: "calculator_used" }]);
});

test("mobile: 375px has no sideways scroll and the calculator stacks", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base + "/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  await expect(page.locator('[data-calculator="reporting-cost"] [data-result="cost"]')).toBeVisible();
});
