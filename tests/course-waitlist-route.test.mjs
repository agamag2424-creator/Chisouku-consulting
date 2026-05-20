import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

const { POST } = await import("../src/app/api/course-waitlist/route.ts");

const originalFetch = globalThis.fetch;
const originalUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalUrl === undefined) {
    delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
  } else {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = originalUrl;
  }
});

test("returns success only when Apps Script confirms the sheet write", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/example/exec";
  globalThis.fetch = async () =>
    Response.json({ success: true }, { status: 200 });

  const response = await POST(makeRequest());
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, { success: true });
});

test("rejects Apps Script 200 responses when the sheet write failed", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/example/exec";
  globalThis.fetch = async () =>
    Response.json(
      { success: false, error: "Exception: Sheet is read only" },
      { status: 200 },
    );

  const response = await POST(makeRequest());
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.match(body.error, /Failed to save nomination/);
  assert.match(body.error, /Sheet is read only/);
});

test("rejects Apps Script 200 responses without readable JSON confirmation", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/example/exec";
  globalThis.fetch = async () =>
    new Response("saved", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });

  const response = await POST(makeRequest());
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.match(body.error, /did not confirm the sheet write/);
});

function makeRequest() {
  return new Request("https://chisokulabs.com/api/course-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Alex Morgan",
      workEmail: "alex@example.com",
      phone: "+1 555 0100",
      company: "ExampleCo",
      role: "PMO Director",
      country: "United States",
      experienceYears: "12",
      whyJoining: "I need stronger AI governance for programme delivery.",
      consent: true,
      optInFutureModules: true,
      optInFreeTemplates: false,
      website: "",
    }),
  });
}
