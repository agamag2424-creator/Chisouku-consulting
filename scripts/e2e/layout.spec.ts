// Site chrome (E9.1 follow-up). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

test("footer: brand plus four link columns side by side at 1440", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/");
  const headings = await page.locator("footer").getByText(/^(Site|Markets|Guides|Contact)$/).evaluateAll((nodes) =>
    nodes.map((node) => Math.round(node.getBoundingClientRect().top)),
  );
  expect(headings).toHaveLength(4);
  expect(new Set(headings).size).toBe(1);
});
