#!/usr/bin/env node
// Lighthouse accessibility on home, About and pricing (change 1 acceptance: each 90 or more).
// Usage: LH_URL=http://localhost:3100 CHROME_PATH=/path/to/chrome node scripts/lighthouseA11y.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = (process.env.LH_URL ?? "http://localhost:3100").replace(/\/$/, "");
const dir = mkdtempSync(join(tmpdir(), "lh-"));
let failed = false;
for (const path of ["/", "/about", "/pricing"]) {
  const out = join(dir, `${path.replace(/\W/g, "") || "home"}.json`);
  execFileSync(
    "npx",
    ["--yes", "lighthouse@12.8.2", base + path, "--only-categories=accessibility", "--output=json", `--output-path=${out}`, "--chrome-flags=--headless=new --no-sandbox", "--quiet"],
    { stdio: "inherit" },
  );
  const report = JSON.parse(readFileSync(out, "utf8"));
  const score = Math.round(report.categories.accessibility.score * 100);
  const failing = Object.values(report.audits).filter((a) => a.score === 0).map((a) => a.id);
  console.log(`${path}: accessibility ${score}${failing.length ? ` (failing: ${failing.join(", ")})` : ""}`);
  if (score < 90) failed = true;
}
process.exit(failed ? 1 : 0);
