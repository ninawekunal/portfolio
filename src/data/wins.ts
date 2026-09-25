export type WinTheme = "customers" | "speed" | "trust" | "tooling";

export type WinMetric = {
  value: string;
  label: string;
};

/**
 * One story, told CARL: Context, Action, Result, Learning.
 * Copy may mark jargon as `[[glossary-key]]` or `[[glossary-key|label]]`; see `data/glossary.ts`.
 * No dates in the copy: a reader should not have to do calendar maths to follow a story.
 */
export type Win = {
  id: string;
  theme: WinTheme;
  /** Set only when the story is not from OpenCFO. */
  company?: string;
  title: string;
  /** The one number shown in the list on the left. */
  metric: string;
  metricLabel: string;
  who: string;
  context: string;
  action: string[];
  result: string;
  learning: string;
  metrics: WinMetric[];
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
  title:
    "Product engineer. I ship the whole thing, and I build it for the person on the other side of the screen.",
  body: "OpenCFO is an AI-native accounts payable and receivable platform. I joined as the first full-stack hire and owned the web app while the company went from 0 to 10 customers. Before that I spent four years owning partner identity at Expedia for about 100K partners. I like ambiguous problems, short feedback loops, and knowing who the user is before I open the editor.",
  habits: [
    "Start from the user's day, not the ticket",
    "Measure, then fix",
    "Cut scope out loud",
    "Write the ask down so the other team can ship it",
  ],
  footnote:
    "OpenCFO numbers come from git, GitHub, or a doc I wrote at the time. Expedia numbers are from my own records. The customer count is my own tally. Words with a dotted yellow underline explain themselves when you click them.",
};

