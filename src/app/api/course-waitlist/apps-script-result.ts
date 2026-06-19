type AppsScriptResult =
  | { ok: true }
  | { ok: false; error: string; status?: number };

const MAX_ERROR_LENGTH = 240;

export async function verifyAppsScriptResult(
  response: Response,
): Promise<AppsScriptResult> {
  if (!response.ok) {
    const status = response.status;
    const statusMessage =
      status === 401 || status === 403
        ? "Apps Script rejected access. Ensure deployment access is set to 'Anyone'."
        : status === 404
          ? "Apps Script URL not found. Confirm you used the latest /exec deployment URL."
          : "Apps Script returned an unexpected response.";

    return {
      ok: false,
      status,
      error: `Failed to save nomination. ${statusMessage} (status: ${status})`,
    };
  }

  let body: unknown;
  try {
    body = JSON.parse(await response.text());
  } catch {
    return {
      ok: false,
      error:
        "Failed to save nomination. Apps Script did not return a valid confirmation.",
    };
  }

  if (isSuccessfulAppsScriptBody(body)) {
    return { ok: true };
  }

  return {
    ok: false,
    error: getAppsScriptError(body),
  };
}

function isSuccessfulAppsScriptBody(body: unknown) {
  return (
    typeof body === "object" &&
    body !== null &&
    "success" in body &&
    body.success === true
  );
}

function getAppsScriptError(body: unknown) {
  if (
    typeof body === "object" &&
    body !== null &&
    "error" in body &&
    typeof body.error === "string" &&
    body.error.trim() !== ""
  ) {
    return `Failed to save nomination. Apps Script error: ${body.error
      .trim()
      .slice(0, MAX_ERROR_LENGTH)}`;
  }

  return "Failed to save nomination. Apps Script did not confirm the save.";
}
