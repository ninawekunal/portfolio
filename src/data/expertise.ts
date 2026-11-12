/**
 * About-page areas, each pointing at stories that already exist in `wins.ts`
 * (source "win") or `roleStories.ts` (source "role"), so a story is written once.
 */
export type StoryRef = { source: "win" | "role"; id: string };

export type ExpertiseArea = {
  id: string;
  label: string;
  /** One plain sentence on what the area covers. */
  summary: string;
  stories: StoryRef[];
};

export const expertiseAreas: ExpertiseArea[] = [
  {
    id: "security",
    label: "Security",
    summary: "Keeping one user's data away from another, and proving where a security bug really lives.",
    stories: [
      { source: "win", id: "cache-leak" },
      { source: "win", id: "ssr-bff" },
      { source: "win", id: "random-signouts" },
    ],
  },
  {
    id: "iam",
    label: "Identity and access management",
    summary: "Sign-in, account changes and permissions for about 100K partners across four portals.",
    stories: [
      { source: "win", id: "expedia-lockouts" },
      { source: "role", id: "update-email" },
      { source: "role", id: "grpc-permissions" },
    ],
  },
  {
    id: "full-stack",
    label: "Full stack",
    summary: "Whole features from the customer call to the screen, the API behind it and the deploy.",
    stories: [
      { source: "win", id: "three-way-match" },
      { source: "win", id: "collections-from-zero" },
      { source: "win", id: "bill-review-rewrites" },
      { source: "role", id: "document-review" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    summary: "APIs, background jobs and contracts that the screens can trust.",
    stories: [
      { source: "win", id: "match-api" },
      { source: "win", id: "spec-sync" },
      { source: "role", id: "email-agent" },
      { source: "role", id: "payments" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud and infrastructure",
    summary: "Migrations, on-call and the setup work that keeps many services running the same way.",
    stories: [
      { source: "role", id: "vault" },
      { source: "role", id: "on-call" },
      { source: "role", id: "onboarding" },
    ],
  },
];

export type Hobby = { emoji: string; label: string };

export const hobbies: Hobby[] = [
  { emoji: "🎾", label: "Tennis" },
  { emoji: "🎸", label: "Guitar" },
  { emoji: "💃", label: "Dancing" },
];
