import assert from "node:assert/strict";
import test from "node:test";
import { verifyAppsScriptResult } from "./apps-script-result";

test("accepts a documented Apps Script success response", async () => {
  const result = await verifyAppsScriptResult(
    new Response(JSON.stringify({ success: true }), { status: 200 }),
  );

  assert.deepEqual(result, { ok: true });
});

test("rejects a 200 Apps Script response when the sheet write failed", async () => {
  const result = await verifyAppsScriptResult(
    new Response(
      JSON.stringify({ success: false, error: "Exception: Sheet is full" }),
      { status: 200 },
    ),
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /Sheet is full/);
  }
});

test("rejects a 200 Apps Script response without a valid confirmation body", async () => {
  const result = await verifyAppsScriptResult(
    new Response("Saved", { status: 200 }),
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /valid confirmation/);
  }
});

test("reports deployment access failures from non-OK responses", async () => {
  const result = await verifyAppsScriptResult(
    new Response("Forbidden", { status: 403 }),
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 403);
    assert.match(result.error, /rejected access/);
  }
});
