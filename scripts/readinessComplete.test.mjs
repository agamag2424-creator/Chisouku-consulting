// POST /api/readiness-complete. Storage is off until the PMO self-check ships. Run: npm run test:unit
// Node needs a file extension on relative imports. The source uses the extensionless
// style the Next.js build resolves, so this file adds .ts while the tests load it.
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { describe, test } from "node:test";

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

const { handleCompletion } = await import("../src/lib/server/routes/readinessComplete.ts");
const { databaseConfig } = await import("../src/lib/server/db.ts");

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

/** Records every statement and its parameters. */
function recordingDb({ fail = false } = {}) {
  const calls = [];
  return {
    calls,
    async query(text, params) {
      calls.push({ text, params });
      if (fail) throw new Error("connection refused");
      return { rows: [], rowCount: 1 };
    },
  };
}

describe("POST /api/readiness-complete", () => {
  test("no database configured: 204 and nothing written", async () => {
    const response = await handleCompletion(completionRequest({ score_band: "ready" }), null);
    assert.equal(response.status, 204);
    assert.equal(await response.text(), "");
  });

  test("DATABASE_URL must be a postgres URL with a user and password; sslmode is dropped (TLS is always on)", () => {
    assert.equal(databaseConfig({}), null);
    assert.equal(databaseConfig({ DATABASE_URL: "   " }), null);
    assert.equal(databaseConfig({ DATABASE_URL: "https://example.com" }), null);
    assert.equal(databaseConfig({ DATABASE_URL: "postgres://example.postgres.database.azure.com/db" }), null);
    const config = databaseConfig({
      DATABASE_URL: "postgres://website_app:secret@example.postgres.database.azure.com:5432/chisokulabs?sslmode=disable",
    });
    assert.ok(config);
    assert.equal(config.connectionString.includes("sslmode"), false);
  });

  test("bad input is a 204 and nothing is written", async () => {
    const db = recordingDb();
    assert.equal((await handleCompletion(completionRequest(null, { broken: true }), db)).status, 204);
    assert.equal((await handleCompletion(completionRequest({ score_band: "excellent" }), db)).status, 204);
    assert.equal(db.calls.length, 0);
  });

  test("a configured database is not written, even when DATABASE_URL is set", async () => {
    const previous = process.env.DATABASE_URL;
    process.env.DATABASE_URL =
      "postgres://website_app:secret@example.postgres.database.azure.com:5432/chisokulabs";
    const db = recordingDb({ fail: true });
    try {
      assert.ok(databaseConfig(process.env));
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
      const response = await handleCompletion(completionRequest(personal), db);
      assert.equal(response.status, 204);
      assert.equal(await response.text(), "");
      assert.equal(db.calls.length, 0);
    } finally {
      if (previous === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = previous;
    }
  });
});
