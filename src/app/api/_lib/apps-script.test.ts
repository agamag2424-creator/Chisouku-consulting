import assert from "node:assert/strict";
import test from "node:test";
import { parseAppsScriptResult } from "./apps-script";

test("accepts an explicit Apps Script success confirmation", () => {
  assert.deepEqual(parseAppsScriptResult('{"success":true}'), { ok: true });
});

test("rejects Apps Script failures even when the HTTP status was 200", () => {
  assert.deepEqual(parseAppsScriptResult('{"success":false,"error":"sheet full"}'), {
    ok: false,
    error:
      "Apps Script did not confirm the submission was saved. Apps Script error: sheet full",
  });
});

test("rejects invalid Apps Script JSON", () => {
  assert.deepEqual(parseAppsScriptResult("Saved"), {
    ok: false,
    error: "Apps Script did not return a valid JSON success confirmation.",
  });
});

test("rejects JSON that does not confirm persistence", () => {
  assert.deepEqual(parseAppsScriptResult("{}"), {
    ok: false,
    error: "Apps Script did not confirm the submission was saved.",
  });
});
