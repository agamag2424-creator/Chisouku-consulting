export type AppsScriptSaveResult =
  | { success: true }
  | { success: false; error: string };

type AppsScriptPayload = {
  success?: unknown;
  error?: unknown;
};

export async function verifyAppsScriptSave(
  response: Response,
): Promise<AppsScriptSaveResult> {
  if (!response.ok) {
    return {
      success: false,
      error: getAppsScriptHttpError(response.status),
    };
  }

  const text = await response.text();
  let payload: AppsScriptPayload;

  try {
    payload = JSON.parse(text) as AppsScriptPayload;
  } catch {
    return {
      success: false,
      error: "Apps Script did not return a valid save confirmation.",
    };
  }

  if (payload.success !== true) {
    const upstreamError =
      typeof payload.error === "string" && payload.error.trim() !== ""
        ? ` ${payload.error.trim()}`
        : "";

    return {
      success: false,
      error: `Apps Script did not confirm the save.${upstreamError}`,
    };
  }

  return { success: true };
}

function getAppsScriptHttpError(status: number) {
  const statusMessage =
    status === 401 || status === 403
      ? "Apps Script rejected access. Ensure deployment access is set to 'Anyone'."
      : status === 404
        ? "Apps Script URL not found. Confirm you used the latest /exec deployment URL."
        : "Apps Script returned an unexpected response.";

  return `${statusMessage} (status: ${status})`;
}
