export type OrbitTechnology = {
  id: string;
  label: string;
  icon: string;
  summary: string;
  projectIds: string[];
  subItems?: string[];
};

export type OrbitNicheTechnique = {
  id: string;
  label: string;
  proof: string;
  subItems?: string[];
};

export type OfferView = {
  id: string;
  label: string;
  title: string;
  description: string;
  technologies: OrbitTechnology[];
  nicheTechniques: OrbitNicheTechnique[];
};

export const offerHeading = {
  eyebrow: "Skillset",
  title:
    "One engineer for the whole surface: the screen, the API layer behind it, the deploy, and the tooling the team ships with.",
  body:
    "Recent proof: an AI-native AP/AR platform taken from 0 to 10 customers as the first full-stack hire, and partner identity for about 100K Expedia partners before that. Pick a lane below to see what I actually did with each tool.",
};

export const offerViews: OfferView[] = [
  {
    id: "product",
    label: "Product",
    title: "Product engineering: start from the user's day, then build the smallest slice that changes it.",
    description:
      "I find out who the screen is for before I open the editor, write the contract, ship in slices, and cut scope in the open. This is the lane I want to be hired for.",
    technologies: [
      {
        id: "page-contract",
        label: "Page contracts",
        icon: "product",
        summary: "Verbs, preconditions, permissions, backing API, and what the user must see to choose a verb. Written before any UI.",
        projectIds: [],
      },
      {
        id: "customer-calls",
        label: "Customer calls",
        icon: "product",
        summary: "Sat in calls with a distributor's finance and engineering teams and turned the transcript into the spec.",
        projectIds: [],
      },
      {
        id: "scope-cuts",
        label: "Scope cuts, out loud",
        icon: "product",
        summary: "Manual upload only, receipts mocked with 4 to 5 exception cases, lead with the clean match. Said at standup, not discovered at demo.",
        projectIds: [],
      },
      {
        id: "honest-states",
        label: "Honest UI states",
        icon: "product",
        summary: "A distinct 'unverified' status so a default branch never answers 'I could not check' with the word for 'fine'.",
        projectIds: [],
      },
      {
        id: "cross-team-asks",
        label: "Ranked asks",
        icon: "product",
        summary: "12 backend requirement docs tagged New / Amend / Confirm with stable IDs, so the other team can ship in order.",
        projectIds: [],
      },
      {
        id: "demo-readiness",
        label: "Pre-demo walk",
        icon: "product",
        summary: "A whole-team manual walk of every core flow before a customer sees it. Borrowed from Expedia's production-readiness calls.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "persona-first",
        label: "Build for the person, not the ticket",
        proof:
          "An upload that said 'failed' at 120 seconds was really a slow parse. The person re-uploaded and made duplicates. I gave the upload an async contract so it says 'still processing' instead.",
      },
      {
        id: "ambiguity",
        label: "Ambiguity to a plan",
        proof:
          "'Can we simulate the customer's ERP?' became a spec with a three-tier deployment, and the finding that the backend had no PO or goods-receipt resource type at all.",
      },
      {
        id: "velocity",
        label: "Velocity with a floor",
        proof:
          "40 PRs merged in the peak week, each one browser-validated, with the test count going from 0 to 3,200 over the same 21 weeks.",
      },
      {
        id: "say-no",
        label: "Say the tradeoff out loud",
        proof:
          "Credit memos shipped as a 5-PR stack ahead of the backend, with the one breaking change isolated and 'never browser-validated, no credit memo exists in any environment' written in the description.",
      },
      {
        id: "own-mistakes",
        label: "Own the miss, fix the system",
        proof:
          "I lost 10 hours to design churn on one page. The fix was not discipline. It was a written page contract before UI, and it lives in the repo as a trigger now.",
      },
    ],
  },
  {
    id: "frontend",
    label: "Front-end",
    title: "Front-end that stays fast when the data gets big and the team gets busy.",
    description:
      "React 19 and TypeScript in production, server-rendered, with tables that push filtering to the server and a test suite that runs in seconds.",
    technologies: [
      {
        id: "react",
        label: "React 19",
        icon: "react",
        summary: "136 routes on React 19 with the React Compiler, including finding the 25 files it silently skipped.",
        projectIds: ["pdf-highlighter"],
      },
      {
        id: "react-router",
        label: "React Router v7 SSR",
        icon: "react",
        summary: "Framework mode with loaders that enforce permissions before render.",
        projectIds: [],
      },
      {
        id: "nextjs",
        label: "Next.js",
        icon: "next",
        summary: "This site, plus Agent Queues and SmartTrip.",
        projectIds: ["agent-queues", "smarttrip"],
      },
      {
        id: "typescript",
        label: "TypeScript",
        icon: "typescript",
        summary: "Strict everywhere. zod contracts at every BFF boundary, OpenAPI codegen for the backend SDK.",
        projectIds: ["agent-queues", "smarttrip", "pdf-highlighter"],
      },
      {
        id: "tanstack",
        label: "TanStack Query / Table / Virtual",
        icon: "tanstack",
        summary: "26 tables on one kit. Real staleTime, invalidate-on-write, and 'Infinity without invalidation is a bug'.",
        projectIds: [],
      },
      {
        id: "vitest",
        label: "Vitest + RTL + MSW",
        icon: "test",
        summary: "0 to 3,200 tests. Split into node and jsdom projects after measuring harness overhead at 3x test time.",
        projectIds: [],
      },
      {
        id: "cypress",
        label: "Cypress / Playwright",
        icon: "cypress",
        summary: "End-to-end runs with real OTP simulation at Expedia. Browser validation on every UI PR at OpenCFO.",
        projectIds: [],
      },
      {
        id: "material-ui",
        label: "Material UI / shadcn / Tailwind",
        icon: "material",
        summary: "Component systems on both sides: MUI here and in earlier projects, shadcn and Tailwind at OpenCFO.",
        projectIds: ["pdf-highlighter"],
      },
      {
        id: "pdfjs",
        label: "pdf.js",
        icon: "document",
        summary: "Field-highlight overlays synced to extracted values, and a windowed viewer that took canvas memory from 58MB to 8.8MB.",
        projectIds: ["pdf-highlighter"],
      },
    ],
    nicheTechniques: [
      {
        id: "perf-tracing",
        label: "Performance from traces, not hunches",
        proof:
          "Parsed a 145MB Chrome trace with a Node script. Found 2,468ms of blocking in four places and removed it: text layer 1,198ms to 0, 226 tooltip providers to 1.",
      },
      {
        id: "server-tables",
        label: "Server-driven tables",
        proof:
          "Search, sort, and pagination moved out of the browser. One PR deleted 1,389 more lines than it added across 39 files.",
      },
      {
        id: "state-management",
        label: "Query and cache discipline",
        proof:
          "12 of 18 hooks were refetching on every mount. Set a real staleTime, rewrote the N+1 approvers storm on useQueries, then deleted the hook by moving to a v2 API with includes.",
      },
      {
        id: "accessibility",
        label: "Accessible by default",
        proof:
          "Keyboard navigation, semantic structure, and focus states on the identity flows at Expedia, where a locked-out partner is a support ticket.",
      },
      {
        id: "realtime",
        label: "Real-time without WebSockets",
        proof:
          "Live notifications over one SSE pipe per tab with a durable inbox and catch-up after a closed tab. 4 PRs in 2 days, 23 logged decisions.",
      },
      {
        id: "compiler-traps",
        label: "React Compiler in production",
        proof:
          "The healthcheck said every file compiled. A logger showed 25 files bailed out and a compiled memo was re-downloading a PDF every 2 seconds. Contained it with a directive and a rule.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend-for-Frontend, contracts, and the auth boundary.",
    description:
      "I own the layer between the screen and the API: what each screen needs, how it is cached, who is allowed to see it, and what happens when the upstream is slow.",
    technologies: [
      {
        id: "nodejs",
        label: "Node.js / Express",
        icon: "node",
        summary: "Own Express server for SSR with health checks, redacted structured logs, and per-request nonce CSP.",
        projectIds: ["agent-queues", "smarttrip"],
        subItems: ["Hapi", "Express"],
      },
      {
        id: "bff",
        label: "BFF pattern",
        icon: "rest",
        summary: "87 endpoints, 77 auth-guarded. One resource route per screen with a 30-second cache keyed by user.",
        projectIds: [],
      },
      {
        id: "openapi",
        label: "OpenAPI + zod",
        icon: "openapi",
        summary: "Backend spec pinned by git blob hash, a 4-hourly sync bot that opens one rolling PR, zod at the edge.",
        projectIds: [],
      },
      {
        id: "sse",
        label: "Server-sent events",
        icon: "sse",
        summary: "Upload progress and live notifications. A poll owns terminal state because EventSource gives up on a 401.",
        projectIds: [],
      },
      {
        id: "graphql",
        label: "GraphQL",
        icon: "graphql",
        summary: "Identity contracts at Expedia, and SmartTrip's route lifecycle.",
        projectIds: ["smarttrip"],
      },
      {
        id: "postgres",
        label: "Postgres / sqlite",
        icon: "postgres",
        summary: "Postgres in SmartTrip and PAWS. sqlite as the durable notification inbox at OpenCFO.",
        projectIds: ["smarttrip", "paws-email-notifications"],
      },
      {
        id: "java",
        label: "Java / Kotlin / Spring Boot",
        icon: "java",
        summary: "OIDC and identity services at Expedia.",
        projectIds: [],
      },
      {
        id: "oauth",
        label: "OAuth 2.0 / OIDC / MFA",
        icon: "jwt",
        summary: "Login, MFA with ACR step-up, password and email reset, account disable for about 100K partners.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "tenant-safety",
        label: "Tenant safety you can test",
        proof:
          "Every BFF route is no-store, keyed by user ID, and permission-checked in the loader. A CI test scans the source for the header, and a read-only subagent audits every BFF diff.",
      },
      {
        id: "async-contract",
        label: "Async contracts the backend lacks",
        proof:
          "Accept, 202, status endpoint, SSE progress, reload re-attaches to the job. Built at the BFF so the user gets the honest answer before the backend changes.",
      },
      {
        id: "contract-first",
        label: "Contract drift, caught in CI",
        proof:
          "The OpenAPI spec was hand-copied and rewrapped by Prettier until it matched no upstream blob. Now it is pinned by hash with a non-blocking drift job.",
      },
      {
        id: "cache-invalidation",
        label: "Invalidate on write, not on flag",
        proof:
          "A generation counter invalidates the user's BFF bucket after a save, so post-write reads are never 30 seconds stale and callers cannot forget a fresh=1 param.",
      },
      {
        id: "idempotency",
        label: "Safe retries",
        proof:
          "Idempotency keys and dedupe on the identity mutations at Expedia, where a retried email change across brands cannot be allowed to fork an account.",
      },
      {
        id: "prove-it",
        label: "Prove it before you patch it",
        proof:
          "Two cookie jars against the API proved 'random sign-outs' were a one-session-per-user backend design, not a frontend bug. The requirements doc shipped with the evidence attached.",
      },
    ],
  },
  {
    id: "applied-ai",
    label: "AI engineering",
    title: "AI that ships: agentic tooling for the team, and AI surfaces users can trust.",
    description:
      "Two halves. I built the agentic workflow the team codes with, and I built the AI product surfaces customers see, with checks that keep both honest.",
    technologies: [
      {
        id: "claude-code",
        label: "Claude Code",
        icon: "anthropic",
        summary: "26 skills, 3 read-only review subagents, 9 hooks, model and effort routing, a 480-entry decision log. 254 sessions.",
        projectIds: [],
        subItems: ["Skills", "Hooks", "Subagents", "MCP"],
      },
      {
        id: "context-engineering",
        label: "Context engineering",
        icon: "agentic",
        summary: "A 478-line CLAUDE.md became binary rules plus a routing table to 14 satellite docs.",
        projectIds: [],
      },
      {
        id: "manifest-check",
        label: "Eval-style CI checks",
        icon: "test",
        summary: "A design manifest cannot claim a component exists. Every export, import path, and variant is resolved against real code.",
        projectIds: [],
      },
      {
        id: "agent-browser",
        label: "Agent browser handoff",
        icon: "agentic",
        summary: "A dev-only script logs in through the real /login and hands the agent a nonce-guarded session, so it never sees a password.",
        projectIds: [],
      },
      {
        id: "document-intelligence",
        label: "Document extraction UX",
        icon: "document",
        summary: "PDF field highlights synced to extracted values, streamed extraction progress, and a visible 'unverified' state.",
        projectIds: ["pdf-highlighter"],
      },
      {
        id: "llm-surfaces",
        label: "LLM product surfaces",
        icon: "rag",
        summary: "AI email composer, Ask AI for collections, and an AP inbox agent demo built in 4 days.",
        projectIds: [],
      },
      {
        id: "python-ml",
        label: "Python / scikit-learn / OpenCV",
        icon: "python",
        summary: "Classical ML and computer vision projects, with the dataset bias written down.",
        projectIds: ["image-gender-detector", "cat-whisperer"],
      },
    ],
    nicheTechniques: [
      {
        id: "honest-demos",
        label: "Demos that do not lie",
        proof:
          "The AP inbox agent classified the tenant's real emails deterministically, so the prospect saw exactly what was live and what was not.",
      },
      {
        id: "human-loop",
        label: "Human in the loop, on purpose",
        proof:
          "The CI rule says the manifest PR and the implementation PR must be separate people or separate runs. An agent cannot faithfully build its own misreading.",
      },
      {
        id: "postmortems",
        label: "Blameless postmortems for agent drift",
        proof:
          "When a spec drifted, the postmortem split the cause a third each between the design bundle, the handoff, and the record it was opened on. The fix went into the skill.",
      },
      {
        id: "measured-leverage",
        label: "Leverage you can count",
        proof:
          "13 PRs merged in April. 123 in August. 242 commits co-authored with the agent, each one browser-validated before merge.",
      },
      {
        id: "confidence-signals",
        label: "Confidence, shown not implied",
        proof:
          "Five bugs shared one shape: a default branch answering 'I could not check' with the word for 'fine'. A distinct unverified status fixed all five.",
      },
    ],
  },
  {
    id: "cloud-distributed",
    label: "Cloud and reliability",
    title: "Deploys, flags, and on-call for things that must not break at 2am.",
    description:
      "Immutable deploys, feature flags that are safe under SSR, and the incident habits that come from four years of L3 on-call on an identity system.",
    technologies: [
      {
        id: "aws",
        label: "AWS",
        icon: "aws",
        summary: "ECS deploys pinned to immutable SHAs at OpenCFO. Lambda, API Gateway, DynamoDB, ElastiCache, Kinesis Firehose, CloudFormation at GTT.",
        projectIds: [],
        subItems: ["ECS", "Lambda", "S3", "CloudFront", "DynamoDB", "Kinesis", "API Gateway"],
      },
      {
        id: "kubernetes",
        label: "Kubernetes / Istio / Spinnaker",
        icon: "kubernetes",
        summary: "Progressive rollouts at Expedia that cut deployment incidents by about 25%.",
        projectIds: [],
      },
      {
        id: "github-actions",
        label: "GitHub Actions",
        icon: "github",
        summary: "CI with a source-scan cache test, a manifest check, a drift job, and a GitHub App because GITHUB_TOKEN PRs get no CI.",
        projectIds: [],
      },
      {
        id: "feature-flags",
        label: "GrowthBook flags",
        icon: "flag",
        summary: "Isomorphic registry, per-request attributes, root-loader seeding, fail-open defaults. SSR-safe.",
        projectIds: [],
      },
      {
        id: "observability",
        label: "Datadog / Splunk / PagerDuty",
        icon: "observability",
        summary: "L3 on-call at Expedia. Request-ID-joined auth telemetry and one structured log line per fetch at OpenCFO.",
        projectIds: [],
      },
      {
        id: "redis",
        label: "Redis / queues",
        icon: "redis",
        summary: "Redis lists and QStash in Agent Queues. A Postgres outbox in PAWS when a queue was not worth the infra yet.",
        projectIds: ["agent-queues", "paws-email-notifications"],
      },
      {
        id: "csp",
        label: "CSP and session limits",
        icon: "jwt",
        summary: "Per-request nonce CSP, 30-minute idle and 7-day absolute sessions, Clear-Site-Data on logout.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "safe-release",
        label: "Release behind a flag, measure, then widen",
        proof:
          "Three surfaces and the demo seed data shipped behind GrowthBook flags at OpenCFO. Auth changes at Expedia rolled out by cohort with analytics attached.",
      },
      {
        id: "incident-ownership",
        label: "Incident ownership",
        proof:
          "L3 on-call for partner identity with Splunk and Datadog. RCA docs cut recurring support requests by about 20%.",
      },
      {
        id: "cost-latency",
        label: "Cost and latency together",
        proof:
          "Swapped DynamoDB for ElastiCache on latency-sensitive paths and moved logging to async Firehose at GTT.",
      },
      {
        id: "bounded-polling",
        label: "Nothing polls forever",
        proof:
          "An unbounded 2-second poll became 2s x5, 5s x6, 10s x24, then stop. 35 requests and silence, instead of one every 2 seconds for the life of the tab.",
      },
      {
        id: "failure-path",
        label: "Failure paths first",
        proof:
          "403 and 404 give the same answer, 5xx never redirects, fetch errors are never swallowed, and every BFF diff is audited for exactly those cases.",
      },
    ],
  },
  {
    id: "working-style",
    label: "Working style",
    title: "How I work when the problem is fuzzy and the clock is real.",
    description:
      "Short loops, written decisions, and a habit of measuring before I touch anything. I like small teams where the person who talked to the customer also ships the fix.",
    technologies: [
      {
        id: "user-first",
        label: "Start with the user's day",
        icon: "style",
        summary: "Who is on the other side of this screen, what are they trying to finish, and what do they need to see to choose the next action.",
        projectIds: [],
      },
      {
        id: "measure-first",
        label: "Measure, then fix",
        icon: "style",
        summary: "Trace files, HAR files, two cookie jars. The fix is usually small once the number points at it.",
        projectIds: [],
      },
      {
        id: "slices",
        label: "Ship in slices",
        icon: "style",
        summary: "Stacked PRs with the breaking change isolated and labelled. 5-PR stacks for credit memos and the shared workspace.",
        projectIds: [],
      },
      {
        id: "write-it-down",
        label: "Write the decision down",
        icon: "style",
        summary: "480 logged decisions, each with a why, in the same commit as the change. 12 cross-team docs the backend shipped against.",
        projectIds: [],
      },
      {
        id: "scope-fence",
        label: "Price the ask",
        icon: "style",
        summary: "'Building this at 3pm unless I hear otherwise.' The asker sets the priority, I set the cost.",
        projectIds: [],
      },
      {
        id: "teach",
        label: "Teach by leaving a trail",
        icon: "style",
        summary: "Two engineering blog posts, a quiz-me skill, and a playbook of the mistakes I made so the next person does not.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "ambiguity-proof",
        label: "Ambiguity is the job",
        proof:
          "'Can we simulate the customer's ERP?' had no ticket, no owner, and no sandbox. It became a spec, a three-tier plan, and the discovery that reset the integration roadmap.",
      },
      {
        id: "velocity-proof",
        label: "High velocity, on purpose",
        proof:
          "287 merged PRs in 21 weeks, 75% of the repo. The peak week was 40, and the test count went up the whole time.",
      },
      {
        id: "customer-proof",
        label: "Customer-facing without a handoff",
        proof:
          "I sat in the calls, wrote the spec, built the screens, seeded the demo tenant, and ran the pre-demo walk. No relay in between.",
      },
      {
        id: "honesty-proof",
        label: "Tell the truth when it is inconvenient",
        proof:
          "'Never browser-validated, no credit memo exists in any environment' went in the PR description. So did 'a 4,868-line PR sat with zero reviewers for a week' in the asks upward.",
      },
      {
        id: "learning-proof",
        label: "Ramp fast, stay curious",
        proof:
          "Learned React Router v7 framework mode and shipped the SSR migration in one week. Read the Prophet 21 OData docs and found the load-bearing gap in a day.",
      },
    ],
  },
];
