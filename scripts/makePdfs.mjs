#!/usr/bin/env node
// Builds the two "Before you book" PDFs in public/documents (change 1):
// - how-a-pmo-health-check-works.pdf from /_ui/pdf/how-it-works (a preview or dev build; it 404s in production)
// - chisokulabs-terms-of-engagement.pdf from /terms, printed as it stands, with its "Last updated" date
// Usage: PDF_URL=http://localhost:3100 node scripts/makePdfs.mjs   (needs Playwright)
import { chromium } from "playwright";

const base = (process.env.PDF_URL ?? "http://localhost:3100").replace(/\/$/, "");
const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto(`${base}/_ui/pdf/how-it-works`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.addStyleTag({ content: "header:not([class*='border-b']), body > div > footer { display: none !important } .site-main { padding: 0 !important }" });
await page.pdf({ path: "public/documents/how-a-pmo-health-check-works.pdf", format: "A4", printBackground: true, pageRanges: "1", margin: { top: "0", bottom: "0", left: "0", right: "0" } });
console.log("public/documents/how-a-pmo-health-check-works.pdf");

await page.goto(`${base}/terms`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: "public/documents/chisokulabs-terms-of-engagement.pdf",
  format: "A4",
  printBackground: false,
  margin: { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" },
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate: '<div style="width:100%;font-size:8px;color:#5f6a75;text-align:center">ChisokuLabs · Terms of engagement · <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
});
console.log("public/documents/chisokulabs-terms-of-engagement.pdf");
await browser.close();
