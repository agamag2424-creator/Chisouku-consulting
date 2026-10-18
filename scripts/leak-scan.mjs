// Leak scan (BACKLOG E10.3): fails if a forbidden term appears in the built site or in src/.
// Run after `npm run build`: `npm run leak-scan`. Whole-word, case-insensitive. docs/ and this file are not scanned.
//
// Allowed phrases are removed before matching. Each one was reviewed by hand; add to the list only with the
// founder's agreement, and say why.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;

export const forbidden = [
  "PMO reporting",
  "drag",
  "Automation Audit",
  "Singapore",
  "AI automation for delivery",
  "Delivery Pulse",
  "DeliveryPulse",
  "Kaname",
  "AEVA",
  "Yamaha",
  "Etihad",
  "Dubai Airports",
  "Shawbrook",
  "Sun Life",
  "Siemens",
  "Nagarro",
  "Coforge",
  "Quinnox",
  "Solutionara",
  "Agrawwal",
  "Agam",
  "guarantee",
  "SOC 2",
  "ISO 27001",
];

export const allowed = [
  // IN-2: the public contact address stays as it is.
  "agam@chisokulabs.com",
  // IN-5: founder kept this Calendly link for launch (18 Oct 2026) and will change it after go-live.
  "calendly.com/agam-agrawwal",
  // Negations of "guarantee" (PRD 8.6 requires saying it plainly).
  "does not guarantee go-live success",
  "Do you guarantee a successful go-live?",
  "Not a guarantee of go-live success",
  // Element ids and JSON keys for the FAQ item above.
  '"guarantee"',
  '\\"guarantee\\"',
  'id="guarantee"',
  "#guarantee",
];

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
const pattern = new RegExp(`\\b(${forbidden.map(escape).join("|")})\\b`, "gi");
const allowedPattern = new RegExp(allowed.map(escape).join("|"), "gi");

/** Every hit in one text, as { term, line, excerpt }. */
export function scan(text) {
  const cleaned = text.replace(allowedPattern, (match) => " ".repeat(match.length));
  const hits = [];
  for (const match of cleaned.matchAll(pattern)) {
    const line = cleaned.slice(0, match.index).split("\n").length;
    const excerpt = text.slice(Math.max(0, match.index - 40), match.index + match[0].length + 40).replace(/\s+/g, " ");
    hits.push({ term: match[0], line, excerpt });
  }
  return hits;
}

function* files(dir, keep) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path, keep);
    else if (keep(path)) yield path;
  }
}

function run() {
  const builtDir = join(root, ".next/server/app");
  try {
    statSync(builtDir);
  } catch {
    console.error("leak-scan: no build found. Run `npm run build` first.");
    process.exit(2);
  }
  const targets = [
    ...files(builtDir, (path) => /\.(html|body|rsc)$/.test(path)),
    ...files(join(root, "src"), (path) => /\.(tsx?|css|mjs|json|md|txt)$/.test(path)),
  ];
  let total = 0;
  for (const path of targets) {
    for (const hit of scan(readFileSync(path, "utf8"))) {
      total++;
      console.log(`${relative(root, path)}:${hit.line}  "${hit.term}"  …${hit.excerpt}…`);
    }
  }
  console.log(`leak-scan: ${targets.length} files, ${total} hit${total === 1 ? "" : "s"}`);
  process.exit(total ? 1 : 0);
}

if (import.meta.url === `file://${process.argv[1]}`) run();
