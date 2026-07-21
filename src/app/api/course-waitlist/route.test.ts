import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { POST } from "./route";

const originalFetch = globalThis.fetch;
const originalWaitlistUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

const validPayload = {
  fullName: "Jane Doe",
  workEmail: "jane@example.com",
  phone: "+15555550123",
  company: "Example Co",
  role: "PMO Lead",
  country: "India",
  experienceYears: "8",
  whyJoining: "I need stronger AI governance.",
  consent: true,
  optInFutureModules: false,
  optInFreeTemplates: false,
  website: "",
};

describe("POST /api/course-waitlist", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (originalWaitlistUrl === undefined) {
      delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
    } else {
      process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = originalWaitlistUrl;
    }
  });

  it("rejects Apps Script responses that do not confirm persistence", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ success: false, error: "sheet append failed" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      })) as typeof fetch;

    const response = await POST(createRequest(validPayload));
    const data = (await response.json()) as { error?: string };

    assert.equal(response.status, 502);
    assert.match(data.error ?? "", /did not confirm the submission/);
  });

  it("rejects non-JSON success responses", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = (async () =>
      new Response("<html>Sign in</html>", {
        headers: { "Content-Type": "text/html" },
        status: 200,
      })) as typeof fetch;

    const response = await POST(createRequest(validPayload));

    assert.equal(response.status, 502);
  });

  it("returns success only when Apps Script confirms the save", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      })) as typeof fetch;

    const response = await POST(createRequest(validPayload));
    const data = (await response.json()) as { success?: boolean };

    assert.equal(response.status, 200);
    assert.equal(data.success, true);
  });
});

function createRequest(payload: unknown) {
  return new Request("https://chisokulabs.com/api/course-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
