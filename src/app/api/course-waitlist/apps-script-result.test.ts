import assert from "node:assert/strict";
import test from "node:test";
import { verifyAppsScriptWrite } from "./apps-script-result";

test("accepts an explicit Apps Script write confirmation", async () => {
  const result = await verifyAppsScriptWrite(
    new Response(JSON.stringify({ success: true }), { status: 200 }),
  );

  assert.deepEqual(result, { ok: true });
});

test("rejects an Apps Script failure payload sent with HTTP 200", async () => {
  const result = await verifyAppsScriptWrite(
    new Response(
      JSON.stringify({ success: false, error: "Spreadsheet access denied" }),
      { status: 200 },
    ),
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(result.error, /did not confirm/);
    assert.match(result.error, /Spreadsheet access denied/);
  }
});

test("rejects a malformed Apps Script success response", async () => {
  const result = await verifyAppsScriptWrite(
    new Response("saved", { status: 200 }),
  );

  assert.deepEqual(result, {
    ok: false,
    error: "Apps Script returned an invalid response.",
  });
});

test("rejects non-2xx Apps Script responses", async () => {
  const result = await verifyAppsScriptWrite(new Response("", { status: 403 }));

  assert.deepEqual(result, {
    ok: false,
    error:
      "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.",
  });
});
