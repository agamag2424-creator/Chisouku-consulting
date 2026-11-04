// Copy for /readiness-report and /readiness-pack: verbatim from the paid funnel brief (sections 3a–3c).
// `placeholder` values are open owner decisions; the pages show them visibly and the PR lists them. Never fill one in.

/** `**words**` in text is shown in bold, as in the brief. */
export type Line = { lead?: string; text: string };
export type Faq = { id: string; question: string; answer: string };

export const productFooterLine =
  "ChisokuLabs provides independent go-live decision assurance for ERP and core-platform programmes in the UAE and Saudi Arabia. No implementation fees, no software resale, no system integrator partnerships. ChisokuLabs is a trading name of ChisokuLab Private Limited, 190X/6/1, Kalindipuram, Prayagraj, U.P. 211011, India.";

export const report = {
  headline: "Before you sign the go-live, see where the evidence is thin.",
  headlinePlaceholder:
    "owner to confirm headline choice; alternatives: “Your e-invoicing go-live reports Green. Check what you can evidence.” / “ZATCA Wave 25 or UAE e-invoicing: a scored readiness report from your own answers.”",
  subheadline:
    "A scored PDF report for businesses going live with e-invoicing on Odoo, Zoho, SAP Business One or Microsoft Dynamics 365 Business Central. About 40 questions across seven areas, each checked on Status, Owner, Evidence, Date and Action.",
  price: "USD 149",
  priceNote: "PDF by email within 48 hours of payment",
  button: "Start the assessment",
  datesTitle: "The dates",
  dates: [
    {
      lead: "UAE, revenue of AED 50m or more:",
      text: "the deadline to appoint an accredited service provider (ASP) was 30 Oct 2026. Go-live is by 1 Jan 2027.",
    },
    { lead: "UAE, revenue under AED 50m:", text: "appoint an ASP by 31 Mar 2027. Go live by 1 Jul 2027." },
    {
      lead: "Saudi Arabia, ZATCA Wave 25:",
      text: "businesses whose VAT-subject revenue exceeded SAR 187,500 in 2022, 2023, 2024 or 2025 integrate with Fatoora by no later than 1 Feb 2027.",
    },
  ] satisfies Line[],
  datesSources:
    "Sources: Ministerial Decision No. 244 of 2025, as amended by Ministerial Resolution No. 66 of 2026 (UAE); ZATCA, 24 Jul 2026 (Saudi Arabia). Your report states the date that applies to you, with its source.",
  givesTitle: "What the report gives you",
  gives: [
    {
      lead: "An overall readiness score out of 12, and a band.",
      text: "The bands are Not ready yet, Partly ready and Ready to evidence: the same scale as the free readiness check.",
    },
    {
      lead: "A score for each of seven areas:",
      text: "scope, deadline and governance; data and master data; ERP configuration; ASP, Fatoora and integration; testing evidence; cutover and rollback; people and support.",
    },
    {
      lead: "Your deadline in writing.",
      text: "The date for your country and revenue band, the official source, and the buffer between it and your planned go-live.",
    },
    {
      lead: "Red flags.",
      text: "Specific conditions that can stop a go-live whatever the overall score, such as untested rejections, no day-one contingency, or an overdue ASP appointment. For each one: what it means and the first step.",
    },
    {
      lead: "Contradictions.",
      text: "Pairs of answers that cannot both be true. For example, recorded end-to-end tests with no contracted provider.",
    },
    {
      lead: "A prioritised 30-day fix list.",
      text: "Up to 10 actions over four weeks, each with an owner role and what “done” looks like. Built only from your answers.",
    },
    {
      lead: "A note for your ERP.",
      text: "General questions to settle with your vendor, partner or provider. It does not recommend or endorse any of them.",
    },
  ] satisfies Line[],
  forTitle: "Who it is for",
  for: [
    "Finance, IT and project leads at SMEs in the UAE or Saudi Arabia preparing for e-invoicing.",
    "Teams running Odoo, Zoho, SAP Business One or Microsoft Dynamics 365 Business Central. Other ERPs work too; the ERP note is then general.",
    "Anyone asked to approve a go-live date who wants a structured view of where the gaps are before the meeting.",
  ],
  notForTitle: "Who it is not for",
  notFor: [
    "If you need someone to read your documents, test your data or review your invoices, this report does not do that. See “Discuss your programme” on chisokulabs.com.",
    "If you need tax or legal advice, speak to a qualified tax adviser.",
  ],
  howTitle: "How it works",
  how: [
    { text: "Pay USD 149 through Razorpay." },
    { text: "Answer the questionnaire for where your programme is today." },
    { text: "Receive your PDF report by email within 48 hours of payment." },
  ] satisfies Line[],
  howPlaceholder: "completion time, estimated 15–20 minutes, confirm in QA",
  isTitle: "What it is, and is not",
  is: "The report is generated only from your answers. We do not read your documents, data or invoices. It is guidance to support your own decision. It is not tax or legal advice, and it does not certify compliance with UAE, Saudi (ZATCA) or any other e-invoicing rules.",
  creditTitle: "Going further: the Pack credit",
  credit:
    "If you buy the Go-Live Readiness Pack within 60 days of your report being delivered, the USD 149 you paid for the report is credited towards it, so the Pack costs you USD 100. The email that delivers your report includes the upgrade link. After 60 days, the Pack is at the full price of USD 249.",
  faqs: [
    {
      id: "tax-advice",
      question: "Is this tax or legal advice?",
      answer:
        "No. The report is guidance based on your answers. It does not certify compliance. Check the current rules with the Federal Tax Authority, the UAE Ministry of Finance or ZATCA, and with a qualified tax adviser.",
    },
    {
      id: "documents",
      question: "Do you look at our documents or systems?",
      answer: "No. The report is based only on what you tell us. Scores depend entirely on your answers.",
    },
    {
      id: "free-check",
      question: "How is this different from the free readiness check?",
      answer:
        "The free check has 12 questions across six areas and gives a score, your weakest area and one next step. The report has about 40 questions and adds e-invoicing questions for the UAE and Saudi Arabia. It also gives a score for every area, red flags, contradictions between answers, your deadline with its source, and a 30-day fix list.",
    },
    {
      id: "both-countries",
      question: "We invoice in both the UAE and Saudi Arabia. Does it cover both?",
      answer: "Yes. Answer for both, and the report uses the earlier of your two dates.",
    },
    {
      id: "revenue-band",
      question: "We are not sure which UAE revenue band we are in.",
      answer:
        "The report uses the earlier date until you confirm it. Confirming your band is then the first item on your fix list. Revenue here means revenue in your most recent accounting period, as shown in your financial statements. It does not mean VAT turnover.",
    },
    {
      id: "too-early",
      question: "We are under AED 50m. Is it too early?",
      answer:
        "The ASP appointment date for your band is 31 Mar 2027 and go-live is by 1 Jul 2027. The report shows what needs to be in place by then, and in what order.",
    },
    {
      id: "other-erp",
      question: "Our ERP is not on your list.",
      answer: "The questions apply to any ERP. The ERP note in your report will be general.",
    },
    {
      id: "recommend",
      question: "Does the report recommend an ERP partner or e-invoicing provider?",
      answer: "No. We have no implementation fees, no software resale and no system integrator partnerships.",
    },
    {
      id: "answers",
      question: "Who sees our answers?",
      answer:
        "We use your answers only to produce and deliver your report, and keep them for 24 months after purchase. Our Privacy page has the details.",
    },
    {
      id: "share",
      question: "Can I share the report with our ERP partner?",
      answer:
        "Yes. You may share your own report with your ERP implementation partner, for work on your own project only. Your partner may not use it for other clients or projects. White-label use or resale is allowed only under a separate written partner agreement with us. If you are an implementation partner and want that, email hello@chisokulabs.com.",
    },
  ] satisfies Faq[],
  deliveryTitle: "Delivery and refunds",
  delivery: [
    { lead: "Delivery:", text: "a PDF sent to the email address you give at checkout, within 48 hours of payment. No delivery charges." },
    {
      lead: "Refunds:",
      text: "the report is generated from your own answers, so we refund it in full only if: it is faulty (for example, incomplete or unreadable) and we cannot send a corrected copy within 5 business days; or it is not delivered within 48 hours of payment.",
    },
    {
      lead: "Cancellation:",
      text: "if your report has not been generated yet, email us and we will cancel the order and refund you in full. Once it has been generated, the order cannot be cancelled.",
    },
    { lead: "Price:", text: "USD 149. Prices exclude applicable taxes. Payments are processed by Razorpay." },
  ] satisfies Line[],
};

