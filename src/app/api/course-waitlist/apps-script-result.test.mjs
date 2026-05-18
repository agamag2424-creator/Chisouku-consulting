import assert from "node:assert/strict";
import test from "node:test";

import { readAppsScriptResult } from "./apps-script-result.ts";

test("accepts an Apps Script success confirmation", async () => {
  const result = await readAppsScriptResult(
    Response.json({ success: true }, { status: 200 }),
  );

  assert.deepEqual(result, { success: true });
});

test("rejects an Apps Script 200 response that reports failure", async () => {
  const result = await readAppsScriptResult(
    Response.json({ success: false, error: "append failed" }, { status: 200 }),
  );

  assert.deepEqual(result, { success: false, error: "append failed" });
});

test("rejects an invalid Apps Script response body", async () => {
  const result = await readAppsScriptResult(
    new Response("not json", { status: 200 }),
  );

  assert.deepEqual(result, {
    success: false,
    error: "Apps Script returned an invalid response.",
  });
});
