"use client";

import { FlipCard } from "@/components/FlipCard";
import { resolveBrandIcon } from "@/components/TechnologyPin";
import { certificationsSourceUrl, type CareerEntry, type CertificationEntry, type EducationEntry } from "@/data/portfolio";

const MAX_TECH_ICONS = 5;

function monogramOf(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/** A company card: logo, name, title and dates up front; highlights on the back. */
export function ExperienceCard({ entry }: { entry: CareerEntry }) {
  const icons = entry.stack
    .map((label) => ({ label, src: resolveBrandIcon(label) }))
    .filter((icon): icon is { label: string; src: string } => Boolean(icon.src))
    // React and React Router share one logo; show each logo once.
    .filter((icon, index, all) => all.findIndex((other) => other.src === icon.src) === index)
    .slice(0, MAX_TECH_ICONS);

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
      backLines={[entry.details]}
      height={{ xs: 190, md: 190 }}
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
