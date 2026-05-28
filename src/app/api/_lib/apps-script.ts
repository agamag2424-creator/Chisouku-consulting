type AppsScriptBody = {
  success?: unknown;
  error?: unknown;
};

type AppsScriptSaveResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
    };

const statusMessage = (status: number) =>
  status === 401 || status === 403
    ? "Apps Script rejected access. Ensure deployment access is set to 'Anyone'."
    : status === 404
      ? "Apps Script URL not found. Confirm you used the latest /exec deployment URL."
      : "Apps Script returned an unexpected response.";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export async function verifyAppsScriptSave(
  response: Response,
  action: string,
): Promise<AppsScriptSaveResult> {
  if (!response.ok) {
    return {
      ok: false,
      error: `Failed to ${action}. ${statusMessage(response.status)} (status: ${response.status})`,
    };
  }

  const text = await response.text();
  if (text.trim() === "") {
    return {
      ok: false,
      error: `Failed to ${action}. Apps Script returned an empty response.`,
    };
  }

  let body: AppsScriptBody;
  try {
    const parsed = JSON.parse(text) as unknown;
    body = isRecord(parsed) ? parsed : {};
  } catch {
    return {
      ok: false,
      error: `Failed to ${action}. Apps Script returned an invalid response.`,
    };
  }

  if (body.success !== true) {
    const upstreamError =
      typeof body.error === "string" && body.error.trim() !== ""
        ? ` Apps Script reported: ${body.error}`
        : "";
    return {
      ok: false,
      error: `Failed to ${action}.${upstreamError}`,
    };
  }

  return { ok: true };
}
