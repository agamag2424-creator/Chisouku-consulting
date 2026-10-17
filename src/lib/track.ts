/**
 * Analytics events (PRD 11). No-op stub until E9.2 wires it to @vercel/analytics `track`.
 * Call sites use it now so E9.2 changes this file only.
 */
export function track(event: string, props?: Record<string, string | number | boolean>): void {
  void event;
  void props;
}
