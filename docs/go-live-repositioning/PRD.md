# ChisokuLabs Website — Go-Live Decision Assurance Repositioning — PRD

**Status:** v1.0 · approved direction by the founder, 17 Oct 2026 (IST)
**Amendment v1.1 (17 Oct 2026):** the founder approved a homepage "slipped go-live cost" estimator (option B) to keep the old site's "see what it costs you" interaction. Adds homepage section 4a (9.1), section 9.11, the `slipEstimator` config key (6.4), the `slip_estimate_used` event (11), inputs IN-7 and IN-8 (14), and backlog story E1.5.
**Amendment v1.2 (17 Oct 2026):** the founder approved a visual redesign of the homepage (design canvas "ChisokuLabs Homepage Redesign"; source kept in `evidence/E1.6/design/`). Section 7 behaviour 2–4 change: the replay button is replaced by an "As reported / As evidenced" switch. 5.1 gains a rule on dark (ink) surfaces. 9.1 gains section 9.12 (visual treatment and interface wording). `hero_check_replay` becomes `hero_view_toggle` {view} (11). Adds backlog story E1.6.
**Owner:** Founder, ChisokuLabs Pvt Ltd
**Repository:** this repo (`chisokulab`, Next.js 16 App Router, Tailwind v4, deployed on Vercel)
**Companion file:** `BACKLOG.md` in this folder (epics, stories, tasks, acceptance criteria, executor rules)
**Sample asset:** `public/documents/chisokulabs-go-live-decision-pack-illustrative.pdf` (added by story E4.1)

---

## 0. How an executor uses this document

1. Read this PRD in full, then **Appendix A of `BACKLOG.md` (Executor Rules)**. The rules are mandatory.
2. Build **one story at a time**, in the epic order given in the backlog, each on its own branch and pull request, each closed with an Evidence Report (backlog Appendix B).
3. Every epic opens with a **Step 0 read-only audit**. If the repository differs from what a story assumes, **stop and report**. Do not improvise.
4. **Copy in Section 9 is the source of truth.** Use it verbatim unless a story says to adapt it. Never invent client names, results, statistics, testimonials, or founder details.
5. Items marked **[FOUNDER APPROVES]** need the founder's explicit "approved" in the PR before merge. Items marked **INPUT NEEDED** pause that story only; continue with stories that do not depend on it.
6. **No new backend.** The only server code allowed is changes to the existing `src/app/api/audit-fit/route.ts` handler described in E9. No database, auth, CMS, or third-party service is added.
7. **Do not touch** `diagnostic.chisokulabs.com` (separate app), Delivery Pulse, Kaname, or Brain.

---

## 1. Why this change

ChisokuLabs is repositioning from "AI automation for delivery systems, starting with PMO reporting" to **independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia**. The source documents are the founder's Business Blueprint, the Market Research Analysis and the Ideal Customer Avatar (ICA). The current site sells the old offer: its hero, offers, artifacts, markets (GCC + Singapore), pricing ($4–5K PMO Automation Audit) and visual language all point at PMO reporting automation.

### 1.1 Locked decisions

| # | Decision |
|---|---|
| L1 | **Evolve, do not rebuild.** Keep the brand name and logo, the Next.js/Tailwind build, routes infrastructure, AEO surfaces and the SVG artifact technique. Change the content, the design tokens, the type system and the artifacts. |
| L2 | **Visual direction: "decision instrument", not "automation blueprint".** Cool white paper, deep ink, steel-teal brand accent; red/amber/green used **only** to show evidence status. Type: Archivo (display), IBM Plex Sans (body), IBM Plex Mono (data only). |
| L3 | **Signature moment:** an interactive Evidence Check in the homepage hero (Section 7). It is the only orchestrated motion on the site. |
| L4 | **No founder identity on the site** (no name, photo, LinkedIn, employers). Credibility is shown as "principal-led" with anonymous experience, plus method, sample output, independence and data-handling policy. |
| L5 | **Offers and pricing:** Readiness Evidence Check and Go-Live Decision Review at list price, a founding-client rate for the first three clients, and a fee credit (Section 6). |
| L6 | **Markets:** UAE first, Saudi Arabia second. Remove GCC + Singapore language. |
| L7 | **Free Self-Check is not live yet.** All Self-Check CTAs are behind a config flag and fall back to "Request a free readiness brief" (Section 6.4). |
| L8 | **Proof policy:** Section 8 of this PRD is the complete and only proof policy for this release. No named prior employers anywhere on the public site (because L4). No founder documents (CV, résumé, photos) served from `public/`. |
| L9 | **Delivery Pulse is not mentioned** on the site. The method (READINESS-5) is the differentiator; tooling is described generically ("our evidence tooling"). |

### 1.2 Goals

| Goal | Measured by |
|---|---|
| G1. A UAE/KSA CIO or sponsor understands the offer within 10 seconds of landing | Hero test with 3 reviewers: each states the offer in one sentence |
| G2. The moat is visible before any sales copy | The hero Evidence Check runs on load and the visitor can switch between the reported and evidenced views (v1.2) |
| G3. The visitor can see the output before contacting | Sample decision pack viewable on site and downloadable without a form |
| G4. Clear path to conversation | Every page has one primary CTA: "Discuss your programme" or "Request a free readiness brief" |
| G5. Search and answer-engine readiness for go-live queries | New JSON-LD, FAQ, glossary, `llms.txt`, 3 answer guides and 2 market pages indexed in the sitemap |
| G6. No credibility leaks | Zero old-offer copy, zero unsubstantiated claims, zero founder identifiers (automated check in E10) |

### 1.3 Non-goals

