# ChisokuLabs Website — Go-Live Decision Assurance Repositioning — Backlog

**Version:** 1.0 · 17 Oct 2026 (IST) · **Requirements:** `PRD.md` in this folder (read it first).
**Executor:** Claude Code (any session). Cursor or Codex may run it under the same rules.

---

## Repository facts (verified 17 Oct 2026)

- GitHub: `agamag2424-creator/Chisouku-consulting`, branch `main`, HEAD `c2aa1d9` ("Remove founder identity from the marketing site."). The founder's local copy matches `origin/main` with no uncommitted tracked changes.
- These docs are added through the branch `site/docs-go-live-repositioning` and a PR the founder merges. Story branches for E0 may branch from that docs branch so they can be reviewed before the docs PR merges.
- Evidence reports go in `docs/go-live-repositioning/evidence/`.

## How to start (paste this into Claude Code)

```
Read docs/go-live-repositioning/PRD.md in full, then docs/go-live-repositioning/BACKLOG.md
including Appendix A (Executor Rules) and Appendix B (Evidence Report).
Start with epic E0, story E0.0 (Step 0 audit). Work one story at a time, one branch and one PR
per story. At the end of each story, post the Evidence Report and stop for my approval before
starting the next story.
```

---

## Epic index and order

| Order | Epic | Outcome | Moat | Depends on |
|---|---|---|---|---|
| 1 | **E0 Visual system refresh** | New tokens, type, base components; retired patterns gone | All | — |
| 2 | **E1 Core repositioning and hero** | `siteConfig` rewritten; homepage rebuilt with the Evidence Check hero and the slipped go-live cost estimator | M1, M3, M4 | E0 |
| 3 | **E2 Offer pages** | `/readiness-evidence-check`, `/go-live-decision-review` | M2, M4 | E1 |
| 4 | **E3 Method page** | `/method` rewritten around READINESS-5 | M3 | E0 |
| 5 | **E4 See it first** | `/see-it-first` with sample pack and free brief | M1 | E1, E9.1 |
| 6 | **E5 Pricing and comparison** | `/pricing` and reusable comparison table | M2, M4 | E2 |
| 7 | **E6 Independence and data** | `/independence-and-data`, principal block | M6 | E0 |
| 8 | **E7 Market pages** | UAE and Saudi Arabia pages | M5 | E0 |
| 9 | **E8 SEO and answer engines** | FAQ, glossary, JSON-LD, llms.txt, guides, sitemap, OG | M1, M3, M5 | E1–E7 |
| 10 | **E9 Conversion and analytics** | Contact form, CTAs, events | — | E1 (E9.1 can run before E4) |
| 11 | **E10 Legacy cleanup and release gate** | Redirects, removals, leak scan, final QA | — | all |

Story IDs are `E<epic>.<n>`. Each story lists **Type**, **Files** (expected; verify in Step 0), **Tasks**, **Acceptance criteria (AC)** and **Tests/evidence**.

---

# E0 — Visual system refresh

**Goal:** the whole site renders in the new "decision instrument" system before any content changes, so every later page is built once.
**Out of scope:** copy changes (except where a retired pattern is removed).

### E0.0 Step 0 audit (read-only)
**Type:** Audit · **Files:** whole repo
**Tasks**
1. Run `npm ci`, `npm run lint`, `npm run build`; record results.
2. List every route under `src/app` and every component under `src/components`, with which routes use which components.
3. Grep for hard-coded colours (`#[0-9a-fA-F]{3,8}`, `rgba(`) in `src/` outside `globals.css`; list file:line counts.
4. Grep for retired patterns: `uppercase` + `font-mono` eyebrow labels, `.eyebrow`, numbered markers (`01`, `02`… in JSX), `·` in JSX strings, trailing `→` in button/link text, `fade`/`motion` entrance animations, `glass-canvas` and `backdrop-filter`.
5. Confirm fonts are loaded in `src/app/layout.tsx` via `next/font/google` (Libre Franklin, Source Sans 3, IBM Plex Mono) and note unused `@fontsource/*` packages in `package.json`.
6. Take baseline screenshots (Playwright via `npx playwright`, desktop 1440×900 and mobile 390×844, full page) of every route; save under `docs/go-live-repositioning/evidence/baseline/` (gitignored if large; otherwise commit PNGs ≤ 300 KB each).
**AC:** a report `docs/go-live-repositioning/evidence/E0.0-audit.md` with the five lists and build status. No source changes.

