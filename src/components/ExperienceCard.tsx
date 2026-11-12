"use client";

import { FlipCard } from "@/components/FlipCard";
import { resolveBrandIcon } from "@/components/TechnologyPin";
import {
  certificationsSourceUrl,
  type CareerEntry,
  type CertificationEntry,
  type EducationEntry,
  type PortfolioProject,
} from "@/data/portfolio";
import { plainText } from "@/lib/plainText";
import type { Publication } from "@/data/writing";

const MAX_TECH_ICONS = 5;

function monogramOf(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/** "April 2026 - October 2026" -> "Apr 2026 - Oct 2026". */
function shortPeriod(period: string) {
  return period
    .split(/\s+-\s+/)
    .map((part) => part.replace(/^([A-Za-z]{3})[A-Za-z]*\s+/, "$1 "))
    .join(" - ");
}

const AWS_ICON = "/brand-icons/aws.svg";

/**
 * One icon per logo. React and React Router share a logo, and every AWS service
 * icon looks alike at this size, so AWS services fold into one AWS icon whose
 * tooltip names them.
 */
function techIcons(stack: string[]) {
  const icons: { label: string; src: string }[] = [];
  for (const label of stack) {
    const resolved = resolveBrandIcon(label);
    if (!resolved) continue;
    const src = resolved.includes("aws") ? AWS_ICON : resolved;
    const existing = icons.find((icon) => icon.src === src);
    if (existing) {
      if (src === AWS_ICON) existing.label = `${existing.label}, ${label.replace(/^AWS\s+/, "")}`;
      continue;
    }
    icons.push({ label: src === AWS_ICON ? `AWS: ${label.replace(/^AWS\s+/, "")}` : label, src });
  }
  return icons.slice(0, MAX_TECH_ICONS);
}

/** A company card: logo, name, title and dates up front; highlights on the back. */
export function ExperienceCard({ entry }: { entry: CareerEntry }) {
  const icons = techIcons(entry.stack);

  return (
    <FlipCard
      color={entry.brandColor}
      accent={entry.accentColor}
      logoSrc={entry.logoSrc}
      logoNote={entry.logoNote}
      title={entry.company}
      subtitle={entry.role}
      cornerMeta={shortPeriod(entry.period)}
      icons={icons}
      backLabel={`${entry.company} · highlights`}
      backLines={entry.cardHighlights}
      actions={[{ label: "Read the full story", href: `/experience/${entry.slug}/` }]}
      height={{ xs: 236, md: 226 }}
    />
  );
}

/** A school card: degree and date up front; coursework on the back. */
export function EducationCard({ entry }: { entry: EducationEntry }) {
  return (
    <FlipCard
      color={entry.schoolColor ?? "#132433"}
      logoSrc={entry.logoSrc}
      title={entry.school}
      subtitle={entry.degree}
      meta={`${entry.date} · ${entry.location}`}
      backLabel="What I studied"
      backLines={entry.coursework}
      height={{ xs: 214, md: 214 }}
    />
  );
}

/** A post card: title and date up front; the three takeaways on the back. */
export function BlogCard({ post }: { post: Publication }) {
  return (
    <FlipCard
      color="#0a4741"
      accent="#7fd1c7"
      badge={post.outlet.charAt(0)}
      title={post.title}
      subtitle={post.outlet}
      meta={`${post.date} · ${post.readingTime}`}
      titleLines={3}
      preview={post.summary}
      backLabel="If you only read three lines"
      backLines={post.takeaways}
      actions={[{ label: "Read the full story", href: post.url, external: true }]}
      height={{ xs: 330, md: 320 }}
    />
  );
}

/** A project card: screenshot and name up front; the one-line pitch, demo and code links on the back. */
export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <FlipCard
      color="#132433"
      accent="#f0b07b"
      media={{ src: project.imageSrc, alt: `${project.title} screenshot` }}
      title={project.title}
      subtitle={project.kicker}
      backLabel="TL;DR"
      backLines={[plainText(project.headline)]}
      actions={[
        ...(project.liveUrl ? [{ label: "Live demo", href: project.liveUrl, external: true }] : []),
        { label: "Full story", href: `/projects/${project.id}/` },
        { label: `${project.title} on GitHub`, href: project.repoUrl, external: true, icon: "github" as const },
      ]}
      height={{ xs: 290, md: 290 }}
    />
  );
}

/** A certificate card: name and issuer up front; the credential on the back. */
export function CertificationCard({ entry }: { entry: CertificationEntry }) {
  return (
    <FlipCard
      color="#285873"
      logoSrc={entry.logoSrc}
      badge={monogramOf(entry.issuer)}
      title={entry.title}
      subtitle={entry.issuer}
      meta={entry.issueDate ?? ""}
      backLabel="Credential"
      backLines={[`Issued by ${entry.issuer}${entry.issueDate ? ` in ${entry.issueDate}` : ""}`, ...(entry.credentialId ? [`ID ${entry.credentialId}`] : [])]}
      actions={[{ label: "View on LinkedIn", href: entry.credentialUrl ?? certificationsSourceUrl, external: true }]}
      height={{ xs: 200, md: 200 }}
    />
  );
}
