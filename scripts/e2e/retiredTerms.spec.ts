// Retired-term scan of the offer pages (September port PRD, Epic 4 acceptance). Epic 7 scans every built page.
import { expect, test } from "@playwright/test";
// @ts-expect-error plain ES module shared with the unit tests
import { findHits } from "../lib/retiredTerms.mjs";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
const pages = ["/pricing", "/pmo-health-check", "/pmo-health-audit", "/faq", "/terms", "/refund-policy", "/shipping-policy"];

/** The Refund Policy's own name and links are allowed (review decision 2). */
const allowedNames = /Refund and Cancellation Policy|Refund Policy/g;

/** Visible text of a part of the page without the calculator's GBP / USD switch (the one place "USD" may appear). */
const textWithoutCurrencySwitch = (selector: string) =>
  `(() => { const c = document.querySelector(${JSON.stringify(selector)}).cloneNode(true); c.querySelectorAll("[data-currency-switch]").forEach((n) => n.remove()); document.body.appendChild(c); const t = c.innerText; c.remove(); return t; })()`;

for (const path of pages) {
  test(`${path}: no retired term, em dash or refund wording for the Health Check`, async ({ page }) => {
    await page.goto(base + path);
    const text = ((await page.evaluate(textWithoutCurrencySwitch("body"))) as string).replace(allowedNames, "Policy");
    const title = await page.title();
    const description = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
    expect(findHits([text, title.replace(allowedNames, "Policy"), description].join("\n"))).toEqual([]);
  });
}
