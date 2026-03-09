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
  title:
    "Experience in designing and shipping production systems that stay reliable at scale, including workloads that serve millions of users.",
  body:
    "Excited about shipping products from 0 to 1 & from 1 to 100 by turning ambiguous problems into clear execution plans and collaborating quickly wherever deeper expertise is needed.",
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
          "I lazy-loaded heavy routes and UI blocks so users could start using the app quickly.",
      },
      {
        id: "state-management",
        label: "State Management",
        proof:
          "I kept state boundaries clear so frontend behavior stayed predictable and easier to debug.",
      },
      {
        id: "accessibility",
        label: "Accessibility Support",
        proof:
          "I added keyboard navigation, semantic HTML, and focus states so key flows were accessible.",
      },
      {
        id: "hybrid-rendering",
        label: "Hybrid Rendering",
        proof:
          "I used SSR, SSG, or client rendering based on the page goal and expected load pattern.",
      },
      {
        id: "web-observability",
        label: "Web Performance Observability",
        proof:
          "I tracked web vitals and release metrics so we could catch regressions right after deploys.",
      },
      {
        id: "cache-session",
        label: "Caching & Session Management",
        proof:
          "I handled cache/session updates around login, logout, and token refresh to keep data consistent.",
      },
      {
        id: "websockets",
        label: "WebSockets & Real-time",
        proof:
          "I implemented realtime updates with reconnect and fallback polling so users still saw fresh data.",
      },
      {
        id: "frontend-security",
        label: "Frontend Security",
        proof:
          "I improved frontend security with safer token handling, strict input checks, and secure defaults.",
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
          "I built layered auth checks and least-privilege rules to protect sensitive APIs.",
      },
      {
        id: "contract-first",
        label: "Contract-first APIs",
        proof:
          "I defined API contracts first and validated against them so integrations stayed stable.",
      },
      {
        id: "idempotency",
        label: "Idempotency",
        proof:
          "I added idempotency keys and dedupe logic so retries never created duplicate writes.",
      },
      {
        id: "versioning",
        label: "Versioning Strategy",
        proof:
          "I versioned APIs and rolled changes out gradually so existing clients kept working.",
      },
      {
        id: "schema-evolution",
        label: "Schema Evolution",
        proof:
          "I planned schema migrations with compatibility checks and rollback paths to avoid downtime.",
      },
      {
        id: "backend-security",
        label: "Backend Security",
        proof:
          "I secured backend flows around tokens, PII access, and audit trails for trust-sensitive paths.",
      },
      {
        id: "failure-path",
        label: "Failure-path Engineering",
        proof:
          "I added retries, timeouts, and fallback behavior so failures were contained under load.",
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
          "I added human review steps so critical AI outputs were verified before final use.",
      },
      {
        id: "confidence-signals",
        label: "Confidence Signaling",
        proof:
          "I surfaced confidence and fallback signals so users knew when to trust or double-check results.",
      },
      {
        id: "evaluation-loops",
        label: "Evaluation Loops",
        proof:
          "I ran repeatable evaluation checks and error reviews before shipping model updates.",
      },
      {
        id: "prompt-system-design",
        label: "Prompt/System Design",
        proof:
          "I versioned prompts and tool flows so behavior changes were tested and easy to roll back.",
      },
      {
        id: "dataset-awareness",
        label: "Dataset Bias Awareness",
        proof:
          "I documented dataset gaps and common failure cases so teams could set practical guardrails.",
      },
      {
        id: "ai-observability",
        label: "AI Observability",
        proof:
          "I logged inference traces and tool decisions so debugging AI issues was faster.",
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
          "I used sharding and consistent hashing to spread traffic and avoid hot partitions.",
      },
      {
        id: "database-indexing",
        label: "Database Indexing",
        proof:
          "I added indexes based on real query patterns to reduce latency on heavy endpoints.",
      },
      {
        id: "scalable-architecture",
        label: "Scalable System Architecture",
        proof:
          "I separated service and data paths so each part could scale without blocking others.",
      },
      {
        id: "microservices",
        label: "Micro-services",
        proof:
          "I split domains into focused services with clear contracts so teams could deploy independently.",
      },
      {
        id: "async-messaging",
        label: "Asynchronous Messaging",
        subItems: ["Queue", "Pub/Sub"],
        proof:
          "I used queues and pub/sub to decouple workflows and handle traffic spikes smoothly.",
      },
      {
        id: "load-balancing",
        label: "Load Balancing",
        proof:
          "I configured load balancing with health checks and failover to keep services available.",
      },
      {
        id: "resilience",
        label: "Resilience Patterns",
        proof:
          "I applied retries, timeouts, and circuit-breaker style controls to prevent cascading outages.",
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
        summary: "Start with high level design of the system, map out essential components, then expand from a stable base.",
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
        summary: "Accountability for uptime and fast recovery when things go wrong. Demonstrated by owning on-call rotations and leading post-mortems for critical production issues.",
        projectIds: [],
      },
      {
        id: "mentoring",
        label: "Mentor and unblock others",
        icon: "style",
        summary: "Want to help others grow by sharing practical lessons from real production challenges.",
        projectIds: [],
      },
    ],
    nicheTechniques: [
      {
        id: "scope-proof",
        label: "Scope Decisions",
        proof:
          "Always starting with high level user flow and expanding scope from a stable base to avoid over-engineering and scope creep.",
      },
      {
        id: "ownership-proof",
        label: "Ownership in Production",
        proof:
          "Experience owning end to end delivery from UX to API contracts to release behavior and iterating based on real user feedback.",
      },
      {
        id: "collab-proof",
        label: "Cross-team Collaboration",
        proof:
          "Experience in working closely with product, design, and platform teams and make tradeoffs clear, and brainstorm together when needed to unblock progress.",
      },
      {
        id: "security-proof",
        label: "Security-first Delivery",
        proof:
          "Previous experience in handling sensitive data and flows with a security-first mindset shapes my delivery approach to be cautious and deliberate around potential risks.",
      },
      {
        id: "mentorship-proof",
        label: "Mentoring Style",
        proof:
          "Documenting practical lessons from real production challenges, and understanding that peers would also be facing those challenges for the first time, so sharing constraints and mistakes to help them avoid repeating costly patterns and unblock themselves faster.",
      },
      {
        id: "learning-proof",
        label: "Continuous Learning",
        proof:
          "Language and framework agnostic with a focus on core principles and patterns that can be applied across tech stacks, and a track record of quickly ramping up in new environments to deliver impact.",
      },
    ],
  },
];
