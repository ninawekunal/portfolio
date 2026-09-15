export type WinTheme = "customers" | "speed" | "trust" | "tooling";

export type Win = {
  id: string;
  theme: WinTheme;
  title: string;
  metric: string;
  metricLabel: string;
  who: string;
  problem: string;
  action: string;
  result: string;
  tradeoff?: string;
};

export type WinThemeFilter = {
  id: WinTheme | "all";
  label: string;
};

export type HeadlineStat = {
  value: string;
  label: string;
  detail: string;
};

export const winsHeading = {
  eyebrow: "Founding engineer at OpenCFO · Apr 2026 to now",
  title: "Product engineer. I ship the whole thing, and I build it for the person on the other side of the screen.",
  body:
    "OpenCFO is an AI-native accounts payable and receivable platform. I joined as the first full-stack hire and owned the web app while the company went from 0 to 10 customers. Before that I spent four years owning partner identity at Expedia for about 100K partners. I like ambiguous problems, short feedback loops, and knowing who the user is before I open the editor.",
  habits: [
    "Start from the user's day, not the ticket",
    "Measure, then fix",
    "Cut scope out loud",
    "Write the ask down so the other team can ship it",
  ],
  footnote:
    "Every number here comes from git, GitHub, or a doc I wrote at the time. The customer count is my own tally.",
};

export const headlineStats: HeadlineStat[] = [
  { value: "287", label: "merged PRs", detail: "75% of the repo, in 21 weeks" },
  { value: "87", label: "BFF endpoints", detail: "behind 136 routes I own" },
  { value: "0 → 3,200", label: "tests", detail: "test suite built from nothing" },
  { value: "40", label: "PRs in one week", detail: "peak week, August 2026" },
  { value: "2.5s → 0", label: "blocking time", detail: "on the heaviest page, traced not guessed" },
];

export const winThemeFilters: WinThemeFilter[] = [
  { id: "all", label: "Everything" },
  { id: "customers", label: "For customers" },
  { id: "speed", label: "Speed" },
  { id: "trust", label: "Trust and security" },
  { id: "tooling", label: "Team tooling" },
];

