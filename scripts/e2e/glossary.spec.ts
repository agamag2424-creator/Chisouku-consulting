// Glossary (E8.2). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

test("glossary: 11 terms, each reachable by #slug, DefinedTermSet JSON-LD", async ({ page }) => {
  const response = await page.goto(base + "/glossary");
  expect(response?.status()).toBe(200);
  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text));
  const set = ld.find((data) => data["@type"] === "DefinedTermSet");
  expect(set.hasDefinedTerm.length).toBe(11);

  for (const term of set.hasDefinedTerm) {
    expect(term["@type"]).toBe("DefinedTerm");
    const slug = new URL(term.url).hash.slice(1);
    const target = page.locator(`[id="${slug}"]`);
    await expect(target).toHaveText(term.name);
    const sentences = term.description.split(/(?<=[.!?”])\s+(?=[A-Z“])/).length;
    expect(sentences).toBeLessThanOrEqual(3);
  }

  await page.goto(base + "/glossary#pmo-health-scorecard");
  await expect(page.locator("#pmo-health-scorecard")).toBeInViewport();

  const html = await page.content();
  expect(html).toMatch(/PMO Health Scorecard/);
  expect(html).not.toMatch(/HEALTH-5|Needs attention/);
  expect(html).not.toMatch(/pack cycle|reporting drag|AI Impact Model|READINESS-5/i);
});
