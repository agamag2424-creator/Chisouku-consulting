// A7: the principal's experience stays "11+ years". "10+" is not used.
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const skip = new Set(["node_modules", ".next", ".git"]);
const retired = /10\+\s*(years|yrs)/i;

function* files(dir) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(tsx?|mjs|md|html|txt|json)$/.test(path)) yield path;
  }
}

test("principal copy says 11+ years and the repo does not say 10+ years or 10+ yrs", () => {
  const hits = [];
  for (const path of files(".")) {
    if (path.endsWith("scripts/experience.test.mjs")) continue;
    if (retired.test(readFileSync(path, "utf8"))) hits.push(path);
  }
  assert.deepEqual(hits, []);
  // The principal block shows backgroundLine from src/content/offer.ts.
  const principal = readFileSync("src/content/offer.ts", "utf8");
  assert.match(principal, /11\+ years/);
  assert.doesNotMatch(principal, retired);
});
