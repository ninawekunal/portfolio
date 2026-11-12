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
    "I write when a decision cost us something to learn, and when I wish someone had explained a thing to me sooner.",
};

export const publications: Publication[] = [
  {
    id: "bff-before-graphql",
    title: "We Added a BFF Layer Before Reaching for GraphQL. Here Is What Happened.",
    outlet: "Medium",
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
