export type GlossaryEntry = {
  term: string;
  definition: string;
  readMore?: { label: string; url: string };
};

// Plain-English definitions for the words a recruiter should not have to look up.
// Copy marks a term as `[[key]]` (shows `term`) or `[[key|any wording]]`.
export const glossary = {
  "accounts-payable": {
    term: "accounts payable",
    definition:
      "The money a business owes: supplier bills coming in, checked, approved and paid.",
  },
  "accounts-receivable": {
    term: "accounts receivable",
    definition:
      "The money a business is owed: invoices going out, and chasing customers who have not paid yet.",
  },
  "three-way-match": {
    term: "three-way matching",
    definition:
      "Before paying a supplier's bill, a finance team checks it against two other documents: the purchase order (what we ordered) and the goods receipt (what actually arrived). If all three agree, the bill is safe to pay.",
    readMore: {
      label: "Three-way match on Wikipedia",
      url: "https://en.wikipedia.org/wiki/Three-way_match",
    },
  },
  "purchase-order": {
    term: "purchase order",
    definition:
      "The document a company sends a supplier saying what it wants to buy, how many, and at what price.",
  },
  "goods-receipt": {
    term: "goods receipt",
    definition:
      "The record a warehouse makes when a delivery arrives, saying what actually showed up.",
  },
  erp: {
    term: "ERP",
    definition:
      "Enterprise Resource Planning. The main system a company runs its orders, inventory and accounting on. Our product connected to it rather than replacing it.",
    readMore: {
      label: "ERP on Wikipedia",
      url: "https://en.wikipedia.org/wiki/Enterprise_resource_planning",
    },
  },
  "prophet-21": {
    term: "Prophet 21",
    definition:
      "Epicor Prophet 21 is an ERP built for wholesale distributors. The customer ran it on their own servers, which is why we had no test copy to connect to.",
    readMore: {
      label: "Read more about Prophet 21",
      url: "https://www.epicor.com/en-us/products/enterprise-resource-planning-erp/prophet-21/",
    },
  },
  "general-ledger": {
    term: "general ledger",
    definition:
      "The company's master accounting record. Small differences on a bill often get booked to a special ledger account instead of being fixed by hand.",
  },
  bff: {
    term: "BFF",
    definition:
      "Backend for Frontend. A thin server that belongs to the web app. The browser only talks to it, and it talks to the real backend, so secrets and heavy lifting stay off the user's device.",
    readMore: {
      label: "The BFF pattern, by Sam Newman",
      url: "https://samnewman.io/patterns/architectural/bff/",
    },
  },
  ssr: {
    term: "server-side rendering",
    definition:
      "The server builds the page before sending it, so the user sees real content straight away instead of a blank page waiting for code to download.",
    readMore: {
      label: "Server-side rendering on Wikipedia",
      url: "https://en.wikipedia.org/wiki/Server-side_rendering",
    },
  },
  jwt: {
    term: "login token",
    definition:
      "A signed string (a JWT) that proves who you are to the server. Whoever holds it can act as you until it expires, so where it is stored matters.",
    readMore: {
      label: "Introduction to JWTs",
      url: "https://jwt.io/introduction",
    },
  },
  "local-storage": {
    term: "localStorage",
    definition:
      "A small box of storage in the browser that any script on the page can read. Fine for a theme setting, risky for a login token.",
    readMore: {
      label: "localStorage on MDN",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
    },
  },
  "httponly-cookie": {
    term: "httpOnly cookie",
    definition:
      "A cookie the browser sends to the server automatically but never lets page scripts read. A malicious script cannot steal what it cannot see.",
    readMore: {
      label: "Cookies on MDN",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies",
    },
  },
  "same-origin": {
    term: "same-origin",
    definition:
      "Served from the same web address as the app itself. The browser treats those requests as part of the app, so cookies flow without extra cross-site setup.",
  },
  rbac: {
    term: "permission checks",
    definition:
      "Role-based access control: each user's role grants a list of permissions, like 'can view bills' or 'can approve payments', and every page checks the list before showing anything.",
  },
  csp: {
    term: "Content Security Policy",
    definition:
      "A rule the server sends with every page telling the browser which scripts are allowed to run. A fresh random code per request means only the app's own scripts qualify, so an injected script is refused.",
    readMore: {
      label: "CSP on MDN",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP",
    },
  },
  "immutable-deploy": {
    term: "pinned deploys",
    definition:
      "Every release is a container image labelled with the exact code version it was built from. Production runs that exact image, so what was tested is what ships, and rolling back means pointing at the previous label.",
  },
  "browser-cache": {
    term: "browser cache",
    definition:
      "The browser keeps copies of recent responses to load pages faster. If a response is marked as cacheable, the browser may show that copy again without asking the server.",
  },
  sse: {
    term: "live updates",
    definition:
      "Server-Sent Events: a connection the server keeps open so it can push progress to the page as it happens, instead of the page asking over and over.",
    readMore: {
      label: "Server-Sent Events on MDN",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events",
    },
  },
  "pdf-js": {
    term: "pdf.js",
    definition:
      "Mozilla's open-source library for drawing PDF files inside a web page. I used it to show invoices next to the extracted data, and to find where each value sits on the page so it can be highlighted.",
    readMore: {
      label: "pdf.js project page",
      url: "https://mozilla.github.io/pdf.js/",
    },
  },
  lcp: {
    term: "LCP",
    definition:
      "Largest Contentful Paint: the moment the biggest thing on the screen appears. It is the closest single number to 'when does the page feel loaded'.",
    readMore: { label: "LCP on web.dev", url: "https://web.dev/articles/lcp" },
  },
  "blocking-time": {
    term: "blocking time",
    definition:
      "Time the browser is too busy to respond to a click or a keypress. To the user it feels like the page froze.",
    readMore: {
      label: "Total Blocking Time on web.dev",
      url: "https://web.dev/articles/tbt",
    },
  },
  "performance-trace": {
    term: "performance trace",
    definition:
      "A second-by-second recording of everything the browser did while a page loaded. It shows exactly where the time went, instead of guessing.",
  },
  "claude-code": {
    term: "Claude Code",
    definition:
      "Anthropic's AI coding agent. It reads and edits a codebase from the terminal, and a team can teach it their rules with written instructions, reusable skills and automatic checks.",
    readMore: {
      label: "Claude Code docs",
      url: "https://code.claude.com/docs/en/overview",
    },
  },
  "agent-skill": {
    term: "skills",
    definition:
      "Reusable, written procedures an AI coding agent loads when a task matches, like a checklist it actually follows.",
  },
  "agent-hook": {
    term: "hooks",
    definition:
      "Automatic checks that run whenever the agent edits code, and stop it when a rule is broken.",
  },
  ci: {
    term: "CI",
    definition:
      "Continuous integration: the automated checks that run on every proposed change before it can merge. If a check fails, the change waits.",
  },
  api: {
    term: "API",
    definition:
      "The set of requests one program offers another. Our web app used the backend's API to read and save data.",
  },
  "api-contract": {
    term: "API contract",
    definition:
      "The written agreement of exactly which requests the backend accepts and what it sends back. When the copy drifts from reality, the app asks for things the server no longer does.",
  },
  webhook: {
    term: "webhook",
    definition:
      "An automatic message one system sends another the moment something happens, instead of the other system checking on a timer.",
  },
  "design-manifest": {
    term: "design spec",
    definition:
      "A structured list of every component a screen uses and where its data comes from, written before anyone builds the screen.",
  },
  "fuzzy-matching": {
    term: "fuzzy matching",
    definition:
      "Matching things that are nearly, not exactly, the same, and scoring how close they are. For example a part number printed with and without a supplier's prefix.",
  },
  "master-detail": {
    term: "list-and-detail layout",
    definition:
      "A list on one side and the selected item's details on the other, so you can work through a queue without losing your place.",
  },
  "on-device-ml": {
    term: "on-device machine learning",
    definition:
      "The AI model runs inside your browser, so your data never leaves your device.",
  },
  yamnet: {
    term: "YAMNet",
    definition:
      "A free Google model that listens to a short audio clip and says what kind of sound it is, out of about 500 categories.",
    readMore: {
      label: "MediaPipe audio classifier",
      url: "https://ai.google.dev/edge/mediapipe/solutions/audio/audio_classifier",
    },
  },
  "outbox-pattern": {
    term: "outbox pattern",
    definition:
      "Instead of sending an email the moment something happens, the app writes 'send this' into its database first. A worker sends it later, so nothing is lost if a step crashes.",
    readMore: {
      label: "Transactional outbox pattern",
      url: "https://microservices.io/patterns/data/transactional-outbox.html",
    },
  },
  monorepo: {
    term: "monorepo",
    definition:
      "One code repository holding several related apps, here the admin site, the server and the rules they share.",
  },
  zod: {
    term: "Zod",
    definition:
      "A TypeScript library that checks data really has the shape you expect before the code trusts it.",
    readMore: { label: "Zod docs", url: "https://zod.dev" },
  },
  queue: {
    term: "job queue",
    definition:
      "A waiting line for work. Requests go in, workers take them one at a time, so a burst never overwhelms the system.",
  },
  "haar-cascade": {
    term: "Haar cascade",
    definition:
      "A classic, fast technique for spotting faces in a photo by looking for patterns of light and dark.",
  },
  "pca-svm": {
    term: "PCA and SVM",
    definition:
      "Two classic machine learning steps: PCA shrinks each face image to its most telling features, and an SVM learns a boundary that separates one class from another.",
  },
  "active-recall": {
    term: "active recall",
    definition:
      "Learning by pulling an answer out of your memory, like a quiz, rather than re-reading. It is one of the best-supported study techniques there is.",
  },
  "github-pages": {
    term: "GitHub Pages",
    definition:
      "Free static website hosting from GitHub. Every push builds the site and publishes it automatically.",
  },
  "static-site": {
    term: "static site",
    definition:
      "A site built into plain files ahead of time, so any simple file host can serve it with no server running.",
  },
  graphql: {
    term: "GraphQL",
    definition:
      "A query language for APIs where the page asks for exactly the fields it needs in one request.",
  },
} satisfies Record<string, GlossaryEntry>;

export type GlossaryKey = keyof typeof glossary;

export function isGlossaryKey(value: string): value is GlossaryKey {
  return Object.prototype.hasOwnProperty.call(glossary, value);
}
