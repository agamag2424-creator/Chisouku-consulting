export type AppsScriptSubmissionResult =
  | { success: true }
  | { success: false; error: string };

type AppsScriptBody = {
  success?: unknown;
  error?: unknown;
};

export function validateAppsScriptUrl(
  appScriptUrl: string | undefined,
  endpointName: string,
): string | null {
  if (!appScriptUrl) {
    return `${endpointName} endpoint is not configured.`;
  }

  if (!appScriptUrl.includes("/exec")) {
    return `${endpointName} endpoint looks invalid. Use the Apps Script Web App URL ending with /exec.`;
  }

  return null;
}

export async function submitToAppsScript(
  appScriptUrl: string,
  payload: unknown,
): Promise<AppsScriptSubmissionResult> {
  let response: Response;

  try {
    response = await fetch(appScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "follow",
    });
  } catch {
    return {
      success: false,
      error: "Failed to reach the waitlist endpoint.",
    };
  }

  return parseAppsScriptResponse(response);
}

export async function parseAppsScriptResponse(
  response: Response,
): Promise<AppsScriptSubmissionResult> {
  if (!response.ok) {
    return {
      success: false,
      error: `Failed to save submission. ${statusMessage(response.status)} (status: ${response.status})`,
    };
  }

  const text = await response.text();
  let body: AppsScriptBody;

  try {
    body = JSON.parse(text) as AppsScriptBody;
  } catch {
    return {
      success: false,
      error: "Waitlist endpoint returned an invalid confirmation.",
    };
  }

  if (body.success === true) {
    return { success: true };
  }

  const upstreamError =
    typeof body.error === "string" && body.error.trim() !== ""
      ? ` ${body.error.trim()}`
      : "";

  return {
    success: false,
    error: `Waitlist endpoint did not confirm the submission.${upstreamError}`,
  };
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