### E0.1 Design tokens
**Type:** Code · **Files:** `src/styles/globals.css`
**Tasks**
1. Replace colour values with PRD 5.1 tokens; add evidence tokens and tints; add `--radius-control: 6px`, `--radius-sheet: 4px`.
2. Remove the body radial/linear gradient; `body { background: var(--color-page); }`.
3. Map tokens in the Tailwind `@theme inline` block so utilities (`bg-paper`, `text-ink`, `text-teal`, `bg-ev-ok-tint`, …) exist.
4. Keep old token names as aliases **only** for this story (e.g. `--color-cyan: var(--color-teal)`) so the site keeps rendering; E0.5 removes aliases.
**AC:** build passes; every page renders with cool white background and teal accent; no gradient on body.
**Tests:** screenshots of `/` desktop and mobile.

### E0.2 Typography
**Type:** Code · **Files:** `src/app/layout.tsx`, `src/styles/globals.css`, `package.json`
**Tasks**
1. Load Archivo (600/700/800) → `--font-display`, IBM Plex Sans (400/500/600) → `--font-body`, IBM Plex Mono (500) → `--font-mono` with `next/font/google`, `display: "swap"`.
2. Implement the type scale (PRD 5.2) as utility classes: `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-body`, `.t-small`, `.t-data` (mono). Body 18px/1.6 desktop, 17px mobile. Headings `text-wrap: balance`. Prose max-width 70ch.
3. Remove unused `@fontsource/jetbrains-mono` and `@fontsource/outfit` if Step 0 confirmed they are unused.
**AC:** no layout shift warnings in Lighthouse from fonts; headings render in Archivo, body in Plex Sans; mono appears only where E0.4 assigns `.t-data`.

### E0.3 Base components
**Type:** Code · **Files:** new `src/components/ui/*`
**Tasks** — create typed, token-only components:
1. `Button` (variants: primary ink, secondary outline, text link; sizes md/lg; renders `<a>` or `<button>`; visible 2px teal focus ring; no trailing arrow).
2. `Section` (vertical rhythm: 96px desktop / 64px mobile; container width from `--content-max-width`; optional `tone="paper"|"page"`).
3. `Sheet` (artifact surface: paper, 1px line, `--radius-sheet`, no blur, no hover lift).
4. `DataTable` (semantic table, scroll container on mobile, mono for numeric cells).
5. `EvidenceCell` (props: `state: "present"|"partial"|"missing"`, `label`): ● ◐ ○ in evidence colours with visually hidden text.
6. `RagBadge` (Green/Amber/Red reported status) and `ScoreBadge` ("n of 5 evidenced", colour by score per PRD 7).
7. `Callout` (info/caution, left rule, no icon fonts).
8. `PriceBlock` (reads an offer from config; shows list price, founding price and slots if `foundingSlotsRemaining > 0`, fee-credit line).
9. `Accordion` using native `<details>/<summary>`.
**AC:** a dev-only route `/_ui` (excluded from sitemap and robots, `noindex`) renders every component in every state, desktop and mobile; components contain no hex literals.
**Tests:** screenshot of `/_ui`; axe shows no serious issues on `/_ui`.

### E0.4 Retire legacy patterns site-wide
**Type:** Code · **Files:** all files found in E0.0 lists
**Tasks**
1. Remove all-caps mono eyebrow labels; where a label carries real information, convert to sentence-case `.t-small text-muted`.
2. Remove numbered markers where content is not a sequence (keep only for real steps).
3. Remove middle-dot meta strings in visible copy (replace with commas or lists).
4. Remove trailing `→` from button/link text.
5. Remove entrance animations on sections and hover lift on cards; remove `glass-canvas` blur styles.
6. Replace hard-coded colours with tokens.
**AC:** E0.0 greps return zero hits in `src/` (excluding comments and `/_ui` demos of evidence symbols); visual diff shows no broken layouts.

