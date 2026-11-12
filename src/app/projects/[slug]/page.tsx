import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectArticle } from "@/components/ProjectArticle";
import { plainText } from "@/lib/plainText";
import { projects } from "@/data/portfolio";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  return project ? { title: `${project.title} | Kunal Ninawe`, description: plainText(project.headline) } : {};
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();
  return <ProjectArticle project={project} />;
}