Redesigning navigation patterns or layout grid from scratch; a blog/CMS; Arabic localisation; building the Self-Check; client portal; chat widget; paid ads tracking; testimonials or logos (none exist yet).

---

## 2. Audience (from the ICA)

**Primary buyer:** "Omar", CIO / Transformation Director / Programme Sponsor at a UAE (then KSA) organisation of roughly 250–2,500 employees, running SAP S/4HANA, Oracle Fusion, Dynamics 365, Salesforce or Workday, **6–16 weeks before a go-live decision**.
**Champion:** Programme Director / PMO Director / Delivery Director.
**Core buying job:** "Give me an independent, defensible answer to whether this programme is genuinely ready to go live, and show me exactly what needs to change if it isn't."
**Emotional purchase:** "I want to know that I did not approve this launch based on incomplete information."
**What he is not buying:** another dashboard, another PMO process, another software platform, another slide deck.

Design and copy implication: calm, exact, evidential. No fear-mongering statistics in the hero, no hype, no "AI decides".

---

## 3. Positioning and moat

**Category descriptor:** Independent go-live decision assurance.
**Positioning line (hero):** "Your programme reports Green. We test whether the evidence agrees."
**One-sentence offer:** Before leadership approves a major ERP or core-platform go-live, ChisokuLabs independently tests whether every critical readiness claim has the status, owner, evidence, date and action to defend that decision.

### 3.1 The moat, as the site must show it

| # | Moat | Where it appears |
|---|---|---|
| M1 | **See it before you sign.** Evidence, not opinion: the hero Evidence Check, the full sample decision pack, a free readiness brief on the visitor's own programme, and (later) the Self-Check. | Hero (E1), Proof hub `/see-it-first` (E4), every CTA (E9) |
| M2 | **AI-accelerated, evidence-based delivery.** The same depth as 4–6 week reviews in 5–10 business days; AI extracts and cross-checks every claim, a principal makes the judgement. | Offer pages (E2), comparison (E5) |
| M3 | **READINESS-5 and contradiction testing.** Each claim tested on Status, Owner, Evidence, Date, Action, then checked against the other workstreams. | Method page (E3), hero, sample pack |
| M4 | **Pricing that lowers the risk to buy.** Public list prices, founding-client rate, full fee credit from Evidence Check into Decision Review; the visitor can set the fee against what a slipped go-live costs them (9.11). | Offer pages (E2), pricing (E5), homepage estimator (E1.5) |
| M5 | **Built for the UAE and Saudi Arabia.** Local timing pressures and platforms. | Market pages (E7) |
| M6 | **Secure handling of client evidence.** Published data-handling and AI policy. | Trust page `/independence-and-data` (E6) |

**Rule:** the site never says "AI decides" or implies automated judgement. Tooling structures evidence; the principal makes the call.

### 3.2 Competitor reference (do not name competitors on the site)

Competitors (Allan & Co, Tequma, Rydel, Orpington, Nurxure, Panorama) share: independence claims, fixed-fee review, go/no-go verdict, "book a call". None target the UAE/KSA; none let a visitor see an evidence-based check before contact; most take 4–6 weeks. The comparison table (E5) compares **categories** only: "Big Four review", "System integrator's own readiness review", "Typical boutique assurance", "ChisokuLabs".

---

## 4. Information architecture

### 4.1 Route map (after this release)

| Route | Status | Purpose | Epic |
|---|---|---|---|
| `/` | Rewrite | Hero Evidence Check, problem, method summary, offers, see-it-first, comparison, trust, CTA | E1 |
| `/readiness-evidence-check` | **New** | Entry offer (5 business days) | E2 |
| `/go-live-decision-review` | **New** | Core offer (10 business days) | E2 |
| `/pricing` | **New** | List prices, founding rate, fee credit, comparison | E5 |
| `/method` | Rewrite | READINESS-5 and contradiction testing | E3 |
| `/see-it-first` | **New** (replaces `/sample-outputs`) | Sample decision pack, free readiness brief, Self-Check (flagged) | E4 |
| `/independence-and-data` | **New** | Independence policy, how client evidence is handled, AI use | E6 |
| `/go-live-readiness-uae` | **New** (replaces `/pmo-automation-gcc`) | UAE market page | E7 |
| `/go-live-readiness-saudi-arabia` | **New** (replaces `/pmo-automation-singapore`) | KSA market page | E7 |
| `/guides/s4hana-go-no-go-checklist` | **New** | Answer guide | E8 |
| `/guides/is-my-erp-ready-to-go-live` | **New** | Answer guide | E8 |
| `/guides/independent-assurance-vs-si-readiness-review` | **New** | Answer guide | E8 |
| `/faq` | Rewrite | Go-live FAQ with FAQPage schema | E8 |
| `/glossary` | Rewrite | Go-live terms with DefinedTermSet schema | E8 |
| `/contact` | Update | "Discuss your programme" form with request types | E9 |
| `/privacy` | Update | Reflect new form fields | E9 |
| `/llms.txt`, `/llms-full.txt` | Rewrite | New canonical answers | E8 |

### 4.2 Redirects (permanent, add to `next.config.ts`)

| From | To |
|---|---|
| `/pmo-automation-audit` | `/readiness-evidence-check` |
| `/implementation` | `/go-live-decision-review` |
| `/sample-outputs` | `/see-it-first` |
| `/free-pmo-diagnostic` | `/see-it-first` |
| `/diagnostic-vs-audit` | `/pricing` |
| `/pmo-reporting-automation` | `/method` |
| `/pmo-automation-gcc` | `/go-live-readiness-uae` |
| `/pmo-automation-singapore` | `/go-live-readiness-uae` |

