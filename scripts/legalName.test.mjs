// A6: the registered name is ChisokuLab Private Limited, in one constant. The trading name ChisokuLabs stays.
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { siteConfig } from "../src/lib/siteConfig.ts";

const retired = [
  ["ChisokuLabs", "Pvt Ltd"].join(" "),
  ["Chisokulab", "Pvt Ltd"].join(" "),
];
const skip = new Set(["node_modules", ".next", ".git"]);
const usesLegalName = [
  "src/components/layout/Footer.tsx",
  "src/app/privacy/page.tsx",
  "src/lib/jsonLd.ts",
  "src/lib/llms.ts",
];

function* files(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(tsx?|mjs|md|html|txt|json)$/.test(path)) yield path;
  }
}

test("the legal name is one constant, used by the footer, privacy page, JSON-LD and llms", () => {
  assert.equal(siteConfig.legalName, "ChisokuLab Private Limited");

  const hits = [];
  for (const path of files(".")) {
    if (path.endsWith("scripts/legalName.test.mjs")) continue;
    const text = readFileSync(path, "utf8");
    for (const name of retired) {
      if (text.includes(name)) hits.push(`${path}: ${name}`);
    }
  }
  assert.deepEqual(hits, []);

  for (const path of usesLegalName) {
    const text = readFileSync(path, "utf8");
    assert.match(text, /siteConfig\.legalName/);
    assert.equal(text.includes("ChisokuLab Private Limited"), false, path);
  }

  const definitions = [];
  for (const path of files("src")) {
    if (path.endsWith("src/lib/siteConfig.ts")) continue;
    if (readFileSync(path, "utf8").includes("ChisokuLab Private Limited")) definitions.push(path);
  }
  assert.deepEqual(definitions, []);
});
