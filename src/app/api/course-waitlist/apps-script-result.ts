export type AppsScriptVerification =
  | { ok: true }
  | { ok: false; error: string };

export async function verifyAppsScriptResponse(
  response: Response,
): Promise<AppsScriptVerification> {
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
      error: `${statusMessage} (status: ${status})`,
    };
  }

  const text = await response.text();
  if (text.trim() === "") {
    return {
      ok: false,
      error: "Apps Script returned an empty response.",
    };
  }

  let result: unknown;
  try {
    result = JSON.parse(text);
  } catch {
    return {
      ok: false,
      error: "Apps Script returned an invalid JSON response.",
    };
  }

  if (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === true
  ) {
    return { ok: true };
  }

  const scriptError =
    typeof result === "object" &&
    result !== null &&
    "error" in result &&
    typeof result.error === "string" &&
    result.error.trim() !== ""
      ? ` ${result.error.trim()}`
      : "";

  return {
    ok: false,
    error: `Apps Script did not confirm the save.${scriptError}`,
  };
}
