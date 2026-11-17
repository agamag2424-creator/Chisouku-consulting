// Change 1 (17 Nov 2026): the named consultant, the company line, the two "Before you book" PDFs, and the
// scorecard's hidden status text. Not part of the app build (tsconfig excludes scripts/e2e).
// The PDF text checks need pdftotext (poppler-utils), which CI installs.
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const founderLine =
  "Agam Agrawwal, Founder and Director. Every Health Check and Audit is carried out and signed by me. 11+ years in programme delivery. Employed at Yamaha, Etihad, HCLTech and Coforge.";

for (const path of ["/", "/about"]) {
  test(`${path}: the founder is named, pictured and linked to LinkedIn`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(base + path);
    const block = page.locator("[data-founder]");
    await expect(block.locator("[data-founder-line]")).toHaveText(founderLine);
    await expect(block.getByRole("img", { name: "Agam Agrawwal", exact: true })).toBeVisible();
    const linkedin = block.getByRole("link", { name: /LinkedIn/ });
    await expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/agamagrawwal");
    // The photo (or its placeholder) is about 320 px wide on desktop.
    const box = await block.getByRole("img", { name: "Agam Agrawwal", exact: true }).boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(280);
    expect(box?.width).toBeLessThanOrEqual(330);
  });
}

test("About: h1 is About, no Last updated, payment terms said once", async ({ page }) => {
  await page.goto(base + "/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/Last updated|About Us/);
  expect(text.match(/paid in full on signature/g)).toHaveLength(1);
  expect(text.match(/Paid 50\/50/g) ?? []).toHaveLength(1);
});

for (const path of ["/pricing", "/pmo-health-check"]) {
  test(`${path}: Before you book links both PDFs, and the tax line sits under the price`, async ({ page }) => {
    await page.goto(base + path);
    const panel = page.locator("[data-before-you-book]");
    await expect(panel).toContainText("Before you book");
    await expect(panel.getByRole("link", { name: /How a PMO Health Check works/ })).toHaveAttribute(
      "href",
      "/documents/how-a-pmo-health-check-works.pdf",
    );
    await expect(panel.getByRole("link", { name: /Terms of engagement/ })).toHaveAttribute(
      "href",
      "/documents/chisokulabs-terms-of-engagement.pdf",
    );
    await expect(page.locator("main")).toContainText("Prices exclude any taxes that may apply.");
  });
}

/** Text of a PDF served by the site, via pdftotext. */
async function pdfText(request: import("@playwright/test").APIRequestContext, path: string) {
  const response = await request.get(base + path);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  const bytes = await response.body();
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  const file = join(mkdtempSync(join(tmpdir(), "pdf-")), "doc.pdf");
  writeFileSync(file, bytes);
  return execFileSync("pdftotext", [file, "-"], { encoding: "utf8" });
}

const words = (text: string) => text.replace(/\s+/g, " ").trim();

test("How a PMO Health Check works: one page, built from the site's own copy", async ({ request }) => {
  const text = words(await pdfText(request, "/documents/how-a-pmo-health-check-works.pdf"));
  for (const part of [
    "How a PMO Health Check works",
    "Your status pack, RAID log, governance calendar and plan, plus three short interviews.",
    "The PMO Health Scorecard filled in with evidence, the top findings, a 30-day fix plan and a 45-minute readout.",
    "£395, paid in full on signature.",
    "Credited in full against the Audit if the Audit is signed within 60 days.",
    "Prices exclude any taxes that may apply.",
    "Confidentiality",
  ]) {
    expect(text).toContain(part);
  }
  expect(text).not.toMatch(/USD|refund/i);
});

test("Terms of engagement PDF matches /terms word for word, with the same Last updated date", async ({ request, page }) => {
  const pdf = words((await pdfText(request, "/documents/chisokulabs-terms-of-engagement.pdf")).replace(/ChisokuLabs · Terms of engagement · \d+ of \d+/g, " "));
  await page.goto(base + "/terms");
  const site = words(await page.locator("main").innerText());
  const updated = /Last updated: \d{1,2} \w+ \d{4}/.exec(site)?.[0];
  expect(updated).toBeTruthy();
  expect(pdf).toContain(updated!);
  expect(pdf).toBe(site);
});

test("scorecard excerpt: the status words are hidden from sight but read out", async ({ page }) => {
  await page.goto(base + "/");
  const hidden = page.locator("[data-scorecard-excerpt] td .sr-only").first();
  await expect(hidden).toHaveText(/, (Not evidenced|Partly evidenced|Evidenced)/);
  const box = await hidden.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return { w: r.width, h: r.height, overflow: s.overflow, position: s.position };
  });
  expect(box.w).toBeLessThanOrEqual(1);
  expect(box.h).toBeLessThanOrEqual(1);
  expect(box.position).toBe("absolute");
  expect(box.overflow).toBe("hidden");
  // Screen readers get the status with the level.
  const snapshot = await page.locator("[data-scorecard-excerpt] tbody").ariaSnapshot();
  expect(snapshot).toContain("Not evidenced");
});
