// Unlisted guides. Old URLs stay live. The body is the PMO Health Audit method, not a go-live offer.

export type GuideBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "table"; caption: string; head: readonly string[]; rows: readonly (readonly string[])[] };

export type GuideSection = { id: string; heading: string; blocks: readonly GuideBlock[] };

export type ChecklistStep = { name: string; items: readonly string[] };

export type Guide = {
  path:
    | "/guides/s4hana-go-no-go-checklist"
    | "/guides/is-my-erp-ready-to-go-live"
    | "/guides/independent-assurance-vs-si-readiness-review";
  title: string;
  /** 60 words at most; answers the title. */
  answer: string;
  sections: readonly GuideSection[];
  checklist?: { id: string; heading: string; intro: string; steps: readonly ChecklistStep[] };
  sources: readonly { label: string; url: string }[];
};

const health5Table: GuideBlock = {
  kind: "table",
  caption: "HEALTH-5: the five questions for every critical claim",
  head: ["Element", "The question", "What counts as evidence"],
  rows: [
    ["Status", "Is the status current?", "A dated status that says what is done and what is not, not “on track”"],
    ["Owner", "Is there a named owner?", "One person who can make it true, not a team name"],
    ["Evidence", "Is there an artefact you can open?", "A status pack, a RAID log, minutes or a signed decision"],
    ["Date", "Is there a date?", "A calendar date, not “soon”"],
    ["Action", "Is there an action if it slips?", "An agreed next step, with an owner"],
  ],
};

const scores: GuideBlock = {
  kind: "list",
  items: [
    "Healthy: the evidence supports the status being reported.",
    "Needs attention: named gaps, owners and dates that must be closed first.",
    "At risk: what is missing, and the 30-day fix plan to recover.",
  ],
};

