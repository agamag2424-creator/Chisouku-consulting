import assert from "node:assert/strict";
import test from "node:test";
import {
  getAppsScriptFailureMessage,
  readAppsScriptResult,
} from "./apps-script";

test("accepts Apps Script responses with success true", async () => {
  const result = await readAppsScriptResult(
    new Response(JSON.stringify({ success: true })),
  );

  assert.deepEqual(result, { ok: true });
});

test("rejects Apps Script responses with success false", async () => {
  const result = await readAppsScriptResult(
    new Response(JSON.stringify({ success: false, error: "Sheet append failed" })),
  );

  assert.deepEqual(result, {
    ok: false,
    reason: "explicit-failure",
    error: "Sheet append failed",
  });
  assert.equal(
    getAppsScriptFailureMessage(result),
    "Apps Script reported: Sheet append failed",
  );
});

test("rejects Apps Script responses without a success confirmation", async () => {
  const result = await readAppsScriptResult(new Response(JSON.stringify({})));

  assert.deepEqual(result, { ok: false, reason: "missing-success" });
});

test("rejects Apps Script responses with invalid JSON", async () => {
  const result = await readAppsScriptResult(new Response("ok"));

  assert.deepEqual(result, { ok: false, reason: "invalid-json" });
});
