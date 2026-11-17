// PMO self-check (September port PRD, Epic 5): completes on desktop and mobile, scores in the browser and sends no answer.
import { expect, test, type Page } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

/** Answers every question on screen with the given level label, then moves on, until the result shows. */
async function complete(page: Page, pick: (questionId: string) => string) {
  await page.getByRole("button", { name: "Start the self-check" }).click();
  for (let step = 0; step < 10; step++) {
    const fields = page.locator("fieldset[data-question]");
    const count = await fields.count();
    for (let i = 0; i < count; i++) {
      const field = fields.nth(i);
      const id = (await field.getAttribute("data-question")) ?? "";
      await field.getByRole("radio", { name: new RegExp(`^${pick(id)}`) }).check();
    }
    await page.getByRole("button", { name: step === 9 ? "See my result" : "Next" }).click();
  }
}

for (const viewport of [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 375, height: 812 },
]) {
  test(`${viewport.name}: completes, shows the band, flags and both CTAs, and sends no answer`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.route("**/_vercel/insights/**", (route) => route.fulfill({ status: 200, body: "" }));
    const sent: string[] = [];
    page.on("request", (request) => {
      sent.push(`${request.url()}\n${request.postData() ?? ""}`);
    });

    await page.goto(base + "/pmo-self-check", { waitUntil: "networkidle" });
    // Q7 (RAID) at Ad hoc flags Risk and RAID; four "Not sure" answers make the result provisional.
    const unsure = new Set(["Q4", "Q9", "Q12", "Q14"]);
    await complete(page, (id) => (id === "Q7" ? "Ad hoc" : unsure.has(id) ? "Not sure" : "Defined"));

    const result = page.locator("[data-result-band]");
    await expect(result).toHaveAttribute("data-result-band", "building-consistency");
    await expect(page.getByRole("heading", { level: 2, name: "Building consistency" })).toBeVisible();
    await expect(page.locator("[data-provisional]")).toContainText("4 of 15 answers");
    await expect(page.locator("[data-flagged]")).toContainText("Risk and RAID");
    await expect(page.locator('[data-dimension="D"]')).toContainText("1.0");
    await expect(page.getByText("The PMO Health Check fills in this same scorecard", { exact: false })).toBeVisible();
    await expect(page.getByText("What the PMO Health Check would examine next")).toBeVisible();
    await expect(page.getByRole("link", { name: "Book a 20-minute call" }).last()).toHaveAttribute("href", /utm_content=self_check_result/);
    await expect(page.getByRole("link", { name: "About the PMO Health Check" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Print or save as PDF" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);

    // Privacy: no request carries an answer, a level label or a question id.
    const traffic = sent.join("\n");
    expect(traffic).not.toMatch(/Ad hoc|Emerging|Measured|Improving|Not sure|"Q\d+"|answer-Q|unsure/);

    // The only event is self_check_complete with the band.
    const events = await page.evaluate(() =>
      ((window as unknown as { vaq?: [string, { name?: string; data?: unknown }][] }).vaq ?? []).filter(([k]) => k === "event").map(([, p]) => p),
    );
    expect(events.filter((e) => e.name === "self_check_complete")).toEqual([
      { name: "self_check_complete", data: { band: "building-consistency" } },
    ]);
  });
}

test("all 5s give Measured and improving with nothing flagged", async ({ page }) => {
  await page.goto(base + "/pmo-self-check");
  await complete(page, () => "Improving");
  await expect(page.locator("[data-result-band]")).toHaveAttribute("data-result-band", "measured-improving");
  await expect(page.locator("[data-flagged]")).toContainText("None.");
  await expect(page.locator("[data-provisional]")).toHaveCount(0);
});

test("the page is indexed, listed in nav and footer, and names no framework", async ({ page, request }) => {
  const html = await (await request.get(base + "/pmo-self-check")).text();
  expect(html).not.toMatch(/noindex/);
  await page.goto(base + "/");
  await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Self-check" })).toHaveAttribute("href", "/pmo-self-check");
  await expect(page.locator('footer a[href="/pmo-self-check"]')).toHaveCount(1);
  await page.goto(base + "/pmo-self-check");
  expect(await page.locator("main").innerText()).not.toMatch(/P3M3|P3O|PRINCE2|PMBOK|OPM3|CMMI|ISO 21/);
  await page.getByRole("link", { name: "Methodology note" }).first().click();
  await expect(page).toHaveURL(base + "/pmo-self-check/methodology");
  await expect(page.getByText("is not affiliated with or endorsed by these organisations", { exact: false })).toBeVisible();
});

test("sitemap and llms.txt list the self-check", async ({ request }) => {
  expect(await (await request.get(base + "/sitemap.xml")).text()).toContain("https://www.chisokulabs.com/pmo-self-check");
  expect(await (await request.get(base + "/llms.txt")).text()).toContain("/pmo-self-check");
});