Existing legacy redirects (`/aeva`, `/case-studies`, `/founder-track-record`, etc.) stay. Update their destinations only where they now point at a removed route (`/case-studies/:path*` → `/see-it-first`).

### 4.3 Navigation

Primary nav (desktop and mobile): **Decision Review · Evidence Check · Method · See it first · Pricing**. Right-side button: **Discuss your programme** (→ `/contact`).
Footer: offers, method, see it first, pricing, UAE, Saudi Arabia, guides, FAQ, glossary, independence & data, privacy, contact email.

---

## 5. Design system (E0)

### 5.1 Tokens (replace values in `src/styles/globals.css`; names may be kept or renamed, but every component must use tokens, never hex literals)

| Token | Value | Use |
|---|---|---|
| `--color-page` | `#F5F7F8` | Page background (cool, not cream) |
| `--color-paper` | `#FFFFFF` | Surfaces, artifact sheets |
| `--color-ink` | `#14212B` | Primary text, primary buttons |
| `--color-muted` | `#5A6B77` | Secondary text |
| `--color-line` | `#D5DDE2` | Rules, borders |
| `--color-faint` | `#ECF0F2` | Subtle fills |
| `--color-teal` | `#0B6E6E` | Brand accent: links, focus, key marks |
| `--color-teal-tint` | `#E3F0EF` | Accent fills |
| `--color-ev-ok` / `--color-ev-ok-tint` | `#2E7D4F` / `#E3F2E8` | Evidence present / Green |
| `--color-ev-part` / `--color-ev-part-tint` | `#A86C12` / `#FBF2E2` | Partial evidence / Amber |
| `--color-ev-miss` / `--color-ev-miss-tint` | `#B23B3B` / `#F8E5E5` | Missing evidence / Red |

Rules: ink surfaces (v1.2): the homepage hero band, the method cross-check strip, the closing CTA band and the footer; nowhere else. Evidence colours appear **only** on evidence status (claims, RAG, R5 cells, contradiction marks). No gradients as decoration; remove the radial cyan body gradient. One border radius for controls (6px) and one for sheets (4px).

### 5.2 Type

Load with `next/font/google` in `src/app/layout.tsx` (CSP already allows self-hosted fonts):
- **Archivo** (600, 700, 800) → `--font-display`: headings only.
- **IBM Plex Sans** (400, 500, 600) → `--font-body`: all body text, buttons, nav.
- **IBM Plex Mono** (500) → `--font-mono`: **data only** (claim IDs, scores, R5 cells, prices in tables). Never for section labels.

Scale (desktop / mobile): display 56/36 px, h1 44/32, h2 32/26, h3 22/20, body 18/17 with line-height 1.6, small 15. Max line length 70ch for body text. Headings use `text-wrap: balance`.

### 5.3 Retired patterns (sweep the codebase)

- All-caps monospace "eyebrow" labels above headings. Replace with nothing, or a sentence-case lead-in only where it adds information.
- Numbered markers (01/02/03) where content is not a sequence. Keep numbers only for real sequences (the 10-day review timeline, the engagement steps).
- Middle-dot meta strings ("A · B · C") in body copy.
- Decorative "→" appended to button text.
- Hover lift/shadow on every card; fade-up on every section.

### 5.4 Components to restyle or create

Buttons (primary ink, secondary outline, text link), section shell, artifact sheet (white, 1px line, 4px radius, no glass blur), table, callout, R5 status cell (●◐○ with text label for screen readers), RAG badge, claim row, price card, comparison table, FAQ accordion (native `<details>`), form controls with visible focus (2px teal outline).

### 5.5 Quality floor

Responsive to 360px; no horizontal scroll; visible keyboard focus; `prefers-reduced-motion` respected; colour contrast AA minimum (body text AAA where possible); Lighthouse mobile ≥ 90 for Performance, Accessibility, Best Practices, SEO on `/` and `/go-live-decision-review`.

---

## 6. Offers, pricing and flags (single source in `src/lib/siteConfig.ts`)

### 6.1 Offers

| Offer | Duration | What the client gets | List price | Founding rate (first 3 clients) |
|---|---|---|---|---|
| **Readiness Evidence Check** | 5 business days | Written review of one programme's readiness documents against READINESS-5 across the five domains; contradiction map; top risks; one-hour readout | USD 5,000 | USD 2,500 |
| **Go-Live Decision Review** | 10 business days | Full review: evidence register, contradiction map, structured interviews (only where evidence conflicts), decision recommendation (Go / Conditional Go / No-Go), dated decision conditions with owners, sponsor readout | USD 12,000 | USD 6,000 |
| **Continuous readiness assurance** | Monthly, until go-live + hypercare | Weekly evidence register refresh and decision-condition tracking | From USD 6,000 / month | From USD 3,000 / month |

[FOUNDER APPROVES] the prices before E2 merges.

### 6.2 Fee credit
"The full Evidence Check fee is credited against a Go-Live Decision Review signed within 90 days of the Evidence Check report." Show on both offer pages and `/pricing`.

### 6.3 Founding-client rate
"Founding-client rate: the first three clients pay 50% of list price in exchange for a named or anonymised case study." Show remaining count from config (`foundingSlotsRemaining`, default 3). If 0, hide founding prices automatically.

### 6.4 Config schema (replace current `pricing`, `markets`, `systems` keys; keep `name`, `url`, `email`, `calendlyUrl`)

