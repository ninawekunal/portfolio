export type PortfolioProject = {
  id: string;
  title: string;
  kicker: string;
  headline: string;
  summary: string;
  role: string;
  githubSlug: string;
  repoUrl: string;
  liveUrl?: string;
  demoInteractionHint?: string;
  posterSrc: string;
  posterAlt: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  architecture: string[];
  valueSignals: string[];
  evidence: string[];
  lessonsLearned: string[];
};

export type CareerEntry = {
  company: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  skillsApplied?: ExperienceSkill[];
  projects?: ExperienceProject[];
};

export type ExperienceSkill = {
  skill: string;
  whereApplied: string;
  outcome: string;
};

export type ExperienceProject = {
  name: string;
  impact: string;
  summary: string;
  technologies: string[];
  learnings: string[];
  metrics?: ExperienceMetric[];
};

export type ExperienceMetric = {
  label: string;
  value: string;
};

export type EducationEntry = {
  school: string;
  location: string;
  degree: string;
  date: string;
  details: string;
  logoSrc?: string;
  schoolColor?: string;
};

export type CertificationEntry = {
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logoSrc?: string;
};

export const profile = {
  name: "Kunal Ninawe",
  role: "Product Engineer",
  tagline: "Product Engineer · Full-stack · AI-native",
  headline: "Product engineer who ships the whole thing, fast, for the person on the other side of the screen.",
  summary:
    "Founding full-stack engineer at OpenCFO, an AI-native AP/AR platform, after four years owning partner identity at Expedia. I take an ambiguous ask, find out who it is for, write the contract, and ship it in slices. Recent numbers: 287 merged PRs, 87 BFF endpoints, and a test suite from 0 to 3,200 in 21 weeks.",
  audience:
    "Best fit for teams that want one engineer to own a product surface end to end: the screen, the API layer behind it, the deploy, and the customer call that started it.",
  githubUrl: "https://github.com/ninawekunal",
  linkedInUrl: "https://linkedin.com/in/ninawekunal/",
  email: "ninawekunal@gmail.com",
  location: "Seattle, WA",
  resumeUrl: "/Kunal-Ninawe-Resume.pdf",
  knowledgeAreas: [
    "Product engineering",
    "React",
    "React Router v7",
    "Server-side rendering",
    "Backend-for-Frontend pattern",
    "TypeScript",
    "Next.js",
    "Node.js",
    "REST API design",
    "OpenAPI",
    "Server-sent events",
    "Web performance",
    "Identity and access management",
    "OAuth 2.0",
    "OIDC",
    "MFA",
    "Session management",
    "Content Security Policy",
    "AWS",
    "Kubernetes",
    "Docker",
    "CI/CD",
    "Claude Code",
    "Agentic engineering workflows",
    "Context engineering",
    "Document extraction",
    "LLM product UX",
    "Accounts payable automation",
    "Java",
    "Python",
  ],
};

