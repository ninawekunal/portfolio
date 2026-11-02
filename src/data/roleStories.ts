import type { WinMetric } from "@/data/wins";

/**
 * Longer stories behind a role, told CARL like the wins.
 * This is the public cut of the private Behavioral Bible: no colleague names,
 * no vendor model names, no internal incident counts, and ownership exactly as confirmed.
 * Stories for OpenCFO that already live in the Wins section are not repeated here.
 */
export type RoleStory = {
  id: string;
  title: string;
  /** How much of it was mine, in plain words. */
  ownership: string;
  context: string;
  action: string[];
  result: string;
  learning?: string;
  metrics?: WinMetric[];
};

export const roleStories: Record<string, RoleStory[]> = {
  OpenCFO: [
    {
      id: "email-agent",
      title: "An email agent for the accounts payable inbox",
      ownership: "Built it myself",
      context:
        "An accounts payable inbox mixes vendor questions, invoices and noise. A clerk was reading every message to decide which pile it belonged in.",
      action: [
        "Built an agent that classifies each message, reads the attachments and finds the vendor.",
        "Routed invoices straight into bill capture, and drafted replies that a person approves before anything is sent.",
        "Ran it on durable SQS jobs with execution leases and recoverable action plans, so a crash mid-step picks up where it stopped.",
        "Added attachment scanning, evals and model-cost tracking, so a change to the prompt shows up as a number.",
      ],
      result:
        "It grew out of an inbox assistant demo I built for a prospect in four days, and became a real part of the product.",
      metrics: [
        { value: "4 days", label: "from idea to the first demo" },
        { value: "1 approval", label: "before any reply leaves the inbox" },
      ],
    },
    {
      id: "document-review",
      title: "A review screen for AI-extracted documents",
      ownership: "Built it myself",
      context:
        "Clients sent invoices, purchase orders and goods receipts in many formats, by upload and by email. The AI pulled out the fields, but an analyst still had to trust each value.",
      action: [
        "Highlighted each extracted field on the source PDF, so the analyst checks the number where it came from.",
        "Moved slow uploads to background processing with live progress, so a long extraction reads as still working, not failed.",
        "Built an exception-first view: the screen opens on what needs a person, not on everything.",
      ],
      result:
        "Ten extracted fields now point at their place on the page, and the first screen an analyst sees is the work only they can do.",
      metrics: [{ value: "10", label: "fields highlighted on the source PDF" }],
    },
    {
      id: "onboarding",
      title: "Made every new client set up the same way",
      ownership: "Built it myself",
      context:
        "Every new client needed subsidiaries, permissions, an email inbox and an ERP connection set up by hand, and each setup was a little different.",
      action: [
        "Built bootstrap APIs and scripts that create the same starting state for every client.",
        "Wrote configuration examples and runbooks, so setup did not depend on one person's memory.",
        "Added shared integration tests, versioned database migrations and deployment tooling around it.",
      ],
      result: "Client setup became repeatable instead of a one-off each time.",
    },
    {
      id: "payments",
      title: "Payment screens through a provider switch",
      ownership: "Built the screens and the BFF; took part in the webhooks",
      context:
        "The team moved payments to a new provider, with scheduling, an approval step before money moves, and settlement updates that arrive later.",
      action: [
        "Built the payment screens and the BFF endpoints behind them.",
        "Showed live payment status over Server-Sent Events, so nobody refreshes to see if money moved.",
        "Took part in writing the webhooks that report settlement.",
      ],
      result: "Six separate payment tables collapsed into one.",
      metrics: [{ value: "6 → 1", label: "payment tables" }],
    },
  ],
  "Expedia Group": [
    {
      id: "update-email",
      title: "Update Email, and the sync fix it needed",
      ownership: "Led it over two quarters",
      context:
        "Partners shared one identity across four legacy partner portals. Letting them change their email meant every portal had to agree on the new one, or the partner got locked out.",
      action: [
        "Wrote the design docs: cross-portal identity sync, an interim lockout fix, and a Change Data Capture pipeline as the long-term fix.",
        "Built the feature in TypeScript, React and MobX, behind feature flags, localized and accessible, with OIDC and SAML sign-in.",
        "When lockouts showed up after release, rolled back, shipped an interim patch that updates the linked legacy accounts, and took the data to the downstream team.",
        "Deployed the CDC pipeline with them, and added request tracing, SRE alerts and adoption tracking.",
      ],
      result:
        "85% adoption across about 100K partners on four portals. Identity sync plus CDC resolved about 45% of email lockout support tickets.",
      learning:
        "I had estimated the lockout risk before release, but I raised it as a request. Now, when I can measure the blast radius, I make the fix a release gate instead.",
      metrics: [
        { value: "85%", label: "adoption across 4 portals" },
        { value: "~45%", label: "of lockout tickets resolved" },
        { value: "~100K", label: "partners" },
      ],
    },
    {
      id: "grpc-permissions",
      title: "gRPC APIs on a relationship-based permission model",
      ownership: "Built the APIs",
      context:
        "Who can do what was modeled as relationships between partner, user and property, in the style of Google Zanzibar. Downstream teams needed APIs they could trust on top of it.",
      action: [
        "Built gRPC APIs on that model in Java and Kotlin, next to GraphQL and REST services.",
        "Ran contract, integration and end-to-end tests with JUnit 5 against the teams that consumed them.",
      ],
      result:
        "Downstream teams built on a tested contract instead of reading our code to guess the behaviour.",
    },
    {
      id: "vault",
      title: "Moved about 200 apps off a legacy secrets setup",
      ownership: "Did it with three other engineers",
      context:
        "The org had to move off a legacy Vault setup across about 200 Java, Spring, Kotlin and Lambda apps, owned by about 15 teams.",
      action: [
        "Wrote the patches for the teams instead of asking 15 teams to plan the work.",
        "Automated the migration with scripts and bundled the vulnerability patches in.",
        "Ran an end-to-end test deploy before each change landed.",
      ],
      result: "The org migrated without each team having to stop and learn the new setup.",
      metrics: [
        { value: "~200", label: "apps migrated" },
        { value: "~15", label: "teams" },
      ],
    },
    {
      id: "on-call",
      title: "On-call that made the next week quieter",
      ownership: "Carried it",
      context:
        "I carried L3 on-call across time zones for about six P1 services and was the go-to person for four more.",
      action: [
        "Added request tracing across services, so an incident starts from evidence, not guesses.",
        "Set up SRE alert signals and wrote root-cause documents after incidents.",
        "Shipped through feature flags and progressive rollout, so a bad change reaches a few partners, not all of them.",
      ],
      result:
        "Repeat support requests dropped about 20%, and deployment incidents dropped about 25%.",
      metrics: [
        { value: "~20%", label: "fewer support requests" },
        { value: "~25%", label: "fewer deploy incidents" },
      ],
    },
  ],
};
