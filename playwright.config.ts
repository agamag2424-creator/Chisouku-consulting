import { defineConfig } from "@playwright/test";

// Browser tests in scripts/e2e, run against a built site: `npm run build && npm start -- -p 3100`, then
// `npm run test:e2e`. Set PREVIEW=1 against a preview build (VERCEL_ENV=preview) to include the /_ui pages.
export default defineConfig({
  testDir: "scripts/e2e",
  outputDir: "test-results",
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02, animations: "disabled" } },
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  use: { baseURL: process.env.HERO_URL ?? "http://localhost:3100/" },
});
