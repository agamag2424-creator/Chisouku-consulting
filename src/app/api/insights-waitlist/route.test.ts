import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { POST } from "./route";

const originalFetch = globalThis.fetch;
const originalWaitlistUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

describe("POST /api/insights-waitlist", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
    if (originalWaitlistUrl === undefined) {
      delete process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;
    } else {
      process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL = originalWaitlistUrl;
    }
  });

  it("persists the email through Apps Script before returning success", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    let forwardedPayload: Record<string, unknown> | undefined;
    globalThis.fetch = (async (_input, init) => {
      forwardedPayload = JSON.parse(String(init?.body ?? "{}")) as Record<
        string,
        unknown
      >;
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }) as typeof fetch;

    const response = await POST(createRequest({ email: "reader@example.com" }));
    const data = (await response.json()) as { success?: boolean };

    assert.equal(response.status, 200);
    assert.equal(data.success, true);
    assert.equal(forwardedPayload?.sourcePage, "/insights");
    assert.equal(forwardedPayload?.workEmail, "reader@example.com");
  });

  it("rejects Apps Script responses that do not confirm persistence", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ success: false }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      })) as typeof fetch;

    const response = await POST(createRequest({ email: "reader@example.com" }));
    const data = (await response.json()) as { error?: string };

    assert.equal(response.status, 502);
    assert.match(data.error ?? "", /did not confirm the row was saved/);
  });

  it("rejects invalid email addresses without forwarding them", async () => {
    process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL =
      "https://script.google.com/macros/s/test/exec";
    let fetchCalled = false;
    globalThis.fetch = (async () => {
      fetchCalled = true;
      return new Response(JSON.stringify({ success: true }));
    }) as typeof fetch;

    const response = await POST(createRequest({ email: "not-an-email" }));
    const data = (await response.json()) as { error?: string };

    assert.equal(response.status, 400);
    assert.equal(fetchCalled, false);
    assert.equal(data.error, "Please provide a valid email.");
  });
});

function createRequest(payload: unknown) {
  return new Request("https://chisokulabs.com/api/insights-waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
