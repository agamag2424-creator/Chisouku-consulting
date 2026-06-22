import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readAppsScriptSuccess } from "./apps-script";

describe("readAppsScriptSuccess", () => {
  it("accepts an explicit Apps Script success confirmation", async () => {
    const result = await readAppsScriptSuccess(
      Response.json({ success: true }),
    );

    assert.deepEqual(result, { success: true });
  });

  it("rejects an explicit Apps Script failure on a 200 response", async () => {
    const result = await readAppsScriptSuccess(
      Response.json({ success: false, error: "sheet append failed" }),
    );

    assert.deepEqual(result, {
      success: false,
      error: "Apps Script did not confirm the row was saved. sheet append failed",
    });
  });

  it("rejects a response without a success confirmation", async () => {
    const result = await readAppsScriptSuccess(Response.json({}));

    assert.deepEqual(result, {
      success: false,
      error: "Apps Script did not confirm the row was saved.",
    });
  });

  it("rejects non-JSON upstream responses", async () => {
    const result = await readAppsScriptSuccess(new Response("ok"));

    assert.deepEqual(result, {
      success: false,
      error: "Apps Script returned a non-JSON response.",
    });
  });
});
