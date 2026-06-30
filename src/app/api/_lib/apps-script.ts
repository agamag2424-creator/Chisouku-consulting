export type AppsScriptVerification =
  | { success: true }
  | { success: false; error: string };

type AppsScriptResponseBody = {
  success?: unknown;
  error?: unknown;
};

function statusMessageFor(status: number) {
  if (status === 401 || status === 403) {
    return "Apps Script rejected access. Ensure deployment access is set to 'Anyone'.";
  }
  if (status === 404) {
    return "Apps Script URL not found. Confirm you used the latest /exec deployment URL.";
  }
  return "Apps Script returned an unexpected response.";
}

function errorFromBody(body: AppsScriptResponseBody) {
  if (typeof body.error === "string" && body.error.trim() !== "") {
    return body.error.trim();
  }
  return "Apps Script did not confirm the submission was saved.";
}

export async function verifyAppsScriptResponse(
  response: Response,
): Promise<AppsScriptVerification> {
  if (!response.ok) {
    return {
      success: false,
      error: `${statusMessageFor(response.status)} (status: ${response.status})`,
    };
  }

  const text = await response.text();
  let body: AppsScriptResponseBody;

  try {
    body = JSON.parse(text) as AppsScriptResponseBody;
  } catch {
    return {
      success: false,
      error: "Apps Script returned an invalid confirmation response.",
    };
  }

  if (body.success === true) {
    return { success: true };
  }

  return {
    success: false,
    error: errorFromBody(body),
  };
}
