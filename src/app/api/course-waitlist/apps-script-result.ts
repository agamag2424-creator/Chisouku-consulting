export type AppsScriptResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
    };

export function verifyAppsScriptResult(responseText: string): AppsScriptResult {
  let payload: unknown;

  try {
    payload = JSON.parse(responseText);
  } catch {
    return {
      ok: false,
      error: "Apps Script returned an invalid confirmation response.",
    };
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    "success" in payload &&
    (payload as { success?: unknown }).success === true
  ) {
    return { ok: true };
  }

  const error =
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof (payload as { error?: unknown }).error === "string"
      ? (payload as { error: string }).error
      : "Apps Script did not confirm the nomination was saved.";

  return {
    ok: false,
    error,
  };
}
