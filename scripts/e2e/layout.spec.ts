// Site chrome (E9.1 follow-up). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const callUrl =
  "https://calendly.com/chisokulabs/discovery-call?utm_source=chisokulabs&utm_medium=website&utm_campaign=discovery_call&utm_content=";

test("header and hero: Arrange a 20-minute call, then the PMO self-check", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/");

  const header = page.getByRole("banner").getByRole("link", { name: "Arrange a 20-minute call" });
  await expect(header).toBeVisible();
  await expect(header).toHaveAttribute("href", callUrl + "header");
  await expect(header).toHaveAttribute("target", "_blank");
  await expect(header).toHaveAttribute("rel", "noopener noreferrer");
  await expect(header).toHaveAttribute("data-cta", "book_call");

  const hero = page.locator("main > section").first();
  const heroCall = hero.getByRole("link", { name: "Arrange a 20-minute call" });
  const heroSelfCheck = hero.getByText("Take the PMO self-check (5 minutes)");
  await expect(heroCall).toHaveAttribute("href", callUrl + "hero");
  await expect(heroCall).toHaveAttribute("target", "_blank");
  await expect(heroCall).toHaveAttribute("rel", "noopener noreferrer");
  await expect(heroCall).toHaveAttribute("data-cta", "book_call");
  await expect(heroSelfCheck).toBeVisible();
  const order = await hero.locator(".hero-actions a, .hero-actions span").evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()));
  expect(order.slice(0, 2)).toEqual(["Arrange a 20-minute call", "Take the PMO self-check (5 minutes)"]);
  await expect(heroCall).toHaveAttribute("data-cta-variant", "primary");
});

test("hero calls stay inside the viewport at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/");
  const hero = page.locator("main > section").first();
  await expect(hero.getByRole("link", { name: "Arrange a 20-minute call" })).toBeVisible();
  await expect(hero.getByText("Take the PMO self-check (5 minutes)")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
});

test("mobile menu: Arrange a 20-minute call opens the header Calendly link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const call = page.getByRole("dialog").getByRole("link", { name: "Arrange a 20-minute call" });
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
  // Refund and Shipping are grouped under one "Payment terms" link; both pages stay (Razorpay needs them).
  const legal = page.locator("footer");
  await expect(legal.getByRole("link", { name: "Payment terms" })).toHaveAttribute("href", "/payment-terms");
  await expect(legal.getByRole("link", { name: /Refund|Shipping/ })).toHaveCount(0);
  await page.goto(base + "/payment-terms");
  await expect(page.locator("main").getByRole("link", { name: /Refund and Cancellation Policy/ })).toHaveAttribute("href", "/refund-policy");
  await expect(page.locator("main").getByRole("link", { name: /Shipping and Delivery Policy/ })).toHaveAttribute("href", "/shipping-policy");
});

const companyLine =
  "ChisokuLabs is a trading name of ChisokuLab Private Limited, a company registered in India, CIN U62099UP2025PTC237187. Registered office: 190X/6/1, Kalindipuram, Prayagraj, Uttar Pradesh 211011, India.";

test("footer company line is on every page, above the copyright", async ({ request }) => {
  const config = await (await request.get(base + "/sitemap.xml")).text();
  const paths = [...config.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace("https://www.chisokulabs.com", "") || "/");
  expect(paths.length).toBeGreaterThan(10);
  for (const path of paths) {
    const html = await (await request.get(base + path)).text();
    const footer = html.slice(html.lastIndexOf("<footer"));
    const text = footer.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
    expect(text, path).toContain(companyLine);
    expect(text.indexOf(companyLine), path).toBeLessThan(text.indexOf("© 2026"));
    expect(text, path).toContain(dpiitLine);
    expect(text.indexOf(dpiitLine), path).toBeLessThan(text.indexOf("© 2026"));
  }
});

const dpiitLine = "DPIIT-recognised startup · Certificate No. DIPP293919";

test("DPIIT recognition: text only, in the footer and one sentence on About", async ({ page }) => {
  await page.goto(base + "/about");
  await expect(page.locator("main")).toContainText(
    "ChisokuLab Private Limited is recognised as a startup by DPIIT, Government of India (Certificate No. DIPP293919).",
  );
  await expect(page.locator("footer [data-dpiit-line]")).toHaveText(dpiitLine);
  // Text only: no emblem, logo or certificate image anywhere on the page.
  await expect(page.locator("[data-dpiit-line] img, [data-dpiit-line] svg")).toHaveCount(0);
  await expect(page.locator('img[alt*="DPIIT" i], img[alt*="Startup India" i], img[src*="emblem" i], img[src*="dpiit" i]')).toHaveCount(0);
});
