import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { POST } from "./route";

const originalFetch = globalThis.fetch;
const originalWaitlistUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

const validPayload = {
  fullName: "Ada Lovelace",
  workEmail: "ada@example.com",
  phone: "+15555550123",
  company: "Analytical Engines Ltd",
  role: "Director",
  country: "GB",
  experienceYears: "10",
  whyJoining: "To govern AI deployments safely.",
  consent: true,
  optInFutureModules: false,
  optInFreeTemplates: true,
  website: "",
};

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalWaitlistUrl === undefined) {
    delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
  } else {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = originalWaitlistUrl;
  }
});

test("POST rejects Apps Script 200 responses that do not confirm persistence", async () => {
  process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
    "https://script.google.com/macros/s/test/exec";
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ success: false, error: "sheet failed" }), {
      status: 200,
    })) as typeof fetch;

  const response = await POST(
    new Request("https://chisokulabs.com/api/course-waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    }),
  );
  const body = (await response.json()) as { error?: string };

  assert.equal(response.status, 502);
  assert.match(body.error ?? "", /Failed to save nomination/);
  assert.match(body.error ?? "", /sheet failed/);
});
