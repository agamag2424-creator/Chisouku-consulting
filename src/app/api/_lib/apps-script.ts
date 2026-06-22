type AppsScriptPayload = {
  success?: unknown;
  error?: unknown;
};

export type AppsScriptSuccessResult =
  | { success: true }
  | { success: false; error: string };

export async function readAppsScriptSuccess(
  response: Response,
): Promise<AppsScriptSuccessResult> {
  const responseText = await response.text();

  let payload: AppsScriptPayload | null = null;
  try {
    payload = responseText
      ? (JSON.parse(responseText) as AppsScriptPayload)
      : null;
  } catch {
    return {
      success: false,
      error: "Apps Script returned a non-JSON response.",
    };
  }

  if (payload?.success === true) {
    return { success: true };
  }

  const upstreamError =
    typeof payload?.error === "string" && payload.error.trim()
      ? ` ${payload.error.trim()}`
      : "";

  return {
    success: false,
    error: `Apps Script did not confirm the row was saved.${upstreamError}`,
  };
}
