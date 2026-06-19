type AppsScriptSuccess = {
  success?: unknown;
  error?: unknown;
};

export type AppsScriptValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export async function validateAppsScriptResponse(
  response: Response,
): Promise<AppsScriptValidationResult> {
  if (!response.ok) {
    return {
      ok: false,
      reason: appsScriptHttpFailureMessage(response.status),
    };
  }

  let result: AppsScriptSuccess;
  try {
    result = (await response.json()) as AppsScriptSuccess;
  } catch {
    return {
      ok: false,
      reason: "Apps Script returned an unreadable response.",
    };
  }

  if (result.success === true) {
    return { ok: true };
  }

  const scriptError =
    typeof result.error === "string" ? result.error.trim() : "";

  return {
    ok: false,
    reason: scriptError
      ? `Apps Script reported failure: ${scriptError}`
      : "Apps Script did not confirm the nomination was saved.",
  };
}

function appsScriptHttpFailureMessage(status: number) {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }

  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }

  return `Apps Script returned an unexpected HTTP response. (status: ${status})`;
}
