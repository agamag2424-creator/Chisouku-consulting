type AppsScriptVerification =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

export async function verifyAppsScriptSuccess(
  response: Response,
): Promise<AppsScriptVerification> {
  if (!response.ok) {
    const status = response.status;
    return {
      success: false,
      error: `${statusMessage(status)} (status: ${status})`,
    };
  }

  const text = await response.text();
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    return {
      success: false,
      error: "Apps Script did not return JSON confirming the write.",
    };
  }

  if (isRecord(parsed) && parsed.success === true) {
    return { success: true };
  }

  const upstreamError =
    isRecord(parsed) && typeof parsed.error === "string" && parsed.error.trim()
      ? ` Upstream error: ${parsed.error.trim()}`
      : "";

  return {
    success: false,
    error: `Apps Script did not confirm the write with success: true.${upstreamError}`,
  };
}
