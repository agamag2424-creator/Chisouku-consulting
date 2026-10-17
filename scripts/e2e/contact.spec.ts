// "Discuss your programme" form (E9.1). Not part of the app build (tsconfig excludes scripts/e2e).
// Local builds have no RESEND_API_KEY, so a valid submission must fail visibly (never a false success).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const presets = [
  { request: "review", checked: "Discuss a review", submit: "Send" },
  { request: "brief", checked: "Free readiness brief", submit: "Request my readiness brief" },
  { request: "pricing", checked: "Pricing question", submit: "Ask about pricing" },
];

for (const preset of presets) {
  test(`?request=${preset.request} presets the request type and the button`, async ({ page }) => {
    await page.goto(`${base}/contact?request=${preset.request}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Discuss your programme");
    await expect(page.getByRole("radio", { name: preset.checked })).toBeChecked();
    await expect(page.getByRole("button", { name: preset.submit })).toBeVisible();
  });
}

test("missing required fields show plain-language messages and focus the first one", async ({ page }) => {
  await page.goto(`${base}/contact`);
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Enter a work email so we can reply.")).toBeVisible();
  await expect(page.getByText("Enter your company name.")).toBeVisible();
  await expect(page.getByText("Choose a country.")).toBeVisible();
  await expect(page.getByLabel("Name")).toBeFocused();
  await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
});

test("keyboard-only submission reaches the server; without delivery it fails visibly with the email", async ({ page }) => {
  await page.goto(`${base}/contact?request=brief`);
  await page.getByLabel("Name").focus();
  await page.keyboard.type("Test Person");
  await page.keyboard.press("Tab");
  await page.keyboard.type("test@example.com");
  await page.keyboard.press("Tab");
  await page.keyboard.type("Acme");
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowDown"); // Country: first option
  await page.getByLabel("Message").focus();
  await page.keyboard.type("Testing");
  await page.keyboard.press("Tab"); // submit button (honeypot is skipped)
  await expect(page.getByRole("button", { name: "Request my readiness brief" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("form").getByRole("alert")).toContainText("We could not send your message. Please email us at");
  await expect(page.getByText("Thanks. We'll reply within one business day.")).toHaveCount(0);
});

test("API: honeypot answers 200 without sending; missing request type is rejected; no key is a 503", async ({ request }) => {
  const valid = { name: "T", email: "t@example.com", company: "Acme", country: "UAE", request_type: "review" };
  const bot = await request.post(`${base}/api/audit-fit`, { data: { ...valid, website: "spam" } });
  expect(bot.status()).toBe(200);
  const noType = await request.post(`${base}/api/audit-fit`, { data: { ...valid, request_type: "" } });
  expect(noType.status()).toBe(400);
  const noKey = await request.post(`${base}/api/audit-fit`, { data: valid });
  expect(noKey.status()).toBe(503);
});
