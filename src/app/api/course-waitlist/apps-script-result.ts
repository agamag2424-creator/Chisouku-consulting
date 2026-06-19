type AppsScriptWriteResult =
  | { ok: true }
  | { ok: false; error: string };

export async function verifyAppsScriptWrite(
  response: Response,
): Promise<AppsScriptWriteResult> {
  if (!response.ok) {
    return {
      ok: false,
      error: appsScriptStatusMessage(response.status),
    };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(await response.text());
  } catch {
    return {
      ok: false,
      error: "Apps Script returned an invalid response.",
    };
  }

  if (isRecord(payload) && payload.success === true) {
    return { ok: true };
  }

  const upstreamError =
    isRecord(payload) && typeof payload.error === "string"
      ? ` ${payload.error}`
      : "";

  return {
    ok: false,
    error: `Apps Script did not confirm the sheet write.${upstreamError}`,
  };
}

function appsScriptStatusMessage(status: number) {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }

  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }

  return `Apps Script returned an unexpected response. (status: ${status})`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