export const pack = {
  headline: "Run the last 12 weeks before your e-invoicing go-live on evidence.",
  headlinePlaceholder:
    "owner to confirm; alternatives: “The templates behind a go-live decision you can defend.” / “Checklist, cutover runbook, RAID log, decision log and Go/No-Go scorecard for ZATCA Wave 25 and UAE e-invoicing.”",
  subheadline:
    "Editable workbooks and a guide for finance and IT teams taking Odoo, Zoho, SAP Business One or Microsoft Dynamics 365 Business Central live with e-invoicing in Saudi Arabia or the UAE.",
  price: "USD 249",
  priceCredit: "or USD 100 if you bought the Go-Live Readiness Report in the last 60 days",
  priceNotes: ["Download link within 48 hours of payment", "Free updates until 1 Jul 2027"],
  button: "Buy the Pack",
  includedTitle: "What's included",
  workbooksLead: "Five Excel workbooks",
  workbooksText: "(.xlsx). They work in Excel and Google Sheets and contain no macros.",
  workbooks: [
    {
      lead: "E-invoicing readiness checklist.",
      text: "A common tab, plus a KSA tab (Wave 25, Fatoora onboarding, clearance and reporting) and a UAE tab (ASP appointment, EmaraTax, sending and receiving). Each line is a claim, tracked on Status, Owner, Evidence, Due date and Action if it slips. A summary counts overdue lines, lines with no owner, and lines marked Done with no evidence.",
    },
    {
      lead: "Cutover runbook.",
      text: "Steps from T-14 to the end of hypercare, each with an owner, a predecessor, planned and actual times, a rollback trigger and a contingency step. Includes a contacts and escalation sheet and a communications plan.",
    },
    {
      lead: "RAID log.",
      text: "Risks (scored likelihood × impact), assumptions, issues and dependencies. Starter entries for common e-invoicing go-live items, for you to rate and adapt.",
    },
    {
      lead: "Decision log.",
      text: "Starter rows for the decisions most e-invoicing go-lives need: accountable owner, date, provider, integration route, special cases, day-one contingency, freezes, hypercare and the Go/No-Go outcome.",
    },
    {
      lead: "Go/No-Go scorecard.",
      text: "Rates each claim on READINESS-5 and flags claims reported Green that the evidence does not support. Formulas calculate a Go, Conditional Go or No-Go recommendation, with the reasons. Includes sections for contradictions and conditions, and a worked example on a fictional programme.",
    },
  ] satisfies Line[],
  extras: [
    {
      lead: "A PDF guide.",
      text: "How to run the last 8–12 weeks, how to use each workbook, the e-invoicing points specific to Saudi Arabia and the UAE (with official sources), and how to run the Go/No-Go meeting: attendees, agenda, rules and the three outcomes.",
    },
    {
      lead: "Free updates until 1 Jul 2027.",
      text: "If an official date or requirement covered by the Pack changes, you receive the updated files by email.",
    },
    {
      lead: "ERP notes",
      text: "for Odoo, Zoho, SAP Business One and Microsoft Dynamics 365 Business Central. General questions to settle in writing with your vendor, partner or provider. They are not configuration steps, and they do not endorse anyone.",
    },
  ] satisfies Line[],
  forTitle: "Who it is for",
  for: [
    "Teams 8–12 weeks or more from an e-invoicing go-live who need one structure for status, risks, decisions, cutover and the decision meeting.",
    "Finance leads who will be asked to approve the date.",
    "Businesses whose ERP partner or provider runs the technical work, but who still own the decision.",
  ],
  notForTitle: "Who it is not for",
  notFor: [
    "If you need configuration steps for your ERP, or technical integration with Fatoora or an ASP, ask your vendor, partner or provider.",
    "If you need tax or legal advice, speak to a qualified tax adviser.",
    "If you need someone to review your evidence, see “Discuss your programme” on chisokulabs.com.",
  ],
  isTitle: "What it is, and is not",
  is: "The Pack is a set of templates and guidance to support your own decision. It is not tax or legal advice. It does not certify compliance with UAE, Saudi (ZATCA) or any other e-invoicing rules. It does not include system configuration, integration, support or calls.",
  creditTitle: "The report credit, explained",
  credit: [
    { text: "Bought the Go-Live Readiness Report? The USD 149 you paid is credited towards the Pack, so you pay **USD 100**." },
    {
      text: "The credit lasts **60 days from the date your report is delivered**. After that, the Pack is at the full price of USD 249.",
    },
    {
      text: "The email that delivers your report includes a link to the Pack upgrade at USD 100. We check it against your report order, so there is no code to enter.",
    },
    {
      text: "The credit works one way only. If you buy the Pack first, nothing is credited towards a later report, which is at its full price of USD 149.",
    },
  ] satisfies Line[],
  faqs: [
    {
      id: "report-first",
      question: "Do I need the report first?",
      answer:
        "No. The Pack works on its own. The report gives you a scored starting point and a fix list. If you buy the report first, its USD 149 is credited towards the Pack, as long as you buy the Pack within 60 days of the report being delivered. Buying the Pack first gives no credit towards the report.",
    },
    {
      id: "tax-advice",
      question: "Is this tax or legal advice?",
      answer:
        "No. It is guidance and templates. Check the current rules with the Federal Tax Authority, the UAE Ministry of Finance or ZATCA, and with a qualified tax adviser.",
    },
    {
      id: "erp",
      question: "Will it work with our ERP?",
      answer:
        "The workbooks do not connect to any system, so they work whatever ERP you run. The ERP notes cover Odoo, Zoho, SAP Business One and Microsoft Dynamics 365 Business Central. The questions in them apply to any ERP.",
    },
    {
      id: "both-countries",
      question: "Does it cover both Saudi Arabia and the UAE?",
      answer: "Yes. The checklist has a separate tab for each, and the guide covers both.",
    },
    {
      id: "edit",
      question: "Can we edit the files?",
      answer: "Yes. Edit and adapt them for your own company's internal work.",
    },
    {
      id: "share",
      question: "Can we share the files with our ERP partner?",
      answer:
        "Yes. Each purchase gives one company a licence to use and adapt the materials for its own project, and you may share them with your ERP implementation partner for work on that project only. Your partner may not use them for other clients or projects. Apart from that, you may not resell, redistribute or publish the materials. White-label use or resale is allowed only under a separate written partner agreement with us. If you are an implementation partner and want that, email hello@chisokulabs.com.",
    },
    {
      id: "rules-change",
      question: "What happens when the rules change?",
      answer:
        "Pack buyers get free updates until 1 Jul 2027. If ZATCA, the Federal Tax Authority or the UAE Ministry of Finance changes a date or requirement that the Pack covers, we update the affected files and email the new version to the address you bought with. Each version shows the date its sources were checked. Always check the current position with the authority as well.",
    },
    {
      id: "macros",
      question: "Do the workbooks use macros?",
      answer: "No. They use standard formulas, drop-down lists and conditional formatting.",
    },
  ] satisfies Faq[],
  deliveryTitle: "Delivery and refunds",
  delivery: [
    {
      lead: "Delivery:",
      text: "a download link to a ZIP file containing the .xlsx templates and the PDF guide. Sent by email and/or shown on the payment confirmation page within 48 hours of payment. The link stays active for 30 days; email us if you need it re-sent. No delivery charges.",
    },
    {
      lead: "Refunds:",
      text: "the files cannot be returned once downloaded, so refunds are limited to these cases: you have not downloaded the files, and you ask within 7 days of purchase; the files are faulty or incomplete, and we cannot send a working copy within 5 business days; you were charged twice, or the files were never delivered.",
    },
    {
      lead: "Report credit and refunds:",
      text: "if the USD 149 report credit was applied, a Pack refund is the amount you actually paid (USD 100). Refunding the Pack does not refund the report.",
    },
    {
      lead: "Price:",
      text: "USD 249, or USD 100 with the report credit (within 60 days of your report being delivered). Prices exclude applicable taxes. Payments are processed by Razorpay.",
    },
    { lead: "Updates:", text: "free updates until 1 Jul 2027, sent by email." },
  ] satisfies Line[],
};

/** The report questionnaire (brief 3a) is not final. It drops in here as data; the flow already supports it. */
export const reportQuestionnairePlaceholder = "question list, groupings and scoring from the report model, due Fri 6 Nov";
