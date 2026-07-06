export type AppsScriptSaveResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export function validateAppsScriptUrl(appScriptUrl: string | undefined) {
  if (!appScriptUrl) {
    return "Waitlist endpoint is not configured.";
  }

  if (!appScriptUrl.includes("/exec")) {
    return "Waitlist endpoint looks invalid. Use the Apps Script Web App URL ending with /exec.";
  }

  return null;
}

export async function saveToAppsScript(
  appScriptUrl: string,
  payload: Record<string, unknown>,
): Promise<AppsScriptSaveResult> {
  let forwardResponse: Response;

  try {
    forwardResponse = await fetch(appScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });
  } catch {
    return {
      success: false,
      error: "Failed to save submission. Apps Script request failed.",
    };
  }

  if (!forwardResponse.ok) {
    const status = forwardResponse.status;
    const statusMessage =
      status === 401 || status === 403
        ? "Apps Script rejected access. Ensure deployment access is set to 'Anyone'."
        : status === 404
          ? "Apps Script URL not found. Confirm you used the latest /exec deployment URL."
          : "Apps Script returned an unexpected response.";

    return {
      success: false,
      error: `Failed to save submission. ${statusMessage} (status: ${status})`,
    };
  }

  const text = await forwardResponse.text();
  let result: unknown;

  try {
    result = JSON.parse(text);
  } catch {
    return {
      success: false,
      error: "Failed to save submission. Apps Script did not confirm the write.",
    };
  }

  if (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === true
  ) {
    return { success: true };
  }

  const upstreamError =
    typeof result === "object" &&
    result !== null &&
    "error" in result &&
    typeof result.error === "string" &&
    result.error.trim() !== ""
      ? ` ${result.error.trim()}`
      : "";

  return {
    success: false,
    error: `Failed to save submission. Apps Script did not confirm the write.${upstreamError}`,
  };
}
