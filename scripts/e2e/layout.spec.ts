// Site chrome (E9.1 follow-up). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const callUrl =
  "https://calendly.com/chisokulabs/discovery-call?utm_source=chisokulabs&utm_medium=website&utm_campaign=discovery_call&utm_content=";

test("header and hero: Book a 30-minute call, then Discuss your programme", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/");

  const header = page.getByRole("banner").getByRole("link", { name: "Book a 30-minute call" });
  await expect(header).toBeVisible();
  await expect(header).toHaveAttribute("href", callUrl + "header");
  await expect(header).toHaveAttribute("target", "_blank");
  await expect(header).toHaveAttribute("rel", "noopener noreferrer");
  await expect(header).toHaveAttribute("data-cta", "book_call");

  const hero = page.locator("main > section").first();
  const heroCall = hero.getByRole("link", { name: "Book a 30-minute call" });
  const heroDiscuss = hero.getByRole("link", { name: "Discuss your programme" });
  await expect(heroCall).toHaveAttribute("href", callUrl + "hero");
  await expect(heroCall).toHaveAttribute("target", "_blank");
  await expect(heroCall).toHaveAttribute("rel", "noopener noreferrer");
  await expect(heroCall).toHaveAttribute("data-cta", "book_call");
  await expect(heroDiscuss).toHaveAttribute("href", "/contact?request=review");
  const order = await hero.locator("a").evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()));
  expect(order.slice(0, 2)).toEqual(["Book a 30-minute call", "Discuss your programme"]);
  await expect(hero.getByRole("link", { name: "Take the 12-question readiness check" })).toHaveCount(0);
  await expect(heroCall).toHaveAttribute("data-cta-variant", "inverse");
  await expect(heroDiscuss).toHaveAttribute("data-cta-variant", "inverse-outline");
});

test("hero calls stay inside the viewport at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/");
  const hero = page.locator("main > section").first();
  await expect(hero.getByRole("link", { name: "Book a 30-minute call" })).toBeVisible();
  await expect(hero.getByRole("link", { name: "Discuss your programme" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
});

test("mobile menu: Book a 30-minute call opens the header Calendly link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const call = page.getByRole("dialog").getByRole("link", { name: "Book a 30-minute call" });
  await expect(call).toBeVisible();
  await expect(call).toHaveAttribute("href", callUrl + "header");
  await expect(call).toHaveAttribute("target", "_blank");
  await expect(call).toHaveAttribute("rel", "noopener noreferrer");
  await expect(call).toHaveAttribute("data-cta", "book_call");
});

test("footer: brand, Site, Legal and Contact, with no market or guide column", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/");
  const headings = await page.locator("footer p").filter({ hasText: /^(Site|Legal|Contact)$/ }).evaluateAll((nodes) =>
    nodes.map((node) => Math.round(node.getBoundingClientRect().top)),
  );
  expect(headings).toHaveLength(3);
  expect(new Set(headings).size).toBe(1);
  await expect(page.locator("footer")).not.toContainText("Markets");
  await expect(page.locator("footer")).not.toContainText("Guides");
  await expect(page.locator("footer")).toContainText("© 2026 ChisokuLab Private Limited. All rights reserved.");
});
