#!/usr/bin/env node
// Full-site scan (September port PRD, Story 7.1). Fetches every live route, llms.txt and llms-full.txt from a running
// build and fails on any retired term, em dash, "Chisoku Guard", ten-plus years, "leading programmes", a wrong legal
// name, "pilot", savings or benchmark claims, or "refund" near "Health Check".
// Usage: SCAN_URL=http://localhost:3100 node scripts/scanSite.mjs   (exit code 1 on any hit)
import { readFileSync } from "node:fs";
import { findHits } from "./lib/retiredTerms.mjs";

const base = (process.env.SCAN_URL ?? "http://localhost:3100").replace(/\/$/, "");

// Routes come from siteConfig.routeLive, read as text so this script needs no TypeScript loader.
const config = readFileSync(new URL("../src/lib/siteConfig.ts", import.meta.url), "utf8");
const block = config.slice(config.indexOf("export const routeLive = {"), config.indexOf("} as const;", config.indexOf("export const routeLive = {")));
const routes = [...block.matchAll(/^\s*"(\/[^"]*)": true,/gm)].map((m) => m[1]);
const extras = ["/llms.txt", "/llms-full.txt"];

/** The Refund Policy's own name and links are allowed (review decision 2). */
const allowedNames = /Refund and Cancellation Policy|Refund Policy/g;

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

/** Visible text, the title, meta descriptions and JSON-LD of a page. Links' URLs are not text. */
function readable(html) {
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const metas = [...html.matchAll(/<meta (?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)" content="([^"]*)"/g)].map((m) => m[1]);
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  const alts = [...html.matchAll(/\s(?:alt|aria-label|title)="([^"]*)"/g)].map((m) => m[1]);
  return decode([body, ...metas, ...alts, ...ld].join("\n")).replace(/\s+/g, " ");
}

let failed = 0;
for (const path of [...routes, ...extras]) {
  const response = await fetch(base + path, { redirect: "manual" });
  if (response.status !== 200) {
    console.log(`SKIP ${path}: HTTP ${response.status}`);
    continue;
  }
  const raw = await response.text();
  // Web addresses are not wording (slugs such as /refund-policy); only the words around them count.
  const text = (path.endsWith(".txt") ? raw : readable(raw)).replace(/https?:\/\/[^\s)"']+/g, "").replace(allowedNames, "Policy");
  const hits = findHits(text);
  if (hits.length) {
    failed += hits.length;
    console.log(`\n${path}: ${hits.length} hit(s)`);
    for (const hit of hits) console.log(`  [${hit.label}] ...${hit.context}...`);
  }
}
console.log(failed ? `\nScan failed: ${failed} hit(s) across the site.` : `Scan passed: ${routes.length + extras.length} pages, 0 hits.`);
process.exit(failed ? 1 : 0);
