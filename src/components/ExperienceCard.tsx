"use client";

import { FlipCard } from "@/components/FlipCard";
import { resolveBrandIcon } from "@/components/TechnologyPin";
import { certificationsSourceUrl, type CareerEntry, type CertificationEntry, type EducationEntry } from "@/data/portfolio";
import type { Publication } from "@/data/writing";

const MAX_TECH_ICONS = 5;

function monogramOf(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
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
      href={`/experience/${entry.slug}/`}
      color={entry.brandColor}
      accent={entry.accentColor}
      logoSrc={entry.logoSrc}
      logoNote={entry.logoNote}
      title={entry.company}
      subtitle={entry.role}
      meta={entry.period}
      icons={icons}
      backLabel={`${entry.company} · highlights`}
      backLines={entry.cardHighlights}
      cta="Read the full story"
      height={{ xs: 240, md: 236 }}
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
      href={post.url}
      external
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
      cta="Read the full story"
      height={{ xs: 330, md: 320 }}
    />
  );
}

/** A certificate card: name and issuer up front; the credential on the back. */
export function CertificationCard({ entry }: { entry: CertificationEntry }) {
  return (
    <FlipCard
      href={entry.credentialUrl ?? certificationsSourceUrl}
      external
      color="#285873"
      logoSrc={entry.logoSrc}
      badge={monogramOf(entry.issuer)}
      title={entry.title}
      subtitle={entry.issuer}
      meta={entry.issueDate ?? ""}
      backLabel="Credential"
      backLines={[`Issued by ${entry.issuer}${entry.issueDate ? ` in ${entry.issueDate}` : ""}`, ...(entry.credentialId ? [`ID ${entry.credentialId}`] : [])]}
      cta="View on LinkedIn"
      height={{ xs: 200, md: 200 }}
    />
  );
}