```ts
export const siteConfig = {
  name: "ChisokuLabs",
  url: "https://www.chisokulabs.com",
  email: "agam@chisokulabs.com",            // INPUT NEEDED: confirm a role address (e.g. hello@) given L4
  calendlyUrl: "https://calendly.com/chisokulab/discovery-call",
  tagline: "Independent go-live decision assurance",
  positioning: "Your programme reports Green. We test whether the evidence agrees.",
  markets: { primary: "United Arab Emirates", secondary: "Saudi Arabia" },
  platforms: ["SAP S/4HANA", "Oracle Fusion", "Microsoft Dynamics 365", "Salesforce", "Workday"],
  currency: "USD",
  offers: {
    evidenceCheck:   { name: "Readiness Evidence Check", days: 5,  listPrice: 5000,  foundingPrice: 2500, path: "/readiness-evidence-check" },
    decisionReview:  { name: "Go-Live Decision Review",  days: 10, listPrice: 12000, foundingPrice: 6000, path: "/go-live-decision-review" },
    continuous:      { name: "Continuous readiness assurance", listPriceFromMonthly: 6000, foundingPriceFromMonthly: 3000 },
  },
  feeCreditDays: 90,
  foundingSlotsRemaining: 3,
  selfCheck: { live: false, url: null as string | null },
  samplePackPath: "/documents/chisokulabs-go-live-decision-pack-illustrative.pdf",
  slipEstimator: {                           // 9.11; example values, IN-7
    defaults: { people: 40, dayRate: 600, weeks: 4, parallelRunMonthly: 0 },
    workingDaysPerWeek: 5,
  },
} as const;
```

Helpers: `formatPrice(n)`, `offerPriceLabel(offer)` returning list and (if slots remain) founding price. All pages, JSON-LD and `llms.txt` read prices from here only.

---

## 7. Signature component: Hero Evidence Check (E1)

**Purpose:** show the method in the first five seconds, before any sales copy (moat M1 + M3).

**Content (fictional, consistent with the sample pack, labelled "Illustrative example"):**

| ID | Claim as reported | Reported | S | O | E | D | A | Evidenced |
|---|---|---|---|---|---|---|---|---|
| T1 | SIT complete, 98% pass rate | Green | ● | ● | ◐ | ● | ○ | 3 of 5 |
| I1 | All 23 interfaces built and tested | Green | ● | ● | ○ | ○ | ○ | 2 of 5 |
| C2 | Rollback plan in place | Green | ◐ | ○ | ○ | ○ | ○ | 0 of 5 |

● present (counts) · ◐ partial (does not count) · ○ missing. Contradiction link between T1 and I1, label: "The 98% excludes 3 interfaces never tested end to end."

**Behaviour:**
1. Initial state (server-rendered, visible without JS): the three claims with their **Reported: Green** badges.
2. (v1.2) A two-button switch, "As reported" and "As evidenced", sits on the card. About 1.8 s after load the card moves once, on its own, from the reported view to the evidenced view: R5 cells and "N of 5 evidenced" scores (colour by score: ≥4 ok, 2–3 partial, 0–1 missing) replace the "Reported: Green" badges, two summary figures change ("3/3 claims reported Green" → "1/3 claims have most of their evidence" and "1 contradiction between workstreams"), the contradiction bracket draws between T1 and I1 and its label appears. The visitor can switch back and forth at any time.
3. (v1.2) Selecting a claim shows what the evidence shows for each of its five elements (Evidenced, Partial, Missing). There is no replay button.
4. `prefers-reduced-motion: reduce` → the evidenced view from first paint, without transitions; the switch still works.
5. Accessibility: the table is a real `<table>` with headers; R5 cells have visually hidden text ("Evidence: missing"); the live result is announced once via `aria-live="polite"` ("Check complete: 1 of 3 claims has most of its evidence; 1 contradiction found").
6. Client component only; no network calls; under 6 KB gzipped JS; no new dependency (use CSS transitions + a small state machine; GSAP/framer-motion are already installed but not required).
7. Mobile (≤ 640px): claims stack as rows with R5 cells beneath the claim text; contradiction shown as a note under T1 instead of a drawn line.

Next to it: headline "Your programme reports Green. We test whether the evidence agrees." and sub-line "Independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia." Primary CTA "Discuss your programme"; secondary "See a full sample decision pack".

---

## 8. Proof and claims policy for this release

1. No client names, logos, testimonials, case studies, ratings or counts of past ChisokuLabs engagements (none exist).
2. No founder name, photo, LinkedIn, employer names or personal metrics (L4).
3. Principal description allowed: "Every review is led and signed by a principal with 11+ years leading ERP and transformation programmes across aviation, banking and manufacturing, including multi-country go-lives." [FOUNDER APPROVES]
4. Industry statistics only with a named, linked source, and never in the hero. Allowed examples: Horváth 2025 S/4HANA survey (≈30% longer than planned; fewer than 1 in 10 on schedule); Gartner prediction (over 70% of ERP initiatives will not fully meet business-case goals by 2027). Cite as "survey/prediction", not fact.
5. Every sample artifact is labelled "Illustrative example. Fictional programme. Not a client engagement."
6. Never claim certification (SOC 2, ISO), regulatory approval, or guaranteed outcomes. State: "The review does not guarantee go-live success."

---

## 9. Copy deck (source of truth)

### 9.1 Homepage (`/`) — sections in order

1. **Hero** (Section 7 component, left/right on desktop).
   - H1: Your programme reports Green. We test whether the evidence agrees.
   - Sub: Independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia.
   - Buttons: Discuss your programme · See a full sample decision pack
   - Platform line (small): SAP S/4HANA, Oracle Fusion, Microsoft Dynamics 365, Salesforce, Workday.
