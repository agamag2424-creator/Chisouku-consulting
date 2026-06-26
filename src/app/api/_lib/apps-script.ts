type AppsScriptForwardResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

type AppsScriptConfirmation =
  | { ok: true }
  | { ok: false; reason: string };

export function parseAppsScriptConfirmation(
  responseText: string,
): AppsScriptConfirmation {
  let parsed: unknown;

  try {
    parsed = JSON.parse(responseText);
  } catch {
    return {
      ok: false,
      reason: "Apps Script returned an invalid confirmation payload.",
    };
  }

  if (!parsed || typeof parsed !== "object") {
    return {
      ok: false,
      reason: "Apps Script returned an invalid confirmation payload.",
    };
  }

  const result = parsed as { success?: unknown; error?: unknown };

  if (result.success === true) {
    return { ok: true };
  }

  return {
    ok: false,
    reason:
      typeof result.error === "string" && result.error.trim()
        ? result.error
        : "Apps Script did not confirm the save.",
  };
}

export async function forwardToWaitlistAppScript(
  payload: Record<string, unknown>,
): Promise<AppsScriptForwardResult> {
  const appScriptUrl = process.env.GOOGLE_APPS_SCRIPT_WAITLIST_URL;

  if (!appScriptUrl) {
    return {
      ok: false,
      error: "Waitlist endpoint is not configured.",
      status: 500,
    };
  }

  if (!appScriptUrl.includes("/exec")) {
    return {
      ok: false,
      error:
        "Waitlist endpoint looks invalid. Use the Apps Script Web App URL ending with /exec.",
      status: 500,
    };
  }

  let forwardResponse: Response;

  try {
    forwardResponse = await fetch(appScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });
  } catch {
    return {
      ok: false,
      error: "Failed to save nomination. Apps Script request failed.",
      status: 502,
    };
  }

  if (!forwardResponse.ok) {
    const status = forwardResponse.status;
    const statusMessage =
      status === 401 || status === 403
        ? "Apps Script rejected access. Ensure deployment access is set to 'Anyone'."
        : status === 404
          ? "Apps Script URL not found. Confirm you used the latest /exec deployment URL."
          : "Apps Script returned an unexpected response.";

    return {
      ok: false,
      error: `Failed to save nomination. ${statusMessage} (status: ${status})`,
      status: 502,
    };
  }

  const confirmation = parseAppsScriptConfirmation(await forwardResponse.text());

  if (!confirmation.ok) {
    return {
      ok: false,
      error: `Failed to save nomination. ${confirmation.reason}`,
      status: 502,
    };
  }

  return { ok: true };
}
