// FAQ (E8.1). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

test("faq: 13 questions, FAQPage JSON-LD from the same items, no old-offer terms", async ({ page }) => {
  const response = await page.goto(base + "/faq");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("FAQ");
  const questions = await page.locator("main details > summary").allInnerTexts();
  expect(questions).toHaveLength(13);

  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((text) => JSON.parse(text));
  const faq = ld.find((data) => data["@type"] === "FAQPage");
  expect(faq?.mainEntity).toHaveLength(13);
  for (const [index, entity] of faq.mainEntity.entries()) {
    expect(entity["@type"]).toBe("Question");
    expect(entity.name).toBe(questions[index].trim());
    expect(entity.acceptedAnswer["@type"]).toBe("Answer");
    const words = entity.acceptedAnswer.text.split(/\s+/).length;
    expect(words).toBeLessThanOrEqual(90);
  }

  const html = await page.content();
  expect(html).not.toMatch(/PMO|Diagnostic|Automation Audit|pack cycle|reporting drag/i);
});

test("faq: an answer opens and its link works", async ({ page }) => {
  await page.goto(base + "/faq");
  await page.locator("#protect-documents > summary").click();
  await expect(page.locator("#protect-documents").getByRole("link", { name: "Independence and data handling" })).toBeVisible();
});