2. **The problem** — H2: Every workstream can explain its piece. Nobody owns the whole picture.
   Body: Testing reports a pass rate. Migration reports a reconciliation. Cutover has a plan. The system integrator has an opinion, and its final milestone depends on the date holding. Weeks before go-live, leadership is asked to approve a decision on reports written by the people being judged on delivery. We don't assume anyone is misleading you. We check whether the evidence supports what is being reported.
3. **How we test readiness** (summary of `/method`) — H2: Five questions for every critical claim.
   Body: For each readiness claim across testing, data migration, integration, cutover and governance, we ask: Is the status current? Is there a named owner? Is there evidence behind it? Is there a date? Is there an action if it slips? Then we check the claims against each other, because the most expensive risks sit between workstreams. Link: How READINESS-5 works.
4. **What you get** — H2: A decision you can defend.
   Three outcomes, presented as the review's actual verdict format: **Go** — the evidence supports the date. **Conditional Go** — named conditions, owners and dates that must be met first. **No-Go** — what is missing and the shortest path back to a date. Link: See a full sample decision pack.
4a. **What a slipped go-live costs** (added in v1.1; component and copy in 9.11, built by E1.5). Sits between "What you get" and "Offers" so the visitor sees the cost of a slip before the price of a check.
5. **Offers** — H2: Start small, or go straight to a decision.
   Two offer panels (Evidence Check, Decision Review) with days, one-line outcome, list price, founding rate if slots remain, link to each page. Below: fee-credit sentence (6.2).
6. **See it before you sign** — H2: See the work before you talk to us.
   Items: The full sample decision pack (view or download, no form) · A free readiness brief on your programme, prepared from public information · The Readiness Self-Check (if `selfCheck.live`; otherwise omitted).
7. **Why not the usual options** — compact version of the comparison table (E5), link to `/pricing`.
8. **Independent, and careful with your data** — H2: No stake in your go-live date.
   Body: We take no implementation fees, resell no software and hold no system integrator partnerships. Your documents are processed under a written data-handling policy: never used to train models, deleted within 30 days of the final readout unless you ask us to keep them. Link: Independence and data handling.
9. **Principal-led** — one paragraph from 8.3. No photo.
10. **Closing CTA** — H2: Six weeks from go-live? Start with the evidence. Buttons: Discuss your programme · Request a free readiness brief.

### 9.2 `/readiness-evidence-check`
- H1: Readiness Evidence Check
- Lead: A five-day written review of your programme's readiness evidence. You learn which claims are proven, which are assumed, and where workstreams contradict each other.
- Who it's for: programmes 6–16 weeks from a go-live decision that want an independent read before committing to a full review.
- What we review: your current readiness pack, test exit or progress reports, defect log, migration reconciliation results, cutover plan and RAID log. We list exactly what we need on day one.
- What you receive: an evidence register of your critical claims scored on READINESS-5; a contradiction map; the five risks most likely to move your date; a one-hour readout.
- How it runs (sequence, numbered): Day 1 scoping call and document request · Days 2–4 evidence review · Day 5 written findings and readout.
- Price block (6.1/6.2/6.3). CTA: Discuss your programme.
- What it is not: not a re-test of your system, not a regulatory certification, not a guarantee of go-live success.

### 9.3 `/go-live-decision-review`
- H1: Go-Live Decision Review
- Lead: A ten-day independent review that gives your steering committee a defensible go-live decision: Go, Conditional Go or No-Go, with the conditions, owners and dates behind it.
- Scope: testing, data migration, integration, cutover and governance (business readiness added where it is material).
- Method: READINESS-5 for every critical claim, then contradiction testing across workstreams. Interviews only where the evidence conflicts, which keeps your team's time to a minimum.
- Deliverables: decision brief (two pages, steering-committee ready); evidence register; contradiction map; dated decision conditions with owners; leadership actions for the next 30 days; sponsor readout.
- Timeline (numbered sequence, 10 business days): Day 1 kickoff and evidence request · Days 2–6 evidence review and contradiction testing · Days 7–8 targeted interviews · Day 9 draft findings · Day 10 sponsor readout.
- Speed note: "Most independent reviews take four to six weeks. We deliver the same depth in ten business days because our evidence tooling extracts and cross-checks every claim; a principal reviews every finding and makes the judgement."
- Price block incl. fee credit. CTA: Discuss your programme.
- Continuous readiness assurance (short block, price from config).

### 9.4 `/method`
- H1: READINESS-5: how we test a go-live claim
- The five elements, each with a one-line test and a short "what failure looks like" example drawn from the sample pack:
  Status (current and specific, not "on track") · Owner (a named person with authority, not a team) · Evidence (an artefact you can open: test log, reconciliation output, signed approval) · Date (when it will be true, not "soon") · Action (what happens if it slips).
- Scoring: present ● · partial ◐ (not counted) · missing ○. A claim reported Green with 2 of 5 is an assumption, not a fact.
- Contradiction testing: four example contradiction types (pass rate on reduced scope; reconciliation passed while a business entity has not signed UAT; cutover approved with no agreed rollback point; headline status not traceable to workstream status).
- From findings to a decision: how conditions, owners and dates are set.
- What tooling does and doesn't do (M2 rule).

### 9.5 `/see-it-first`
- H1: See the work before you talk to us
- Block 1: Sample decision pack — inline preview of both pages (images) + "Download the PDF" (no form) + label from 8.5.
- Block 2: Free readiness brief — "Tell us the programme. Within two business days we send a one-page readiness brief prepared from public information: where readiness risk most likely sits and the questions we would ask." Form = contact form with request type preset to "Free readiness brief" (E9).
- Block 3: Readiness Self-Check — only when `selfCheck.live`.

