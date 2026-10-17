// Analytics (E9.2). Not part of the app build (tsconfig excludes scripts/e2e).
// Vercel Analytics queues events on window.vaq until its script loads; the script is stubbed here.
import { expect, test, type Page } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const events = (page: Page) =>
  page.evaluate(() =>
    ((window as unknown as { vaq?: [string, { name?: string; data?: Record<string, unknown> }][] }).vaq ?? [])
      .filter(([kind]) => kind === "event")
      .map(([, payload]) => payload),
  );

test.beforeEach(async ({ page }) => {
  await page.route("**/_vercel/insights/**", (route) => route.fulfill({ status: 200, body: "" }));
});

test("cta_click carries the CTA id, the page and its placement", async ({ page }) => {
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const cta = page.locator('main [data-cta="see-it-first-sample-pack"]').first();
  await cta.evaluate((node) => node.addEventListener("click", (event) => event.preventDefault(), { once: true }));
  await cta.click();
  expect(await events(page)).toContainEqual({
    name: "cta_click",
    data: { id: "see-it-first-sample-pack", page: "/", placement: "section-1" },
  });
});

test("every button-style link in main has a CTA id", async ({ page }) => {
  for (const route of ["/", "/see-it-first", "/pricing", "/go-live-decision-review", "/go-live-readiness-uae"]) {
    await page.goto(base + route);
    expect(await page.locator("main a[class*='rounded-control']:not([data-cta])").count(), route).toBe(0);
  }
});

test("form_error on a failed validation; never the message text", async ({ page }) => {
  await page.goto(base + "/contact?request=pricing", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Ask about pricing" }).click();
  const sent = await events(page);
  expect(sent).toContainEqual({ name: "form_error", data: { reason: "validation", request_type: "pricing" } });
});
