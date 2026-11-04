// Self-serve products (paid funnel). Not part of the app build (tsconfig excludes scripts/e2e).
// The product routes are off in production builds until payments go live (routeLive), and render in previews.
// Set PREVIEW=1 when testing a preview build (VERCEL_ENV=preview).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
const preview = process.env.PREVIEW === "1";

const pages = [
  {
    path: "/readiness-report",
    h1: "Before you sign the go-live, see where the evidence is thin.",
    price: "USD 149",
    button: "Start the assessment",
    faqs: 10,
  },
  {
    path: "/readiness-pack",
    h1: "Run the last 12 weeks before your e-invoicing go-live on evidence.",
    price: "USD 249",
    button: "Buy the Pack",
    faqs: 8,
  },
];

test("the private report delivery page is a 404 without its key", async ({ page }) => {
  expect((await page.goto(base + "/ops/deliver"))?.status()).toBe(404);
  expect((await page.goto(base + "/ops/deliver?key=wrong&order=x"))?.status()).toBe(404);
});

if (!preview) {
  test("production build: product pages are off, and nothing links to them yet", async ({ page }) => {
    for (const { path } of pages) {
      expect((await page.goto(base + path))?.status()).toBe(404);
    }
    await page.goto(base + "/");
    await expect(page.getByText("Self-serve options")).toHaveCount(0);
    await expect(page.locator('a[href^="/readiness-report"], a[href^="/readiness-pack"]')).toHaveCount(0);
  });
} else {
  for (const product of pages) {
    test(`${product.path}: verbatim copy, placeholders, test banner, footer line, Product JSON-LD`, async ({ page }) => {
      expect((await page.goto(base + product.path))?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(product.h1);
      await expect(page.getByText(/^\[PLACEHOLDER: /).first()).toBeVisible();
      await expect(page.getByText("TEST MODE: payments use Razorpay test cards. No real money is taken.")).toBeVisible();
      await expect(page.getByText(/ChisokuLabs is a trading name of ChisokuLab Private Limited, 190X\/6\/1, Kalindipuram/)).toBeVisible();
      await expect(page.getByRole("button", { name: product.button })).toBeVisible();
      await expect(page.locator("main details")).toHaveCount(product.faqs);

      const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text));
      const item = ld.find((data) => data["@type"] === "Product");
      expect(item.offers.priceCurrency).toBe("USD");
      expect(item.offers.price).toBe(product.price.replace("USD ", "") + ".00");
      expect(JSON.stringify(item)).not.toMatch(/review|rating/i);

      // Razorpay's script loads only when checkout starts.
      expect(await page.locator('script[src*="checkout.razorpay.com"]').count()).toBe(0);
    });

    test(`${product.path}: fits 360px, and checkout explains a missing email or an unavailable checkout`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(base + product.path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
      await page.getByRole("button", { name: product.button }).click();
      await expect(page.getByRole("alert").filter({ hasText: "Enter an email address so we can deliver your order." })).toBeVisible();
      // No database or Razorpay keys in a local build: the server refuses to create an order.
      await page.getByLabel("Email for delivery").fill("buyer@example.com");
      await page.getByRole("button", { name: product.button }).click();
      await expect(page.getByRole("alert").filter({ hasText: "Checkout is not available right now." })).toBeVisible();
    });
  }

  test("upgrade page: noindex; an unknown reference gets the full price and the 60-day rule", async ({ page }) => {
    await page.goto(base + "/readiness-pack/upgrade?ref=00000000-0000-4000-8000-000000000000");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByText("so the report credit does not apply.")).toBeVisible();
    await expect(page.getByText("The credit lasts 60 days from the date your report is delivered.").first()).toBeVisible();
  });

  test("thank-you page: noindex, and a pending order shows the confirming state", async ({ page }) => {
    await page.goto(base + "/thank-you?order=00000000-0000-4000-8000-000000000000");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.getByRole("heading", { name: "We're confirming your payment" })).toBeVisible();
  });

  test("homepage self-serve options and the readiness result link to the products with UTMs", async ({ page }) => {
    await page.goto(base + "/");
    await expect(page.getByText("Self-serve options")).toBeVisible();
    await expect(page.locator('a[href="/readiness-report"]').first()).toBeVisible();
    await expect(page.locator('a[href="/readiness-pack"]').first()).toBeVisible();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/readiness?utm_source=linkedin&utm_campaign=ep02");
    await page.getByRole("button", { name: "Start the readiness check" }).click();
    const offer = page.locator('a[data-cta="readiness-report"]');
    // Answer "Partly" to whatever is on screen until the result appears (the step size differs by viewport).
    for (let step = 0; step < 12 && !(await offer.isVisible()); step++) {
      const radios = page.getByRole("radio", { name: "Partly", exact: true });
      const count = await radios.count();
      for (let index = 0; index < count; index++) await radios.nth(index).check();
      await page.getByRole("button", { name: "Next", exact: true }).click();
    }
    await expect(offer).toBeVisible();
    const href = await offer.getAttribute("href");
    expect(href).toMatch(/^\/readiness-report\?/);
    const params = new URLSearchParams(href!.split("?")[1]);
    expect(params.get("band")).toBeTruthy();
    expect(params.get("utm_source")).toBe("linkedin");
    expect(params.get("utm_campaign")).toBe("ep02");
  });
}
