#!/usr/bin/env node
// Regenerates the share images in public/ from /_ui/og on a preview or dev build (it 404s in production).
// Usage: OG_URL=http://localhost:3100 node scripts/makeOgImages.mjs   (needs Playwright installed)
import { chromium } from "playwright";

const base = (process.env.OG_URL ?? "http://localhost:3100").replace(/\/$/, "");
const images = {
  home: "public/og.png",
  "health-check": "public/og-health-check.png",
  "health-audit": "public/og-health-audit.png",
  "self-check": "public/og-self-check.png",
  method: "public/og-method.png",
  "see-it-first": "public/og-see-it-first.png",
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const [variant, file] of Object.entries(images)) {
  await page.goto(`${base}/_ui/og?v=${variant}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("[data-og]").screenshot({ path: file });
  console.log(`${file}`);
}
await browser.close();
