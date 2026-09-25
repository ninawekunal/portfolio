/**
 * One side project, told the way a reader scans it: why it exists, what it does,
 * what it taught me, how it was built, and how it ships.
 * Copy may mark jargon as `[[glossary-key]]` or `[[glossary-key|label]]`; see `data/glossary.ts`.
 */
export type PortfolioProject = {
  id: string;
  title: string;
  kicker: string;
  /** One plain sentence: what the project is. */
  headline: string;
  repoUrl: string;
  liveUrl?: string;
  tags: string[];
  stack: string[];
  motivation: string;
  capabilities: string[];
  lessons: string[];
  build: string[];
  /** How it goes live. Omitted for projects that only run locally. */
  deploy?: string;
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
    id: "learning-doc-builder",
    title: "Learning Doc Builder",
    kicker: "Claude skill + reading app",
    headline: "Turns any topic into one short, interactive study page with a quiz at the end.",
    repoUrl: "https://github.com/ninawekunal/learning-doc-builder",
    liveUrl: "https://ninawekunal.github.io/learning-doc-builder/",
    tags: ["AI", "Frontend"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Radix UI",
      "React Router",
      "Shiki",
      "marked",
      "GitHub Actions",
      "GitHub Pages",
    ],
    motivation:
      "Long technical docs lose me halfway through. I wanted explainers built for a short attention span, where every choice about structure comes from research on how people actually remember things, not from taste. And I wanted an AI to write them in that format for me, about anything, including our own codebase.",
    capabilities: [
      "A [[claude-code|Claude]] skill that researches a topic before writing, reading the real files when the topic is a codebase, then writes the doc as plain markdown.",
      "A reading app that renders every doc the same way, so changing how all of them look is one stylesheet, not forty files.",
      "A graded quiz of real-world scenario questions, one at a time, with an explanation for every answer and a score at the end. It is built on [[active-recall]].",
      "Dark mode, three reading widths, and a 'bionic reading' toggle that bolds the start of every word, all remembered per browser.",
      "On a phone, the table of contents folds into one sticky bar that shows which section you are in.",
    ],
    lessons: [
      "A beautiful page around wrong facts is worse than no page, so the skill researches before it writes a single heading.",
      "Keeping the content as plain markdown and every visual decision in the app is what lets forty docs change their look at once.",
      "An automated check on every doc's quiz catches what a human reviewer skims past.",
    ],
    build: [
      "Designed the doc format first: a short header, small sections, callout boxes for the key idea and the common trap, and one quiz block at the end.",
      "Built the reading app with React, Vite and Tailwind, with syntax-highlighted code and collapsible deep dives.",
      "Packaged the writing process as a skill anyone can copy into their own AI setup.",
      "Wrote a content checker that runs on every change and blocks a doc with a broken quiz or a missing section.",
    ],
    deploy:
      "Every push runs the checks, builds the site, and publishes it to [[github-pages]] with GitHub Actions.",
  },
  {
    id: "paws-email-notifications",
    title: "PAWS Email Notifications",
    kicker: "Full-stack notification system",
    headline: "Emails people when an animal they would want to adopt appears on the PAWS shelter site.",
    repoUrl: "https://github.com/ninawekunal/paws-email-notifications",
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
    ],
    motivation:
      "A shelter's adoption listings change quickly, and anyone waiting for the right animal has to keep checking the site by hand. I wanted the site to tell people instead, and to run cheaply enough for a small non-profit.",
    capabilities: [
      "An admin dashboard to manage subscribers and the rules for who hears about which animals.",
      "A 'Sync animals' button that checks the shelter's listings and pulls in the details of anything new.",
      "Email alerts queued with the [[outbox-pattern]], so an alert is never lost if a step fails halfway.",
      "Startup checks that refuse to run if the database or a setting is missing, plus a log of every request.",
    ],
    lessons: [
      "A simple database table can do the job of a message queue while traffic is low and the budget is tight.",
      "Shared rules between the admin site and the server stop the two from quietly disagreeing about data.",
      "Scrapers need fallbacks: the shelter's site blocks automated requests, so the scraper can route through a proxy.",
    ],
    build: [
      "Set up a [[monorepo]] with the admin site, the server, and a shared package of [[zod]] rules both sides trust.",
      "Modelled animals, events and subscribers in Postgres through Drizzle, with generated database migrations.",
      "Wrote the system design down first, covering security, scaling and scheduling, before building the runner.",
    ],
  },
  {
    id: "cat-whisperer",
    title: "Cat Whisperer",
    kicker: "Private, in-browser AI",
    headline: "Listens to your cat's meows and learns what they mean, without the audio ever leaving your browser.",
    repoUrl: "https://github.com/ninawekunal/cat_whisperer",
    liveUrl: "https://ninawekunal.github.io/cat_whisperer",
    tags: ["AI", "Frontend", "Data / ML"],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Web Audio API",
      "MediaRecorder API",
      "MediaPipe Audio Tasks",
      "YAMNet",
      "GitHub Pages",
    ],
    motivation:
      "A playful question with a real technical one underneath: can a web page listen to audio and learn something personal, with nothing leaving the device and no server to pay for?",
    capabilities: [
      "Record up to 8 seconds from the microphone, or upload a clip.",
      "Checks the clip really sounds like a cat, and cleans up background noise, all inside the browser.",
      "Recognises the sound with [[yamnet]], using [[on-device-ml]].",
      "Label a few clips as food, attention or door, and it starts learning your own cat's patterns.",
    ],
    lessons: [
      "AI in the browser feels trustworthy when the screen is honest about its limits and how sure it is.",
      "A tiny loop where the user teaches the app can beat one-size-fits-all labels for something this personal.",
      "Audio has to be cleaned and levelled carefully, or the same meow gets different answers on different devices.",
    ],
    build: [
      "Captured audio with the browser's built-in recorder, then filtered and levelled it with the Web Audio API.",
      "Loaded Google's YAMNet through MediaPipe so it runs locally, and filtered its answers with cat-specific checks.",
      "Stored each cat's labelled examples in the browser, so the profile survives a refresh without a server.",
    ],
    deploy: "A GitHub Actions workflow builds it and publishes it to [[github-pages]] on every push.",
  },
  {
    id: "pdf-highlighter",
    title: "Invoice PDF Highlighter",
    kicker: "Document review tool",
    headline: "Pulls the key fields out of an invoice PDF and highlights exactly where each one sits on the page.",
    repoUrl: "https://github.com/ninawekunal/pdf-highlighter",
    liveUrl: "https://ninawekunal.github.io/pdf-highlighter/",
    tags: ["AI", "Frontend", "Data / ML"],
    stack: ["React", "TypeScript", "Vite", "Material UI", "react-pdf", "pdf.js"],
    motivation:
      "A small, public version of a problem I work on every day: a person checking what software read off an invoice. Seeing the value lit up on the PDF is what makes that check fast, and what makes people trust it.",
    capabilities: [
      "Switch between 10 sample invoices, or upload your own one-page PDF.",
      "Pulls out 10 key fields, such as invoice number, due date and total.",
      "Click a field and its exact spot on the PDF lights up.",
      "Download the invoice you are looking at.",
    ],
    lessons: [
      "People trust extracted data when they can see exactly where it came from on the page.",
      "Two ways of finding a value, with a fallback, survive far more invoice layouts than one clever rule.",
      "When the software is not sure, the design should make checking by hand quick, not hide the doubt.",
    ],
    build: [
      "Rendered PDFs with react-pdf, which is built on [[pdf-js]].",
      "Read the text on each page and found values in two passes: known labels first, then a general 'Label: Value' fallback.",
      "Converted each value's position from PDF coordinates to screen coordinates, so the highlight lands exactly on it.",
    ],
    deploy: "GitHub Actions builds it into a [[static-site]] and publishes it to [[github-pages]].",
  },
  {
    id: "image-gender-detector",
    title: "ImageGenderDetector",
    kicker: "Classic machine learning, end to end",
    headline: "Finds faces in a photo and predicts gender with a model trained from scratch.",
    repoUrl: "https://github.com/ninawekunal/ImageGenderDetector",
    liveUrl: "https://ninawekunal.github.io/ImageGenderDetector/faceapp.html",
    tags: ["AI", "Data / ML"],
    stack: ["Python", "Flask", "OpenCV", "scikit-learn", "NumPy", "Pandas"],
    motivation:
      "I wanted to build a whole machine learning pipeline by hand, from raw photos to a trained model to something a person could click on, so that no library hid the steps from me.",
    capabilities: [
      "Finds each face in an uploaded photo with a [[haar-cascade]].",
      "Classifies each face using [[pca-svm]], trained on a labelled photo set.",
      "Reports how good the model is with standard accuracy measures, not just a single score.",
    ],
    lessons: [
      "Classic machine learning still works well when every preparation step is explicit and measured.",
      "How well the face is found and cropped matters more to the result than the model itself.",
      "Accuracy numbers are not enough: the photos were mostly of Hollywood celebrities, and the page should say so.",
    ],
    build: [
      "Converted photos to grayscale and cropped each detected face.",
      "Tuned the model with a grid search to find its best settings.",
      "Wrapped it in a small Flask web app so anyone can try it.",
    ],
    deploy: "The demo page is published on [[github-pages]].",
  },
  {
    id: "agent-queues",
    title: "Agent Queues",
    kicker: "Background work, made visible",
    headline: "A live board showing AI-style refund jobs moving from waiting to done, or failed.",
    repoUrl: "https://github.com/ninawekunal/agent-queues",
    liveUrl: "https://agent-queues.vercel.app",
    tags: ["AI", "Full Stack", "Scalable Systems"],
    stack: ["Next.js", "TypeScript", "Node.js", "Upstash Redis", "QStash", "Zod"],
    motivation:
      "AI agents do slow work in the background, and the people supervising them need to see what is waiting, what is running, and what broke. I wanted to build that view on a real [[queue]], not a mock.",
    capabilities: [
      "Create sample refund requests and watch them move through waiting, processing, done and failed.",
      "A Redis list holds the waiting work, and QStash hands jobs to the worker.",
      "Every endpoint checks what comes in and what goes out with [[zod]], in one shared response shape.",
      "Refuses to start, or even build, if it cannot reach Redis or QStash.",
    ],
    lessons: [
      "Processing work in batches smooths out bursts and protects whatever sits downstream.",
      "Splitting live updates by agent lets each screen listen only to what it shows.",
      "A publish-and-subscribe setup suits a dashboard where state changes every second.",
    ],
    build: [
      "Ran a custom Node server alongside the Next.js app.",
      "Added one route at a time, each with an input and an output schema, following a written rule every new endpoint must meet.",
    ],
    deploy: "Hosted on Vercel, with Upstash running Redis and QStash.",
  },
  {
    id: "agent-portal",
    title: "AgentPortal",
    kicker: "Invoice approval portal",
    headline: "Review, upload and approve invoices, with what you can do decided by your role.",
    repoUrl: "https://github.com/ninawekunal/AgentPortal",
    liveUrl: "https://agent-portal-production-590e.up.railway.app/login",
    tags: ["Full Stack", "Scalable Systems", "Frontend"],
    stack: ["React", "TypeScript", "Material UI", "Hapi", "Supabase", "Postgres", "GraphQL", "Jest"],
    motivation:
      "A practice run at the kind of product I build at work: an operations portal where people with different roles review invoices, upload documents and approve in bulk.",
    capabilities: [
      "Sign in with a one-time code by email; your role comes from a signed [[jwt]].",
      "A grid of invoice cards with filters, more loading as you scroll, and approve-many-at-once.",
      "An invoice view with the PDF, the extracted data, and approve or pay actions.",
      "Supervisors and admins can upload documents to be read; uploads are cleaned, size-checked and rate-limited.",
      "Both REST and [[graphql]] APIs.",
    ],
    lessons: [
      "Operations screens work best when every state change is explicit and one click away.",
      "Clear 'who owns this' cues and an obvious next action matter more than a pretty dashboard.",
      "Typed status values stop a fast-changing workflow screen from breaking quietly.",
    ],
    build: [
      "A React and Material UI site talking to a Hapi server, split into separate sign-in and invoice services.",
      "Supabase for sign-in and file storage, behind a storage layer that could switch to Amazon S3.",
      "Scripts to generate sample invoices and fill the database, and automated tests with Jest.",
    ],
    deploy: "Deployed on Railway.",
  },
  {
    id: "smarttrip",
    title: "SmartTrip",
    kicker: "Walking trip planner",
    headline: "Put your stops in order, see the walking time, and send the route to Google Maps.",
    repoUrl: "https://github.com/ninawekunal/SmartTrip",
    tags: ["Full Stack", "Frontend"],
    stack: ["Next.js", "TypeScript", "Hapi", "Supabase", "Postgres", "Mapbox"],
    motivation:
      "Planning a day on foot in a new city means juggling a list of places and a map. I wanted one small tool to order the stops, show the walking time, and hand the route to Google Maps.",
    capabilities: [
      "Create a trip and add stops.",
      "Reorder the stops and see the walking distance and time for that exact order.",
      "Export the route to Google Maps in one click.",
    ],
    lessons: [
      "Getting the data model for trips and stops right early makes every later feature easier.",
      "Keeping the pages, the server and the shared code apart stops a page change from breaking the server.",
      "Doing the core job well first beats adding AI trip ideas on day one; that stays out until routing is solid.",
    ],
    build: [
      "Next.js for the pages and a separate Hapi server for the API, joined so the browser sees one site.",
      "Supabase Postgres stores trips, ordered stops and routes.",
      "Mapbox works out the walking route, and a Google Maps link carries it out.",
    ],
  },
];

export const footerNotes = [
  "Built with Next.js and Material UI, exported statically to GitHub Pages.",
  "Every number on this page comes from git, GitHub, or a doc written at the time. The customer count is my own tally.",
];
