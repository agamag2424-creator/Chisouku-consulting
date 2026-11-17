// One price config (September port PRD, Epic 4): every price on the site comes from src/lib/siteConfig.ts.
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { offerPriceLabel, siteConfig } from "../src/lib/siteConfig.ts";

const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : /\.(tsx?|mjs)$/.test(name) ? [path] : [];
  });

test("prices in siteConfig match the source-of-truth table", () => {
  assert.equal(siteConfig.currency, "USD");
  assert.equal(siteConfig.offers.healthCheck.listPrice, 500);
  assert.equal(siteConfig.offers.healthCheck.foundingPrice, null);
  assert.equal(siteConfig.offers.healthAudit.listPrice, 5000);
  assert.equal(siteConfig.offers.healthAudit.foundingPrice, 2500);
  assert.equal(siteConfig.offers.healthAudit.days, 5);
  assert.equal(siteConfig.feeCreditDays, 60);
  assert.deepEqual(offerPriceLabel("healthAudit", 3), { list: "USD 5,000", founding: "USD 2,500" });
});

test("no page or component types a price: every 'USD n' figure is built from siteConfig", () => {
  // Allowed: siteConfig itself (prices and the extra-day sentence) and the reporting-cost calculator (no prices).
  const allowed = new Set(["src/lib/siteConfig.ts", "src/app/%5Fui/page.tsx"]);
  const offenders = [];
  for (const file of [...files("src/app"), ...files("src/components"), ...files("src/content"), ...files("src/lib")]) {
    if (allowed.has(file.replaceAll("\\", "/"))) continue;
    // Comments may mention prices; only code and copy count.
    const text = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    for (const m of text.matchAll(/USD\s?[\d,]{3,}/g)) offenders.push(`${file}: ${m[0]}`);
  }
  assert.deepEqual(offenders, []);
});
