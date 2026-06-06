import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { POST } from "./route";

const originalFetch = globalThis.fetch;
const originalWaitlistUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalWaitlistUrl === undefined) {
    delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
  } else {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = originalWaitlistUrl;
  }
});

describe("POST /api/course-waitlist", () => {
  it("does not report success when Apps Script returns success false", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({ success: false, error: "sheet append failed" }),
        { status: 200 },
      );

    const response = await POST(makeRequest(validPayload()));
    const body = (await response.json()) as { error?: string };

    assert.equal(response.status, 502);
    assert.match(body.error ?? "", /Failed to save nomination/);
    assert.match(body.error ?? "", /sheet append failed/);
  });

  it("reports success only after Apps Script explicitly confirms the save", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ success: true }), { status: 200 });

    const response = await POST(makeRequest(validPayload()));
    const body = (await response.json()) as { success?: boolean };

    assert.equal(response.status, 200);
    assert.equal(body.success, true);
  });
});

function makeRequest(payload: Record<string, unknown>) {
  return new Request("http://localhost/api/course-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

function validPayload() {
  return {
    fullName: "Ada Lovelace",
    workEmail: "ada@example.com",
    phone: "+1 555 0100",
    company: "Analytical Engines Ltd",
    role: "CTO",
    country: "UK",
    experienceYears: "10",
    whyJoining: "Building AI governance capability.",
    consent: true,
    optInFutureModules: false,
    optInFreeTemplates: false,
  };
}
