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
  posterSrc: string;
  posterAlt: string;
  tags: string[];
  stack: string[];
  highlights: string[];
  architecture: string[];
  valueSignals: string[];
  evidence: string[];
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
};

export type CareerEntry = {
  company: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type EducationEntry = {
  school: string;
  location: string;
  degree: string;
  date: string;
  details: string;
};

export const profile = {
  name: "Kunal Ninawe",
  role: "Software Engineer II | Full-stack & Frontend Systems",
  headline:
    "Full-stack engineer building scalable, accessible UI systems and AI-native product workflows.",
  summary:
    "I have 4+ years of professional software engineering experience building product-facing interfaces, backend services, and data workflows. My recent work spans partner account platforms used by 100k+ users, queue orchestration, map-led planning, document intelligence, and computer vision.",
  audience:
    "Best fit for hiring managers looking for an engineer who can move from architecture decisions to shipped UI without losing accessibility, reliability, or product clarity.",
  githubUrl: "https://github.com/ninawekunal",
  linkedInUrl: "https://linkedin.com/in/ninawekunal/",
  email: "ninawekunal@gmail.com",
  location: "Seattle, WA",
  resumeUrl: "/Kunal-Ninawe-Resume.pdf",
  knowledgeAreas: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "REST API design",
    "GraphQL",
    "Supabase",
    "Postgres",
    "Redis",
    "QStash",
    "Mapbox",
    "Google Maps integrations",
    "Document extraction",
    "Computer vision",
    "Machine learning",
    "AI-native product engineering",
    "Scalable systems design",
  ],
};

export const navigationItems = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Delivery", href: "#delivery" },
];

export const heroBadges = [
  "Mid-senior engineer",
  "Full-stack delivery",
  "Scalable systems",
  "AI-native product work",
];

export const heroSignals = [
  {
    title: "Currently at Expedia Group",
    detail: "Software Engineer II shipping partner account workflows, auth, MFA, and dashboard experiences in React, TypeScript, and GraphQL.",
  },
  {
    title: "Frontend depth with backend range",
    detail: "Strong in React and Next.js UI systems, with production experience across Node.js, Java, Kotlin, Spring Boot, GraphQL, REST, SQL, and async cloud workflows.",
  },
  {
    title: "AI with engineering discipline",
    detail: "Builds GenAI, document, and ML-driven experiences where the UX makes the underlying system inspectable and useful.",
  },
  {
    title: "Engineering systems that hold up",
    detail: "Typed contracts, layered boundaries, accessibility, testing, on-call ownership, and failure-mode thinking are part of the default approach.",
  },
];

export const impactMetrics: Metric[] = [
  {
    label: "Users supported",
    value: "100k+",
    detail: "Partner workflows delivered for global account surfaces at Expedia Group.",
  },
  {
    label: "Feature adoption",
    value: "90%",
    detail: "Adoption reached across critical partner portal features and account management flows.",
  },
  {
    label: "Test coverage",
    value: "92%",
    detail: "Expanded Jest and Cypress coverage for auth, MFA, OTP, email, and form-driven experiences.",
  },
  {
    label: "Support reduction",
    value: "~20%",
    detail: "Used L3 on-call debugging, logs, metrics, and RCA improvements to cut support volume.",
  },
];

export const careerHighlights = [
  "Software Engineer II at Expedia Group since May 2022.",
  "Shipped scalable and accessible account workflows using React, TypeScript, and GraphQL.",
  "Previously built backend APIs and async workflows on AWS Lambda, ECS, DynamoDB, ElastiCache, and Kinesis.",
  "MS in Computer Engineering from New York University with coursework in distributed systems, cloud computing, and ML.",
];

export const capabilityGroups = [
  {
    icon: "hub",
    title: "Full-stack architecture",
    description:
      "Comfortable owning both the product surface and the system behind it, from interface modeling to service boundaries.",
    items: [
      "Next.js App Router and React-driven interfaces",
      "Node and Hapi backend services",
      "REST and GraphQL endpoint design",
      "Supabase and Postgres-backed persistence",
    ],
    evidence: "SmartTrip and Agent Queues show clear frontend, backend, and shared-layer boundaries.",
  },
  {
    icon: "smart",
    title: "AI-native engineering",
    description:
      "Builds software that incorporates extraction, agentic workflows, and ML foundations in a way product teams can ship.",
    items: [
      "Document extraction and highlightable review workflows",
      "Queue-driven operator flows for agentic systems",
      "Computer vision and classical ML foundations",
      "Evaluation-minded feature scoping",
    ],
    evidence:
      "PDF Highlighter, Agent Queues, and ImageGenderDetector show both interface thinking and AI/ML implementation depth.",
  },
  {
    icon: "lan",
    title: "Scalable systems thinking",
    description:
      "Designs for operational clarity with typed contracts, explicit state transitions, and clear failure handling.",
    items: [
      "Redis queues and QStash orchestration",
      "Contract-first API validation with Zod",
      "Startup and build-time dependency checks",
      "Observable success, failure, and processing states",
    ],
    evidence:
      "Agent Queues demonstrates queue semantics, validation discipline, and UI state observability.",
  },
  {
    icon: "design",
    title: "Product and UX execution",
    description:
      "Builds interfaces that make dense workflows easier to scan, navigate, and trust.",
    items: [
      "Document-heavy and map-heavy interfaces",
      "Material-based component systems",
      "Rapid MVP scoping without losing extensibility",
      "Hiring-manager friendly storytelling through demos",
    ],
    evidence:
      "SmartTrip and PDF Highlighter both translate complex interactions into approachable product flows.",
  },
];

