import assert from "node:assert/strict";
import { test } from "node:test";
import { verifyAppsScriptResponse } from "./apps-script";

test("verifyAppsScriptResponse accepts explicit success confirmation", async () => {
  const result = await verifyAppsScriptResponse(
    new Response(JSON.stringify({ success: true }), { status: 200 }),
  );

  assert.deepEqual(result, { ok: true });
});

test("verifyAppsScriptResponse rejects explicit upstream failure", async () => {
  const result = await verifyAppsScriptResponse(
    new Response(JSON.stringify({ success: false, error: "sheet failed" }), {
      status: 200,
    }),
  );

  assert.deepEqual(result, {
    ok: false,
    error:
      "Apps Script did not confirm that the submission was saved. Apps Script reported: sheet failed",
  });
});

test("verifyAppsScriptResponse rejects invalid success confirmations", async () => {
  const result = await verifyAppsScriptResponse(
    new Response("not json", { status: 200 }),
  );

  assert.deepEqual(result, {
    ok: false,
    error: "Apps Script returned an invalid confirmation.",
  });
});

test("verifyAppsScriptResponse rejects non-2xx responses", async () => {
  const result = await verifyAppsScriptResponse(
    new Response(JSON.stringify({ success: true }), { status: 403 }),
  );

  assert.deepEqual(result, {
    ok: false,
    error:
      "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.",
  });
});
