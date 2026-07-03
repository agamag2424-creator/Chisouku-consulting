export type AppsScriptConfirmation =
  | { success: true }
  | { success: false; error: string };

const DEFAULT_CONFIRMATION_ERROR = "Apps Script did not confirm the save.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readAppsScriptConfirmationText(
  responseText: string,
): AppsScriptConfirmation {
  if (responseText.trim() === "") {
    return {
      success: false,
      error: "Apps Script returned an empty response.",
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    return {
      success: false,
      error: "Apps Script returned an invalid confirmation response.",
    };
  }

  if (!isRecord(parsed)) {
    return { success: false, error: DEFAULT_CONFIRMATION_ERROR };
  }

  if (parsed.success === true) {
    return { success: true };
  }

  if (typeof parsed.error === "string" && parsed.error.trim() !== "") {
    return { success: false, error: parsed.error };
  }

  return { success: false, error: DEFAULT_CONFIRMATION_ERROR };
}

export async function readAppsScriptConfirmation(
  response: Response,
): Promise<AppsScriptConfirmation> {
  return readAppsScriptConfirmationText(await response.text());
}
