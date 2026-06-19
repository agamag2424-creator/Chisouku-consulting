import assert from "node:assert/strict";
import test from "node:test";
import { verifyAppsScriptSave } from "./apps-script";

test("accepts an explicit Apps Script success response", async () => {
  const result = await verifyAppsScriptSave(
    new Response(JSON.stringify({ success: true }), { status: 200 }),
    "save nomination",
  );

  assert.deepEqual(result, { ok: true });
});

test("rejects Apps Script application errors returned with HTTP 200", async () => {
  const result = await verifyAppsScriptSave(
    new Response(
      JSON.stringify({ success: false, error: "Sheet append failed" }),
      { status: 200 },
    ),
    "save nomination",
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /Failed to save nomination/);
    assert.match(result.error, /Sheet append failed/);
  }
});

test("rejects empty successful responses because no write is confirmed", async () => {
  const result = await verifyAppsScriptSave(
    new Response("", { status: 200 }),
    "save signup",
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /empty response/);
  }
});

test("rejects non-2xx Apps Script responses", async () => {
  const result = await verifyAppsScriptSave(
    new Response("Forbidden", { status: 403 }),
    "save nomination",
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /Apps Script rejected access/);
    assert.match(result.error, /status: 403/);
  }
});
