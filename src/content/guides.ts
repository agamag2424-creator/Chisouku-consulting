// Answer guides (PRD 4.1, E8.3). Every dated fact links to the issuer's own page (checked in E7.0). Industry statistics
// are left out: the Horváth and Gartner pages named in PRD 8.4 could not be opened from the build environment to check
// them. Wording approved by the founder (IN-11, 17 Oct 2026).

export type GuideBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "table"; caption: string; head: readonly string[]; rows: readonly (readonly string[])[] };

export type GuideSection = { id: string; heading: string; blocks: readonly GuideBlock[] };

/** One checklist domain; becomes a HowTo step on the S/4HANA guide. */
export type ChecklistStep = { name: string; items: readonly string[] };

export type Guide = {
  path:
    | "/guides/s4hana-go-no-go-checklist"
    | "/guides/is-my-erp-ready-to-go-live"
    | "/guides/independent-assurance-vs-si-readiness-review";
  /** The H1 and the breadcrumb name. */
  title: string;
  /** 60 words at most; answers the title. */
  answer: string;
  sections: readonly GuideSection[];
  checklist?: { id: string; heading: string; intro: string; steps: readonly ChecklistStep[] };
  sources: readonly { label: string; url: string }[];
};

const sapSource = {
  label: "SAP Support: maintenance strategy for SAP Business Suite 7",
  url: "https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html",
};
const uaeSource = {
  label: "UAE Ministry of Finance: Ministerial Resolution No. 66 of 2026",
  url: "https://mof.gov.ae/wp-content/uploads/2026/05/Ministerial-Resolution-No.-66-of-2026-Amending-Certain-Provisions-of-Ministerial-Resolution-No.-244-of-2025-Regarding-the-Implementation-of-the-Electronic-Invoicing-System-En-20260514.pdf",
};
const zatcaSource = {
  label: "ZATCA: twenty-fifth integration wave, 24 July 2026",
  url: "https://zatca.gov.sa/en/MediaCenter/News/Pages/Wave25-E-invoicing.aspx",
};

const readiness5Table: GuideBlock = {
  kind: "table",
  caption: "READINESS-5: the five questions for every critical claim",
  head: ["Element", "The question", "What counts as evidence"],
  rows: [
    ["Status", "Is the status current and specific?", "A dated status that says what is done and what is not, not “on track”"],
    ["Owner", "Is there a named owner with authority?", "One person who can make it true, not a team or a vendor"],
    ["Evidence", "Is there an artefact you can open?", "A test log, a reconciliation output, a signed approval"],
    ["Date", "When will it be true?", "A calendar date, not “before go-live” or “soon”"],
    ["Action", "What happens if it slips?", "An agreed fallback, workaround or change to the plan"],
  ],
};

const contradictions: GuideBlock = {
  kind: "list",
  items: [
    "A test pass rate that is high because the scope was reduced.",
    "A data reconciliation reported as passed while a business entity has not signed UAT.",
    "A cutover plan approved with no agreed rollback point.",
    "A headline status that cannot be traced to the workstream statuses beneath it.",
  ],
};

