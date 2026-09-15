export type Publication = {
  id: string;
  title: string;
  outlet: string;
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
    "I write when a decision cost us something to learn. The posts below went out on the OpenCFO engineering blog.",
};

export const publications: Publication[] = [
  {
    id: "bff-before-graphql",
    title: "We Added a BFF Layer Before Reaching for GraphQL. Here Is What Happened.",
    outlet: "OpenCFO Engineering Blog",
    date: "Sep 11, 2026",
    readingTime: "4 min read",
    url: "https://opencfo.ai/blog/bff-before-graphql",
    summary:
      "One table page was making 1 + 1 + N network calls and pulling every bill into the browser. Instead of adopting GraphQL, we put a thin per-screen Backend-for-Frontend in front of the API. It cut each screen to one call, and it caught a cross-user cache leak before it reached production.",
    takeaways: [
      "Ask what the screen needs before asking what the graph looks like.",
      "One resource route per screen, a 30-second cache keyed by user, and a pure compute step for filter, sort, and paginate.",
      "The bug you will hit in week one: browser caching across users. Set no-store and test for it in CI.",
    ],
    tags: ["BFF", "React Router v7", "SSR", "Caching", "API design"],
  },
];
