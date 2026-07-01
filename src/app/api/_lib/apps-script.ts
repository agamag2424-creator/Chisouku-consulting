type AppsScriptSuccess = {
  ok: true;
};

type AppsScriptFailureReason =
  | "explicit-failure"
  | "invalid-json"
  | "missing-success";

type AppsScriptFailure = {
  ok: false;
  reason: AppsScriptFailureReason;
  error?: string;
};

export type AppsScriptResult = AppsScriptSuccess | AppsScriptFailure;

type AppsScriptPayload = {
  success?: unknown;
  error?: unknown;
};

export async function readAppsScriptResult(
  response: Pick<Response, "text">,
): Promise<AppsScriptResult> {
  const text = await response.text();

  let payload: AppsScriptPayload;
  try {
    payload = JSON.parse(text) as AppsScriptPayload;
  } catch {
    return { ok: false, reason: "invalid-json" };
  }

  if (!payload || typeof payload !== "object" || !("success" in payload)) {
    return { ok: false, reason: "missing-success" };
  }

  if (payload.success === true) {
    return { ok: true };
  }

  return {
    ok: false,
    reason: "explicit-failure",
    error: typeof payload.error === "string" ? payload.error : undefined,
  };
}

export function getAppsScriptFailureMessage(
  result: Exclude<AppsScriptResult, AppsScriptSuccess>,
): string {
  switch (result.reason) {
    case "explicit-failure":
      return result.error
        ? `Apps Script reported: ${result.error}`
        : "Apps Script reported the save failed.";
    case "invalid-json":
      return "Apps Script did not return a valid confirmation.";
    case "missing-success":
      return "Apps Script did not confirm the save.";
    default: {
      const exhaustive: never = result.reason;
      return exhaustive;
    }
  }
}
