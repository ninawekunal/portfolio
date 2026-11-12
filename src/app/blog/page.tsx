import type { Metadata } from "next";

import { BlogView } from "@/components/BlogView";

export const metadata: Metadata = { title: "Blog | Kunal Ninawe" };

export default function BlogPage() {
  return <BlogView />;
}