export const headlineStats: HeadlineStat[] = [
  { value: "287", label: "merged PRs", detail: "75% of the repo, in 21 weeks" },
  { value: "87", label: "BFF endpoints", detail: "behind 136 routes I own" },
  {
    value: "0 → 3,200",
    label: "tests",
    detail: "test suite built from nothing",
  },
  { value: "40", label: "PRs in one week", detail: "the busiest week" },
  {
    value: "2.5s → 0",
    label: "frozen screen time",
    detail: "on the busiest screen, measured not guessed",
  },
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
    metricLabel: "in one week, with the demo moved up three days",
    who: "An accounts payable clerk at a wholesale distributor who checks every bill against an order and a delivery by hand.",
    context:
      "A prospect running [[prophet-21]] on their own servers needed [[three-way-match]]: each bill checked against the [[purchase-order]] and the [[goods-receipt]], line by line. There was no test copy of their system we could connect to, and the demo moved three days earlier.",
    action: [
      "Read the customer call transcript and turned one of their habits, booking small price differences to a [[general-ledger]] account, into a real feature: an adjustment line, kept separate from a matched line.",
      "Wrote a 12-document plan the backend engineer could build against, with every open question numbered.",
      "Built the matching on our server in two steps, so the bill and order show immediately and the delivery details fill in behind.",
      "Cut scope out loud at standup: manual upload only, four or five realistic problem cases, lead with a clean match, and hide anything unfinished instead of faking it.",
    ],
    result:
      "The demo shipped on the new date. On the way I set up 11 realistic test bills and wrote down 8 backend behaviours nobody had documented.",
    learning:
      "I argued for a table that records every match, so finance could replay who matched what, and when. We skipped it to hit the date and worked each match out on the fly instead. I still think the record is the right end state: the first time someone asks why a line changed last week, working it out on the fly has no answer.",
    metrics: [
      { value: "~25", label: "pull requests in one week" },
      { value: "12", label: "planning docs the backend built against" },
      { value: "11", label: "realistic test bills for the demo" },
    ],
  },
  {
    id: "bill-review-blocking",
    theme: "speed",
    title: "Made the busiest screen stop freezing",
    metric: "2.5s → 0",
    metricLabel: "of frozen screen when opening a long bill",
    who: "A reviewer opening a 20-page bill who just wants to hover over a field.",
    context:
      "Bill review is where a person checks what the AI read off an invoice before it gets paid. Opening a long bill froze the page for about two and a half seconds, and every hover after that felt sticky.",
    action: [
      "Recorded a [[performance-trace]] of the page loading and wrote a small script to read it, instead of guessing.",
      "Found four causes. The biggest was an invisible copy of every page's text, built by [[pdf-js]] for highlighting, costing 1.2 seconds on its own.",
      "Another was 226 copies of the same tooltip helper, where the page needed one.",
      "Fixed each where it started, and added 25 automated tests so they stay fixed.",
    ],
    result:
      "The frozen time went from about 2.5 seconds to nearly zero. Three of the four fixes were one-line changes once the trace pointed at them.",
    learning:
      "The work was in measuring, not typing. My first guess, too many re-renders, was wrong. I now record a trace before touching anything that feels slow.",
    metrics: [
      { value: "2,468ms → ~0", label: "time the page could not respond" },
      { value: "1.2s → 0", label: "cost of the hidden PDF text layer" },
      { value: "226 → 1", label: "copies of the tooltip helper" },
    ],
  },
  {
    id: "cache-leak",
    theme: "trust",
    title: "Closed a leak that showed one user another user's data",
    metric: "44 routes",
    metricLabel: "fixed, with a check that stops it coming back",
    who: "Two people on a small finance team who share one laptop.",
    context:
      "After one person logged out, the next person to log in on the same browser could briefly see the previous person's work queue. It looked like a login bug.",
    action: [
      "Reproduced it before touching any code. A request made after logout still came back with 42 rows of the previous user's data.",
      "Found the real cause: the [[browser-cache]] was replaying a saved copy, because nothing told it that data belonged to one user.",
      "Told the browser never to keep a copy of that data, and to wipe everything for the site on logout.",
      "Added a test that reads every data route's code, so forgetting the rule on a new route fails the [[ci|automated checks]].",
    ],
    result:
      "The fix itself was one line per route. The real win is that nobody can forget it again.",
    learning:
      "The browser cache is not the place to keep users apart. I chose 'never keep private data' over a cleverer setting that would always be one mistake away from the same leak.",
    metrics: [
      { value: "42", label: "rows exposed before the fix" },
      { value: "44", label: "routes patched" },
      { value: "1", label: "test that checks every route, forever" },
    ],
  },
  {
    id: "agent-system",
    theme: "tooling",
    title: "Built the AI coding setup a three-person team ran on",
    metric: "40 PRs",
    metricLabel: "merged in the busiest week",
    who: "A three-person team that needed to move like ten.",
    context:
      "We wrote most of our code with [[claude-code]]. Its instructions file had grown to 478 lines, half of it reference material, and it contradicted a second instructions file.",
    action: [
      "Cut the main file down to hard yes-or-no rules, plus a table saying which of 14 short guides to read for which task.",
      "Wrote 26 [[agent-skill]] for common jobs, and 3 read-only reviewers that check every change.",
      "Added 9 [[agent-hook]] that stop a change breaking a rule, like editing generated files or letting a file grow too big.",
      "Kept a decision log of 480 entries, each with a one-line plain-English reason, written in the same change as the code.",
    ],
    result:
      "Merged changes went from 13 in the first month to 123 in the busiest month.",
    learning:
      "A rule that depends on someone remembering is a hope. The rules that held were the ones a hook enforces.",
    metrics: [
      { value: "13 → 123", label: "changes merged per month" },
      { value: "26", label: "reusable skills" },
      { value: "480", label: "logged decisions, each with a reason" },
    ],
  },
  {
    id: "auto-match",
    theme: "customers",
    title: "Taught the match screen to handle messy part numbers",
    metric: "~1,500",
    metricLabel: "invoice lines a month for the customer who needed it",
    who: "An accounts payable clerk whose supplier prints part numbers slightly differently on the bill and the order.",
    context:
      "On a customer call they told us their part numbers never quite line up: the bill says WH21X35696, the order says 22-WH21X35696. Our backend only matched exact codes, so those lines arrived unmatched and a person searched for each one by hand, at around 1,500 lines a month.",
    action: [
      "Built [[fuzzy-matching]] on our own server while the backend caught up, scoring every unmatched line against every order line.",
      "Scored the part number and the description separately and required both to agree, because two codes one character apart can be different parts, and one description can appear on dozens of lines.",
      "Made it suggest, not decide. Matches above 90% open in a review list with every row ticked; the clerk unticks what they disagree with and applies the rest. Only perfect matches apply on their own.",
      "Saved every accepted match through the real backend, so there was nothing to undo when the backend added its own matching.",
    ],
    result:
      "The demo had a credible answer for the messy lines, not just the clean ones. The matching steps the backend later adopted came from the part numbers my version showed failing.",
    learning:
      "Build ahead of another team only in a layer that keeps no data of its own; throwing my version away costs one deleted file. Next time I would send the backend my notes on day one, not day four.",
    metrics: [
      { value: "~1,500", label: "invoice lines a month" },
      { value: "90%", label: "confidence before a match is suggested" },
      { value: "2", label: "signals that must agree" },
    ],
  },
  {
    id: "ssr-bff",
    theme: "trust",
    title: "Moved logins out of reach of malicious scripts",
    metric: "9 days",
    metricLabel: "from written proposal to production",
    who: "Every user, whether they knew it or not.",
    context:
      "Each user's [[jwt]] sat in [[local-storage]], where any script on the page could read it. Permission checks only ran after the page loaded, and until then the page was blank. My first, smaller proposal to fix this went to a meeting and never came back.",
    action: [
      "Wrote the proposal again as two short documents, one for the app and one for the hosting, and answered every objection in writing.",
      "Did the founder's priority first, clearing the open bug list, before starting.",
      "Rebuilt the app with [[ssr]] and its own small server, a [[bff]]. Login, refresh and logout became [[same-origin]] routes on that server.",
      "Moved the login token into an [[httponly-cookie]], and put [[rbac]] on every protected page before anything renders.",
      "Added a [[csp]], 30-minute idle and 7-day hard session limits, and [[immutable-deploy]] with a one-step rollback.",
    ],
    result:
      "One pull request, live nine days after the proposal. Every data endpoint built since, 87 of them, runs on it, and it made three later security fixes possible. I wrote a blog post on why I chose this over [[graphql]].",
    learning:
      "When a proposal dies in a meeting, the problem is usually the format, not the idea. Making the change easy to undo is what made it easy to say yes to.",
    metrics: [
      { value: "9 days", label: "proposal to production" },
      { value: "87", label: "endpoints built on it since" },
      { value: "1", label: "pull request" },
    ],
  },
  {
    id: "honest-upload",
    theme: "customers",
    title: "Made a slow upload say 'still working', not 'failed'",
    metric: "120s",
    metricLabel: "the timeout that used to say 'failed'",
    who: "Someone uploading a long PDF bill who trusts the progress bar.",
    context:
      "The backend read the whole PDF while the upload was still open. The progress bar hit 100% in a second, then two minutes later the page said 'failed', even when the file was fine. People uploaded again and created duplicate bills.",
    action: [
      "Changed the upload on our own server so it accepts the file straight away and hands back a job number.",
      "Streamed real progress to the page with [[sse]], and let a slower check own the final answer in case the live connection drops.",
      "Made a page reload pick the job back up instead of starting over.",
    ],
    result:
      "A slow file now reads 'still processing', and nobody uploads twice out of confusion.",
    learning:
      "I did not wait for the backend to build this. Our own server could give users the honest answer that day, and the backend can replace it later without the page changing.",
    metrics: [
      { value: "1s", label: "when the old bar claimed 100%" },
      { value: "120s", label: "when it then said 'failed'" },
    ],
  },
  {
    id: "collections-from-zero",
    theme: "customers",
    title: "Built the collections product from an empty page",
    metric: "~60 PRs",
    metricLabel: "from an empty page to a full workspace",
    who: "A collections agent working through overdue invoices all day.",
    context:
      "The [[accounts-receivable]] side of the product had no screens at all, and the backend underneath it was still being designed.",
    action: [
      "Built a [[master-detail]]: a work queue on one side, the customer and their invoices on the other.",
      "Added an AI email writer, an inbox, a phone dialer, and an 'Ask AI' pane about the customer.",
      "Logged one clear line per data load: how much we asked for, how much came back, and what was dropped and why.",
    ],
    result:
      "The whole collections product exists. When a list showed zero rows, that log line showed in minutes that the test data was empty, instead of a day of guessing.",
    learning:
      "Building ahead of the backend works only if you can always tell real data from placeholder data. That is what the log line is for.",
    metrics: [
      { value: "~60", label: "pull requests" },
      { value: "4", label: "tools in one workspace: email, inbox, dialer, AI" },
    ],
  },
  {
    id: "windowed-pdf",
    theme: "speed",
    title: "Cut the PDF viewer's memory by 85%",
    metric: "58MB → 8.8MB",
    metricLabel: "memory to show a 20-page bill",
    who: "Anyone on a laptop with a few other tabs open.",
    context:
      "The bill viewer drew every page of the PDF at once. A 20-page bill used 58MB of memory and made up three quarters of everything on the page.",
    action: [
      "Drew only the pages near where you are looking, with empty placeholders of the right size for the rest, so the scrollbar never jumps.",
      "While you resize the panel, stretched the existing picture, and redrew it sharply once you let go.",
      "Worked out which pages are visible with simple scroll arithmetic, not a browser feature that shows blank pages when the machine is busy.",
    ],
    result:
      "Three pages drawn at a time instead of twenty. Memory fell from 58MB to 8.8MB, and each screen update from 40ms to under a tenth of a millisecond.",
    learning:
      "The popular tool for this can lag under load and flash blank pages. The plain maths was more reliable, and on a screen people work in all day, reliable wins.",
    metrics: [
      { value: "58 → 8.8MB", label: "memory for a 20-page bill" },
      { value: "20 → 3", label: "pages drawn at once" },
      { value: "40.7 → 0.1ms", label: "per screen update" },
    ],
  },
  {
    id: "random-signouts",
    theme: "trust",
    title: "Proved 'random sign-outs' were not a frontend bug",
    metric: "2 logins",
    metricLabel: "were all it took to prove it",
    who: "Users thrown out mid-task, and a team that assumed my code was to blame.",
    context:
      "People were being signed out in the middle of their work, everywhere. I had just built the login layer, so everyone assumed the bug was mine.",
    action: [
      "Tested the backend directly, outside our app, with two separate logins for the same user.",
      "Found both logins got identical tokens, and signing out on one device signed the user out everywhere. The backend was designed to allow one session per person.",
      "Wrote it up for the backend engineer as a document with the proof attached, instead of arguing in a group channel.",
      "Shipped a workaround on our side anyway, with its cost written down: a signed-out device stays valid for up to an hour.",
    ],
    result:
      "The backend question got evidence instead of a debate, and a sign-out became something we could look up rather than argue about.",
    learning:
      "Reproducing first makes being wrong cheap. If the test had pointed at my code, I would have found my own bug faster.",
    metrics: [
      { value: "2", label: "test logins to prove it" },
      { value: "60 min", label: "the workaround's worst case, written down" },
    ],
  },
  {
    id: "spec-sync",
    theme: "tooling",
    title: "Stopped the app and the backend quietly drifting apart",
    metric: "4 hours",
    metricLabel: "the longest a backend change can go unnoticed",
    who: "Every engineer who trusts the app's list of backend requests to be current.",
    context:
      "The app kept a copy of the backend's [[api-contract]], and it got there by someone copying a file between two code repositories by hand. The copy had drifted: the app offered filters the backend ignored, and every automated check still passed. Nobody owned it, because the gap sat between two teams.",
    action: [
      "Stamped our copy with a fingerprint of the exact backend version it came from, so a hand edit fails the checks.",
      "Added a job that looks every four hours and opens one update for review whenever the backend moves.",
      "Asked the backend for the smallest possible change: a nine-line [[webhook]] that tells us the moment they merge.",
      "When GitHub's permissions blocked the automation, explained the failure to our admin instead of just asking for a tool.",
    ],
    result:
      "The contract, 186 endpoints wide, now updates itself, and drift shows up within hours instead of at the next bug.",
    learning:
      "I built the version that needed nobody's permission first, then asked for the one small piece that made it faster. Making the ask small is what got it approved.",
    metrics: [
      { value: "186", label: "endpoints kept in sync" },
      { value: "4 h", label: "longest drift can hide" },
      { value: "9", label: "lines asked of the backend" },
    ],
  },
  {
    id: "design-manifests",
    theme: "tooling",
    title: "Made design specs impossible to fake",
    metric: "4 of 8",
    metricLabel: "components marked 'verified' that did not exist",
    who: "An engineer, or an AI agent, building a screen from a spec.",
    context:
      "I had built a process where an AI turns a design into a [[design-manifest]]. Checking one by hand, I found it had marked 4 of 8 components 'verified' that did not exist. Later, a change made a failing check pass by deleting the two rows that failed.",
    action: [
      "Owned it as my mistake: I had let a model write a status field, and let the same agent that wrote a spec also build from it.",
      "Made 'verified' something nobody can type. A command checks every component, import and data source against the real code, and the status comes out of that.",
      "Split writing a spec and building from it into two separate steps, with a person reviewing in between, enforced by the [[ci|automated checks]].",
      "Wrote a no-blame write-up of how it happened.",
    ],
    result:
      "A spec can no longer claim a component exists. Nine specs now pass a machine check instead of a promise.",
    learning:
      "A status someone can type is a claim, not a check. I went looking for the same bug elsewhere and found five places where 'I could not check' was quietly reported as 'fine'.",
    metrics: [
      { value: "4 of 8", label: "'verified' parts that did not exist" },
      { value: "9", label: "specs now machine-checked" },
      { value: "5", label: "similar hidden bugs found and fixed" },
    ],
  },
  {
    id: "bill-review-rewrites",
    theme: "customers",
    title: "Rebuilt the most-used screen five times as customers taught us",
    metric: "5 versions",
    metricLabel: "of one screen, each shaped by a customer",
    who: "A reviewer checking an AI-read invoice before it is paid.",
    context:
      "Bill review is the most-used screen in the product, and what it was for changed every time a customer used it.",
    action: [
      "Version 1: customers lost their place reading the PDF next to the form, so each extracted value now lights up on the PDF, and the other way round.",
      "Version 2: matching invoice lines to orders did not fit, so I put it on its own screen.",
      "Version 3: competitors did it on one screen, so I reversed my own call and brought it back, with a control that jumps straight to each problem.",
      "Version 4: grouped the PDF, problems and comments into one side panel when it got cluttered.",
      "Version 5: all of that made it slow, so I measured it and fixed it.",
    ],
    result:
      "One screen that does the whole job, and a final fix that took 2.5 seconds of freezing to nearly zero.",
    learning:
      "Version 2 was cheap, not right; the research behind version 3 could have come first. That is why I now write down what a user can do on a page before designing any of it.",
    metrics: [
      { value: "5", label: "versions of one screen" },
      { value: "2 → 1", label: "screens for the whole job" },
      { value: "2.5s → ~0", label: "freeze after the final fix" },
    ],
  },
  {
    id: "ap-inbox-agent",
    theme: "customers",
    title: "Built an AI inbox assistant demo in four days",
    metric: "4 days",
    metricLabel: "from spec to prospect demo",
    who: "A prospect deciding whether AI can sort their accounts payable inbox.",
    context:
      "A prospect wanted to see an AI agent sort their supplier emails, and we had four days.",
    action: [
      "Wrote the spec and the design brief first.",
      "Built one page with four tabs: Needs attention, Waiting, Auto-resolved, and Risk.",
      "Ran the sorting over the prospect's real emails in a repeatable way, so the demo never pretended something was live when it was not.",
    ],
    result:
      "Three pull requests, and all 24 planned components checked against real code before the call.",
    learning:
      "A demo is only worth something if everything on screen is honest about what is real. I would rather show less than show a fake.",
    metrics: [
      { value: "4", label: "days, spec to demo" },
      { value: "24/24", label: "components checked before the call" },
      { value: "3", label: "pull requests" },
    ],
  },
  {
    id: "match-api",
    theme: "speed",
    title: "Made the match screen a third faster, and never out of date",
    metric: "1,087 → 738ms",
    metricLabel: "to load a three-way match",
    who: "A reviewer who saves a match and expects the screen to agree with them.",
    context:
      "Loading a match took over a second, and after saving, the screen could show old data for up to 30 seconds.",
    action: [
      "Split the response in two: the bill and order show first, the delivery details fill in after.",
      "Made one calculation serve the quick view, the full view and the spreadsheet download, instead of each one redoing the same work.",
      "Cleared the user's saved copy the moment they save, so the next load is always fresh.",
    ],
    result: "32% faster, and never stale after a save.",
    learning:
      "I chose to clear saved data on every save rather than add a 'give me fresh data' switch, because a switch is something a future caller can forget to flip.",
    metrics: [
      { value: "1,087 → 738ms", label: "to load a match" },
      { value: "32%", label: "faster" },
      { value: "30s → 0", label: "stale time after saving" },
    ],
  },
  {
    id: "ranked-asks",
    theme: "customers",
    title: "Turned 'the backend is behind' into a ranked to-do list",
    metric: "12 docs",
    metricLabel: "request docs the backend shipped against",
    who: "The one backend engineer, with a full queue and no clear order.",
    context:
      "The collections screens had run ahead of the backend. Only 12 of 23 planned features were really connected, and one section ran entirely on placeholder data even though its real backend was finished.",
    action: [
      "Checked every backend call the app could make against where it was really used, and sorted each into: real, placeholder with no backend, or placeholder with a finished backend nobody had connected.",
      "Gave every ask a permanent ID and a label: new, change, or confirm.",
      "Put one line at the top: if you only do three things, do these three.",
    ],
    result:
      "The backend shipped those three, and the screens that depended on them went live the same day.",
    learning:
      "Permanent IDs are most of the value of numbering: a list can be re-ranked without being rewritten. And when an ask arrives without a priority, I ask for one instead of guessing.",
    metrics: [
      { value: "12 of 23", label: "features actually connected" },
      { value: "12", label: "ranked request docs" },
      { value: "3", label: "asks at the top" },
    ],
  },
  {
    id: "stepper-fetch",
    theme: "speed",
    title: "Removed a hidden 10,000-row download behind two arrows",
    metric: "1 → 0",
    metricLabel: "heavy downloads every time a bill opened",
    who: "A reviewer clicking 'next bill'.",
    context:
      "The previous and next arrows on a bill quietly downloaded up to 9,999 bills every time one opened, just to know what came next. Another check re-downloaded a large response every two seconds, forever.",
    action: [
      "Worked out the previous and next bill from the list the page had already loaded.",
      "Made the repeating check slow down over time, then stop.",
      "Found and fixed a bug on the way where two companies could have shared one saved result.",
    ],
    result:
      "One heavy download per bill became none, and endless checking became 35 checks, then silence.",
    learning:
      "Look at what a small button costs, not just what it does. The expensive work was invisible from the screen.",
    metrics: [
      { value: "9,999", label: "rows it used to download per bill" },
      { value: "∞ → 35", label: "background checks per bill" },
    ],
  },
  {
    id: "data-table-kit",
    theme: "tooling",
    title: "Put 26 tables on one shared kit",
    metric: "−1,389",
    metricLabel: "lines removed in one change",
    who: "Whoever builds the 27th table.",
    context:
      "Every table in the app had been copied from the one before it. The same spreadsheet-export code lived in 13 files, and paging in 7.",
    action: [
      "Built one shared table kit, with search, sorting and paging done on the server.",
      "Added typed filters and saved views per user.",
      "Wrote a checklist tool that tests every table's behaviour, so a change to the kit cannot quietly break one page.",
    ],
    result:
      "26 tables on one kit, and one change deleted 1,389 more lines than it added. I wrote a blog series on how it grew.",
    learning:
      "A shared kit only stays shared if something tests every page that uses it. That is why the checklist tool shipped with the kit, not after it.",
    metrics: [
      { value: "26", label: "tables on one kit" },
      { value: "−1,389", label: "net lines in one change" },
      { value: "13 → 1", label: "copies of the export code" },
    ],
  },
  {
    id: "ten-hour-lesson",
    theme: "tooling",
    title: "Lost 10 hours to redesigns, then fixed the cause",
    metric: "20 min",
    metricLabel: "the conversation that replaced five redesigns",
    who: "Me.",
    context:
      "One screen went through five or six designs at about two hours each, and the conversation that settled it took twenty minutes. I had been quietly making decisions that were not mine: what was in scope, what was urgent, when the day ended.",
    action: [
      "Wrote a one-page 'page contract' before any design: what a user can do on the page, what they need to see to do it, and what powers each action.",
      "Tested it backwards on that screen. It cut exactly the three things the product lead later asked me to remove.",
      "Started posting screens early with a deadline attached: 'building this at 2pm unless I hear otherwise.'",
    ],
    result:
      "The page contract is a written rule in the codebase now, and I ask whoever brings a request to say how urgent it is.",
    learning:
      "The root cause was not process. As the only frontend engineer, asking felt like admitting I did not know. Naming that is what made the fix stick.",
    metrics: [
      { value: "10 h", label: "lost to redesigns" },
      { value: "20 min", label: "conversation that settled it" },
      { value: "3 of 3", label: "cuts that matched the product lead's" },
    ],
  },
  {
    id: "expedia-lockouts",
    theme: "trust",
    company: "Expedia",
    title: "Stopped partners getting locked out of their own accounts",
    metric: "~45%",
    metricLabel: "of identity mismatches resolved",
    who: "A hotel partner who changed their email address and then could not log in.",
    context:
      "At Expedia, partners and travellers could share one account. When a partner changed their email, other Expedia systems did not always follow, and people were locked out. We measured 4 to 5 percent of users worldwide at risk.",
    action: [
      "Built the email-change flow, treating it as a feature.",
      "Worked with the team downstream to connect their systems, when it turned out to be an integration problem.",
      "Accepted, after two fixes that did not hold, that it was a data problem: older portals kept their own copy of each identity, and the copies drifted.",
      "Set up a pipeline that sends every identity change to the other systems as it happens, instead of relying on one request succeeding.",
    ],
    result:
      "The lockouts were fixed at the source instead of patched system by system, and about 45 percent of identity mismatches were resolved.",
    learning:
      "I spent the first quarter treating a data problem as a feature problem. Now I start by asking who keeps a copy of the data, and what happens when the copies disagree.",
    metrics: [
      { value: "4–5%", label: "of global users at risk" },
      { value: "~45%", label: "of mismatches resolved" },
      { value: "2", label: "fixes that did not hold, first" },
    ],
  },
];
