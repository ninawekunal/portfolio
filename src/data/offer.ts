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
          "Split heavy UI surfaces and defer expensive modules to keep first interaction responsive.",
      },
      {
        id: "state-management",
        label: "State Management",
        proof:
          "Use domain-driven state boundaries so transitions stay predictable and debuggable.",
      },
      {
        id: "accessibility",
        label: "Accessibility Support",
        proof:
          "Design keyboard and semantic-first interactions so workflows remain usable under assistive technology.",
      },
      {
        id: "hybrid-rendering",
        label: "Hybrid Rendering",
        proof:
          "Choose SSR/static/client rendering based on data volatility and UX expectations.",
      },
      {
        id: "web-observability",
        label: "Web Performance Observability",
        proof:
          "Track client-side regressions with release-aware telemetry and runtime diagnostics.",
      },
      {
        id: "cache-session",
        label: "Caching & Session Management",
        proof:
          "Coordinate client/server cache behavior carefully around auth-sensitive session transitions.",
      },
      {
        id: "websockets",
        label: "WebSockets & Real-time",
        proof:
          "Design real-time flows with graceful fallback and state reconciliation paths.",
      },
      {
        id: "frontend-security",
        label: "Frontend Security",
        proof:
          "Guard token handling and browser state to reduce XSS/session-risk exposure.",
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
          "Identity-sensitive systems use layered checks and least-privilege policies for safer defaults.",
      },
      {
        id: "contract-first",
        label: "Contract-first APIs",
        proof:
          "Keep IO contracts explicit to reduce integration drift and debugging ambiguity.",
      },
      {
        id: "idempotency",
        label: "Idempotency",
        proof:
          "Protect state transitions against retries and duplicate event delivery.",
      },
      {
        id: "versioning",
        label: "Versioning Strategy",
        proof:
          "Ship change safely via backward-compatible evolution and staged rollouts.",
      },
      {
        id: "schema-evolution",
        label: "Schema Evolution",
        proof:
          "Use migration discipline and compatibility checks as models evolve.",
      },
      {
        id: "backend-security",
        label: "Backend Security",
        proof:
          "Harden data paths around token handling, PII boundaries, and trust-sensitive actions.",
      },
      {
        id: "failure-path",
        label: "Failure-path Engineering",
        proof:
          "Design retries, fallback behavior, and explicit error contracts before incidents happen.",
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
          "Model-assisted outputs are paired with explicit review surfaces before final acceptance.",
      },
      {
        id: "confidence-signals",
        label: "Confidence Signaling",
        proof:
          "Expose confidence/fallback behavior so users understand reliability boundaries.",
      },
      {
        id: "evaluation-loops",
        label: "Evaluation Loops",
        proof:
          "Track quality with error analysis and repeatable regression metrics.",
      },
      {
        id: "prompt-system-design",
        label: "Prompt/System Design",
        proof:
          "Treat prompts and tool flows as versioned, testable system behavior.",
      },
      {
        id: "dataset-awareness",
        label: "Dataset Bias Awareness",
        proof:
          "Document dataset limits and failure classes to avoid false confidence.",
      },
      {
        id: "ai-observability",
        label: "AI Observability",
        proof:
          "Capture inference behavior with logs that are useful during debugging and RCA.",
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
          "Use partition strategy to reduce hotspots and keep request distribution stable under scale.",
      },
      {
        id: "database-indexing",
        label: "Database Indexing",
        proof:
          "Design indexes around access patterns while balancing write amplification and cost.",
      },
      {
        id: "scalable-architecture",
        label: "Scalable System Architecture",
        proof:
          "Decompose read/write paths and service boundaries so growth does not create tight coupling.",
      },
      {
        id: "microservices",
        label: "Micro-services",
        proof:
          "Use clear domain ownership and contracts for independent deployment and safer changes.",
      },
      {
        id: "async-messaging",
        label: "Asynchronous Messaging",
        subItems: ["Queue", "Pub/Sub"],
        proof:
          "Model workflows as events when decoupling improves resilience and latency tolerance.",
      },
      {
        id: "load-balancing",
        label: "Load Balancing",
        proof:
          "Distribute traffic with health-aware routing and failure isolation guardrails.",
      },
      {
        id: "resilience",
        label: "Resilience Patterns",
        proof:
          "Combine retries, timeout budgets, and circuit-breaker thinking to avoid cascades.",
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
          "Prioritize thin vertical slices that prove risk early before scaling complexity.",
      },
      {
        id: "ownership-proof",
        label: "Ownership in Production",
        proof:
          "Carry features through release, monitoring, incident handling, and hardening.",
      },
      {
        id: "collab-proof",
        label: "Cross-team Collaboration",
        proof:
          "Align with product, design, and platform peers through explicit technical tradeoffs.",
      },
      {
        id: "security-proof",
        label: "Security-first Delivery",
        proof:
          "Embed security and identity constraints into architecture decisions from day one.",
      },
      {
        id: "mentorship-proof",
        label: "Mentoring Style",
        proof:
          "Use code reviews and incident retrospectives as repeatable teaching loops.",
      },
      {
        id: "learning-proof",
        label: "Continuous Learning",
        proof:
          "Treat unknown domains as explicit learning goals and document discoveries for reuse.",
      },
    ],
  },
];