### E0.5 Nav, footer and brand mark
**Type:** Code · **Files:** `src/components/layout/Nav.tsx`, `Footer.tsx`, `src/components/brand/BrandMark.tsx`
**Tasks**
1. Restyle nav: white bar, 1px bottom line, Plex Sans 15px links, primary button "Discuss your programme" (→ `/contact?request=review`). Keep current links for now (E1.4 changes them).
2. Footer: ink background allowed (single dark surface on the site), tokens only, no mono caps.
3. Brand mark: keep the existing mark; ensure it renders in ink on light and white on the footer.
4. Delete token aliases added in E0.1; fix any remaining references.
**AC:** keyboard tab order logical; mobile menu works and traps focus; no alias tokens remain.
### E0.6 Remove founder documents from public
**Type:** Code · **Files:** `public/documents/agam-agrawwal-resume.pdf` (tracked in git and served at `/documents/agam-agrawwal-resume.pdf`)
**Tasks**
1. Delete the file from `public/documents/` and from git (it remains in git history; that is accepted).
2. Add a redirect `/documents/agam-agrawwal-resume.pdf` → `/` in `next.config.ts` so old links do not 404.
3. Grep `src/` and `public/` for any other founder identifiers (name, photo, LinkedIn URL, CV) and list them in the PR.
**AC:** the URL redirects to `/` on preview; no founder document remains under `public/`.
**[FOUNDER APPROVES]** before merge.

**Definition of done (E0):** build, lint and typecheck pass; every existing route renders in the new system; before/after screenshots for every route attached; axe clean on `/`, `/contact`.

---

# E1 — Core repositioning and hero

**Goal:** the homepage sells the new offer and shows the method in the first five seconds.

### E1.0 Step 0
Read `src/app/page.tsx`, `src/lib/siteConfig.ts`, `src/lib/jsonLd.ts`, `src/lib/aeoContent.ts`; list every import of `siteConfig.pricing`, `markets`, `systems`, `auditPriceRange`, `diagnosticUrl`. Report.

### E1.1 Rewrite `siteConfig`
**Type:** Code · **Files:** `src/lib/siteConfig.ts` and all importers
**Tasks**
1. Implement the schema in PRD 6.4 exactly; add helpers `formatPrice`, `offerPriceLabel`, `foundingActive()`.
2. Update every importer to the new keys. Where an importer belongs to a page that later epics delete, make it compile with minimal change and leave a `// removed in E10` comment.
3. Remove `auditPriceRange` after all uses are migrated.
**AC:** typecheck passes; no reference to `pricing.min`, `pricing.max`, `markets.secondary === "Singapore"`, or "GCC" in `siteConfig`.
**Tests:** unit test (Vitest not installed — use a small `node --test` script under `scripts/` or a typed assertion file compiled by `tsc`) for `offerPriceLabel` with slots 3 and 0.

### E1.2 Hero Evidence Check component
**Type:** Code · **Files:** new `src/components/hero/EvidenceCheckHero.tsx`, `src/components/hero/evidenceCheckData.ts`
**Tasks**
1. Data file with the three claims, R5 states and contradiction exactly as PRD 7 (single source; reused by E3/E4).
2. Server-rendered initial state; client component handles the sequence (state machine: `idle → resolving(claimIndex, cellIndex) → linking → done`).
3. Timing per PRD 7; total ≤ 4.5 s; uses CSS transitions only; no new dependency.
4. Contradiction line: SVG path between T1 and I1 rows on ≥ 641px; note under T1 on ≤ 640px.
5. "Run the check again" text button; `aria-live="polite"` summary once on completion.
6. `prefers-reduced-motion`: final state on first paint, replay hidden.
7. "Illustrative example. Fictional programme." label under the table.
8. Track `hero_check_replay` (E9 adds the analytics helper; until then, a no-op stub).
**AC:**
- With JS disabled, the table and reported statuses are visible and readable.
- With JS, the full sequence plays once on load and ends in the exact final state of PRD 7.
- Reduced motion shows the final state immediately.
- Bundle impact ≤ 6 KB gzipped (record from build output).
- Works at 360px without horizontal scroll.
**Tests:** Playwright script under `scripts/e2e/hero.spec.ts` run with `npx playwright test` (no dependency added to `package.json`; document the command): asserts final badges "3 of 5 evidenced", "2 of 5 evidenced", "0 of 5 evidenced" and the contradiction text; screenshot desktop/mobile; a second run with `reducedMotion: "reduce"`.

