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
  eyebrow: "What I Offer",
  title: "Engineering that starts with real problems and ships practical systems.",
  body:
    "I get energized by finding friction in the real world, translating it into clear engineering scope, and collaborating to close knowledge gaps quickly when the problem needs more than I already know.",
};

export const offerViews: OfferView[] = [
  {
    id: "frontend",
    label: "Front-end",
    title: "Front-end systems that stay fast, accessible, and maintainable at scale.",
    description:
      "Built and shipped React/Next.js interfaces with TypeScript contracts, strong testing discipline, and production reliability expectations.",
    technologies: [
      {
        id: "react",
        label: "React",
        icon: "react",
        summary: "Component-driven UI architecture for complex, stateful product surfaces.",
        projectIds: ["pdf-highlighter"],
      },
      {
        id: "nextjs",
        label: "Next.js",
        icon: "next",
        summary: "Hybrid full-stack delivery with clear server/client boundaries.",
        projectIds: ["agent-queues", "smarttrip"],
      },
      {
        id: "typescript",
        label: "TypeScript",
        icon: "typescript",
        summary: "Safer refactors and explicit contracts across UI and service seams.",
        projectIds: ["agent-queues", "smarttrip", "pdf-highlighter"],
      },
      {
        id: "javascript",
        label: "JavaScript",
        icon: "javascript",
        summary: "Core runtime fluency across browser and Node ecosystems.",
        projectIds: ["agent-queues", "smarttrip", "pdf-highlighter"],
      },
      {
        id: "material-ui",
        label: "Material UI",
        icon: "material",
        summary: "Reusable component systems and fast UI iteration.",
        projectIds: ["pdf-highlighter"],
      },
      {
        id: "jest",
        label: "Jest",
        icon: "jest",
        summary: "Unit and integration test coverage for critical flows.",
        projectIds: [],
      },
      {
        id: "cypress",
        label: "Cypress",
        icon: "cypress",
        summary: "End-to-end confidence for high-signal product journeys.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "lazy-loading",
        label: "Lazy Loading",
        proof:
          "I split heavy routes/components and deferred expensive bundles so first interaction stayed responsive on slower networks.",
      },
      {
        id: "state-management",
        label: "State Management",
        proof:
          "I defined domain-level state boundaries and event flows so UI transitions were predictable and easy to debug in production.",
      },
      {
        id: "accessibility",
        label: "Accessibility Support",
        proof:
          "I shipped keyboard-first and semantic markup patterns, then validated critical journeys with accessibility checks before release.",
      },
      {
        id: "hybrid-rendering",
        label: "Hybrid Rendering",
        proof:
          "I chose SSR, static, or client rendering per screen based on data volatility and user-perceived latency targets.",
      },
      {
        id: "web-observability",
        label: "Web Performance Observability",
        proof:
          "I instrumented frontend telemetry around releases to catch regressions fast and tie issues back to specific deployments.",
      },
      {
        id: "cache-session",
        label: "Caching & Session Management",
        proof:
          "I coordinated browser and server caching with auth/session boundaries so protected flows stayed consistent during token refresh and sign-out.",
      },
      {
        id: "websockets",
        label: "WebSockets & Real-time",
        proof:
          "I built realtime updates with reconnect, fallback polling, and state reconciliation to keep clients reliable during network drops.",
      },
      {
        id: "frontend-security",
        label: "Frontend Security",
        proof:
          "I hardened token handling, browser storage, and request boundaries to reduce XSS/session-risk exposure in user-facing apps.",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend systems with clear contracts, security posture, and operational clarity.",
    description:
      "Built APIs and identity-sensitive service flows using Node and JVM ecosystems with typed boundaries and reliability-first practices.",
    technologies: [
      {
        id: "nodejs",
        label: "Node.js",
        icon: "node",
        summary: "API composition and workflow orchestration across product systems.",
        projectIds: ["agent-queues", "smarttrip"],
        subItems: ["Hapi", "Catalyst"],
      },
      {
        id: "spring-boot",
        label: "Spring Boot",
        icon: "spring",
        summary: "Enterprise-grade service patterns for auth-sensitive domains.",
        projectIds: [],
      },
      {
        id: "jwt",
        label: "JWT",
        icon: "jwt",
        summary: "Token-based auth context and identity-aware flow enforcement.",
        projectIds: [],
      },
      {
        id: "rest",
        label: "REST",
        icon: "rest",
        summary: "Predictable API contracts for integration-heavy product surfaces.",
        projectIds: ["agent-queues", "smarttrip"],
      },
      {
        id: "graphql",
        label: "GraphQL",
        icon: "graphql",
        summary: "Schema-centric API composition with typed boundaries.",
        projectIds: ["smarttrip"],
      },
      {
        id: "grpc",
        label: "gRPC",
        icon: "grpc",
        summary: "Typed service communication for distributed backend paths.",
        projectIds: [],
      },
      {
        id: "mapbox",
        label: "Mapbox APIs",
        icon: "mapbox",
        summary: "Geospatial and route integration exposed through backend contracts.",
        projectIds: ["smarttrip"],
      },
      {
        id: "postgres",
        label: "Postgres",
        icon: "postgres",
        summary: "Relational integrity for stateful service workloads.",
        projectIds: ["smarttrip"],
      },
      {
        id: "java",
        label: "Java",
        icon: "java",
        summary: "Production service implementation in JVM environments.",
        projectIds: [],
      },
      {
        id: "kotlin",
        label: "Kotlin",
        icon: "kotlin",
        summary: "Typed backend service development in modern JVM stacks.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "authz-design",
        label: "AuthN/AuthZ Design",
        proof:
          "I implemented layered AuthN/AuthZ checks and least-privilege policies in identity-sensitive APIs to keep access decisions explicit.",
      },
      {
        id: "contract-first",
        label: "Contract-first APIs",
        proof:
          "I defined request/response contracts first, then generated/validated against them to reduce integration drift across teams.",
      },
      {
        id: "idempotency",
        label: "Idempotency",
        proof:
          "I added idempotency keys and dedupe guards on write paths so retries or duplicate messages did not corrupt state.",
      },
      {
        id: "versioning",
        label: "Versioning Strategy",
        proof:
          "I rolled out API and schema changes with backward-compatible versions and phased migration plans to avoid client breakage.",
      },
      {
        id: "schema-evolution",
        label: "Schema Evolution",
        proof:
          "I planned schema migrations with compatibility checks, rollback options, and data backfills to keep uptime intact.",
      },
      {
        id: "backend-security",
        label: "Backend Security",
        proof:
          "I enforced secure data paths around token validation, PII boundaries, and trust-sensitive actions with audit-friendly controls.",
      },
      {
        id: "failure-path",
        label: "Failure-path Engineering",
        proof:
          "I designed retries, timeout budgets, and explicit fallback/error contracts early so failure paths were predictable under load.",
      },
    ],
  },
  {
    id: "applied-ai",
    label: "Applied AI",
    title: "Applied AI patterns that stay inspectable, explainable, and product-usable.",
    description:
      "Delivered ML/document workflows where outputs are verifiable in UI and model behavior is observable, not opaque.",
    technologies: [
      {
        id: "document-intelligence",
        label: "Document Intelligence",
        icon: "document",
        summary: "Field extraction with on-surface visual verification for user trust.",
        projectIds: ["pdf-highlighter"],
      },
      {
        id: "opencv",
        label: "OpenCV",
        icon: "opencv",
        summary: "Image processing and feature pipelines for practical CV flows.",
        projectIds: ["image-gender-detector"],
      },
      {
        id: "scikit-learn",
        label: "scikit-learn",
        icon: "sklearn",
        summary: "Classical ML modeling and measurable evaluation loops.",
        projectIds: ["image-gender-detector"],
      },
      {
        id: "rag",
        label: "RAG",
        icon: "rag",
        summary: "Grounded answer generation with retrieval-aware context orchestration.",
        projectIds: [],
        subItems: ["Vector Databases", "Semantic Search"],
      },
      {
        id: "python",
        label: "Python",
        icon: "python",
        summary: "ML prototyping, data workflows, and model-adjacent implementation.",
        projectIds: ["image-gender-detector"],
      },
      {
        id: "agentic",
        label: "Agentic Workflows",
        icon: "agentic",
        summary: "Queue-backed orchestration with visible lifecycle and human oversight.",
        projectIds: ["agent-queues"],
      },
    ],
    nicheTechniques: [
      {
        id: "human-loop",
        label: "Human-in-the-loop Review",
        proof:
          "I paired model-generated outputs with reviewer UIs so teams could verify and approve critical results before downstream use.",
      },
      {
        id: "confidence-signals",
        label: "Confidence Signaling",
        proof:
          "I exposed confidence indicators and fallback behavior in product flows so users knew when to trust or re-check model output.",
      },
      {
        id: "evaluation-loops",
        label: "Evaluation Loops",
        proof:
          "I built repeatable eval loops with error analysis baselines to measure model quality changes release over release.",
      },
      {
        id: "prompt-system-design",
        label: "Prompt/System Design",
        proof:
          "I treated prompts and tool-calling flows as versioned artifacts with tests so behavior changes stayed intentional.",
      },
      {
        id: "dataset-awareness",
        label: "Dataset Bias Awareness",
        proof:
          "I documented dataset gaps and failure classes during experimentation so teams could set realistic guardrails in production.",
      },
      {
        id: "ai-observability",
        label: "AI Observability",
        proof:
          "I logged inference traces and tool decisions in a debuggable format to speed up RCA when outputs regressed.",
      },
    ],
  },
  {
    id: "cloud-distributed",
    label: "Cloud / Distributed",
    title: "Cloud and distributed systems tuned for reliability, throughput, and resilient scaling.",
    description:
      "Production exposure spans AWS services, asynchronous flows, and architecture patterns that prevent bottlenecks and cascading failures.",
    technologies: [
      {
        id: "aws",
        label: "AWS",
        icon: "aws",
        summary: "Cloud architecture across API, compute, storage, queueing, and streaming workloads.",
        projectIds: [],
        subItems: [
          "ElasticSearch",
          "S3",
          "EC2",
          "Lambda",
          "SQS",
          "DynamoDB",
          "Kinesis",
          "API Gateway",
        ],
      },
      {
        id: "redis",
        label: "Redis",
        icon: "redis",
        summary: "Low-latency data structures and queue semantics for high-velocity workflows.",
        projectIds: ["agent-queues"],
      },
      {
        id: "qstash",
        label: "QStash",
        icon: "qstash",
        summary: "Asynchronous event delivery for decoupled orchestration patterns.",
        projectIds: ["agent-queues"],
      },
      {
        id: "kubernetes",
        label: "Kubernetes",
        icon: "kubernetes",
        summary: "Containerized service scaling with explicit deployment/runtime controls.",
        projectIds: [],
      },
      {
        id: "observability",
        label: "Observability",
        icon: "observability",
        summary: "Operational visibility through metrics, logs, and release correlation.",
        projectIds: ["agent-queues", "smarttrip"],
      },
    ],
    nicheTechniques: [
      {
        id: "partition-sharding",
        label: "Partitioning / Sharding",
        subItems: ["Consistent Hashing", "Hash-based partitioning"],
        proof:
          "I used consistent/hash-based partitioning strategies to spread traffic, reduce hot keys, and keep throughput stable as load grew.",
      },
      {
        id: "database-indexing",
        label: "Database Indexing",
        proof:
          "I designed indexes around real query patterns and tuned them against write amplification/cost after profiling bottlenecks.",
      },
      {
        id: "scalable-architecture",
        label: "Scalable System Architecture",
        proof:
          "I separated read/write paths and service boundaries so scaling one workload did not destabilize the rest of the platform.",
      },
      {
        id: "microservices",
        label: "Micro-services",
        proof:
          "I split domains into independently deployable services with explicit contracts so teams could ship safely without cross-service regressions.",
      },
      {
        id: "async-messaging",
        label: "Asynchronous Messaging",
        subItems: ["Queue", "Pub/Sub"],
        proof:
          "I implemented queue and pub/sub workflows to decouple services, smooth traffic spikes, and improve failure isolation.",
      },
      {
        id: "load-balancing",
        label: "Load Balancing",
        proof:
          "I configured health-aware load balancing and failover rules so traffic shifted cleanly during partial outages.",
      },
      {
        id: "resilience",
        label: "Resilience Patterns",
        proof:
          "I applied retries, timeout budgets, and circuit-breaker patterns to prevent cascading failures during peak traffic.",
      },
    ],
  },
  {
    id: "working-style",
    label: "Working Style",
    title: "Execution style shaped by ownership, reliability, and collaborative growth.",
    description:
      "Scope deliberately, ship end-to-end, learn in public, and mentor by documenting practical lessons from real production work.",
    technologies: [
      {
        id: "scope-intent",
        label: "Scope with intent",
        icon: "style",
        summary: "Start with high-signal user flow, then expand from a stable base.",
        projectIds: ["smarttrip"],
      },
      {
        id: "e2e-ownership",
        label: "E2E ownership",
        icon: "style",
        summary: "Own delivery across UX, API contracts, and release behavior.",
        projectIds: ["agent-queues", "smarttrip"],
      },
      {
        id: "system-design",
        label: "Distributed design",
        icon: "style",
        summary: "Model boundaries and failure paths before they become incidents.",
        projectIds: ["agent-queues"],
      },
      {
        id: "zero-one",
        label: "Ship 0 -> 1",
        icon: "style",
        summary: "Turn ambiguity into deployable product slices with measurable value.",
        projectIds: ["agent-queues", "pdf-highlighter"],
      },
      {
        id: "reliability",
        label: "Reliability + incident response",
        icon: "style",
        summary: "Use rollout safety, observability, and RCA loops as core engineering behavior.",
        projectIds: [],
      },
      {
        id: "mentoring",
        label: "Mentor and unblock others",
        icon: "style",
        summary: "Share constraints and mistakes so teams avoid repeating costly patterns.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "scope-proof",
        label: "Scope Decisions",
        proof:
          "I scoped work into thin vertical slices that de-risked the hardest unknowns first before expanding system complexity.",
      },
      {
        id: "ownership-proof",
        label: "Ownership in Production",
        proof:
          "I took features from design to production, including rollout, monitoring, incident response, and post-release hardening.",
      },
      {
        id: "collab-proof",
        label: "Cross-team Collaboration",
        proof:
          "I aligned with product, design, and platform teams by documenting tradeoffs and keeping decision paths transparent.",
      },
      {
        id: "security-proof",
        label: "Security-first Delivery",
        proof:
          "I embedded security and identity constraints early in architecture so compliance and privacy were built in, not patched later.",
      },
      {
        id: "mentorship-proof",
        label: "Mentoring Style",
        proof:
          "I used code reviews and incident retrospectives to mentor teammates with concrete examples and reusable playbooks.",
      },
      {
        id: "learning-proof",
        label: "Continuous Learning",
        proof:
          "I ramped quickly on new domains, then documented what worked and what failed so the team could reuse those learnings.",
      },
    ],
  },
];
