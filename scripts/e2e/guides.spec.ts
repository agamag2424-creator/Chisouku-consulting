// Answer guides (E8.3). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const guides = [
  { path: "/guides/s4hana-go-no-go-checklist", h1: "S/4HANA go/no-go checklist", howTo: true },
  { path: "/guides/is-my-erp-ready-to-go-live", h1: "Is my ERP ready to go live?", howTo: false },
  {
    path: "/guides/independent-assurance-vs-si-readiness-review",
    h1: "Independent assurance vs an SI readiness review",
    howTo: false,
  },
];

for (const guide of guides) {
  test(`${guide.path}: one H1, direct answer ≤ 60 words, 800–1,400 words, table or checklist, links, JSON-LD`, async ({ page }) => {
    const response = await page.goto(base + guide.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(guide.h1);

    const answer = await page.locator("h1 + p").innerText();
    expect(answer.split(/\s+/).length).toBeLessThanOrEqual(60);

    const words = (await page.locator("main > section").nth(0).innerText()).split(/\s+/).length +
      (await page.locator("main article").innerText()).split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(800);
    expect(words).toBeLessThanOrEqual(1400);

    expect(await page.locator("main article table, main article #checklist").count()).toBeGreaterThan(0);
    for (const href of ["/method", "/readiness-evidence-check", "/go-live-decision-review", "/see-it-first#sample-pack"]) {
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
    }

    if (guide.path === "/guides/independent-assurance-vs-si-readiness-review") {
      await expect(page.getByRole("link", { name: /Ministerial Decision No\. 244 of 2025/ })).toHaveCount(0);
    } else {
      const citation = page.getByRole("link", {
        name: "UAE Ministry of Finance: Ministerial Decision No. 244 of 2025, as amended by Ministerial Resolution No. 66 of 2026",
      });
      await expect(citation).toBeVisible();
      await expect(citation).toHaveAttribute(
        "href",
        "https://tax.gov.ae/Datafolder/Files/Pdf/2026/legislation/Ministerial%20Decision%20No.%20244%20of%202025%20on%20The%20Implementation%20of%20the%20Electronic%20Invoicing%20System%20-%20publishing%20-%2007%202026.pdf",
      );
      await expect(
        page.getByRole("link", { name: "UAE Ministry of Finance: Ministerial Resolution No. 66 of 2026", exact: true }),
      ).toHaveCount(0);
    }

    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text));
    expect(ld.some((data) => data["@type"] === "BreadcrumbList")).toBe(true);
    const howTo = ld.find((data) => data["@type"] === "HowTo");
    if (guide.howTo) {
      expect(howTo.step).toHaveLength(5);
      for (const step of howTo.step) expect(step.itemListElement.length).toBeGreaterThan(0);
    } else {
      expect(howTo).toBeUndefined();
    }
  });
}
