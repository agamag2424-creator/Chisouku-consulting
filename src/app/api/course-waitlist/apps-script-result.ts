type AppsScriptResult = {
  success?: unknown;
};

export function hasAppsScriptConfirmedSave(result: unknown): boolean {
  if (!result || typeof result !== "object") {
    return false;
  }

  return (result as AppsScriptResult).success === true;
}
