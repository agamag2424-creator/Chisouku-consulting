// /pmo-self-check is a shell. /readiness 301s to it. Question and score checks wait for the researched bank.
//
//   HERO_URL=http://localhost:3100/ npx playwright test scripts/e2e/readiness.spec.ts
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

test("the self-check shell is one heading and does not post a completion", async ({ page }) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(new URL(request.url()).pathname);
  });
  expect((await page.goto(base + "/pmo-self-check", { waitUntil: "networkidle" }))?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("PMO self-check");
  await expect(page.getByText("The questions for this check are not published yet.")).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(0);
  expect(posts).not.toContain("/api/readiness-complete");
});

test("a production-like build noindexes the shell and leaves it out of the sitemap", async ({ request }) => {
  const response = await request.get(base + "/pmo-self-check");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toMatch(/noindex/);
  expect(html).toContain("PMO self-check");
  expect(html).toMatch(/<link rel="canonical" href="https:\/\/www\.chisokulabs\.com\/pmo-self-check"/);
  const xml = await (await request.get(base + "/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls.some((url) => url.endsWith("/pmo-self-check"))).toBe(false);
  expect(urls.some((url) => url.endsWith("/readiness"))).toBe(false);
});
