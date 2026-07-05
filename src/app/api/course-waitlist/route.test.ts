import { describe, expect, it } from "vitest";
import { didAppsScriptSaveSubmission } from "./route";

describe("didAppsScriptSaveSubmission", () => {
  it("accepts only an explicit JSON success confirmation", () => {
    expect(didAppsScriptSaveSubmission('{"success":true}')).toBe(true);
    expect(didAppsScriptSaveSubmission('{"success":false}')).toBe(false);
    expect(didAppsScriptSaveSubmission('{"success":"true"}')).toBe(false);
    expect(didAppsScriptSaveSubmission("<html>Moved temporarily</html>")).toBe(
      false,
    );
  });
});
