export type AppsScriptVerification =
  | { ok: true }
  | { ok: false; message: string };

function getStatusMessage(status: number) {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }

  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }

  return "Apps Script returned an unexpected response.";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function verifyAppsScriptResponse(
  response: Response,
): Promise<AppsScriptVerification> {
  if (!response.ok) {
    return {
      ok: false,
      message: `${getStatusMessage(response.status)} (status: ${response.status})`,
    };
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    return {
      ok: false,
      message: "Apps Script returned a non-JSON response.",
    };
  }

  if (!isObject(result) || result.success !== true) {
    const scriptError =
      isObject(result) && typeof result.error === "string"
        ? ` Apps Script error: ${result.error}`
        : "";

    return {
      ok: false,
      message: `Apps Script did not confirm the submission was saved.${scriptError}`,
    };
  }

  return { ok: true };
}
