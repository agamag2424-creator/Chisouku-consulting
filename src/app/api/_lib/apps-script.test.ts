import assert from "node:assert/strict";
import test from "node:test";
import { verifyAppsScriptResponse } from "./apps-script";

test("accepts only explicit Apps Script success confirmation", async () => {
  const result = await verifyAppsScriptResponse(
    new Response(JSON.stringify({ success: true }), { status: 200 }),
  );

  assert.deepEqual(result, { success: true });
});

test("rejects Apps Script false success bodies returned with HTTP 200", async () => {
  const result = await verifyAppsScriptResponse(
    new Response(
      JSON.stringify({ success: false, error: "Sheet append failed" }),
      { status: 200 },
    ),
  );

  assert.deepEqual(result, {
    success: false,
    error: "Sheet append failed",
  });
});

test("rejects invalid confirmation bodies returned with HTTP 200", async () => {
  const result = await verifyAppsScriptResponse(
    new Response("ok", { status: 200 }),
  );

  assert.deepEqual(result, {
    success: false,
    error: "Apps Script returned an invalid confirmation response.",
  });
});

test("rejects non-OK Apps Script responses", async () => {
  const result = await verifyAppsScriptResponse(
    new Response(JSON.stringify({ success: true }), { status: 403 }),
  );

  assert.deepEqual(result, {
    success: false,
    error:
      "Apps Script rejected access. Ensure deployment access is set to 'Anyone'. (status: 403)",
  });
});
