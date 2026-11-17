// Unlisted guides. Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const guides = [
  { path: "/guides/s4hana-go-no-go-checklist", h1: "How to test a programme status claim", howTo: true },
  { path: "/guides/is-my-erp-ready-to-go-live", h1: "Is the status being reported supported by evidence?", howTo: false },
  {
    path: "/guides/independent-assurance-vs-si-readiness-review",
    h1: "An independent check, or a PMO who joins the team",
    howTo: false,
  },
];

for (const guide of guides) {
  test(`${guide.path}: PMO wording, noindex, no go-live sales claim`, async ({ page }) => {
    const response = await page.goto(base + guide.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(guide.h1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    const answer = await page.locator("h1 + p").innerText();
    expect(answer.split(/\s+/).length).toBeLessThanOrEqual(60);
    expect(answer).toMatch(/HEALTH-5/);

    expect(await page.locator("main article table, main article #checklist").count()).toBeGreaterThan(0);
    for (const href of ["/method", "/pmo-health-check", "/pmo-health-audit"]) {
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
    }

    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/go-live|e-invoicing|READINESS-5|ZATCA|Fatoora|Chisoku Guard/i);

    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text));
    expect(ld.some((data) => data["@type"] === "BreadcrumbList")).toBe(true);
    const howTo = ld.find((data) => data["@type"] === "HowTo");
    if (guide.howTo) expect(howTo.step.length).toBeGreaterThan(0);
    else expect(howTo).toBeUndefined();
  });
}
