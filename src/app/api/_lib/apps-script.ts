export type AppsScriptVerificationResult =
  | { ok: true }
  | { ok: false; error: string };

type AppsScriptBody = {
  success?: unknown;
  error?: unknown;
};

export async function verifyAppsScriptResponse(
  response: Response,
): Promise<AppsScriptVerificationResult> {
  if (!response.ok) {
    return {
      ok: false,
      error: statusMessageFor(response.status),
    };
  }

  const text = await response.text();
  if (!text.trim()) {
    return {
      ok: false,
      error: "Apps Script did not confirm that the submission was saved.",
    };
  }

  let body: AppsScriptBody;
  try {
    body = JSON.parse(text) as AppsScriptBody;
  } catch {
    return {
      ok: false,
      error: "Apps Script returned an invalid confirmation.",
    };
  }

  if (body.success === true) {
    return { ok: true };
  }

  const upstreamError =
    typeof body.error === "string" && body.error.trim()
      ? ` Apps Script reported: ${body.error.trim()}`
      : "";

  return {
    ok: false,
    error: `Apps Script did not confirm that the submission was saved.${upstreamError}`,
  };
}

export function statusMessageFor(status: number): string {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }

  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }

  return "Apps Script returned an unexpected response.";
}
