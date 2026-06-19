type AppsScriptWriteResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
    };

export async function verifyAppsScriptWrite(
  response: Response,
  itemName: string,
): Promise<AppsScriptWriteResult> {
  const failurePrefix = `Failed to save ${itemName}.`;

  if (!response.ok) {
    return {
      ok: false,
      error: `${failurePrefix} ${describeAppsScriptStatus(response.status)} (status: ${response.status})`,
    };
  }

  const text = await response.text();
  if (text.trim() === "") {
    return {
      ok: false,
      error: `${failurePrefix} Apps Script returned an empty response.`,
    };
  }

  let result: unknown;
  try {
    result = JSON.parse(text);
  } catch {
    return {
      ok: false,
      error: `${failurePrefix} Apps Script returned an invalid response.`,
    };
  }

  if (!isSuccessResult(result)) {
    const upstreamError =
      typeof result === "object" &&
      result !== null &&
      "error" in result &&
      typeof result.error === "string"
        ? ` ${result.error}`
        : "";

    return {
      ok: false,
      error: `${failurePrefix} Apps Script did not confirm the write.${upstreamError}`,
    };
  }

  return { ok: true };
}

function describeAppsScriptStatus(status: number) {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }

  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }

  return "Apps Script returned an unexpected response.";
}

function isSuccessResult(value: unknown): value is { success: true } {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    value.success === true
  );
}