### 9.6 `/pricing`
- H1: Pricing
- Price table from config; founding rate and slots remaining; fee credit; what's included; payment terms "50% on signature, 50% on delivery".
- Comparison table (E5).
- FAQ excerpt: "Why publish prices?", "What if our programme is larger?" (answer: multi-entity reviews are quoted after a scoping call; list price applies to one programme, up to five workstreams).

### 9.7 `/independence-and-data`
- Independence: no implementation fees; no software resale; no system integrator partnerships or referral fees; any conflict disclosed in writing before engagement.
- How we handle your evidence: shared under NDA; stored encrypted in a dedicated engagement workspace; access limited to the principal; never used to train AI models; AI processing only through providers contracted for zero data retention; personal data masked before processing where feasible; deleted within 30 days of the final readout unless you ask us to keep it. [FOUNDER APPROVES — every statement must be true before publishing]
- How AI is used: extracts claims and cross-checks evidence; every finding is reviewed and signed by the principal; AI does not make the go-live recommendation.

### 9.8 Comparison table (E5)

| | Big Four review | System integrator's readiness review | Typical boutique assurance | ChisokuLabs |
|---|---|---|---|---|
| Independent of delivery | Usually, check conflicts | No | Yes | Yes |
| Typical duration | Weeks to months | Part of delivery | 4–6 weeks | 5–10 business days |
| Price visible upfront | Rarely | Included in SI fees | Sometimes | Yes |
| Evidence tested claim by claim | Varies | Self-reported | Varies | Every critical claim, READINESS-5 |
| Contradictions across workstreams | Varies | Rarely | Varies | Always tested |
| See the output before you buy | Rarely | No | Rarely | Sample pack and free brief |

Footnote: "Comparisons describe typical market practice, not specific firms."

### 9.9 FAQ (minimum 12 items; E8)
1. How is this different from our system integrator's readiness review?
2. We trust our SI. Why would we need independent assurance?
3. When should a review start? (6–16 weeks before the decision; earlier is fine)
4. We go live in under four weeks. Can you still help? (Evidence Check, scoped to the highest-risk domains)
5. Which platforms do you cover?
6. What do you need from our team? (documents on day one; interviews only where evidence conflicts)
7. How do you protect our documents? (link to policy)
8. Do you use AI on our data? (yes for extraction and cross-checking, under the policy; the judgement is human)
9. Do you guarantee a successful go-live? (no)
10. Why are your prices public?
11. What is the fee credit?
12. Do you work in Saudi Arabia? (yes; remote by default, on site by arrangement)
13. Do you implement or fix what you find? (no; we stay independent, and we tell you who should own each fix)

**Answers (E8.1).** Items 4, 6, 9, 10, 11 and 13 reuse wording already approved on `/pricing`. Item 2 reuses the homepage section 2 wording; items 7 and 8 reuse the approved 9.7 statements. New wording for approval ([FOUNDER APPROVES], IN-11):
- 1: "We are independent of delivery, and your system integrator is not: its review is part of delivery, and its final milestone depends on the date holding. We test every critical claim on READINESS-5, check the claims against each other, and give a Go, Conditional Go or No-Go with the conditions, owners and dates behind it."
- 2 (opening): "Because leadership is asked to approve the go-live on reports written by the people being judged on delivery."
- 3: "Six to sixteen weeks before the go-live decision. Earlier is fine."
- 5: the platform list from config.
- 7 (opening): "Under a written data-handling policy." 8 (opening): "Yes, to extract claims and cross-check evidence, under the policy."
- 12: "Yes. Remote by default, on site by arrangement."
- Canonical answers in `src/lib/aeoContent.ts` (for llms.txt): what we do (homepage meta description), offers (config), method, markets, policy (9.7).

### 9.10 Market pages (E7)
- **UAE:** why now (SAP Business Suite 7 mainstream maintenance ends 2027 with optional extended maintenance to 2030; UAE e-invoicing for businesses above AED 50M turnover from 1 Jan 2027 adds an ERP integration go-live to many programmes); platforms; typical programme shapes (multi-entity groups, free-zone and mainland entities); how engagements run remotely with on-site option. Sources linked.
- **Saudi Arabia:** why now (ZATCA Phase 2 integration waves continuing, wave 25 from 1 Feb 2027; S/4HANA migrations); same structure. Sources linked.
- Each ends with the free readiness brief CTA. Facts must carry links; executor verifies each link loads (E7 Step 0).

**Copy (approved 17 Oct 2026, IN-10).** Sources verified in E7.0 (`evidence/E7.0-sources.md`). The UAE threshold is "AED 50 million or more": the resolution says "equal to or exceeds".
- H1: "Go-live readiness in the UAE" / "Go-live readiness in Saudi Arabia". Lead: "Independent go-live decision assurance for ERP and core-platform programmes in {the UAE | Saudi Arabia}."
- Hero CTAs: "Request a free readiness brief", "Discuss your programme". Platform chips from config.
- Card "Why now". UAE: "Two dates are adding go-lives to UAE programmes."
  - "1 January 2027" · "UAE e-invoicing becomes mandatory" · "For businesses with revenue of AED 50 million or more. For many programmes, that adds an ERP integration go-live." Source: UAE Ministry of Finance, Ministerial Resolution No. 66 of 2026.
  - "End of 2027" · "SAP Business Suite 7 mainstream maintenance ends" · "This includes SAP ERP 6.0. Optional extended maintenance runs to the end of 2030." Source: SAP Support, maintenance strategy for SAP Business Suite 7.
- Card "Why now". Saudi Arabia: "Two dates are adding go-lives to Saudi programmes."
  - "1 February 2027" · "ZATCA e-invoicing integration, wave 25" · "Taxpayers whose VAT-subject revenue exceeded SAR 187,500 in any year from 2022 to 2025 connect their invoicing systems to the Fatoora platform. Phase 2 integration continues in waves." Source: ZATCA, twenty-fifth integration wave, 24 July 2026.
  - "End of 2027": as for the UAE.
