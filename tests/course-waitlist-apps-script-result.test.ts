import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { POST } from "../src/app/api/course-waitlist/route";
import { validateAppsScriptResponse } from "../src/app/api/course-waitlist/apps-script-result";

describe("validateAppsScriptResponse", () => {
  it("accepts an explicit Apps Script success response", async () => {
    const result = await validateAppsScriptResponse(
      Response.json({ success: true }),
    );

    assert.deepEqual(result, { ok: true });
  });

  it("rejects a 200 response when Apps Script reports failure", async () => {
    const result = await validateAppsScriptResponse(
      Response.json({ success: false, error: "Sheet append failed" }),
    );

    assert.deepEqual(result, {
      ok: false,
      reason: "Apps Script reported failure: Sheet append failed",
    });
  });

  it("rejects a 200 response without an explicit success confirmation", async () => {
    const result = await validateAppsScriptResponse(Response.json({}));

    assert.deepEqual(result, {
      ok: false,
      reason: "Apps Script did not confirm the nomination was saved.",
    });
  });

  it("rejects unreadable success responses", async () => {
    const result = await validateAppsScriptResponse(
      new Response("not json", { status: 200 }),
    );

    assert.deepEqual(result, {
      ok: false,
      reason: "Apps Script returned an unreadable response.",
    });
  });
});

describe("POST /api/course-waitlist", () => {
  const appScriptUrl = "https://script.google.com/macros/s/test/exec";

  it("rejects truthy non-boolean consent values", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = appScriptUrl;

    const response = await POST(
      new Request("https://chisokulabs.com/api/course-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload({ consent: "false" })),
      }),
    );

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "Consent is required." });
  });

  it("does not report success when Apps Script returns success false", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = appScriptUrl;

    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      Response.json({ success: false, error: "Sheet append failed" });

    try {
      const response = await POST(
        new Request("https://chisokulabs.com/api/course-waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validPayload()),
        }),
      );

      assert.equal(response.status, 502);
      assert.deepEqual(await response.json(), {
        error:
          "Failed to save nomination. Apps Script reported failure: Sheet append failed",
      });
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});

function validPayload(overrides: Record<string, unknown> = {}) {
  return {
    fullName: "Ada Lovelace",
    workEmail: "ada@example.com",
    phone: "+15551234567",
    company: "Analytical Engines",
    role: "CTO",
    country: "GB",
    experienceYears: "10",
    whyJoining: "To build safer AI governance.",
    consent: true,
    optInFutureModules: false,
    optInFreeTemplates: false,
    website: "",
    ...overrides,
  };
}
