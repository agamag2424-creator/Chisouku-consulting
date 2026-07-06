import assert from "node:assert/strict";
import test from "node:test";
import {
  saveToAppsScript,
  validateAppsScriptUrl,
} from "./apps-script";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockFetch(response: Response) {
  globalThis.fetch = (() => Promise.resolve(response)) as typeof fetch;
}

function mockFetchFailure() {
  const failingFetch: typeof fetch = () =>
    Promise.reject(new Error("network down"));
  globalThis.fetch = failingFetch;
}

test("validateAppsScriptUrl rejects missing or non-exec URLs", () => {
  assert.equal(
    validateAppsScriptUrl(undefined),
    "Waitlist endpoint is not configured.",
  );
  assert.match(
    validateAppsScriptUrl("https://script.google.com/macros/s/id/dev") ?? "",
    /ending with \/exec/,
  );
  assert.equal(
    validateAppsScriptUrl("https://script.google.com/macros/s/id/exec"),
    null,
  );
});

test("saveToAppsScript succeeds only on explicit success true", async () => {
  mockFetch(
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );

  const result = await saveToAppsScript(
    "https://script.google.com/macros/s/id/exec",
    { workEmail: "person@example.com" },
  );

  assert.deepEqual(result, { success: true });
});

test("saveToAppsScript rejects Apps Script success false bodies", async () => {
  mockFetch(
    new Response(
      JSON.stringify({ success: false, error: "Sheet append failed" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    ),
  );

  const result = await saveToAppsScript(
    "https://script.google.com/macros/s/id/exec",
    { workEmail: "person@example.com" },
  );

  assert.equal(result.success, false);
  if (!result.success) {
    assert.match(result.error, /Sheet append failed/);
  }
});

test("saveToAppsScript rejects invalid confirmation bodies", async () => {
  mockFetch(new Response("<html>redirect</html>", { status: 200 }));

  const result = await saveToAppsScript(
    "https://script.google.com/macros/s/id/exec",
    { workEmail: "person@example.com" },
  );

  assert.equal(result.success, false);
  if (!result.success) {
    assert.match(result.error, /did not confirm the write/);
  }
});

test("saveToAppsScript rejects non-OK upstream responses", async () => {
  mockFetch(new Response("Forbidden", { status: 403 }));

  const result = await saveToAppsScript(
    "https://script.google.com/macros/s/id/exec",
    { workEmail: "person@example.com" },
  );

  assert.equal(result.success, false);
  if (!result.success) {
    assert.match(result.error, /rejected access/);
  }
});

test("saveToAppsScript rejects fetch failures", async () => {
  mockFetchFailure();

  const result = await saveToAppsScript(
    "https://script.google.com/macros/s/id/exec",
    { workEmail: "person@example.com" },
  );

  assert.equal(result.success, false);
  if (!result.success) {
    assert.match(result.error, /request failed/);
  }
});