- "Typical programmes". UAE: "Multi-entity groups" · "Several companies going live on one platform, often in waves."; "Free-zone and mainland entities" · "Entities under different rules, on one platform and one go-live plan."; "S/4HANA migrations" · "Moving from SAP ERP 6.0 before mainstream maintenance ends."
- "Typical programmes". Saudi Arabia: "Multi-entity groups" and "S/4HANA migrations" as for the UAE; "Fatoora integrations" · "Connecting invoicing to ZATCA inside a wider ERP programme."
- "How an engagement runs" · "Remote by default, on site by arrangement." followed by the two offer panels from the homepage (prices from config).
- Closing: "A free readiness brief on your programme" · "Prepared from public information." (homepage section 6 wording) with "Request a free readiness brief" and "Discuss your programme".

---

### 9.11 Slipped go-live cost estimator (homepage section 4a; E1.5)

**Purpose:** the visitor enters their own numbers and sees, in seconds, what each week of go-live slip costs their programme, set against the price of a Readiness Evidence Check. It replaces the old homepage cost estimator (removed in E1.3) for the new positioning.

**Rules**
- Calm and factual (Section 2): no alarm language, no red "danger" styling. Evidence colours are not used here (5.1 reserves them for evidence status).
- The visitor's numbers only. The example values come from `siteConfig.slipEstimator.defaults`, are labelled "Example values", and are approved by the founder (IN-7). No industry statistic appears unless IN-8 supplies a named, linked source (8.4).
- Prices are read from config (`offers.evidenceCheck`), never typed in JSX. If founding slots remain, show the founding price as well as the list price.
- Runs in the browser only: no network calls, nothing stored, no personal data in analytics.
- Must not use the word "drag" (leak scan, E10.3).

**Inputs** (number fields, each with a visible label, min 0, sensible max)
1. People working on the programme (your team and partners); default 40
2. Average cost per person per day (USD, fully loaded); default 600
3. Weeks the go-live could slip; default 4
4. Monthly cost of keeping the current system running (USD, optional); default 0

**Calculation**
- Weekly run-rate = people × day rate × `workingDaysPerWeek` + parallelRunMonthly × 12 ÷ 52
- Cost of the slip = weekly run-rate × weeks
- Comparison = Evidence Check price ÷ (people × day rate), shown as working days of run-rate, rounded to one decimal

**Copy (DRAFT — [FOUNDER APPROVES], IN-7)**
- H2: What a slipped go-live costs.
- Lead: Put in your own numbers. When a go-live date moves, the programme team, the system integrator and the current system all keep running.
- Labels: as the inputs above. Small note above the fields: "Example values. Replace them with yours."
- Outputs: "Cost per week of slip: {weekly}" · "Cost of a {weeks}-week slip: {total}" ("an" before 8, 11, 18 and the 80s)
- Comparison line: "A Readiness Evidence Check costs {price}: about {days} working days of your programme's run-rate." (with founding price: "{list} list, {founding} founding-client rate")
- Footnote: "Calculated in your browser from your numbers. Directional only: it leaves out lost benefits, contract penalties and business disruption. Not a forecast for your programme."
- CTA: primary "Request a free readiness brief" (→ `/contact?request=brief`); text link "Discuss your programme" (→ `/contact?request=review`).
- Optional sourced line (only if IN-8 is answered): a survey statistic from 8.4 with its link, placed under the footnote, never as the headline.

**Behaviour and quality**
- Server-rendered with the example values, so the result is readable without JavaScript; the client component recalculates as the visitor types.
- Results announced politely (`aria-live="polite"`, debounced); inputs keyboard-accessible; works at 360px without horizontal scroll.
- Track `slip_estimate_used` once per page view, the first time the visitor changes any input (no values sent).
- Client JS ≤ 3 KB gzipped; no new dependency.

### 9.12 Homepage visual treatment and interface wording (v1.2, E1.6)

Each homepage section leads with a visual; the 9.1 copy is kept verbatim and may be split around it.
- Hero: ink band, white Evidence Check card (section 7). Platform line as chips.
- 2 The problem: four workstream cards (Testing, Migration, Cutover, System integrator), each "Green", joined by dashed lines to a centre marked "?" and "The go-live decision".
- 3 Method: the lead-in sentence, five R5 tiles (letter, name, question), then the cross-check sentence on an ink strip with the "How READINESS-5 works" link.
- 4 Verdicts: three cards with an icon each; Conditional Go emphasised; blank lines suggest conditions, owners and dates (no text).
- 4a Estimator: each number field paired with a slider; a week-by-week bar chart; a bar comparing the slip cost with the Evidence Check list price.
- 5 Offers: day strips (5 and 10 days; the Evidence Check strip uses the 9.2 sequence), a "Fee credited in full" badge between the panels, founding places shown as dots.
- 6 See it first: an illustration of the sample pack and of the brief (shapes only, no text).
- 8 Independence: three "None" tiles and three data-handling lines with icons.
- 9 Principal-led: a signature line and experience chips taken from the 8.3 paragraph.
- 10 Closing CTA: ink band with a six-week strip ending at go-live; W-6 highlighted.