### E1.3 Homepage rebuild
**Type:** Code + Copy · **Files:** `src/app/page.tsx` (+ small section components under `src/components/home/`)
**Tasks**
1. Build the ten sections of PRD 9.1 in order, with copy verbatim. Leave section 4a (slipped go-live cost estimator) to E1.5; if E1.5 has not merged, nothing renders between sections 4 and 5.
2. Offers section reads from config via `PriceBlock`.
3. "See it before you sign" shows Self-Check only when `siteConfig.selfCheck.live`.
4. Compact comparison uses the E5 component if merged; otherwise a placeholder link to `/pricing` (E5.2 replaces it).
5. Principal block only if IN-3 approved; otherwise omit.
6. Remove all old homepage artifacts (`PmoOperatingMap`, `OperatingDragGrid`, `PackCycleStrip`, `PackDragEstimator`, `SampleAuditArtifact`, `DiagnosticOrbit`, `AiImpactModel`, `AuditPathway`) from the homepage; do not delete the files yet (E10).
7. Page metadata: title "Independent Go-Live Decision Assurance | ChisokuLabs", description from PRD 3 one-sentence offer.
8. Performance (baseline before E1: mobile Perf 57, TBT 2.6 s, LCP 3.4 s on a decorative hero photo; see E0.2 PR): no decorative hero image (LCP should be the H1); no infinite animations; `content-visibility: auto` on sections below the fold; hero motion limited to opacity, transform and SVG stroke; measure `experimental.optimizeCss` on and off and keep the faster; record a three-run median Lighthouse mobile on the preview.
**AC:** the homepage contains none of: "drag", "PMO reporting", "automation audit", "Singapore", "GCC" (except inside "Other GCC" form option elsewhere), "AI automation". One H1. All CTAs go to `/contact?request=…` or `/see-it-first`.
**[FOUNDER APPROVES]** copy and layout screenshots before merge.

### E1.4 Navigation content
**Type:** Code · **Files:** `src/lib/siteConfig.ts` (`navLinks`), `Nav.tsx`, `Footer.tsx`
**Tasks:** nav links per PRD 4.3 (point to routes even if built in later epics; until then, link targets that 404 must not ship — gate the link behind a `routeLive` map in config and enable as each epic merges). Footer per PRD 4.3.
**AC:** no nav or footer link returns 404 on the deployed preview.

### E1.5 Slipped go-live cost estimator (added in PRD v1.1)
**Type:** Code + Copy · **Files:** new `src/components/home/SlipCostEstimator.tsx`, `src/lib/slipEstimate.ts` (pure calculation), `src/lib/siteConfig.ts` (`slipEstimator`), `src/app/page.tsx` (section 4a)
**Depends on:** E0.3 (form controls, `Section`, `Sheet`, `Button`), E1.1 (`offers`, `formatPrice`, `foundingActive()`), E1.3 (homepage)
**Tasks**
1. `slipEstimate(inputs, config)` as a pure, typed function returning weekly run-rate, total cost and the comparison in working days; guards against zero people or rate (comparison hidden, no division by zero).
2. Client component per PRD 9.11: four labelled number inputs, outputs, comparison line, footnote, CTAs. Server-render the example values.
3. Prices from `siteConfig.offers.evidenceCheck` through `formatPrice`; founding price shown only when `foundingActive()`.
4. `aria-live="polite"` result (debounced ~400 ms); visible 2px teal focus; 360px without horizontal scroll.
5. `slip_estimate_used` once per page view on first input change (no-op stub until E9.2).
6. Insert as homepage section 4a; copy exactly as approved in PRD 9.11 (IN-7). If IN-8 is answered, add the sourced line with its link.
**AC:**
- Unit test (`node --test` script under `scripts/`, as E1.1) for `slipEstimate`: defaults give weekly USD 120,000, 4-week total USD 480,000, comparison 0.2 working days at USD 5,000; zero people hides the comparison; the monthly parallel-run cost adds × 12 ÷ 52 per week.
- With JS disabled the example result is visible; with JS the numbers update as the visitor types.
- No hex literals, no evidence colours, no word "drag"; prices and defaults appear only in config.
- Client JS impact ≤ 3 KB gzipped; axe clean on `/`; Lighthouse mobile on `/` stays ≥ 90 (three-run median on the preview).
**[FOUNDER APPROVES]** copy and example values (IN-7) before merge.

**Definition of done (E1):** preview deployment reviewed by founder; Lighthouse mobile ≥ 90 on `/`.

---

# E2 — Offer pages

### E2.0 Step 0
Confirm IN-1 (prices) status. Read `pmo-automation-audit/page.tsx` and `implementation/page.tsx` for reusable layout pieces. Report.

