import type { Metadata } from "next";

import { ProjectsListView } from "@/components/ProjectsListView";

export const metadata: Metadata = { title: "Projects | Kunal Ninawe" };

export default function ProjectsPage() {
  return <ProjectsListView />;
}
