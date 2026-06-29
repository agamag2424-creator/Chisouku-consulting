import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { POST } from "@/app/api/course-waitlist/route";

const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_WAITLIST_URL = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

const VALID_PAYLOAD = {
  fullName: "Test User",
  workEmail: "test@example.com",
  phone: "+15555550123",
  company: "Example Co",
  role: "Programme Lead",
  country: "India",
  experienceYears: "8",
  whyJoining: "I need a governance operating model.",
  consent: true,
  optInFutureModules: false,
  optInFreeTemplates: false,
  website: "",
};

function requestFor(payload: unknown): Request {
  return new Request("http://localhost/api/course-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

afterEach(() => {
  globalThis.fetch = ORIGINAL_FETCH;
  if (ORIGINAL_WAITLIST_URL === undefined) {
    delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
  } else {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = ORIGINAL_WAITLIST_URL;
  }
});

describe("POST /api/course-waitlist", () => {
  it("fails closed when Apps Script reports a write failure with HTTP 200", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ success: false }), { status: 200 });

    const response = await POST(requestFor(VALID_PAYLOAD));

    assert.equal(response.status, 502);
    assert.match((await response.json()).error, /did not confirm the write/i);
  });

  it("returns success only after Apps Script confirms the save", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ success: true }), { status: 200 });

    const response = await POST(requestFor(VALID_PAYLOAD));

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
  });

  it("requires explicit boolean consent", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";

    const response = await POST(
      requestFor({ ...VALID_PAYLOAD, consent: "true" }),
    );

    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "Consent is required." });
  });
});
