type AppsScriptResult = {
  success?: boolean;
  error?: string;
};

type ConfirmedWriteResult =
  | { confirmed: true }
  | { confirmed: false; error?: string };

export async function confirmAppsScriptWrite(
  response: Response,
): Promise<ConfirmedWriteResult> {
  const result = (await response.json().catch(() => null)) as
    | AppsScriptResult
    | null;

  if (result?.success === true) {
    return { confirmed: true };
  }

  return {
    confirmed: false,
    error: typeof result?.error === "string" ? result.error : undefined,
  };
}
