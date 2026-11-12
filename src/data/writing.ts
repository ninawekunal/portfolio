export type Publication = {
  id: string;
  title: string;
  outlet: string;
  /** Shown as the pill on the post's card. */
  category: string;
  date: string;
  readingTime: string;
  url: string;
  summary: string;
  takeaways: string[];
  tags: string[];
};

export const writingHeading = {
  eyebrow: "Writing",
  title: "Engineering notes, written for the next person on the team.",
  body:
    "I write when a decision cost us something to learn, and when I wish someone had explained a thing to me sooner.",
};

export const publications: Publication[] = [
  {
    id: "cache-broken-access-control",
    title: "Broken Access Control: How a 60-Second Cache Leaked One User's Data to Another",
    outlet: "Medium",
    category: "Security",
    date: "Nov 12, 2026",
    readingTime: "7 min read",
    url: "https://medium.com/@ninawekunal/broken-access-control-how-a-60-second-cache-leaked-one-users-data-to-another-1aa5bf3932b2",
    summary:
      "A Broken Access Control bug I found in production: user data was cached by URL alone for 60 seconds, so the next person to log in on the same browser saw the last person's data. Why it hid so well, and the four questions I now ask before caching anything.",
    takeaways: [
      "A cache key is a security decision: if the answer depends on the user, the user belongs in the key.",
      "Wipe the cache on logout, and send private, no-store with Vary: Cookie on per-user data.",
      "Test it the way it breaks: switch accounts in the same browser inside the cache window.",
    ],
    tags: ["Web security", "OWASP", "Caching", "React", "TanStack Query"],
  },
  {
    id: "revocable-fast-logins",
    title: "Fast Logins You Can Still Revoke: Sessions, JWTs, and Refresh Tokens Explained",
    outlet: "Medium",
    category: "Security",
    date: "Nov 12, 2026",
    readingTime: "8 min read",
    url: "https://medium.com/@ninawekunal/fast-logins-you-can-still-revoke-sessions-jwts-and-refresh-tokens-explained-ed7c9a58a81d",
    summary:
      "A two-step login that skips the database on almost every request and still lets you log a user out of every device: check the password once and keep a session row, then let a short-lived signed token prove who you are.",
    takeaways: [
      "The database decides who you are at login and refresh; every other request is a signature check.",
      "Keep access tokens to 15 minutes, and rotate an HttpOnly refresh token on every use.",
      "Bump one token_version number to log out every device, with an optional Redis denylist for right now.",
    ],
    tags: ["Authentication", "JWT", "Refresh tokens", "Redis", "Web security"],
  },
  {
    id: "bff-before-graphql",
    title: "We Added a BFF Layer Before Reaching for GraphQL. Here Is What Happened.",
    outlet: "Medium",
    category: "Engineering",
    date: "Sep 15, 2026",
    readingTime: "4 min read",
    url: "https://medium.com/@ninawekunal/we-added-a-bff-layer-before-reaching-for-graphql-here-is-what-happened-93da4bb676dd",
    summary:
      "One table page was making 1 + 1 + N network calls and pulling every bill into the browser. Instead of adopting GraphQL, we put a thin per-screen Backend-for-Frontend in front of the API. It cut each screen to one call, and it caught a cross-user cache leak before it reached production.",
    takeaways: [
      "Ask what the screen needs before asking what the graph looks like.",
      "One resource route per screen, a 30-second cache keyed by user, and a pure compute step for filter, sort, and paginate.",
      "The bug you will hit in week one: browser caching across users. Set no-store and test for it in CI.",
    ],
    tags: ["BFF", "React Router v7", "SSR", "Caching", "API design"],
  },
  {
    id: "react-concepts-part-1",
    title: "Modern React Front-end Concepts for Beginners, Part 1",
    outlet: "Medium",
    category: "Front end",
    date: "Mar 15, 2026",
    readingTime: "6 min read",
    url: "https://medium.com/@ninawekunal/modern-react-front-end-concepts-for-beginners-part-1-c70a65b615da",
    summary:
      "The foundations of a production-ready React front end, for junior and back-end engineers: stack choices, feature folders, components, hooks, context, lazy loading and strong types with Zod.",
    takeaways: [
      "Start with a clean feature-first structure, not with tools.",
      "Keep server state and UI state apart: context is for app-wide settings, not fetched lists.",
      "Lazy load route pages and heavy panels, but do not split tiny components.",
    ],
    tags: ["React", "TypeScript", "TanStack Query", "Zod", "Lazy loading"],
  },
];