### E2.1 Readiness Evidence Check page
**Type:** Code + Copy · **Files:** new `src/app/readiness-evidence-check/page.tsx`
**Tasks:** build PRD 9.2 sections; numbered 5-day sequence (real sequence); `PriceBlock`; "What it is not" callout; CTA `/contact?request=review`; metadata; `Service`+`Offer` JSON-LD from config (helper in `jsonLd.ts`).
**AC:** price, days and fee-credit text all come from config; page passes axe; mobile clean.

### E2.2 Go-Live Decision Review page
**Type:** Code + Copy · **Files:** new `src/app/go-live-decision-review/page.tsx`
**Tasks:** build PRD 9.3 sections; 10-day numbered timeline; deliverables list linked to the sample pack; speed note; continuous assurance block; JSON-LD.
**AC:** as E2.1; the deliverables list links to `/see-it-first#sample-pack`.

### E2.3 Shared offer layout
**Type:** Code · **Files:** `src/components/offers/OfferLayout.tsx`
**Tasks:** extract the common structure of E2.1/E2.2 (lead, for-whom, scope, deliverables, timeline, price, not-included, CTA) into one typed component; refactor both pages to use it.
**AC:** both pages render identically to before refactor (screenshot diff), less duplicated JSX.
**Definition of done (E2):** IN-1 approved; both routes enabled in `routeLive`.

---

# E3 — Method page

### E3.0 Step 0
Read current `src/app/method/page.tsx`; list components it uses. Report.

