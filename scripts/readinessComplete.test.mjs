// POST /api/readiness-complete. Run: npm run test:unit
// Node needs a file extension on relative imports. The route uses the extensionless
// style the Next.js build resolves, so this file adds .ts while the tests load it.
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { afterEach, beforeEach, describe, test } from "node:test";

registerHooks({
  resolve(specifier, context, nextResolve) {
    const parent = context.parentURL ?? "";
    const fromSource = parent.includes("/src/");
    const relative = specifier.startsWith("./") || specifier.startsWith("../");
    if (fromSource && relative && !/\.[cm]?[jt]sx?$/.test(specifier)) {
      return nextResolve(`${specifier}.ts`, context);
    }
    return nextResolve(specifier, context);
  },
});

const { POST } = await import("../src/app/api/readiness-complete/route.ts");

const ENV_KEYS = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];

function completionRequest(body, { broken = false } = {}) {
  return new Request("https://www.chisokulabs.com/api/readiness-complete", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.8",
      "x-real-ip": "203.0.113.8",
    },
    body: broken ? "{" : JSON.stringify(body),
  });
}

describe("POST /api/readiness-complete", { concurrency: 1 }, () => {
  /** @type {Record<string, string | undefined>} */
  let savedEnv;
  /** @type {typeof fetch} */
  let savedFetch;

  beforeEach(() => {
    savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
    savedFetch = globalThis.fetch;
    for (const key of ENV_KEYS) delete process.env[key];
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (savedEnv[key] === undefined) delete process.env[key];
      else process.env[key] = savedEnv[key];
    }
    globalThis.fetch = savedFetch;
  });

  test("a missing env var returns 204 and does not call Supabase", async () => {
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      throw new Error("Supabase must not be called");
    };

    const missingBoth = await POST(completionRequest("{", { broken: true }));
    assert.equal(missingBoth.status, 204);
    assert.equal(await missingBoth.text(), "");

    process.env.SUPABASE_URL = "https://example.supabase.co";
    const missingKey = await POST(completionRequest({ score_band: "ready", email: "person@example.com" }));
    assert.equal(missingKey.status, 204);

    delete process.env.SUPABASE_URL;
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
    const missingUrl = await POST(completionRequest({ score_band: "ready" }));
    assert.equal(missingUrl.status, 204);

    process.env.SUPABASE_URL = "   ";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "   ";
    const blank = await POST(completionRequest({ score_band: "ready" }));
    assert.equal(blank.status, 204);

    process.env.SUPABASE_URL = "http://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
    const insecure = await POST(completionRequest({ score_band: "ready" }));
    assert.equal(insecure.status, 204);

    assert.equal(calls, 0);
  });

  test("the Supabase payload has no personal data", async () => {
    process.env.SUPABASE_URL = "https://example.supabase.co/rest/v1/";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

    const personal = {
      score_band: "partly_ready",
      utm_source: "linkedin",
      utm_medium: "social",
      utm_campaign: "person%40example.com",
      referrer_host: "https://www.linkedin.com/in/someone?email=person@example.com&name=Example+Person",
      name: "Example Person",
      email: "person@example.com",
      ip: "203.0.113.8",
      answers: ["yes", "partly", "no", "yes", "partly", "no", "yes", "partly", "no", "yes", "partly", "no"],
      weakest_area: "Scope and go-live date",
      message: "Example Person, person@example.com, 203.0.113.8",
    };

    /** @type {{ url: string, headers: Record<string, string>, body: string } | null} */
    let captured = null;
    globalThis.fetch = async (url, init) => {
      const headers = init?.headers ?? {};
      captured = {
        url: String(url),
        headers: Object.fromEntries(Object.entries(headers)),
        body: String(init?.body ?? ""),
      };
      return new Response(null, { status: 201 });
    };

    const response = await POST(completionRequest(personal));
    assert.equal(response.status, 204);
    assert.ok(captured);

    assert.equal(captured.url, "https://example.supabase.co/rest/v1/readiness_completions");
    assert.deepEqual(Object.keys(captured.headers).sort(), ["Authorization", "Content-Type", "Prefer", "apikey"]);
    assert.equal(captured.headers.Authorization, "Bearer test-service-role-key");
    assert.equal(captured.headers.apikey, "test-service-role-key");
    assert.equal(captured.headers["x-forwarded-for"], undefined);
    assert.equal(captured.headers["x-real-ip"], undefined);

    const row = JSON.parse(captured.body);
    assert.deepEqual(row, {
      score_band: "partly_ready",
      utm_source: "linkedin",
      utm_medium: "social",
      utm_campaign: null,
      referrer_host: "www.linkedin.com",
    });
    assert.equal(captured.body.includes("person@example.com"), false);
    assert.equal(captured.body.includes("Example Person"), false);
    assert.equal(captured.body.includes("203.0.113.8"), false);
    assert.equal(captured.body.includes("answers"), false);
    assert.equal(captured.body.includes("weakest_area"), false);
    assert.equal(captured.body.includes("test-service-role-key"), false);
  });
});
