// A6: the registered name is Chisokulab Pvt Ltd. The trading name ChisokuLabs stays.
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const retired = ["ChisokuLabs", "Pvt Ltd"].join(" ");
const registered = ["Chisokulab", "Pvt Ltd"].join(" ");
const skip = new Set(["node_modules", ".next", ".git"]);

function* files(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(tsx?|mjs|md|html|txt|json)$/.test(path)) yield path;
  }
}

test("the old legal name is gone and the registered name is in the footer, privacy page and JSON-LD", () => {
  const hits = [];
  for (const path of files(".")) {
    if (path.endsWith("scripts/legalName.test.mjs")) continue;
    if (readFileSync(path, "utf8").includes(retired)) hits.push(path);
  }
  assert.deepEqual(hits, []);
  assert.match(readFileSync("src/components/layout/Footer.tsx", "utf8"), new RegExp(registered));
  assert.match(readFileSync("src/app/privacy/page.tsx", "utf8"), new RegExp(registered));
  assert.match(readFileSync("src/lib/jsonLd.ts", "utf8"), new RegExp(registered));
});