export const guides: readonly Guide[] = [
  {
    path: "/guides/s4hana-go-no-go-checklist",
    title: "How to test a programme status claim",
    answer:
      "A status claim is supported when it is current, owned, evidenced, dated and actioned. HEALTH-5 tests those five elements. A claim that fails any element is not treated as true. The claims are then checked against each other, across reports and forums.",
    sections: [
      {
        id: "when",
        heading: "When to use this",
        blocks: [
          {
            kind: "p",
            text: "Use it as soon as a status pack and a RAID log exist. Earlier is more useful, because there is still time to act. The questions do not replace the plan. They test whether the status being reported is supported by evidence.",
          },
          {
            kind: "p",
            text: "Leadership is asked to act on reports written by the people being judged on delivery. We don't assume anyone is misleading you. We check whether the evidence supports what is being reported.",
          },
        ],
      },
      {
        id: "five",
        heading: "Five questions for every critical claim",
        blocks: [
          {
            kind: "p",
            text: "HEALTH-5: for every programme, is the status current, owned, evidenced, dated and actioned? A claim reported Green with only two of the five is an assumption, not a fact.",
          },
          health5Table,
        ],
      },
    ],
    checklist: {
      id: "checklist",
      heading: "What to open",
      intro: "Apply HEALTH-5 to the artefacts a PMO already keeps. Do not accept a Green status as the evidence.",
      steps: [
        {
          name: "Status pack",
          items: [
            "The pack says what is true this week, not only “on track”.",
            "The pack can be traced to the project reports beneath it.",
          ],
        },
        {
          name: "RAID log",
          items: [
            "Open actions have owners and dates.",
            "Actions past their due date are closed or re-dated, not left while the pack stays Green.",
          ],
        },
        {
          name: "Governance",
          items: [
            "The forum minutes record a decision, not only a discussion.",
            "Critical risks have a named owner and a date.",
          ],
        },
        {
          name: "Cadence",
          items: [
            "The governance calendar shows when the forum meets.",
            "The status pack is current for that meeting.",
          ],
        },
        {
          name: "Plan and resourcing",
          items: [
            "The plan and the status pack describe the same work.",
            "The resource plan names who is released to the work, or the status stops reporting them as in place.",
          ],
        },
      ],
    },
    sources: [],
  },
  {
    path: "/guides/is-my-erp-ready-to-go-live",
    title: "Is the status being reported supported by evidence?",
    answer:
      "The status is supported when every critical claim passes HEALTH-5 and the reports do not contradict each other. A Green pack with overdue RAID actions, a forum that did not decide, or a resource plan that does not match the work is not yet supported.",
    sections: [
      {
        id: "problem",
        heading: "Every project reports its own status",
        blocks: [
          {
            kind: "p",
            text: "RAID logs grow, but actions don't close. Status turns Red the week it is too late to change anything. Leadership is asked to act on reports written by the people being judged on delivery.",
          },
          {
            kind: "p",
            text: "Each report can be right about its own piece while the whole picture is not. The expensive gaps sit between projects, reports and forums, not inside any one of them.",
          },
        ],
      },
      {
        id: "questions",
        heading: "The same five questions",
        blocks: [
          {
            kind: "p",
            text: "List the claims the status pack depends on. For each one, ask whether it is current, owned, evidenced, dated and actioned.",
          },
          health5Table,
          {
            kind: "list",
            items: [
              "A status that says “on track” and does not say what is true this week.",
              "A RAID log that is current while the actions on it are overdue.",
              "Minutes that record a discussion and not a decision.",
              "A resource plan that names roles whose people are not released, with no date.",
            ],
          },
        ],
      },
      {
        id: "score",
        heading: "A score you can act on",
        blocks: [
          {
            kind: "p",
            text: "The result is a Project Health Scorecard. Scope, schedule, risk, resourcing and stakeholder communications are scored, and each gap has an owner and a date.",
          },
          scores,
          {
            kind: "p",
            text: "The audit does not guarantee that a programme or portfolio will recover. It tells you what the evidence supports, and who should own each fix.",
          },
        ],
      },
    ],
    sources: [],
  },
  {
    path: "/guides/independent-assurance-vs-si-readiness-review",
    title: "An independent check, or a PMO who joins the team",
    answer:
      "A Head of PMO is a hire. A day-rate PMO joins the team. An independent check stays outside delivery, tests every critical claim on HEALTH-5, and leaves a score and a 30-day fix plan. It does not take the delivery role.",
    sections: [
      {
        id: "hire",
        heading: "What a hire does well",
        blocks: [
          {
            kind: "p",
            text: "A Head of PMO, or a freelance PMO on a day rate, joins the team. They run the cadence, the RAID log and the status pack. That is delivery. It is the right hire when you need someone inside the programme.",
          },
          {
            kind: "p",
            text: "Their status is still a report written by someone being judged on delivery. An independent check is a different job. Most programmes can use both: the team to run the work, and an outside read of whether the status is supported.",
          },
        ],
      },
      {
        id: "compare",
        heading: "How the options differ",
        blocks: [
          {
            kind: "table",
            caption: "How ChisokuLabs compares with the usual options for a PMO problem",
            head: ["", "Big Four review", "Hiring a Head of PMO first", "Freelance PMO (day rate)", "ChisokuLabs"],
            rows: [
              ["Independent of delivery", "Usually, check conflicts", "No, they join the team", "No, they join the team", "Yes"],
              ["Typical duration", "Weeks to months", "A permanent hire", "Open-ended", "5 working days"],
              ["Price visible upfront", "Rarely", "A salary", "A day rate", "Yes"],
              ["Evidence tested claim by claim", "Varies", "Varies", "Varies", "Every critical claim, HEALTH-5"],
              ["See the output before you buy", "Rarely", "No", "Rarely", "Free briefing"],
            ],
          },
          {
            kind: "p",
            text: "Comparisons describe typical market practice, not specific firms. ChisokuLabs takes no implementation fees, resells no software and holds no retainer.",
          },
        ],
      },
      {
        id: "limit",
        heading: "What the check is not",
        blocks: [
          {
            kind: "list",
            items: [
              "Not an implementation engagement.",
              "Not a regulatory certification.",
              "The audit does not guarantee that a programme or portfolio will recover.",
              "Not a hire. We stay independent, and we tell you who should own each fix.",
            ],
          },
          {
            kind: "p",
            text: "The PMO Health Check is one programme, 5 working days, USD 500, paid in full on signature. The PMO Health Audit is 5 working days, list price USD 5,000, founding-client rate USD 2,500, paid 50% on signature and 50% on delivery. The full Health Check fee is credited against the audit if the audit is signed within 60 days of the readout. The credit is not a refund.",
          },
        ],
      },
    ],
    sources: [],
  },
];

export const guideByPath = (path: Guide["path"]) => {
  const guide = guides.find((item) => item.path === path);
  if (!guide) throw new Error(`Unknown guide ${path}`);
  return guide;
};
