// Go-live readiness check. Not part of the app build (tsconfig excludes scripts/e2e).
//
// Live in production. Against a production build:
//   VERCEL_ENV=production PORT=3100 npm run start
//   HERO_URL=http://localhost:3100/ npx playwright test scripts/e2e/readiness.spec.ts
import { mkdirSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
const shots = "/opt/cursor/artifacts/screenshots";

const events = (page: Page) =>
  page.evaluate(() =>
    ((window as unknown as { vaq?: [string, { name?: string; data?: Record<string, unknown> }][] }).vaq ?? [])
      .filter(([kind]) => kind === "event")
      .map(([, payload]) => payload),
  );

async function answerVisible(page: Page, choice: "Yes" | "Partly" | "No") {
  const radios = page.getByRole("radio", { name: choice, exact: true });
  const count = await radios.count();
  for (let index = 0; index < count; index += 1) await radios.nth(index).check();
  await page.getByRole("button", { name: "Next", exact: true }).click();
}

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("mobile shows one question, keeps answers, and scores all Partly as 6", async ({ page }) => {
  mkdirSync(shots, { recursive: true });
  await page.setViewportSize({ width: 390, height: 844 });
  expect((await page.goto(base + "/readiness", { waitUntil: "networkidle" }))?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Go-live readiness check");
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(await overflow()).toBeLessThanOrEqual(1);
  await page.screenshot({ path: `${shots}/readiness-intro-390.png` });

  await page.getByRole("button", { name: "Start the readiness check" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Question 1 of 12");
  await expect(page.locator("#q1-hint")).toHaveText("Answer for where things stand today.");
  const help = page.locator("#q1-help");
  await expect(help).toHaveText(
    "Yes: it's done, and you could show the evidence today. Partly: some of it is in place, but you couldn't show full evidence yet. No: it isn't in place, or you're not sure.",
  );
  await expect(help.locator("span.font-semibold")).toHaveText(["Yes:", "Partly:", "No:"]);
  await expect(page.getByText("Partly means started but not finished.")).toHaveCount(0);
  await expect(page.getByRole("group")).toHaveCount(1);
  await expect(page.getByText("Is scope frozen?")).toHaveCount(0);
  await expect(page.locator("p").filter({ hasText: /^Scope and go-live date$/ })).toBeVisible();
  expect(await overflow()).toBeLessThanOrEqual(1);

  const next = page.getByRole("button", { name: "Next", exact: true });
  await expect(next).toBeDisabled();
  await page.getByRole("radio", { name: "Partly", exact: true }).focus();
  await page.keyboard.press("ArrowUp");
  await expect(page.getByRole("radio", { name: "Yes", exact: true })).toBeChecked();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "Partly", exact: true })).toBeChecked();
  await expect(next).toBeEnabled();
  await page.screenshot({ path: `${shots}/readiness-question-390.png` });

  await next.click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Question 2 of 12");
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Question 1 of 12");
  await expect(page.getByRole("radio", { name: "Partly", exact: true })).toBeChecked();
  await expect(next).toBeEnabled();

  const completionPost = page.waitForRequest(
    (req) => req.method() === "POST" && new URL(req.url()).pathname === "/api/readiness-complete",
  );
  for (let step = 0; step < 12; step += 1) await answerVisible(page, "Partly");

  const score = page.getByRole("heading", { level: 1, name: "Your score: 6 out of 12" });
  await expect(score).toBeVisible();
  expect((await completionPost).postDataJSON()).toEqual({
    score_band: "partly_ready",
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    referrer_host: null,
  });
  await expect(score).toBeFocused();
  await expect(page.getByText("Partly ready", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText("Your weakest area: Scope and go-live date");
  await expect(page.getByText("Scope and go-live date: 1 / 2")).toBeVisible();
  await expect(page.getByText("A self-assessment, not a go-live recommendation.")).toBeVisible();
  expect(await overflow()).toBeLessThanOrEqual(1);
  await page.screenshot({ path: `${shots}/readiness-results-390.png` });

  const book = page.locator("main").getByRole("link", { name: "Book a 30-minute call" });
  const brief = page.locator("main").getByRole("link", { name: "Request a free readiness brief" });
  await expect(book).toHaveAttribute("href", /utm_content=readiness_result/);
  await expect(book).toHaveAttribute("target", "_blank");
  await expect(book).toHaveAttribute("data-cta", "book_call");
  await expect(brief).toHaveAttribute("href", "/contact?request=brief");
  await expect(brief).toHaveAttribute("data-cta", "readiness_brief");

  const sent = await events(page);
  const started = sent.filter((event) => event.name === "readiness_start");
  const completed = sent.filter((event) => event.name === "readiness_complete").map(({ name, data }) => ({ name, data }));
  expect(started).toHaveLength(1);
  expect(started[0].data).toBeUndefined();
  expect(completed).toEqual([
    { name: "readiness_complete", data: { band: "Partly ready", weakest_area: "Scope and go-live date" } },
  ]);

  await book.evaluate((node) => node.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await book.click();
  await brief.evaluate((node) => node.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await brief.click();
  const clicks = (await events(page)).filter((event) => event.name === "cta_click");
  expect(clicks).toContainEqual({ name: "cta_click", data: { id: "book_call", page: "/readiness", placement: "section-1" } });
  expect(clicks).toContainEqual({
    name: "cta_click",
    data: { id: "readiness_brief", page: "/readiness", placement: "section-1" },
  });
});

test("desktop shows one area, two questions, on the first step", async ({ page }) => {
  mkdirSync(shots, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/readiness", { waitUntil: "networkidle" });
  await page.screenshot({ path: `${shots}/readiness-intro-1440.png` });
  await page.getByRole("button", { name: "Start the readiness check" }).click();
  await expect(page.getByRole("group")).toHaveCount(2);
  await expect(page.getByText("Can the go-live date move if readiness is not proven?")).toBeVisible();
  await expect(page.getByText("Is scope frozen?")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Question 1 of 12");
  await expect(page.getByText("Question 2 of 12")).toBeVisible();

  const next = page.getByRole("button", { name: "Next", exact: true });
  await expect(next).toBeDisabled();
  await page.getByRole("radio", { name: "Yes", exact: true }).first().check();
  await expect(next).toBeDisabled();
  await page.getByRole("radio", { name: "No", exact: true }).nth(1).check();
  await expect(next).toBeEnabled();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: `${shots}/readiness-question-1440.png` });

  const completionPost = page.waitForRequest(
    (req) => req.method() === "POST" && new URL(req.url()).pathname === "/api/readiness-complete",
  );
  for (let step = 0; step < 6; step += 1) await answerVisible(page, "Yes");
  await expect(page.getByRole("heading", { level: 1, name: "Your score: 12 out of 12" })).toBeVisible();
  expect((await completionPost).postDataJSON()).toEqual({
    score_band: "ready",
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    referrer_host: null,
  });
  await expect(page.getByText("Ready to evidence", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Your weakest area:")).toHaveCount(0);
  await expect(page.getByText(/^Next step:/)).toHaveCount(0);
  await page.screenshot({ path: `${shots}/readiness-results-1440.png` });

  const completed = (await events(page))
    .filter((event) => event.name === "readiness_complete")
    .map(({ name, data }) => ({ name, data }));
  expect(completed).toEqual([{ name: "readiness_complete", data: { band: "Ready to evidence", weakest_area: "none" } }]);
});

test("a production-like build returns 200, allows indexing, and lists /readiness in the sitemap", async ({ request }) => {
  const response = await request.get(base + "/readiness");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).not.toMatch(/noindex/);
  expect(html).toContain("Go-live readiness check");
  expect(html).toMatch(/<link rel="canonical" href="https:\/\/www\.chisokulabs\.com\/readiness"/);
  const xml = await (await request.get(base + "/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls.some((url) => url.endsWith("/readiness"))).toBe(true);
});