export const navigationItems = [
  { label: "Wins", href: "#wins" },
  { label: "Skillset", href: "#what-i-offer" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Education", href: "#education-certifications" },
];

export const experienceTimeline: CareerEntry[] = [
  {
    company: "OpenCFO",
    location: "Seattle, WA",
    role: "Founding Full Stack Engineer",
    period: "April 2026 - Present",
    summary:
      "First full-stack hire on an AI-native accounts payable and receivable platform. I own the web app end to end and sit in the customer calls that shape it.",
    highlights: [
      "Owned the entire web app (React Router v7 SSR, React 19, TypeScript) while the company went from 0 to 10 customers: 287 merged PRs, 136 routes, 87 BFF endpoints, 0 to 3,200 tests in 21 weeks.",
      "Moved a localStorage-JWT SPA to SSR with a Backend-for-Frontend in one week: httpOnly cookie auth, loader-enforced RBAC, per-request nonce CSP, immutable-SHA ECS deploys.",
      "Worked directly with a customer's finance and engineering teams to ship invoice / PO / goods-receipt matching against a demo pulled forward by three days.",
      "Built the team's Claude Code system: 26 skills, 3 review subagents, 9 hooks, machine-checked design manifests. Peak week: 40 PRs merged.",
    ],
    stack: [
      "React 19",
      "React Router v7",
      "TypeScript",
      "Node.js",
      "Express",
      "BFF",
      "zod",
      "SSE",
      "Vitest",
      "AWS ECS",
      "Claude Code",
    ],
    skillsApplied: [
      {
        skill: "Product thinking",
        whereApplied:
          "Wrote a page contract before any UI: the verbs, their preconditions, permissions, the API behind each, and what the user must see to choose one.",
        outcome:
          "Cut a PO match page from 5 redesigns to one 20-minute conversation, and the method now lives in the repo as a rule.",
      },
      {
        skill: "Customer-facing delivery",
        whereApplied:
          "Turned an Epicor Prophet 21 customer's call transcript into a 12-doc spec and shipped three-way matching in about 25 PRs.",
        outcome:
          "Demo shipped on the pulled-forward date, with scope cut in the open instead of quietly.",
      },
      {
        skill: "Performance, measured first",
        whereApplied:
          "Parsed production Chrome traces with a Node script to find 2.4s of main-thread blocking on the bill review page.",
        outcome:
          "pdf.js text layer 1.2s to 0, 226 tooltip providers to 1, PDF canvas 58MB to 8.8MB, match API 1,087ms to 738ms.",
      },
      {
        skill: "Security and tenancy",
        whereApplied:
          "Reproduced a cross-user data leak through the browser HTTP cache and proved mid-session sign-outs were a backend design choice.",
        outcome:
          "44 routes patched with a CI test that scans the source. Backend requirements doc written with the proof attached.",
      },
      {
        skill: "Agentic engineering",
        whereApplied:
          "Designed the CLAUDE.md hierarchy, skills, hooks, review subagents, an authenticated-browser handoff for agents, and an OpenAPI spec-sync bot.",
        outcome:
          "242 co-authored commits and a peak of 40 PRs merged in one week on a three-person team.",
      },
      {
        skill: "Cross-team influence",
        whereApplied:
          "Wrote 12 backend requirement and ranked-asks documents (New / Amend / Confirm, stable IDs) and started a pre-demo readiness walk plus a weekly FE/BE sync.",
        outcome:
          "The backend team shipped against the asks, and demo bugs stopped surfacing in front of customers.",
      },
    ],
    projects: [
      {
        name: "SSR + BFF migration",
        impact: "One week, one PR, 87 endpoints ride on it now",
        summary:
          "Replaced a localStorage-JWT SPA with React Router v7 SSR, a signed httpOnly session cookie, same-origin BFF routes for auth, permission checks in every protected loader, and a per-request nonce CSP.",
        technologies: ["React Router v7", "Express", "httpOnly cookies", "CSP", "AWS ECS"],
        learnings: [
          "The server should be the only thing that talks to the API. Everything else is a leak waiting to happen.",
          "A per-screen BFF answers 'what does this page need' better than a graph does, at this size.",
          "Set no-store on every user-scoped response, then write a test so nobody can forget.",
        ],
        metrics: [
          { label: "BFF endpoints", value: "87" },
          { label: "Routes", value: "136" },
        ],
      },
      {
        name: "Three-way match for an ERP customer",
        impact: "~25 PRs against a demo moved from Tuesday to Friday",
        summary:
          "Invoice vs PO vs goods-receipt matching for a distributor on Epicor Prophet 21: match BFF, receipts at PO-line grain, shortage adjustments, and an exception-first review table.",
        technologies: ["BFF", "TanStack Table", "zod", "Epicor Prophet 21", "OData"],
        learnings: [
          "Read the customer's transcript before the ticket. Their GL variance habit became a first-class concept.",
          "Cut scope at standup, out loud, and hide unbuilt features instead of stubbing them.",
          "When a match surface looks empty, diff the payload against the compute layer before blaming the backend.",
        ],
        metrics: [
          { label: "Spec", value: "12 docs" },
          { label: "Match API", value: "1,087ms to 738ms" },
        ],
      },
      {
        name: "Bill review performance",
        impact: "2.4s of main-thread blocking removed",
        summary:
          "Traced a frozen 20-page bill from a 145MB Chrome trace: pdf.js text layer, 226 tooltip providers, a measuring collapsible, and 2,932 text spans. Fixed each at the source and windowed the PDF viewer.",
        technologies: ["Chrome tracing", "pdf.js", "React 19", "Radix"],
        learnings: [
          "Read the trace instead of guessing at re-renders. Three of four fixes were one-line mount changes.",
          "IntersectionObserver can starve under load and show blank pages. Scroll arithmetic does not.",
          "Ship the regression tests with the fix, not after.",
        ],
        metrics: [
          { label: "Text layer", value: "1,198ms to 0" },
          { label: "PDF canvas", value: "58MB to 8.8MB" },
        ],
      },
      {
        name: "Agentic engineering system",
        impact: "40 PRs merged in the peak week",
        summary:
          "A CLAUDE.md hierarchy with a routing table to 14 docs, 26 skills, 3 read-only review subagents, 9 hooks, machine-checked design manifests with a CI review boundary, and a 480-entry decision log.",
        technologies: ["Claude Code", "Skills", "Hooks", "Subagents", "GitHub Actions"],
        learnings: [
          "Rules in a doc get skipped. Rules in a hook or a read-only reviewer do not.",
          "An LLM-drafted spec will claim components exist. Resolve every one against real code.",
          "Log every decision with a plain-English why, in the same commit as the change.",
        ],
        metrics: [
          { label: "Skills / hooks", value: "26 / 9" },
          { label: "Decision log", value: "480 entries" },
        ],
      },
    ],
  },
  {
    company: "Expedia Group",
    location: "Seattle, WA",
    role: "Software Engineer II",
    period: "May 2022 - April 2026",
    summary:
      "Owned partner identity workflows (login, MFA, password and email reset, account disable) for about 100K partners across four portals, from the React screens to the OAuth and OIDC contracts behind them.",
    highlights: [
      "Unified fragmented B2B identity flows across partner and traveler systems using React, TypeScript, Node.js (Hapi), and Java/OIDC services for 100k+ partners with roughly 90% feature adoption.",
      "Led the Update Email initiative: found that 4 to 5% of global users shared traveler and partner accounts at risk of lockout, then designed the async API fixes and a Change Data Capture pipeline with downstream brand teams.",
      "Implemented step-up MFA with ACR policies, shipped auth changes through data-driven feature-flag rollouts, and owned L3 incidents with Splunk, Datadog, and PagerDuty.",
    ],
    stack: ["React", "TypeScript", "Node.js", "Hapi", "GraphQL", "OIDC", "Kubernetes", "Istio", "Splunk"],
    skillsApplied: [
      {
        skill: "Identity architecture",
        whereApplied:
          "Unified fragmented B2B identity across partner and traveler systems using React, TypeScript, Node.js (Hapi), and Java/OIDC services.",
        outcome:
          "Delivered a coherent auth model used by 100k+ partners with high adoption and clearer trust boundaries.",
      },
      {
        skill: "API contract design",
        whereApplied:
          "Defined REST and GraphQL contracts for cross-domain email updates with centralized identity services.",
        outcome:
          "Reduced identity inconsistencies and resolved roughly 45% of identity-related bugs.",
      },
      {
        skill: "MFA and risk controls",
        whereApplied:
          "Implemented step-up MFA with ACR policy controls and staged rollouts using feature flags and analytics.",
        outcome:
          "Improved release confidence with policy-driven authentication and safer production rollouts.",
      },
      {
        skill: "Reliability and on-call ownership",
        whereApplied:
          "Owned L3 incidents with Splunk, Datadog, and PagerDuty while tightening smoke coverage and deployment safety.",
        outcome:
          "Reached 92% smoke coverage and strengthened incident response and recovery discipline.",
      },
    ],
    projects: [
      {
        name: "Partner Identity Unification",
        impact: "100k+ partner users with ~90% feature adoption",
        summary:
          "Merged fragmented partner and traveler authentication journeys into one coherent identity flow with predictable UX and service behavior.",
        technologies: ["React", "TypeScript", "Node.js (Hapi)", "Java", "OIDC", "GraphQL"],
        learnings: [
          "Unification work needs one explicit source of truth for user identity across domains.",
          "API contracts must be treated as product surfaces because frontend trust depends on backend consistency.",
          "Rollouts are safer when telemetry is defined before feature code is shipped.",
        ],
        metrics: [
          { label: "Partners impacted", value: "100k+" },
          { label: "Adoption", value: "~90%" },
        ],
      },
      {
        name: "Cross-Domain Email Update Platform",
        impact: "Resolved roughly 45% of identity-related bugs",
        summary:
          "Designed and delivered centralized email-update flows spanning decoupled systems so account state stayed synchronized and support incidents dropped.",
        technologies: ["REST", "GraphQL", "Node.js", "Java", "Centralized identity services"],
        learnings: [
          "Identity mutations need explicit ownership boundaries across every participating service.",
          "Data reconciliation jobs are only useful when failure states are visible to operators.",
          "Contract tests across teams reduce integration regressions during high-trust changes.",
        ],
        metrics: [
          { label: "Identity bugs reduced", value: "~45%" },
          { label: "Domain boundary", value: "Multi-system sync" },
        ],
      },
      {
        name: "Step-Up MFA and Progressive Rollout",
        impact: "92% smoke coverage and stronger release confidence",
        summary:
          "Implemented policy-driven step-up MFA with ACR levels and shipped it behind staged rollouts to control risk in production.",
        technologies: ["MFA", "ACR policy", "Feature flags", "Splunk", "Datadog", "PagerDuty"],
        learnings: [
          "Authentication risk controls need UX clarity to avoid support overhead.",
          "Progressive delivery plus guardrail dashboards catches regressions before full rollout.",
          "Incident ownership improves design decisions for reliability and operability.",
        ],
        metrics: [
          { label: "Smoke coverage", value: "92%" },
          { label: "Rollout strategy", value: "Progressive + flags" },
        ],
      },
    ],
  },
  {
    company: "Global Traffic Technologies",
    location: "Minneapolis, MN",
    role: "Full Stack Engineer",
    period: "June 2021 - April 2022",
    summary:
      "Built backend APIs and async workflows for user-facing traffic products with a strong focus on cloud reliability and responsiveness.",
    highlights: [
      "Built and deployed scalable backend APIs and batch workflows using AWS Lambda, ECS, and API Gateway.",
      "Reduced latency and operational cost through CloudFormation automation, a DynamoDB to ElastiCache shift, and asynchronous logging with Kinesis Firehose, S3, and CloudWatch.",
    ],
    stack: ["AWS Lambda", "ECS", "API Gateway", "CloudFormation", "ElastiCache", "Kinesis", "S3"],
    skillsApplied: [
      {
        skill: "Serverless and container architecture",
        whereApplied:
          "Built production APIs and asynchronous workflows using AWS Lambda, ECS, and API Gateway.",
        outcome:
          "Scaled backend delivery for user-facing traffic products while keeping latency targets stable.",
      },
      {
        skill: "Cost-performance optimization",
        whereApplied:
          "Shifted storage patterns from DynamoDB to ElastiCache for performance-sensitive paths.",
        outcome:
          "Improved response time and reduced operating costs for key backend flows.",
      },
      {
        skill: "Infrastructure as code",
        whereApplied:
          "Automated infrastructure provisioning and deployment with CloudFormation.",
        outcome:
          "Increased release consistency and reduced manual operational overhead.",
      },
    ],
    projects: [
      {
        name: "Cloud API and Batch Workflow Modernization",
        impact: "Lower latency and lower infrastructure cost",
        summary:
          "Delivered scalable backend APIs with resilient async processing and improved infra automation for traffic-product workloads.",
        technologies: ["AWS Lambda", "ECS", "API Gateway", "CloudFormation", "ElastiCache", "Kinesis"],
        learnings: [
          "Cost and latency improvements are often unlocked by choosing the right storage tier for access patterns.",
          "Batch workflows need idempotent processing guarantees to keep retries safe.",
          "Infrastructure as code accelerates both incident response and product iteration.",
        ],
        metrics: [
          { label: "Primary impact", value: "Latency down" },
          { label: "Cost profile", value: "Optimized" },
        ],
      },
    ],
  },
  {
    company: "Moaedat Ltd.",
    location: "Mumbai, India",
    role: "Web Developer",
    period: "August 2018 - October 2018",
    summary:
      "Built and deployed an end-to-end e-commerce website with inventory management and traditional web-stack tooling.",
    highlights: [
      "Used PHP, MySQL, Bootstrap, JavaScript, and Apache to launch the experience.",
      "Supported 500+ products and improved online reach for the business.",
    ],
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "Apache"],
    skillsApplied: [
      {
        skill: "Full-stack web delivery",
        whereApplied:
          "Built an end-to-end e-commerce web application using PHP, MySQL, Bootstrap, JavaScript, and Apache.",
        outcome:
          "Shipped a production storefront that supported inventory workflows and customer discovery.",
      },
      {
        skill: "Relational data modeling",
        whereApplied:
          "Designed product and inventory schema for catalog and operational use cases.",
        outcome:
          "Enabled management of 500+ products with stable day-to-day updates.",
      },
      {
        skill: "Product and UX execution",
        whereApplied:
          "Delivered core browsing and purchasing flows for a business-focused web audience.",
        outcome:
          "Improved online presence and reach through a complete e-commerce experience.",
      },
    ],
    projects: [
      {
        name: "E-Commerce Platform Launch",
        impact: "Supported 500+ products online",
        summary:
          "Built and shipped an e-commerce web experience with inventory tracking and admin-facing workflows for day-to-day operations.",
        technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "Apache"],
        learnings: [
          "Schema design quality directly affects inventory and checkout reliability.",
          "Shipping value fast means balancing custom features with proven web tooling.",
          "Simple UX wins conversion when product browsing and search are frictionless.",
        ],
        metrics: [
          { label: "Catalog size", value: "500+ products" },
          { label: "Outcome", value: "Online reach improved" },
        ],
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    school: "New York University",
    location: "New York, NY",
    degree: "M.S. in Computer Engineering",
    date: "May 2021",
    logoSrc: "/education/nyu-logo-stacked.svg",
    schoolColor: "#57068c",
    details:
      "Coursework in data structures and algorithms, cloud computing, distributed systems, internet protocols, machine learning, and deep learning.",
  },
  {
    school: "University of Mumbai",
    location: "Mumbai, India",
    degree: "B.S. in Computer and Information Science",
    date: "July 2019",
    logoSrc: "/education/university-of-mumbai-logo.svg",
    schoolColor: "#101010",
    details: "Strong computing foundation spanning software engineering and computer science fundamentals.",
  },
];

export const certificationsSourceUrl =
  "https://www.linkedin.com/in/ninawekunal/details/certifications/";

export const certifications: CertificationEntry[] = [
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    issueDate: "Mar 2026",
    credentialId: "h7edwy2r4qsp",
    credentialUrl: certificationsSourceUrl,
    logoSrc: "/brand-icons/anthropic.svg",
  },
  {
    title: "Applied Machine Learning: Algorithms",
    issuer: "LinkedIn Learning",
    issueDate: "Mar 2021",
    credentialId: "AdpqsJlizw9hCYf1ePxFEWTuR6F9",
    credentialUrl: certificationsSourceUrl,
  },
  {
    title: "Face Recognition Web App in Machine Learning with Python and Flask",
    issuer: "Udemy",
    issueDate: "Jan 2021",
    credentialId: "UC-7613dbd7-e71c-4a06-8e5e-edd62a7e4984",
    credentialUrl: certificationsSourceUrl,
    logoSrc: "/brand-icons/udemy.svg",
  },
  {
    title: "Java Basics",
    issuer: "HackerRank",
    issueDate: "Nov 2020",
    credentialId: "F5FE80A1E2B5",
    credentialUrl: certificationsSourceUrl,
    logoSrc: "/brand-icons/hackerrank.svg",
  },
  {
    title: "Essential Math for Machine Learning: Python Edition",
    issuer: "LinkedIn Learning",
    issueDate: "Jul 2020",
    credentialId: "AZkvNXZjR4PkWItENBAq2zhmgJX3",
    credentialUrl: certificationsSourceUrl,
  },
  {
    title: "Introduction to Data Structures & Algorithms in Java",
    issuer: "LinkedIn Learning",
    issueDate: "Jun 2020",
    credentialId: "AelsH2eBxuZFS2pjyXwrrB6Nw9Pw",
    credentialUrl: certificationsSourceUrl,
  },
  {
    title: "WordPress: Ecommerce",
    issuer: "LinkedIn Learning",
    issueDate: "May 2020",
    credentialId: "AT-x_jwYannoMRGH6e-L6wIRUwAf",
    credentialUrl: certificationsSourceUrl,
  },
];

