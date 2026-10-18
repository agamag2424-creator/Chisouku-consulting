// Old URLs (E10.1, PRD 4.2). Not part of the app build (tsconfig excludes scripts/e2e).
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const redirects: [string, string][] = [
  ["/pmo-automation-audit", "/readiness-evidence-check"],
  ["/implementation", "/go-live-decision-review"],
  ["/sample-outputs", "/see-it-first"],
  ["/free-pmo-diagnostic", "/see-it-first"],
  ["/diagnostic-vs-audit", "/pricing"],
  ["/pmo-reporting-automation", "/method"],
  ["/pmo-automation-gcc", "/go-live-readiness-uae"],
  ["/pmo-automation-singapore", "/go-live-readiness-uae"],
  ["/case-studies/anything", "/see-it-first"],
  ["/ai-solutions/anything", "/go-live-decision-review"],
  ["/aeva", "/method"],
];

for (const [from, to] of redirects) {
  test(`${from} → 308 ${to}`, async ({ request }) => {
    const response = await request.get(base + from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers()["location"]).toBe(to);
  });
}
