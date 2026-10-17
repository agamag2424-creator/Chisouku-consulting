/** JSON for a <script> tag: "<" is escaped so the content can never close the tag. */
export function stringifyJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
