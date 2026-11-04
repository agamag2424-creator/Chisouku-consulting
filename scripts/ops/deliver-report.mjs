#!/usr/bin/env node
// Deliver a Go-Live Readiness Report: emails the PDF to the buyer (with the Pack upgrade link) and records the
// delivery date, which starts the 60-day Pack credit. Ops only.
//
// Usage:
//   ADMIN_API_TOKEN=... node scripts/ops/deliver-report.mjs --order <order-id> --pdf <report.pdf> [--site https://www.chisokulabs.com]
//
// The token is the ADMIN_API_TOKEN set in Vercel for that environment. For a preview deployment, pass --site with
// the preview address.
import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    order: { type: "string" },
    pdf: { type: "string" },
    site: { type: "string", default: "https://www.chisokulabs.com" },
  },
});

const token = process.env.ADMIN_API_TOKEN;
if (!values.order || !values.pdf || !token) {
  console.error("Usage: ADMIN_API_TOKEN=... node scripts/ops/deliver-report.mjs --order <order-id> --pdf <report.pdf> [--site <url>]");
  process.exit(2);
}

const pdf = readFileSync(values.pdf);
if (pdf.subarray(0, 4).toString() !== "%PDF") {
  console.error(`${values.pdf} is not a PDF.`);
  process.exit(2);
}

const response = await fetch(`${values.site.replace(/\/+$/, "")}/api/admin/deliver-report`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ orderId: values.order, pdfBase64: pdf.toString("base64"), filename: basename(values.pdf) }),
});
const result = await response.json().catch(() => ({}));
if (!response.ok) {
  console.error(`Not delivered (${response.status}): ${result.error ?? "unknown error"}`);
  process.exit(1);
}
console.log(`Delivered. Report emailed; delivery recorded at ${result.deliveredAt}.`);
