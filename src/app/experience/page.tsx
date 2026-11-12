import type { Metadata } from "next";

import { ExperienceListView } from "@/components/ExperienceListView";

export const metadata: Metadata = { title: "Experience | Kunal Ninawe" };

export default function ExperiencePage() {
  return <ExperienceListView />;
}
