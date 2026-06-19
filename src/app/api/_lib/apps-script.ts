export type AppsScriptFailure = {
  error: string;
  status: number;
};

export async function getAppsScriptFailure(
  response: Response,
  submissionName: string,
): Promise<AppsScriptFailure | null> {
  if (!response.ok) {
    return {
      error: `Failed to save ${submissionName}. ${statusMessage(
        response.status,
      )} (status: ${response.status})`,
      status: 502,
    };
  }

  const text = await response.text();
  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return {
      error: `Failed to save ${submissionName}. Apps Script returned a malformed confirmation.`,
      status: 502,
    };
  }

  if (!isRecord(payload) || payload.success !== true) {
    const reason =
      isRecord(payload) && typeof payload.error === "string"
        ? ` (${payload.error})`
        : "";
    return {
      error: `Failed to save ${submissionName}. Apps Script did not confirm the write.${reason}`,
      status: 502,
    };
  }

  return null;
}

function statusMessage(status: number) {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }
  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }
  return "Apps Script returned an unexpected response.";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
