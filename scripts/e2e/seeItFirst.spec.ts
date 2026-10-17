// See it first (E4). Not part of the app build (tsconfig excludes scripts/e2e).
//
// Run against a local production build (see hero.spec.ts):
//   HERO_URL=http://localhost:3100/ npx -y @playwright/test@1.56.1 test scripts/e2e
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");
const pdf = "/documents/chisokulabs-go-live-decision-pack-illustrative.pdf";

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 360, height: 800 },
]) {
  test(`see-it-first at ${viewport.width}px: both pages, PDF download, no form, no horizontal scroll`, async ({ page }) => {
    await page.setViewportSize(viewport);
    expect((await page.goto(base + "/see-it-first", { waitUntil: "networkidle" }))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("See the work before you talk to us");
    const pack = page.locator("#sample-pack");
    const images = pack.getByRole("img", { name: /^Sample decision pack, page [12]/ });
    await expect(images).toHaveCount(2);
    await images.last().scrollIntoViewIfNeeded();
    for (const image of await images.all()) {
      await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    const download = pack.getByRole("link", { name: "Download the PDF" });
    await expect(download).toHaveAttribute("href", pdf);
    await expect(download).toHaveAttribute("download", "");
    await expect(page.locator("form")).toHaveCount(0); // no form to view or download
    await expect(page.getByText("Illustrative example. Fictional programme. Not a client engagement.").first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("the PDF is served", async ({ request }) => {
  const response = await request.get(base + pdf);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).length).toBeLessThan(1024 * 1024);
});

test("homepage links to the sample pack now work", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "See a full sample decision pack" }).first().click();
  await expect(page).toHaveURL(base + "/see-it-first#sample-pack");
  await expect(page.locator("#sample-pack")).toBeInViewport();
});
