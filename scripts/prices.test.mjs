// One price config (September port PRD, Epic 4; GBP from 17 Nov 2026): every price on the site comes from src/lib/siteConfig.ts.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { extraDaysSentence, formatPrice, offerPriceLabel, siteConfig } from "../src/lib/siteConfig.ts";

const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : /\.(tsx?|mjs)$/.test(name) ? [path] : [];
  });

test("prices in siteConfig match the source-of-truth table", () => {
  assert.equal(siteConfig.currency, "GBP");
  assert.equal(siteConfig.offers.healthCheck.listPrice, 395);
  assert.equal(siteConfig.offers.healthCheck.foundingPrice, null);
  assert.equal(siteConfig.offers.healthAudit.listPrice, 3950);
  assert.equal(siteConfig.offers.healthAudit.foundingPrice, 1950);
  assert.deepEqual(siteConfig.offers.healthAudit.extraDay, { list: 795, founding: 395 });
  assert.equal(siteConfig.offers.healthAudit.days, 5);
  assert.equal(siteConfig.feeCreditDays, 60);
  assert.deepEqual(offerPriceLabel("healthAudit", 3), { list: "£3,950", founding: "£1,950" });
});

test("prices render as £395, never GBP 395", () => {
  assert.equal(formatPrice(395), "£395");
  assert.equal(formatPrice(795), "£795");
  assert.equal(formatPrice(1950), "£1,950");
  assert.equal(formatPrice(3950), "£3,950");
  assert.match(siteConfig.offers.healthCheck.payment, /^£395,/);
  assert.match(extraDaysSentence, /£795 a day \(list\) or £395 a day \(founding\)/);
});

test("no page or component types a price: every £ or USD figure is built from siteConfig", () => {
  // Allowed: siteConfig itself (prices and the extra-day sentence) and the reporting-cost calculator (no prices).
  const allowed = new Set(["src/lib/siteConfig.ts", "src/app/%5Fui/page.tsx"]);
  const offenders = [];
  for (const file of [...files("src/app"), ...files("src/components"), ...files("src/content"), ...files("src/lib")]) {
    if (allowed.has(file.replaceAll("\\", "/"))) continue;
    // Comments may mention prices; only code and copy count.
    const text = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    // A price is "£" or "USD"/"GBP" followed by a figure; template literals such as `£${n}` are code, not typed prices.
    for (const m of text.matchAll(/(?:£|\b(?:USD|GBP)\s?)\d[\d,]*/g)) offenders.push(`${file}: ${m[0]}`);
  }
  assert.deepEqual(offenders, []);
});