export const projectFilters = [
  "All",
  "AI",
  "Full Stack",
  "Scalable Systems",
  "Frontend",
  "Data / ML",
];

export const projects: PortfolioProject[] = [
  {
    id: "paws-email-notifications",
    title: "PAWS Email Notifications",
    kicker: "Monorepo full-stack system",
    headline: "Admin console + scraper + outbox-driven email notifications.",
    summary:
      "An end-to-end notification system for a shelter adoption site: an admin dashboard to manage subscribers and rules, a Hapi API, a Postgres system of record, and a scheduled runner that scrapes adoption listings and fans out email alerts. The design leans on pragmatic, low-cost queue semantics via a Postgres outbox model to keep the system operable before introducing dedicated infrastructure.",
    role:
      "Designed the monorepo boundaries (client/server/contracts), defined typed Zod contracts, and implemented the scaffold for scraping, rule execution, and notification delivery with strong operational visibility.",
    githubSlug: "ninawekunal/paws-email-notifications",
    repoUrl: "https://github.com/ninawekunal/paws-email-notifications",
    demoInteractionHint:
      "Run the client and server workspace locally, then use the admin dashboard to sync animals, manage subscribers, and validate rules-driven notification behavior.",
    posterSrc: "/projects/paws-email-notifications.svg",
    posterAlt:
      "PAWS Email Notifications project poster showing an admin panel, a scraper flow, and an outbox queue feeding email delivery.",
    tags: ["Full Stack", "Scalable Systems"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Material UI",
      "Hapi",
      "Zod",
      "Postgres",
      "Drizzle",
      "TanStack Query",
      "Cheerio",
      "undici",
    ],
    highlights: [
      "Monorepo with shared typed contracts to keep client and API aligned.",
      "Postgres-backed outbox pattern for queue semantics without extra infrastructure.",
      "Admin control surface for scraper and notification rules (designed for small non-profits).",
    ],
    architecture: [
      "React + Vite admin client consumes a typed API surface backed by Zod validation.",
      "Hapi server reads/writes the system-of-record tables in Postgres via Drizzle ORM.",
      "A scheduled runner claims due rules, scrapes listings, writes events, and triggers delivery fan-out.",
    ],
    valueSignals: [
      "Shows practical system design: start simple, keep ops easy, then scale when needed.",
      "Strong boundary discipline via contracts package and runtime env validation.",
      "Focuses on reliability and observability for a workflow that can’t silently fail.",
    ],
    evidence: [
      "Shared `packages/contracts` with Zod schemas and types for API parsing.",
      "Documented system design covering security, scaling, and scheduling strategy.",
      "Operational logging and health endpoints designed into the server from the start.",
    ],
    lessonsLearned: [
      "Queue semantics can start as a relational outbox when traffic is low and budgets are tight.",
      "Typed contracts reduce drift between admin UI expectations and server behavior.",
      "Scrapers need flexible fallbacks (proxies, retries, and rule controls) to survive real-world constraints.",
    ],
  },
  {
    id: "cat-whisperer",
    title: "Cat Whisperer",
    kicker: "Privacy-first browser ML",
    headline: "Decode cat vocalizations with in-browser audio intelligence.",
    summary:
      "A React web app that records or accepts uploaded audio of cat meows and purrs, runs audio analysis locally in the browser, and executes YAMNet via MediaPipe Audio Tasks for on-device classification. It also supports a lightweight, per-cat teaching profile so the app can learn intent labels (like food, attention, or door) from examples you provide.",
    role:
      "Built the recording + upload workflows, local audio preprocessing pipeline, on-device model integration, and the teaching profile that adapts to user-labeled examples.",
    githubSlug: "ninawekunal/cat_whisperer",
    repoUrl: "https://github.com/ninawekunal/cat_whisperer",
    liveUrl: "https://ninawekunal.github.io/cat_whisperer",
    demoInteractionHint:
      "Record a short clip (or upload audio), review the model decoding, then label a few clips to teach your own cat’s intent profile.",
    posterSrc: "/projects/cat-whisperer.svg",
    posterAlt:
      "Cat Whisperer project poster showing an audio waveform, a local model chip, and intent labels for cat vocalizations.",
    tags: ["AI", "Frontend", "Data / ML"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Web Audio API",
      "MediaRecorder API",
      "MediaPipe Audio Tasks",
      "YAMNet",
      "localStorage",
      "GitHub Pages",
    ],
    highlights: [
      "On-device audio classification with privacy-first defaults (no upload required).",
      "Local noise reduction and validation using Web Audio analysis utilities.",
      "Teach-and-adapt workflow via a per-cat intent profile stored locally.",
    ],
    architecture: [
      "Capture audio via MediaRecorder or file upload, then normalize and filter in-browser.",
      "Run YAMNet locally for general audio decoding and gate results with cat-vocalization heuristics.",
      "Persist labeled examples and intent weights in localStorage for lightweight personalization.",
    ],
    valueSignals: [
      "Demonstrates applied ML UX without server complexity or privacy tradeoffs.",
      "Shows comfort with real-time media pipelines and browser constraints.",
      "Pairs “cool model” capability with a teachable workflow that improves over time.",
    ],
    evidence: [
      "Mic + upload support with clear constraints (duration, size, supported formats).",
      "Noise reduction pipeline (filtering + compression) executed locally before inference.",
      "GitHub Pages deployment configuration with base-path handling for static hosting.",
    ],
    lessonsLearned: [
      "On-device ML works best when the UI makes constraints and confidence legible.",
      "Small, teachable user loops can outperform one-size-fits-all labels for personal contexts.",
      "Audio pipelines need careful normalization to make model outputs stable across devices.",
    ],
  },
  {
    id: "pdf-highlighter",
    title: "Invoice PDF Field Highlighter",
    kicker: "Document intelligence UI",
    headline: "Extracted fields mapped directly onto the PDF surface.",
    summary:
      "A React demo that loads invoice PDFs, extracts structured fields, and highlights the exact field location inside the document when a user selects it. This is strong evidence of applied AI-style document workflows paired with clear interface design.",
    role:
      "Built the extraction flow, coordinate mapping logic, and the split-screen UI for document review and verification.",
    githubSlug: "ninawekunal/pdf-highlighter",
    repoUrl: "https://github.com/ninawekunal/pdf-highlighter",
    liveUrl: "https://ninawekunal.github.io/pdf-highlighter/",
    demoInteractionHint:
      "Choose an invoice sample and click extracted fields to jump to the exact highlighted location in the PDF.",
    posterSrc: "/projects/pdf-highlighter.svg",
    posterAlt: "PDF Highlighter project poster showing a document with highlighted fields and a matching side panel.",
    tags: ["AI", "Frontend", "Data / ML"],
    stack: ["React", "TypeScript", "Vite", "Material UI", "react-pdf", "pdf.js"],
    highlights: [
      "Field extraction paired with screen-space highlight overlays.",
      "Reusable MUI components for cards, dialogs, buttons, and layout.",
      "GitHub Pages-ready static deployment workflow.",
    ],
    architecture: [
      "A single orchestration container coordinates PDF state, extraction, and highlight selection.",
      "Utility modules handle text parsing, normalization, and coordinate translation.",
      "The UI separates invoice selection, PDF view, and extracted field review into focused surfaces.",
    ],
    valueSignals: [
      "Demonstrates document-heavy product design that still feels lightweight.",
      "Shows understanding of human-in-the-loop verification workflows.",
      "Proves the ability to turn opaque extraction logic into inspectable user experiences.",
    ],
    evidence: [
      "Two-pass field extraction strategy and generic fallback parsing.",
      "PDF coordinate mapping from document space to screen overlay space.",
      "Static deployment pipeline with GitHub Actions and base-path handling.",
    ],
    lessonsLearned: [
      "Document intelligence UX becomes trustworthy when extraction output is visibly anchored to source coordinates.",
      "Layered parsing and fallback strategies reduce fragility across invoice formats.",
      "Human-in-the-loop review flows are essential when field extraction confidence is not perfect.",
    ],
  },
  {
    id: "image-gender-detector",
    title: "ImageGenderDetector",
    kicker: "Computer vision foundation project",
    headline: "Classical ML pipeline for face detection and gender classification.",
    summary:
      "A computer vision project that detects faces and classifies gender using OpenCV and classical machine learning methods. It rounds out the portfolio by showing depth beyond web stacks and comfort with the underlying mechanics of ML systems.",
    role:
      "Built the image-processing pipeline, feature extraction workflow, model training setup, and Flask-based interface.",
    githubSlug: "ninawekunal/ImageGenderDetector",
    repoUrl: "https://github.com/ninawekunal/ImageGenderDetector",
    liveUrl: "https://ninawekunal.github.io/ImageGenderDetector/faceapp.html",
    demoInteractionHint:
      "Upload or select a face image, run detection, then inspect the bounding box and predicted class output.",
    posterSrc: "/projects/image-gender-detector.svg",
    posterAlt: "ImageGenderDetector project poster showing a detected face, model signals, and classifier output.",
    tags: ["AI", "Data / ML"],
    stack: ["Python", "Flask", "OpenCV", "scikit-learn", "NumPy", "Pandas"],
    highlights: [
      "Face detection via Haar Cascade classification.",
      "PCA and SVM-based gender classification workflow.",
      "Model evaluation through confusion matrix, ROC, and AUC metrics.",
    ],
    architecture: [
      "Image preprocessing converts uploads to grayscale before face detection and cropping.",
      "Eigen-image style dimensionality reduction feeds a trained classifier.",
      "A lightweight Flask interface exposes the model through a browser workflow.",
    ],
    valueSignals: [
      "Shows technical range beyond frontend and backend web delivery.",
      "Supports the AI-native positioning with direct ML implementation experience.",
      "Adds credibility around data pipelines, feature engineering, and model evaluation.",
    ],
    evidence: [
      "Use of PCA, SVM, and Grid Search in the training workflow.",
      "Browser-based demo backed by Python and OpenCV.",
      "Transparent acknowledgement of dataset bias and model limitations.",
    ],
    lessonsLearned: [
      "Classical ML pipelines still deliver practical value when feature preparation is explicit and well evaluated.",
      "Preprocessing quality (detection, cropping, normalization) heavily influences downstream classifier performance.",
      "Model metrics are not enough without communicating dataset bias and reliability boundaries to users.",
    ],
  },
  {
    id: "agent-queues",
    title: "Agent Queues",
    kicker: "Async workflow orchestration demo",
    headline: "Queue-backed workbench for agentic refund operations.",
    summary:
      "A Next.js and custom Node server demo that turns Redis lists and QStash delivery into a visible operator workflow. It is a good example of building AI-adjacent systems with operational clarity instead of black-box behavior.",
    role:
      "Built the end-to-end queue model, strict API contracts, and UI panels that expose processing, success, and failure states.",
    githubSlug: "ninawekunal/agent-queues",
    repoUrl: "https://github.com/ninawekunal/agent-queues",
    liveUrl: "https://agent-queues.vercel.app",
    demoInteractionHint:
      "Create a sample refund request, then watch queue, processing, success, and failure lanes update in real time.",
    posterSrc: "/projects/agent-queues.svg",
    posterAlt: "Agent Queues project poster showing a queue flowing into processing and outcome buckets.",
    tags: ["AI", "Full Stack", "Scalable Systems"],
    stack: ["Next.js", "TypeScript", "Node.js", "Upstash Redis", "QStash", "Zod"],
    highlights: [
      "Shared typed API envelope for every endpoint.",
      "Build and startup validation for Redis and QStash connectivity.",
      "Queue, stream, success, and failure states surfaced directly in the UI.",
    ],
    architecture: [
      "Custom Node server alongside the Next.js App Router.",
      "Redis lists power queue semantics while the UI models lifecycle state separately.",
      "Endpoints validate both inputs and outputs to keep contracts explicit.",
    ],
    valueSignals: [
      "Shows readiness for background jobs, async processing, and operations-facing tools.",
      "Demonstrates engineering maturity through observability and failure-path thinking.",
      "Connects AI-native workflow patterns to real product UX instead of just API demos.",
    ],
    evidence: [
      "Refund queue routes, process routes, and Upstash setup endpoints.",
      "Shared contract validation helpers and API response envelope.",
      "Dedicated panels for queue stream, success bucket, and failure bucket.",
    ],
    lessonsLearned: [
      "Batch-style queue processing smooths burst traffic and protects downstream services under load.",
      "Redis stream events partitioned by agent ID let the client subscribe to only the updates it needs.",
      "A publish/subscribe flow is practical for real-time operator dashboards where state changes rapidly.",
    ],
  },
  {
    id: "agent-portal",
    title: "AgentPortal",
    kicker: "Agent operations portal",
    headline: "Operational portal focused on agent workflows and queue state visibility.",
    summary:
      "A full-stack portal project oriented around agent-facing workflows, routing, and high-signal operational state. It emphasizes practical interfaces for day-to-day execution over static dashboards.",
    role:
      "Owned interface orchestration, workflow state handling, and service integration surfaces for agent operations.",
    githubSlug: "ninawekunal/AgentPortal",
    repoUrl: "https://github.com/ninawekunal/AgentPortal",
    liveUrl: "https://agent-portal-production-590e.up.railway.app/login",
    demoInteractionHint:
      "Navigate core portal flows and inspect how task state, agent actions, and workflow transitions are represented.",
    posterSrc: "/projects/agent-portal.svg",
    posterAlt: "AgentPortal poster showing agent cards, state lanes, and workflow controls.",
    tags: ["Full Stack", "Scalable Systems", "Frontend"],
    stack: ["Next.js", "TypeScript", "Node.js", "React", "Postgres"],
    highlights: [
      "Agent-centric task surfaces designed for operational clarity.",
      "Explicit state transitions across assignment and completion stages.",
      "Typed contracts and predictable UI behavior for workflow-heavy views.",
    ],
    architecture: [
      "Frontend state modeled around agent workflow stages and task ownership.",
      "Backend endpoints expose structured status and action contracts.",
      "Project structure favors maintainability for feature iteration on operations tooling.",
    ],
    valueSignals: [
      "Shows execution in operations-facing product design, not just consumer UI.",
      "Demonstrates full-stack ownership on workflow and status-heavy surfaces.",
      "Strengthens portfolio evidence for scalable internal tooling.",
    ],
    evidence: [
      "Portal flow components and stateful task interfaces.",
      "Service and API integration points for workflow updates.",
      "End-to-end handling of interaction, status updates, and UI feedback.",
    ],
    lessonsLearned: [
      "Operations portals are most effective when state transitions are explicit and low-friction.",
      "Agent workflows benefit from clear ownership cues and predictable next actions.",
      "Typed status contracts reduce regressions in high-change workflow UIs.",
    ],
  },
  {
    id: "smarttrip",
    title: "SmartTrip",
    kicker: "Map-led travel planner",
    headline: "Route-aware itinerary planning with layered architecture.",
    summary:
      "A trip planner where users create trips, reorder stops, compute walking routes, and export the final journey to Google Maps. The project highlights disciplined MVP scoping and clean separation between client, server, and shared layers.",
    role:
      "Designed a layered full-stack architecture around trip management, routing, API documentation, and persistent travel data.",
    githubSlug: "ninawekunal/SmartTrip",
    repoUrl: "https://github.com/ninawekunal/SmartTrip",
    demoInteractionHint:
      "Create a trip, add and reorder stops, then compute routes and export the journey to Google Maps.",
    posterSrc: "/projects/smarttrip.svg",
    posterAlt: "SmartTrip project poster showing route nodes connected across a map-like grid.",
    tags: ["Full Stack", "Frontend"],
    stack: ["Next.js", "TypeScript", "Hapi", "Supabase", "Postgres", "Mapbox"],
    highlights: [
      "Explicit client, server, and shared code boundaries.",
      "Swagger and OpenAPI-backed route documentation.",
      "Trip, stop, and route lifecycle handled through both REST and GraphQL.",
    ],
    architecture: [
      "Next.js fronts the UI while Hapi owns API routes and downstream integrations.",
      "Supabase Postgres stores trips, ordered stops, and route metadata.",
      "Mapbox computes travel information and Google Maps handles export.",
    ],
    valueSignals: [
      "Signals comfort with service decomposition and data modeling.",
      "Shows product judgment by keeping AI generation out of the MVP until the core routing flow is solid.",
      "Balances interface polish with backend structure and documentation.",
    ],
    evidence: [
      "Layered folders for controllers, data-sources, plugins, and stores.",
      "Migration-backed schema for trips, stops, and routes.",
      "Health checks and API docs surfaced as first-class product features.",
    ],
    lessonsLearned: [
      "Strong domain models for trips and stops make route orchestration easier to evolve safely.",
      "Separating UI, API, and shared contracts keeps frontend changes from destabilizing backend logic.",
      "MVP discipline matters: nailing core routing and export first creates a stronger base for AI features later.",
    ],
  }
];

export const footerNotes = [
  "Built with Next.js and Material UI, exported statically to GitHub Pages.",
  "Every number on this page comes from git, GitHub, or a doc written at the time. The customer count is my own tally.",
];