export const guides: readonly Guide[] = [
  {
    path: "/guides/s4hana-go-no-go-checklist",
    title: "S/4HANA go/no-go checklist",
    answer:
      "An S/4HANA go/no-go checklist tests whether each critical readiness claim is backed by evidence before the steering committee decides. Cover testing, data migration, integration, cutover and governance, and for every claim confirm the status, the named owner, the evidence, the date, and the action if it slips.",
    sections: [
      {
        id: "when",
        heading: "When to use this checklist",
        blocks: [
          {
            kind: "p",
            text: "Start six to sixteen weeks before the go-live decision, while there is still time to close gaps. Run it again for the final go/no-go meeting, on the evidence as it stands that week. The checklist is not a substitute for the plan. It is a test of whether the plan’s claims are true.",
          },
          {
            kind: "p",
            text: "For SAP ERP 6.0 customers the horizon is fixed: SAP’s mainstream maintenance for SAP Business Suite 7 ends at the end of 2027, with optional extended maintenance to the end of 2030. A fixed horizon adds pressure on the date, which makes an evidence-based decision more important, not less.",
          },
        ],
      },
      {
        id: "how-to-test",
        heading: "How to test each claim",
        blocks: [
          {
            kind: "p",
            text: "Each line of the checklist is a claim someone will make in the go/no-go meeting. Do not accept the claim as stated. Ask the five READINESS-5 questions. A claim reported Green with only two of the five is an assumption, not a fact.",
          },
          readiness5Table,
        ],
      },
      {
        id: "contradictions",
        heading: "Then check the claims against each other",
        blocks: [
          {
            kind: "p",
            text: "The most expensive risks sit between workstreams, where each team’s report is accurate on its own terms. Look for these four patterns:",
          },
          contradictions,
        ],
      },
      {
        id: "who-runs-it",
        heading: "Who should run it",
        blocks: [
          {
            kind: "p",
            text: "The programme director usually owns the checklist, but the evidence should be checked by someone who did not produce it. If the system integrator fills it in and the steering committee reads it, the checklist repeats the status report in a different format.",
          },
          {
            kind: "p",
            text: "Ask each workstream lead to attach the artefact behind every claim, and have someone outside delivery open them. Where an artefact cannot be produced, mark the element missing, not partial. Where two workstreams describe the same thing differently, treat it as a finding until it is explained.",
          },
        ],
      },
      {
        id: "decision",
        heading: "From checklist to decision",
        blocks: [
          {
            kind: "p",
            text: "The checklist should end in one of three decisions. Go: the evidence supports the date. Conditional Go: named conditions, owners and dates that must be met first. No-Go: what is missing and the shortest path back to a date.",
          },
          {
            kind: "p",
            text: "A Conditional Go is only useful if each condition is written as a test someone can pass or fail, with one owner and an evidence-by date. “Data migration to be stabilised” is not a condition. “Finance signs the trial balance reconciliation for all entities by 14 March” is.",
          },
        ],
      },
    ],
    checklist: {
      id: "checklist",
      heading: "The checklist",
      intro: "Five domains. Apply READINESS-5 to every item that is critical for your programme.",
      steps: [
        {
          name: "Testing",
          items: [
            "System integration testing complete, with every open defect closed or accepted by a named owner.",
            "User acceptance testing signed by each business area and entity in scope, not only by the project team.",
            "Regression run on the final transport set that will go to production.",
            "Performance tested at production-like volumes for the critical processes.",
            "Open defects triaged by severity, each with an agreed workaround or a fix date before go-live.",
          ],
        },
        {
          name: "Data migration",
          items: [
            "At least one full mock load on production-like data, with timings recorded.",
            "Reconciliation of record counts, balances and key fields, signed off by the data owners.",
            "Load and validation timings fit inside the cutover window, with contingency.",
            "Cut-off rules agreed for open items: open orders, open invoices, in-flight approvals.",
            "Master data cleansing complete for the objects that block transactions on day one.",
          ],
        },
        {
          name: "Integration",
          items: [
            "Every interface tested end to end against the real partner systems, not stubs.",
            "Tax and e-invoicing integration tested where it applies, for example UAE e-invoicing or the ZATCA Fatoora platform.",
            "Interface monitoring, error queues and reprocessing in place, with an owner for each.",
            "Partner and bank sign-offs received for changed formats and connections.",
          ],
        },
        {
          name: "Cutover",
          items: [
            "Cutover plan rehearsed end to end, with actual timings from the rehearsal.",
            "Rollback point agreed, and the rollback plan tested.",
            "Point of no return named, with the person who calls go or rollback.",
            "Go/no-go criteria for cutover agreed before cutover starts.",
            "Business freeze periods and communications agreed with each entity.",
          ],
        },
        {
          name: "Governance and business readiness",
          items: [
            "Hypercare staffed, with exit criteria and the hand-over to normal support agreed.",
            "Support model in place across business, internal IT and the system integrator.",
            "Key users trained, and roles and authorisations tested in production-like conditions.",
            "RAID log current: every open risk and issue has an owner and an action.",
            "Business readiness confirmed by each entity in scope, in writing.",
          ],
        },
      ],
    },
    sources: [sapSource, uaeSource, zatcaSource],
  },
  {
    path: "/guides/is-my-erp-ready-to-go-live",
    title: "Is my ERP ready to go live?",
    answer:
      "Your ERP is ready to go live when every critical readiness claim is backed by evidence you can open, not only by a Green status. If a claim has no named owner, no artefact, no date or no fallback action, it is an assumption, and the steering committee should treat it as one.",
    sections: [
      {
        id: "green-is-a-report",
        heading: "Green is a report, not evidence",
        blocks: [
          {
            kind: "p",
            text: "Weeks before go-live, leadership is asked to approve a decision on reports written by the people being judged on delivery. Testing reports a pass rate. Migration reports a reconciliation. Cutover has a plan. The system integrator has an opinion, and its final milestone depends on the date holding.",
          },
          {
            kind: "p",
            text: "None of that means anyone is misleading you. It means a status colour summarises a judgement, and the judgement is only as good as the evidence behind it. The question to ask is not “is it Green?” but “what would I open to see that it is true?”",
          },
        ],
      },
      {
        id: "five-questions",
        heading: "Five questions for every critical claim",
        blocks: [
          {
            kind: "p",
            text: "List the claims the go-live depends on across testing, data migration, integration, cutover and governance. For each one, ask the same five questions.",
          },
          readiness5Table,
          {
            kind: "p",
            text: "Score each element present, partial or missing. Count only what is present. A claim with two of five is an assumption, whatever colour it is reported in.",
          },
        ],
      },
      {
        id: "warning-signs",
        heading: "Ten warning signs",
        blocks: [
          {
            kind: "list",
            items: [
              "A test pass rate quoted without the scope it was measured on.",
              "A data reconciliation reported as passed, with no signed output anyone can open.",
              "UAT described as complete, but not signed by every business area or entity.",
              "A cutover plan that has never been rehearsed end to end.",
              "No agreed rollback point, or a rollback plan that has never been tested.",
              "Owners who are teams or vendors, not named people.",
              "Dates such as “before go-live” or “in hypercare”.",
              "RAID log items with an owner but no action.",
              "Workstream statuses that do not add up to the headline status.",
              "A go-live date tied to a payment milestone, with no independent view of readiness.",
            ],
          },
        ],
      },
      {
        id: "between-workstreams",
        heading: "Check the claims against each other",
        blocks: [
          {
            kind: "p",
            text: "Each workstream can be right about its own piece while the programme is not ready. The risks that delay go-lives most often sit between workstreams:",
          },
          contradictions,
          {
            kind: "p",
            text: "A contradiction rarely means one team is wrong. Usually two teams are measuring different things, or the same thing at different dates. Each one is a question for the go/no-go meeting: which statement is true today, who owns closing the gap, and by when.",
          },
        ],
      },
      {
        id: "regional-dates",
        heading: "Dates that add go-lives in the UAE and Saudi Arabia",
        blocks: [
          {
            kind: "p",
            text: "In the UAE, e-invoicing becomes mandatory on 1 January 2027 for businesses with revenue of AED 50 million or more. In Saudi Arabia, taxpayers in ZATCA’s twenty-fifth integration wave connect to the Fatoora platform by 1 February 2027. For many programmes, that adds an integration go-live alongside the ERP one, and the same five questions apply to it.",
          },
        ],
      },
      {
        id: "go-no-go-pack",
        heading: "What to ask for in the go/no-go pack",
        blocks: [
          {
            kind: "p",
            text: "A go/no-go pack built from workstream status reports tells you how each team feels about its piece. Ask for a pack built from claims instead:",
          },
          {
            kind: "list",
            items: [
              "The list of critical readiness claims, not only workstream statuses.",
              "For each claim, the artefact behind it, or a note that there is none.",
              "The open defects, data issues and risks being accepted, and who accepted each one.",
              "The rollback point, and the person who can call it.",
              "The conditions that must be met before go-live, each with an owner and a date.",
            ],
          },
        ],
      },
      {
        id: "if-unsure",
        heading: "If you are not sure",
        blocks: [
          {
            kind: "p",
            text: "Start with the evidence, not a new plan. A short, independent review of the readiness documents shows which claims hold and which are assumptions, and leaves time to act on them. If the decision is close, a fuller review gives the steering committee a Go, Conditional Go or No-Go with the conditions, owners and dates behind it.",
          },
          {
            kind: "p",
            text: "Either way, it takes days rather than weeks when the documents are shared on day one: five business days for a Readiness Evidence Check, ten for a Go-Live Decision Review, with interviews only where the evidence conflicts.",
          },
        ],
      },
    ],
    sources: [uaeSource, zatcaSource],
  },
  {
    path: "/guides/independent-assurance-vs-si-readiness-review",
    title: "Independent assurance vs an SI readiness review",
    answer:
      "An SI readiness review is run by the team delivering the programme, so it reports on its own work. Independent assurance is run by someone with no stake in the go-live date, and tests each readiness claim against evidence. Most programmes need both: the SI review as an input, independent assurance for the decision.",
    sections: [
      {
        id: "si-review",
        heading: "What an SI readiness review does well",
        blocks: [
          {
            kind: "p",
            text: "Your system integrator knows the configuration, the test cycles and the cutover plan better than anyone. Its readiness review is the best source of what has been done, and it should be the first input to any go-live decision.",
          },
          {
            kind: "p",
            text: "But it is part of delivery. The integrator is reporting on its own work, and its final milestone depends on the date holding. That is a structural position, not a question of honesty, and it is why a steering committee needs a second view before it signs.",
          },
        ],
      },
      {
        id: "incentives",
        heading: "Why the position matters",
        blocks: [
          {
            kind: "p",
            text: "An integrator’s commercial plan, staffing and next phase usually assume the date holds. Teams under that pressure can report faithfully and still read every ambiguity in the direction of the plan: a test cycle “substantially complete”, a reconciliation “with minor differences”, a cutover plan “approved in principle”.",
          },
          {
            kind: "p",
            text: "Each of those is defensible on its own. Together they can add up to a Green status that the evidence does not support. The same applies to any team whose fee, bonus or next phase depends on the date, including internal ones. Independent assurance does not replace the integrator’s judgement. It checks it.",
          },
        ],
      },
      {
        id: "comparison",
        heading: "How they compare",
        blocks: [
          {
            kind: "table",
            caption: "System integrator’s readiness review and independent assurance",
            head: ["", "SI readiness review", "Independent assurance"],
            rows: [
              ["Independent of delivery", "No", "Yes"],
              ["Typical duration", "Part of delivery", "5–10 business days"],
              ["Price visible upfront", "Included in SI fees", "Yes, fixed fee"],
              ["Evidence tested claim by claim", "Self-reported", "Every critical claim, READINESS-5"],
              ["Contradictions across workstreams", "Rarely", "Always tested"],
              ["Outcome", "A readiness status", "Go, Conditional Go or No-Go, with conditions, owners and dates"],
            ],
          },
          { kind: "p", text: "Comparisons describe typical market practice, not specific firms." },
        ],
      },
      {
        id: "what-it-adds",
        heading: "What independent assurance adds",
        blocks: [
          {
            kind: "list",
            items: [
              "Every critical claim tested for status, owner, evidence, date and action.",
              "Claims checked against each other across workstreams, where the most expensive risks sit.",
              "A recommendation the steering committee can defend: Go, Conditional Go or No-Go.",
              "Decision conditions with named owners and evidence-by dates, so a Conditional Go can be tracked.",
            ],
          },
        ],
      },
      {
        id: "choosing",
        heading: "How to choose an assurance provider",
        blocks: [
          {
            kind: "list",
            items: [
              "No implementation fees, no software resale and no system integrator partnerships or referral fees.",
              "A fixed scope and a published price, so you can judge the cost before you talk to them.",
              "A sample of the output you can see before you buy.",
              "Tests claims against evidence, rather than reviewing documents for completeness.",
              "Reports to the sponsor, and the person who signs the findings is the person who did the review.",
              "Says plainly that a review does not guarantee go-live success.",
              "Can start within days, because the review works from the documents you already have.",
            ],
          },
        ],
      },
      {
        id: "when",
        heading: "When to bring in independent assurance",
        blocks: [
          {
            kind: "list",
            items: [
              "Six to sixteen weeks before the go-live decision. Earlier is fine.",
              "When the date is fixed by something outside the programme, such as a regulatory deadline or the end of mainstream maintenance for the current system.",
              "When workstreams report Green but the steering committee cannot see the evidence behind it.",
              "When the integrator’s milestone payment is tied to the go-live date.",
              "Before rolling out to further entities or countries.",
            ],
          },
        ],
      },
      {
        id: "what-it-needs",
        heading: "What a review needs from you",
        blocks: [
          {
            kind: "p",
            text: "Mostly, documents the programme already has: test logs and defect lists, reconciliation outputs, the cutover plan and rehearsal results, the RAID log and the latest status reports. Then short interviews with workstream leads, held only where the documents disagree.",
          },
          {
            kind: "p",
            text: "It also needs a sponsor who receives the findings directly. If the findings reach the steering committee only through the delivery team, the review loses the independence it was bought for.",
          },
        ],
      },
      {
        id: "what-you-get",
        heading: "What you should get at the end",
        blocks: [
          {
            kind: "p",
            text: "A decision brief the steering committee can read in minutes, an evidence register showing each claim and the evidence behind it, a contradiction map, dated decision conditions with owners, the leadership actions for the next 30 days, and a readout for the sponsor. If a provider cannot show you a sample of these before you sign, ask why.",
          },
        ],
      },
      {
        id: "working-together",
        heading: "Working alongside your SI",
        blocks: [
          {
            kind: "p",
            text: "Independent assurance is not an audit of the integrator. The review asks for the documents the programme already has on day one, and holds interviews only where the evidence conflicts, which keeps everyone’s time to a minimum. Findings name who should own each fix. The assurance provider does not implement the fixes, so its view stays independent.",
          },
          {
            kind: "p",
            text: "Done well, the review helps the integrator too. A Conditional Go with clear conditions, owners and dates is easier to deliver against than a Green status that nobody fully believes, and it gives the integrator a defensible record of what was agreed before go-live.",
          },
        ],
      },
    ],
    sources: [sapSource],
  },
];

export const guideByPath = (path: Guide["path"]) => {
  const guide = guides.find((item) => item.path === path);
  if (!guide) throw new Error(`Unknown guide: ${path}`);
  return guide;
};
