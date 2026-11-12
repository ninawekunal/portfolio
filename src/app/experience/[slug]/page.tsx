import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CompanyView } from "@/components/CompanyView";
import { experienceTimeline } from "@/data/portfolio";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return experienceTimeline.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = experienceTimeline.find((item) => item.slug === slug);
  return entry
    ? { title: `${entry.role} @ ${entry.company} | Kunal Ninawe`, description: entry.summary }
    : {};
}

export default async function CompanyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = experienceTimeline.find((item) => item.slug === slug);
  if (!entry) notFound();
  return <CompanyView entry={entry} />;
}