### E3.1 READINESS-5 page
**Type:** Code + Copy · **Files:** `src/app/method/page.tsx`, new `src/components/method/*`
**Tasks**
1. Build PRD 9.4: five elements, each with test + failure example (examples taken from the sample pack data).
2. Scoring explainer using `EvidenceCell` and `ScoreBadge`.
3. Contradiction types: four examples as a small table (claim A, claim B, what it means).
4. "From findings to a decision" with a sample decision-conditions table (3 rows from the pack: condition, owner, evidence-by date).
5. "What tooling does and doesn't do" callout (M2 rule).
**AC:** no reference to Assess/Architect/Activate/Accelerate or AI Impact Model remains; all example data imported from one data module shared with the hero/pack (`src/content/samplePack.ts`, created here if E1.2's data file needs extending).

### E3.2 Method diagram
**Type:** Code · **Files:** `src/components/method/ClaimFlow.tsx`
**Tasks:** an inline SVG (tokens only, labels in Plex Sans) showing one claim passing through S·O·E·D·A checks into a score and then into a cross-workstream check. Static (no animation). Accessible `<title>`/`<desc>`.
**AC:** readable at 360px (stacks vertically); passes contrast.
**Definition of done (E3):** route enabled; founder approves screenshots.

---

# E4 — See it first

### E4.0 Step 0
Confirm `public/documents/` exists and what it contains. Confirm E9.1 merged (form request-type preset) or plan E4.2 to depend on it. Report.

### E4.1 Sample pack assets
**Type:** Asset · **Files:** `public/documents/chisokulabs-go-live-decision-pack-illustrative.pdf` (provided by founder in this folder's `assets/` or attached to the PR), `public/images/sample-pack/page-1.png`, `page-2.png`
**Tasks:** add the PDF; render page images at 1600px width (use `pdftoppm` locally if available; otherwise ask via INPUT NEEDED); optimise to ≤ 350 KB each; add width/height.
**AC:** files load from production paths; PDF ≤ 1 MB.

### E4.2 `/see-it-first` page
**Type:** Code + Copy · **Files:** new `src/app/see-it-first/page.tsx`
**Tasks**
1. Sample pack block with both page images (Next `Image`, lazy, alt text describing content), "Download the PDF" link with `download` attribute, illustrative label. Anchor id `sample-pack`.
2. Free readiness brief block with the contact form embedded, request type preset to "Free readiness brief" (`?request=brief` behaviour reused) and a short "what you'll receive" list.
3. Self-Check block only when `selfCheck.live`.
4. Track `sample_pack_view` (when images enter viewport, once) and `sample_pack_download`.
**AC:** no form required to view or download the sample; page passes axe; mobile clean.
**Definition of done (E4):** route enabled; homepage section 6 links work.

---

# E5 — Pricing and comparison

### E5.0 Step 0
Confirm IN-1. Report.

### E5.1 Comparison table component
**Type:** Code · **Files:** `src/components/compare/ComparisonTable.tsx`, data in `src/content/comparison.ts`
**Tasks:** implement PRD 9.8 as a responsive table (horizontal scroll inside container on mobile, sticky first column); ChisokuLabs column visually distinguished with a teal top rule (not colour fill); footnote.
**AC:** semantic `<table>` with `<th scope>`; readable at 360px.

### E5.2 `/pricing` page
**Type:** Code + Copy · **Files:** new `src/app/pricing/page.tsx`
**Tasks:** PRD 9.6 content; price table from config; founding slots; fee credit; payment terms; comparison table; two FAQ items; CTA. Replace the homepage placeholder from E1.3 with the compact comparison (first 4 rows) linking here.
**AC:** changing `foundingSlotsRemaining` to 0 hides founding prices everywhere (verified by a build with the value set to 0, screenshot attached, then reverted).

---

# E6 — Independence and data

### E6.0 Step 0
Confirm IN-3 and IN-4. If IN-4 is not confirmed, build the page but keep `routeLive["/independence-and-data"] = false`. Report.

### E6.1 `/independence-and-data` page
**Type:** Code + Copy · **Files:** new `src/app/independence-and-data/page.tsx`
**Tasks:** PRD 9.7 in three sections with anchors (`#independence`, `#data-handling`, `#ai-use`); "last updated" date; contact line for data questions.
**AC:** every statement matches the founder-confirmed list (IN-4); no certification claims.

### E6.2 Principal block component
**Type:** Code · **Files:** `src/components/trust/PrincipalBlock.tsx`
**Tasks:** renders the approved paragraph (PRD 8.3) with no image, name or links; used on `/` and both offer pages.
**AC:** hidden entirely if IN-3 not approved (config flag `principalBlock: boolean`).

---

# E7 — Market pages

### E7.0 Step 0
Open every source link listed in PRD 9.10 (and any added) and confirm it loads and states the cited fact; record in `evidence/E7.0-sources.md`. If a source no longer supports a claim, stop and report.

### E7.1 UAE page
**Type:** Code + Copy · **Files:** new `src/app/go-live-readiness-uae/page.tsx`
**Tasks:** PRD 9.10 UAE content with linked sources; platforms from config; engagement model (remote by default, on site by arrangement); free readiness brief CTA; `Service` JSON-LD with `areaServed: AE`.
**AC:** all factual statements have a visible linked source; dates written in full.

### E7.2 Saudi Arabia page
**Type:** Code + Copy · **Files:** new `src/app/go-live-readiness-saudi-arabia/page.tsx`
**Tasks:** as E7.1 for KSA (`areaServed: SA`).
**AC:** as E7.1.

---

# E8 — SEO and answer engines

### E8.0 Step 0
Read `src/lib/aeoContent.ts`, `jsonLd.ts`, `components/aeo/*`, `llms*.txt` routes, `sitemap.ts`, `robots.ts`, `public/*checklist.txt`. Report what each exports and where it is used.

### E8.1 Canonical answers and FAQ
**Type:** Code + Copy · **Files:** `src/lib/aeoContent.ts`, `src/app/faq/page.tsx`
**Tasks:** replace canonical answers (what ChisokuLabs does, offers, method, markets, policy); write the 13 FAQ items in PRD 9.9 (answers ≤ 90 words each, first sentence answers the question directly); FAQ uses `Accordion`; `FAQPage` JSON-LD generated from the same array.
**AC:** zero old-offer terms; JSON-LD validates (paste output of `npx schema-dts`-free check: render page, extract script, validate structure with a small `node` script asserting required keys).

### E8.2 Glossary
**Type:** Code + Copy · **Files:** `src/lib/aeoContent.ts`, `src/app/glossary/page.tsx`
**Tasks:** ≥ 15 terms per PRD 10, each 1–3 sentences; `DefinedTermSet` JSON-LD; anchor per term.
**AC:** every term reachable by `#slug`.

### E8.3 Answer guides
**Type:** Code + Copy · **Files:** `src/app/guides/[slug]/page.tsx` (or three static routes using `GuidePage`), content in `src/content/guides.ts`
**Tasks:** three guides (PRD 4.1). Each: direct answer in the first paragraph (≤ 60 words, `DirectAnswer` component), 800–1,400 words, a checklist or table, links to method/offers/see-it-first, sources linked, `BreadcrumbList` JSON-LD; the S/4HANA checklist also `HowTo` JSON-LD.
**AC:** each guide has a unique title/description and one H1; checklist items are real go-live checks (no filler).

### E8.4 Structured data, llms.txt, metadata
**Type:** Code · **Files:** `src/lib/jsonLd.ts`, `src/app/layout.tsx`, `src/app/llms.txt/route.ts`, `src/app/llms-full.txt/route.ts`, new `src/lib/seo.ts`
**Tasks:** Organization (no founder, `areaServed` AE + SA), WebSite, Service+Offer for both offers; remove audit/diagnostic/implementation service JSON-LD; per-route metadata map in `seo.ts`; rebuild `llms.txt`/`llms-full.txt` from canonical answers and config.
**AC:** no JSON-LD references removed services; titles ≤ 60 chars, descriptions ≤ 155 chars.

### E8.5 Sitemap, robots, OG images
**Type:** Code + Asset · **Files:** `src/app/sitemap.ts`, `robots.ts`, `public/og*.png`
**Tasks:** sitemap lists only live routes (`routeLive`), new `lastModified`; `/_ui` disallowed; new OG images (1200×630) in the new visual system for `/`, offers, see-it-first, method (static PNGs; produce from an internal `noindex` route and screenshot, then delete the route, or ask INPUT NEEDED for design files).
**AC:** `curl /sitemap.xml` on preview lists exactly the live routes; OG images render in a social preview checker screenshot.

---

# E9 — Conversion and analytics

### E9.0 Step 0
Read `AuditFitForm.tsx` and `api/audit-fit/route.ts`; confirm Resend env var names; report current fields and validation.

### E9.1 "Discuss your programme" form
**Type:** Code · **Files:** `src/components/contact/AuditFitForm.tsx` (rename to `ProgrammeForm.tsx`, keep a re-export for safety until E10), `src/app/contact/page.tsx`, `src/app/api/audit-fit/route.ts`
**Tasks**
1. Fields per PRD 11; required markers; inline validation messages in plain language ("Enter a work email so we can reply.").
2. `?request=` preset; request type drives the submit button label ("Request my readiness brief" / "Send" / "Ask about pricing").
3. Honeypot field; server rejects when filled (200 response, no email sent).
4. API: accept new fields, keep required-field validation (add `request_type`), email subject per PRD 11; never log message bodies.
5. Success state: "Thanks. We'll reply within one business day." For brief requests: "Your readiness brief arrives within two business days."
6. Contact page: heading "Discuss your programme", the form, Calendly button as an alternative, email shown as text.
**AC:** submitting each request type on preview sends one email with the right subject (founder confirms receipt); missing required field returns a clear inline message; keyboard-only submission works.

### E9.2 CTA audit and analytics helper
**Type:** Code · **Files:** new `src/lib/track.ts`, all pages with CTAs
**Tasks:** `track(event, props)` wrapper over `@vercel/analytics` `track`; add `cta_click` with stable ids to every CTA; `form_submit`/`form_error` in the form; replace the E1.2 and E1.5 stubs.
**AC:** list of CTA ids in `evidence/E9.2-ctas.md`; every page has exactly one primary CTA style.

### E9.3 Privacy page update
**Type:** Copy · **Files:** `src/app/privacy/page.tsx`
**Tasks:** reflect new form fields, purposes (reply, prepare readiness brief), retention, analytics, contact for deletion.
**AC:** no mention of the PMO diagnostic lead capture unless still linked.

---

# E10 — Legacy cleanup and release gate

### E10.0 Step 0
List every route, component and asset still referencing the old offer (grep list below). Report.

### E10.1 Redirects and route removal
**Type:** Code · **Files:** `next.config.ts`, old route folders
**Tasks:** add redirects in PRD 4.2; delete old route folders (`pmo-automation-audit`, `implementation`, `sample-outputs`, `free-pmo-diagnostic`, `diagnostic-vs-audit`, `pmo-reporting-automation`, `pmo-automation-gcc`, `pmo-automation-singapore`); update legacy redirect destinations.
**AC:** each old URL returns 308 to its new target on preview (`curl -I` output pasted).

### E10.2 Remove unused components and assets
**Type:** Code · **Files:** `src/components/artifacts/*` no longer imported, unused `public/` images, `/_ui` route (or keep `noindex` + disallowed; founder decides), old OG images
**AC:** `npm run build` passes; no unused-import warnings; bundle size not larger than baseline (paste numbers).

### E10.3 Leak scan
**Type:** Test · **Files:** new `scripts/leak-scan.mjs`
**Tasks:** script that scans built HTML (`.next/server/app/**/*.html`) and `src/` for forbidden terms (whole-word, case-insensitive; `docs/` and `scripts/leak-scan.mjs` itself excluded) and fails on any hit:
`PMO reporting`, `drag`, `Automation Audit`, `Singapore`, `AI automation for delivery`, `Delivery Pulse`, `DeliveryPulse`, `Kaname`, `AEVA`, `Yamaha`, `Etihad`, `Dubai Airports`, `Shawbrook`, `Sun Life`, `Siemens`, `Nagarro`, `Coforge`, `Quinnox`, `Solutionara`, `Agrawwal`, `Agam` (except inside the email address if IN-2 keeps it), `guarantee` (except in negations reviewed manually), `SOC 2`, `ISO 27001`.
Add `npm run leak-scan` script.
**AC:** zero hits; script committed and documented in README.

### E10.4 Release QA and README
**Type:** Test + Doc · **Files:** `README.md`
**Tasks:** full-site Playwright pass (every live route, desktop/mobile screenshots), axe on every route, Lighthouse mobile on `/`, both offers, `/see-it-first`; update README (positioning, content model, routeLive, leak-scan, proof rules); final Evidence Report.
**AC (release gate):**
- Build, lint, typecheck, leak-scan pass.
- Axe: zero serious/critical on all routes.
- Lighthouse mobile ≥ 90 (Perf, A11y, Best Practices, SEO) on the four pages.
- All IN-1…IN-5 resolved or explicitly deferred by the founder.
- Founder approves the production promotion.

---

## Appendix A — Executor rules (mandatory)

1. **One story, one branch, one PR.** Branch name `site/E<epic>.<n>-short-slug`. Never combine stories.
2. **Step 0 first.** Every epic starts with its Step 0 story. Read-only. If reality differs from the PRD or a story, stop and report with file paths and line numbers.
3. **Copy is not yours to invent.** Use PRD Section 9 verbatim. If copy is missing, write `INPUT NEEDED: copy for <location>` in the PR and leave a visible placeholder only on preview, never on `main`.
4. **No fabricated proof.** Never add client names, logos, testimonials, metrics, founder identifiers, or statistics without a linked source permitted by PRD Section 8.
5. **No new backend or dependencies.** Allowed: `next/font/google` fonts; tools run through `npx` without adding to `package.json` (Playwright, axe, Lighthouse). Anything else needs founder approval in the PR.
6. **Tokens only.** No hex/rgba literals in components; no inline style colours.
7. **Config is the single source** for prices, days, markets, platforms, flags. No duplicated numbers in JSX.
8. **Accessibility and responsiveness are part of done,** not a follow-up.
9. **Do not touch** the diagnostic subdomain app, Delivery Pulse, Kaname, Brain, Vercel project settings, DNS, or environment variables (except reading names).
10. **Run locally before pushing:** `npm run lint`, `npm run build`, `npx tsc --noEmit`, and (from E10.3) `npm run leak-scan`.
11. **Never merge your own PR.** The founder merges. Production promotion is the founder's action.
12. **Stop at the end of each story** with the Evidence Report and wait for "approved, next".
13. **INPUT NEEDED protocol:** write a block `INPUT NEEDED — <ID> — <what> — <why> — <default if any>` in the PR, continue with any story that does not depend on it.

## Appendix B — Evidence Report template (paste at the end of every PR)

```
Story: E<x>.<n> — <title>
Branch / PR: <link>
What changed: <3–6 bullets, files touched>
Acceptance criteria:
  - [x] AC1 … (evidence: command output / screenshot / link)
  - [x] AC2 …
Checks: lint ✅  build ✅  typecheck ✅  leak-scan ✅/n.a.  axe ✅ (routes)  Lighthouse (if required)
Screenshots: desktop 1440 / mobile 390 (before → after)
Bundle impact: <from build output>
INPUT NEEDED: <none | blocks>
Risks / follow-ups: <none | list>
```

## Appendix C — Founder approval checkpoints

| When | What the founder approves |
|---|---|
| After E0 | The new visual system on existing pages |
| E1.3 | Homepage copy and layout; principal paragraph (IN-3) |
| E1.5 | Estimator copy and example values (IN-7) |
| E2 | Prices (IN-1) |
| E6 | Data-handling statements (IN-4) |
| E10.4 | Production release |
