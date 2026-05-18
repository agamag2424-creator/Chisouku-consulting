export type AppsScriptResult =
  | { success: true }
  | { success: false; error: string };

export async function readAppsScriptResult(
  response: Response,
): Promise<AppsScriptResult> {
  let responseText: string;

  try {
    responseText = await response.text();
  } catch {
    return {
      success: false,
      error: "Apps Script response could not be read.",
    };
  }

  if (!responseText.trim()) {
    return {
      success: false,
      error: "Apps Script returned an empty response.",
    };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(responseText);
  } catch {
    return {
      success: false,
      error: "Apps Script returned an invalid response.",
    };
  }

  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    payload.success === true
  ) {
    return { success: true };
  }

  const error =
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof payload.error === "string" &&
    payload.error.trim()
      ? payload.error.trim()
      : "Apps Script did not confirm the nomination was saved.";

  return { success: false, error };
}