// Ordered so the first six cover every theme and lead with the strongest numbers.
export const wins: Win[] = [
  {
    id: "three-way-match",
    theme: "customers",
    title: "Shipped three-way matching for a real distributor",
    metric: "~25 PRs",
    metricLabel: "in one week, with the demo pulled forward 3 days",
    who: "An AP clerk at an Epicor Prophet 21 shop who checks every invoice against a PO and a receipt by hand.",
    problem:
      "The prospect needed invoice vs PO vs goods-receipt matching. Their ERP runs on-prem with no sandbox, and the demo moved from Tuesday to Friday.",
    action:
      "I read the call transcript and turned their GL variance habit into a distinct adjustment-line concept. Wrote the 12-doc spec, then built the match API, real receipts at PO-line grain, shortage adjustments, and an exception-first table. I cut scope at standup, out loud: manual upload only, receipts mocked with 4 to 5 exception cases, lead with the clean match, hide anything unbuilt instead of stubbing it.",
    result:
      "The demo shipped on Friday. 11 scenario bills seeded into the dev tenant and 8 backend behaviours documented on the way.",
    tradeoff:
      "No allocation entity. I derived it on read through the PO line id instead of adding a table nobody had asked for.",
  },
  {
    id: "bill-review-blocking",
    theme: "speed",
    title: "Removed 2.4 seconds of blocking from bill review",
    metric: "2,468ms → ~0",
    metricLabel: "main-thread blocking on a 20-page bill",
    who: "A reviewer opening a long bill who just wants to hover a field.",
    problem: "Opening a 20-page bill froze the page. Every hover paid a document-wide layout tax.",
    action:
      "I parsed a 145MB Chrome trace with a Node script instead of guessing at React re-renders. Four causes: the pdf.js text layer (1,198ms after LCP), one TooltipProvider per tooltip (226 mounts), a collapsible forcing 562ms of reflow, and 2,932 text spans making every layout pass 12.7x slower. Fixed each at the source.",
    result: "Text layer 1.2s to 0. 226 providers to 1. 25 new unit tests so it stays that way.",
    tradeoff: "Three of the four fixes were one-line mount changes. The work was in measuring, not typing.",
  },
  {
    id: "cache-leak",
    theme: "trust",
    title: "Closed a cross-user data leak",
    metric: "44 routes",
    metricLabel: "patched, with a CI test that scans the source",
    who: "Two people at a small finance team who share a laptop.",
    problem:
      "After logout, the next login on the same browser could see the previous user's worklist. It looked like a session bug.",
    action:
      "I reproduced it first. A post-logout GET returned 200 with 42 rows and the same Date header: the browser cache was replaying a private, max-age response with no Vary: Cookie. Set every BFF route to no-store, sent Clear-Site-Data on logout, logged account switches, and wrote a test that scans every route's source so a missing header fails CI.",
    result: "The fix was one header. The win is that nobody can forget it again.",
    tradeoff: "I did not use max-age plus Vary: Cookie. The browser cache is not the place to enforce tenancy.",
  },
  {
    id: "agent-system",
    theme: "tooling",
    title: "Built the team's Claude Code system",
    metric: "40 PRs",
    metricLabel: "merged in the peak week",
    who: "A three-person team that needed to move like ten.",
    problem: "A 478-line CLAUDE.md loaded into every session, half of it reference material, contradicted by AGENTS.md.",
    action:
      "The root file now holds only binary rules plus a routing table to 14 satellite docs. 26 skills, 3 read-only review subagents, 9 hooks (token guard, generated-file guard, file-size budget), and a decision log with 480 entries, each with a plain-English why, updated in the same commit as the change.",
    result: "242 co-authored commits. April: 13 PRs merged. August: 123.",
  },
  {
    id: "honest-upload",
    theme: "customers",
    title: "Made a slow upload say 'still processing', not 'failed'",
    metric: "202 + SSE",
    metricLabel: "the async contract the backend did not have yet",
    who: "Someone uploading a long PDF bill who trusts the progress bar.",
    problem:
      "The backend parsed the PDF inside the upload request. The bar hit 100% at one second, then the 120-second timeout said 'failed'. People uploaded again and created duplicates.",
    action:
      "I gave the upload an async contract at the BFF: accept, return 202, expose a status endpoint, stream progress over SSE, and let a poll own the final state because EventSource gives up on a 401. A page reload re-attaches to the job.",
    result: "A slow parse now reads 'still processing'. No more second uploads out of confusion.",
    tradeoff: "I did not wait for a backend async endpoint. The BFF could give users the honest answer today.",
  },
  {
    id: "ssr-bff",
    theme: "trust",
    title: "Moved auth out of localStorage in one week",
    metric: "1 PR",
    metricLabel: "SPA to SSR plus BFF. 87 endpoints ride on it now.",
    who: "Every user, whether they knew it or not.",
    problem:
      "JWTs sat in localStorage, readable by any script on the page. Permission checks ran only after hydration, and the page was an empty div until JS loaded.",
    action:
      "React Router v7 SSR with a signed httpOnly session cookie. Login, refresh, and logout as same-origin BFF routes. A permission check in every protected loader before render. Per-request nonce CSP. 30-minute idle and 7-day absolute session limits. ECS deploys pinned to immutable SHAs.",
    result: "Merged June 4. Every BFF endpoint since is built on it. I wrote the blog post on why BFF before GraphQL.",
  },
  {
    id: "collections-from-zero",
    theme: "customers",
    title: "Built Collections from zero",
    metric: "~60 PRs",
    metricLabel: "from an empty route to worklist, composer, dialer, and Ask AI",
    who: "A collections agent working a list of overdue invoices all day.",
    problem: "Receivables had no UI at all, and the API underneath it was still moving.",
    action:
      "Server-paginated worklist, customer and invoice detail, an AI email composer, inbox, dialer, and an Ask AI pane in a master-detail workspace. One structured log line per fetch: pages walked, total reported, rows mapped, rows dropped and why.",
    result: "The whole AR surface exists, and '0 rows' was traced to empty dev data in minutes instead of a day of guessing.",
  },
  {
    id: "windowed-pdf",
    theme: "speed",
    title: "Windowed the PDF viewer",
    metric: "58MB → 8.8MB",
    metricLabel: "canvas memory for a 20-page bill",
    who: "Anyone on a laptop with two other tabs open.",
    problem: "Both viewers mounted every page. 20 pages meant 58MB of canvas and 77% of the app's DOM.",
    action:
      "A scroll-arithmetic window over cached aspect ratios with sized placeholder slots, so the scrollbar never jumps. CSS-scale during a resize drag, re-rasterize once on settle.",
    result: "3 pages mounted at a time. Layout pass from 40.7ms to under 0.1ms.",
    tradeoff: "I rejected IntersectionObserver. Under load its async delivery starves and shows blank sheets.",
  },
  {
    id: "random-signouts",
    theme: "trust",
    title: "Proved 'random sign-outs' were not a frontend bug",
    metric: "2 cookie jars",
    metricLabel: "was all it took to prove it",
    who: "Users on dev, demo, and prod being thrown out mid-task, and a team that blamed the frontend.",
    problem: "Everyone assumed the frontend session layer. I was asked to fix it there.",
    action:
      "I hit the API directly with two cookie jars. Two logins returned byte-identical tokens, and one logout bumped a session_version claim that killed every device. I wrote the backend requirements doc with the proof attached, then shipped a frontend mitigation with the tradeoff stated plainly: a signed-out device stays valid for up to 60 minutes.",
    result: "The design change went to the backend with evidence. No time spent patching a layer that worked.",
  },
  {
    id: "design-manifests",
    theme: "tooling",
    title: "Made design specs impossible to fake",
    metric: "4 of 8",
    metricLabel: "'verified' components that did not exist, before the check",
    who: "An engineer, or an agent, building a screen from a spec.",
    problem:
      "An LLM-drafted manifest stamped 'verified' on 4 of 8 components that did not exist. A later PR deleted two failing rows to go green.",
    action:
      "A check that resolves every component export, import path, variant, and data source against real code. Two separate skills for generate vs implement, so an agent cannot faithfully build its own misreading. CI rule: the manifest PR and the implementation PR must be separate.",
    result: "A spec cannot claim a component exists anymore. Blameless postmortem written and kept in the repo.",
  },
  {
    id: "ap-inbox-agent",
    theme: "customers",
    title: "Built an AP inbox agent demo in 4 days",
    metric: "4 days",
    metricLabel: "from spec to prospect demo",
    who: "A prospect deciding whether an agent can triage their AP inbox.",
    problem: "We needed a believable agent demo for a prospect and had four days.",
    action:
      "Spec and design brief, a URL-only route with state tabs (Needs attention, Waiting, Auto-resolved, Risk), and agent classification that runs deterministically over the tenant's real emails so the demo never pretends something is live when it is not.",
    result: "3 PRs. 24 of 24 manifest components verified against real code before the call.",
  },
  {
    id: "match-api",
    theme: "speed",
    title: "Cut the match API by a third",
    metric: "1,087ms → 738ms",
    metricLabel: "three-way match read",
    who: "A reviewer who saves a match and expects the screen to agree with them.",
    problem: "A full match read took over a second, and reads after a save were 30 seconds stale.",
    action:
      "Two-phase response (bill and PO paint first, receipts fill in), 7 reads fanned in, one memoized compute serving core, full, and CSV, PO lines indexed in a Map. A generation counter invalidates the user's cache bucket on write.",
    result: "32% faster and never stale after a save.",
    tradeoff: "No fresh=1 query flag. Invalidate on write instead, so callers cannot forget.",
  },
  {
    id: "ranked-asks",
    theme: "customers",
    title: "Turned 'the backend is behind' into a ranked list",
    metric: "12 docs",
    metricLabel: "cross-team requirement docs the backend shipped against",
    who: "The one backend engineer with a full queue and no priority order.",
    problem:
      "The Collections UI had run ahead of its API. 12 of 23 operations were wired, Promises to Pay was fully mocked despite a finished API, and Disputes had zero real writes.",
    action:
      "I traced each generated SDK function to its callers, split real from mocked, and wrote ranked asks tagged New / Amend / Confirm with stable IDs. Plus a line at the top: if you do only three things, do A-1, A-2, A-3.",
    result: "The backend shipped the asks and the UI stack landed the same day.",
  },
  {
    id: "stepper-fetch",
    theme: "speed",
    title: "Killed a 9,999-row fetch hiding behind two arrows",
    metric: "1 → 0",
    metricLabel: "heavy requests every time a bill opened",
    who: "A reviewer clicking 'next bill'.",
    problem:
      "The prev/next stepper fetched page_size=9999 with three includes, cold, on every open. A second query polled a heavy payload every 2 seconds, forever.",
    action:
      "Derived the position from the worklist cache already in memory. Gave the poll a backoff: 2s x5, 5s x6, 10s x24, then stop.",
    result:
      "One heavy request to zero. Unbounded polling to 35 requests then silence. Found a cross-tenant cache key bug on the way and fixed it.",
  },
  {
    id: "data-table-kit",
    theme: "tooling",
    title: "Put 26 tables on one kit",
    metric: "-1,389",
    metricLabel: "net lines in one PR, across 39 files",
    who: "Whoever adds the 27th table.",
    problem: "A 110-line, 2-prop table had grown by copy-paste. CSV escaping lived in 13 files, pagination in 7.",
    action:
      "One shared table kit with search, sort, and pagination moved to the server, typed filter fields, saved filters per user, and a regression skill with a per-page behaviour catalog.",
    result: "26 tables on one kit. The second blog post covers how it grew from 2 props to 43.",
  },
  {
    id: "ten-hour-lesson",
    theme: "tooling",
    title: "Lost 10 hours to design churn. Fixed it structurally.",
    metric: "20 min",
    metricLabel: "the conversation that replaced 5 redesigns",
    who: "Me.",
    problem:
      "The PO match page went through 5 or 6 designs at about 2 hours each. The conversation that settled it took 20 minutes. I had been absorbing decisions that were not mine: scope, urgency, when the day ends.",
    action:
      "A written page contract before any UI: the verbs, their preconditions, permissions, the API behind each, and what the user must see to choose one. Run backwards over PO match, it cut exactly the three elements the PM later asked to remove.",
    result: "It lives in the repo as a rule now. And I make the asker price the ask.",
  },
];
