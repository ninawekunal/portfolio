"use client";

import { PageShell } from "@/components/SiteTiles";
import { WritingSection } from "@/components/WritingSection";

export function BlogView() {
  return <PageShell after={<WritingSection />} />;
}