export const experienceTimeline: CareerEntry[] = [
  {
    company: "Expedia Group",
    location: "Seattle, WA",
    role: "Software Engineer II",
    period: "May 2022 - Present",
    summary:
      "Owned end-to-end delivery across critical partner account workflows, balancing frontend systems work with reliability, experimentation, and cross-functional execution.",
    highlights: [
      "Delivered email updates, auth, MFA, disable, and portfolio workflows using React, TypeScript, and GraphQL for global partner portals used by 100k+ users.",
      "Designed scalable UI architectures for high-traffic, multi-region account experiences with careful rendering, state, and async data-flow decisions.",
      "Improved release reliability through progressive deployments, feature flags, sidecars, and secure secret management.",
      "Expanded Jest and Cypress coverage to 92% and handled L3 on-call incidents, contributing RCA work that reduced support requests by about 20%.",
    ],
    stack: ["React", "TypeScript", "GraphQL", "Jest", "Cypress", "Accessibility"],
  },
  {
    company: "Global Traffic Technologies",
    location: "Minneapolis, MN",
    role: "Full Stack Engineer",
    period: "June 2021 - April 2022",
    summary:
      "Built backend APIs and async workflows for user-facing traffic products with a strong focus on cloud reliability and responsiveness.",
    highlights: [
      "Worked across AWS Lambda, ECS, API Gateway, CloudFormation, DynamoDB, ElastiCache, and Kinesis.",
      "Reduced latency and operational cost while improving reliability for customer-facing systems.",
    ],
    stack: ["AWS Lambda", "ECS", "API Gateway", "DynamoDB", "ElastiCache", "Kinesis"],
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
  },
];

export const education: EducationEntry[] = [
  {
    school: "New York University",
    location: "New York, NY",
    degree: "M.S. in Computer Engineering",
    date: "May 2021",
    details:
      "Coursework in data structures and algorithms, cloud computing, distributed systems, internet protocols, machine learning, and deep learning.",
  },
  {
    school: "University of Mumbai",
    location: "Mumbai, India",
    degree: "B.S. in Computer and Information Science",
    date: "July 2019",
    details: "Strong computing foundation spanning software engineering and computer science fundamentals.",
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
  },
];

export const deliveryPrinciples = [
  {
    icon: "scope",
    title: "Scope with intent",
    description:
      "Start with the core user flow, ship the high-signal path first, and leave room for later expansion.",
    example:
      "SmartTrip explicitly holds AI itinerary generation out of the MVP so trip creation, ordering, routing, and export stay solid.",
  },
  {
    icon: "contract",
    title: "Design crisp boundaries",
    description:
      "Typed inputs, typed outputs, and clear ownership lines make systems easier to scale and debug.",
    example:
      "Agent Queues validates both sides of the API contract and separates queue storage from visible workflow state.",
  },
  {
    icon: "visibility",
    title: "Make complex state visible",
    description:
      "Users and operators trust systems more when transitions are inspectable instead of hidden.",
    example:
      "PDF Highlighter exposes extraction decisions through direct highlights, and Agent Queues exposes processing states through dedicated panels.",
  },
  {
    icon: "ship",
    title: "Ship across the stack",
    description:
      "Move from data model to UI finish without losing pace or maintainability.",
    example:
      "Recent work spans React and Next.js fronts, Hapi and Node services, Redis, Supabase Postgres, and ML workflows.",
  },
];

export const footerNotes = [
  "This portfolio is built in Next.js with Material UI and statically exports cleanly for GitHub Pages.",
  "The same codebase also deploys directly to Vercel when you want the simpler hosting path.",
  "Resume details incorporated here come from current professional experience at Expedia Group plus prior AWS-backed full-stack work and formal CS/CE training.",
];
