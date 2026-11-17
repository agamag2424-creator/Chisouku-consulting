// Leak scan (BACKLOG E10.3): fails if a forbidden term appears in the built site or in src/.
// Run after `npm run build`: `npm run leak-scan`. Whole-word, case-insensitive. docs/ and this file are not scanned.
//
// Allowed phrases are removed before matching. Each one was reviewed by hand; add to the list only with the
// founder's agreement, and say why.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;

// September port PRD (17 Nov 2026): "What your PMO reporting costs today" is the calculator heading, and Yamaha,
// Etihad, HCLTech and Coforge are named as employers (never clients) in the background line, so they are no longer
// forbidden here. Change 1 (17 Nov 2026) names the founder, Agam Agrawwal, with his photo and LinkedIn, so his name is
// no longer forbidden either. scripts/scanSite.mjs checks the new retired terms.
export const forbidden = [
  // The site uses the role address, never a personal one.
  "agam@chisokulabs.com",
  "drag",
  "Automation Audit",
  "Singapore",
  "AI automation for delivery",
  "Delivery Pulse",
  "DeliveryPulse",
  "Kaname",
  "AEVA",
  "Dubai Airports",
  "Shawbrook",
  "Sun Life",
  "Siemens",
  "Nagarro",
  "Quinnox",
  "Solutionara",
  "guarantee",
  "SOC 2",
  "ISO 27001",
];

export const allowed = [
  // Negations of "guarantee". The old phrases stay because the unlisted guides still say them.
  "does not guarantee go-live success",
  "Do you guarantee a successful go-live?",
  "Not a guarantee of go-live success",
  "does not guarantee that a programme or portfolio will recover",
  "Do you guarantee that a programme or portfolio will recover?",
  "Not a guarantee that the programme will recover",
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
