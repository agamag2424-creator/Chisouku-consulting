// Old URLs (E10.1, PRD 4.2). Not part of the app build (tsconfig excludes scripts/e2e).
import http from "node:http";
import { expect, test } from "@playwright/test";

const base = (process.env.HERO_URL ?? "http://localhost:3100/").replace(/\/$/, "");

const redirects: [string, string, number][] = [
  ["/pmo-automation-audit", "/pmo-health-check", 308],
  ["/implementation", "/pmo-health-audit", 308],
  ["/sample-outputs", "/see-it-first", 308],
  ["/free-pmo-diagnostic", "/see-it-first", 308],
  ["/diagnostic-vs-audit", "/pricing", 308],
  ["/pmo-reporting-automation", "/method", 308],
  ["/pmo-automation-gcc", "/go-live-readiness-uae", 308],
  ["/pmo-automation-singapore", "/go-live-readiness-uae", 308],
  ["/case-studies/anything", "/see-it-first", 308],
  ["/ai-solutions/anything", "/pmo-health-audit", 308],
  ["/aeva", "/method", 308],
  ["/go-live-decision-review", "/pmo-health-audit", 301],
  ["/readiness-evidence-check", "/pmo-health-check", 301],
  ["/readiness", "/pmo-self-check", 301],
  ["/readiness/extra", "/pmo-self-check", 301],
];

for (const [from, to, status] of redirects) {
  test(`${from} → ${status} ${to}`, async ({ request }) => {
    const response = await request.get(base + from, { maxRedirects: 0 });
    expect(response.status()).toBe(status);
    expect(response.headers()["location"]).toBe(to);
  });
}

test("/readiness keeps the query string on the way to /pmo-self-check", async ({ request }) => {
  const response = await request.get(base + "/readiness?utm_source=newsletter&utm_content=self_check", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(301);
  expect(response.headers()["location"]).toBe("/pmo-self-check?utm_source=newsletter&utm_content=self_check");
});

function requestWithHost(
  pathAndQuery: string,
  host: string,
): Promise<{ status: number; location: string | undefined }> {
  const url = new URL(base);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: pathAndQuery,
        method: "GET",
        headers: { host },
      },
      (res) => {
        res.resume();
        const location = res.headers.location;
        resolve({
          status: res.statusCode ?? 0,
          location: Array.isArray(location) ? location[0] : location,
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

test("bare host 308s to www and keeps path and query", async () => {
  const response = await requestWithHost("/pricing?plan=audit", "chisokulabs.com");
  expect(response.status).toBe(308);
  expect(response.location).toBe("https://www.chisokulabs.com/pricing?plan=audit");
});

test("bare host root 308s to www", async () => {
  const response = await requestWithHost("/", "chisokulabs.com");
  expect(response.status).toBe(308);
  expect(response.location).toBe("https://www.chisokulabs.com");
});

for (const host of [
  "www.chisokulabs.com",
  "localhost",
  "chisouku-consulting.vercel.app",
  "chisokulabs-web-318661.azurewebsites.net",
]) {
  test(`${host} is not redirected to www`, async () => {
    const response = await requestWithHost("/pricing", host);
    expect(response.status).not.toBe(301);
    expect(response.status).not.toBe(308);
    expect(response.location ?? "").not.toContain("www.chisokulabs.com");
  });
}
