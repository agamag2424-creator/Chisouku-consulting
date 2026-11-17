// Pricing and comparison. Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 360, height: 800 },
]) {
  test(`pricing at ${viewport.width}px: two paid items, the free self-check, no horizontal scroll`, async ({ page }) => {
    await page.setViewportSize(viewport);
    expect((await page.goto(base + "/pricing"))?.status()).toBe(200);
    await expect(page.locator("[data-price-card]")).toHaveCount(3);
    const check = page.locator('[data-price-card="healthCheck"]');
    await expect(check).toContainText("USD 500");
    await expect(check).toContainText("One programme");
    await expect(check).toContainText("Your status pack, RAID log, governance calendar and plan, plus three short interviews");
    await expect(check).toContainText("The PMO Health Scorecard filled in with evidence, the top findings, a 30-day fix plan and a 45-minute readout");
    await expect(check).toContainText("Five working days after documents arrive");
    await expect(check).toContainText("USD 500, paid in full on signature.");
    await expect(check).toContainText("Credited in full against the Audit if the Audit is signed within 60 days.");
    const audit = page.locator('[data-price-card="healthAudit"]');
    await expect(audit).toContainText("USD 5,000");
    await expect(audit).toContainText("USD 2,500 founding");
    await expect(audit).toContainText("Capped at 5 working days.");
    await expect(audit).toContainText("USD 1,000 a day (list) or USD 500 a day (founding)");
    await expect(audit).toContainText("Paid 50/50");
    await expect(page.locator('[data-price-card="selfCheck"]')).toContainText("Free");
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/USD 12,000|USD 6,000|refund/i);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("pricing top: Book a 20-minute call, then the PMO self-check", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/pricing");
  const hero = page.locator("main > section").first();
  const book = hero.getByRole("link", { name: "Book a 20-minute call" });
  await expect(book).toHaveAttribute(
    "href",
    "https://calendly.com/chisokulabs/discovery-call?utm_source=chisokulabs&utm_medium=website&utm_campaign=discovery_call&utm_content=pricing",
  );
  await expect(book).toHaveAttribute("rel", "noopener noreferrer");
  await expect(hero.getByText("Take the PMO self-check (5 minutes)")).toBeVisible();
});