Interface wording added by 9.12 ([FOUNDER APPROVES], IN-9): "Go-live readiness check"; "Three critical claims, all reported Green"; "As reported"; "As evidenced"; "claims reported Green"; "evidence not yet checked"; "claims have most of their evidence"; "contradiction between workstreams"; "{ID} {claim}: what the evidence shows"; "Evidenced", "Partial", "Missing"; "The go-live decision"; workstream lines "Reports a pass rate.", "Reports a reconciliation.", "Has a plan.", "Has an opinion, and a milestone tied to the date."; "Fee credited in full"; "None" with "Implementation fees", "Software resold", "System integrator partnerships"; the three data-handling lines (cut from section 8 body); on `/independence-and-data` (approved 17 Oct 2026): "Shared", "Stored", "Processed", "Deleted", "Last updated: {date}", "Questions about how we handle your data:"; "Led and signed by a principal"; chips "11+ years", "Aviation", "Banking", "Manufacturing", "Multi-country go-lives"; "W-6" to "W-1" and "Go-live"; estimator chart labels "Week 1" and "Week {n}".

## 10. SEO and answer-engine requirements (E8)

- Titles/descriptions per route from a single `src/lib/seo.ts` map; default title "Independent Go-Live Decision Assurance | ChisokuLabs".
- JSON-LD: Organization (areaServed AE, SA; no founder), WebSite, `Service` + `Offer` for both offers (prices from config), `FAQPage` on `/faq`, `DefinedTermSet` on `/glossary`, `HowTo` on the S/4HANA checklist guide, `BreadcrumbList` on guides.
- `llms.txt` / `llms-full.txt`: rebuilt from new canonical answers (what ChisokuLabs does, offers, prices, method, markets, policy).
- Glossary (≥ 15 terms): go-live readiness, go/no-go decision, conditional go, cutover, rollback point, point of no return, hypercare, SIT, UAT, data migration reconciliation, mock load, RAID log, readiness claim, READINESS-5, contradiction testing, decision condition.
  Definitions (E8.2, [FOUNDER APPROVES], IN-11) are in `src/lib/aeoContent.ts` (`glossaryTerms`), one to three sentences each; READINESS-5 and contradiction testing reuse 9.4 wording.
- Sitemap and `robots.ts` updated; remove deleted routes; set new `lastModified`.
- OG images: replace `og*.png` with new-system images (static PNGs generated from an internal route or design file; no runtime OG service).
- Canonicals on every page; no duplicate H1s.

---

## 11. Conversion and analytics (E9)

- Contact form becomes "Discuss your programme" with fields: name*, work email*, company*, country* (UAE, Saudi Arabia, Other GCC, Other), role (CIO/CTO, Transformation Director, Programme Sponsor, Programme/PMO Director, Other), **request type*** (Discuss a review · Free readiness brief · Pricing question), platform (from config + Other), **go-live decision date** (month picker, optional), message.
- Query param `?request=brief|review|pricing` presets request type; CTAs link with it.
- API route keeps Resend delivery; update payload and email subject `"[ChisokuLabs] {request type} — {company}"`; keep validation; add honeypot field; rate-limit by simple in-memory guard is **not** required.
- Analytics via existing `@vercel/analytics` `track()`: `cta_click` {id, page}, `sample_pack_view`, `sample_pack_download`, `hero_view_toggle` {view}, `slip_estimate_used`, `form_submit` {request_type}, `form_error`. No cookies beyond Vercel Analytics defaults; privacy page updated.
- Calendly button stays available on `/contact` as an alternative.

---

## 12. Non-functional requirements

- No new runtime dependencies except fonts via `next/font/google` (already the pattern). Any other addition needs [FOUNDER APPROVES].
- CSP in `next.config.ts` unchanged except where a story explicitly needs it (none expected).
- Build, lint and typecheck pass on every PR; no `any` added.
- Visual regression: before/after screenshots (desktop 1440, mobile 390) for every changed route attached to each PR.
- Accessibility: axe (via Playwright or `@axe-core/cli` run through `npx`, no dependency added) shows zero serious/critical issues on changed routes.

---

## 13. Out of scope (this release)

Self-Check app; Arabic site; blog/CMS; testimonials, logos, case studies; founder page; chat; newsletter; paid ads pixels; any Delivery Pulse, Kaname or Brain change; diagnostic subdomain changes.

---

## 14. Founder inputs register

| ID | Input | Needed by | Default if not answered |
|---|---|---|---|
| IN-1 | Approve prices in 6.1 (**approved 17 Oct 2026**) | E2 merge | Do not merge E2 |
| IN-2 | Public contact email (role address vs personal) | E9 | Keep current `siteConfig.email` |
| IN-3 | Approve principal paragraph (8.3) | E1 merge | **Approved as written, 17 Oct 2026** |
| IN-4 | Confirm every data-handling statement in 9.7 is true (**confirmed 17 Oct 2026**, all twelve; the homepage deletion line aligned to 9.7) | E6 merge | Do not publish `/independence-and-data` |
| IN-5 | Calendly link still valid | E9 | Keep current link |
| IN-6 | When the Self-Check goes live: URL | Later | `selfCheck.live = false` |
| IN-7 | Approve the estimator copy and example values in 9.11 (**approved 17 Oct 2026**, with "a"/"an" chosen by number in "Cost of a {weeks}-week slip") | E1.5 merge | Do not merge E1.5 |
| IN-8 | Optional: one survey statistic for the estimator, with its source URL | E1.5 | Omit the sourced line |
| IN-9 | Approve the interface wording in 9.12 (**approved 17 Oct 2026**) | E1.6 merge | Do not merge E1.6 |
| IN-10 | Approve the market page wording in 9.10 (**approved 17 Oct 2026**) | E7 merge | Do not merge E7.1 / E7.2 |
| IN-11 | Approve the new E8 wording: FAQ answers (9.9), glossary definitions, the three guides (`src/content/guides.ts`) | E8 merge | Do not merge E8 |
