"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Button, ButtonBase, Chip, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { plainText } from "@/components/RichText";
import { ProjectCard } from "@/components/ExperienceCard";
import { PageShell, TileGrid, TileSection } from "@/components/SiteTiles";
import { type PortfolioProject, projectIndustries, projects, projectSkills } from "@/data/portfolio";

const INK = "#132433";

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/** Within a group any match counts; across groups every group must match. */
function matches(project: PortfolioProject, industries: string[], skills: string[]) {
  const industryOk = !industries.length || project.industries.some((item) => industries.includes(item));
  const skillOk = !skills.length || project.tags.some((item) => skills.includes(item));
  return industryOk && skillOk;
}

function FilterRow({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <Stack direction="row" alignItems="center" gap={0.8} flexWrap="wrap" role="group" aria-label={`Filter by ${label}`}>
      <Typography variant="caption" sx={{ width: 64, fontWeight: 700, color: "text.secondary" }}>
        {label}
      </Typography>
      {options.map((option) => {
        const isActive = selected.includes(option);
        return (
          <Chip
            key={option}
            label={option}
            size="small"
            clickable
            onClick={() => onToggle(option)}
            variant={isActive ? "filled" : "outlined"}
            aria-pressed={isActive}
            sx={{
              bgcolor: isActive ? INK : alpha("#ffffff", 0.7),
              color: isActive ? "#fffaf2" : "text.primary",
              borderColor: alpha(INK, 0.2),
              "&:hover": { bgcolor: isActive ? INK : alpha(INK, 0.08) },
            }}
          />
        );
      })}
    </Stack>
  );
}

function ArchiveRow({ project }: { project: PortfolioProject }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{ borderBottom: `1px solid ${alpha(INK, 0.08)}`, "&:last-of-type": { borderBottom: "none" } }}
    >
      <ButtonBase
        component={NextLink}
        href={`/projects/${project.id}/`}
        sx={{ flex: 1, minWidth: 0, display: "block", textAlign: "left", px: 1.2, py: 1, borderRadius: "10px" }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.2, sm: 1.2 }} alignItems={{ sm: "baseline" }}>
          <Typography variant="subtitle2" component="h3" sx={{ fontWeight: 700, flexShrink: 0 }}>
            {project.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {plainText(project.headline)}
          </Typography>
        </Stack>
      </ButtonBase>
      {project.liveUrl ? (
        <Button
          size="small"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />}
          sx={{ color: "primary.dark", fontWeight: 700, flexShrink: 0 }}
        >
          Live demo
        </Button>
      ) : null}
    </Stack>
  );
}

export function ProjectsListView() {
  const [industries, setIndustries] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const filtered = useMemo(
    () => projects.filter((project) => matches(project, industries, skills)),
    [industries, skills],
  );
  const featured = filtered.filter((project) => project.featured);
  const archived = filtered.filter((project) => !project.featured);
  const hasFilters = industries.length > 0 || skills.length > 0;

  return (
    <PageShell>
      <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, fontWeight: 700 }}>
        Projects
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: alpha(INK, 0.72), maxWidth: 680, lineHeight: 1.7 }}>
        Things I built on my own time, with the code public. Each one has a page on why I built it, what it
        does, what it taught me, and how it ships.
      </Typography>

      <Stack spacing={0.9} sx={{ mt: 2.4 }}>
        <FilterRow
          label="Industry"
          options={projectIndustries}
          selected={industries}
          onToggle={(value) => setIndustries((previous) => toggle(previous, value))}
        />
        <FilterRow
          label="Skill"
          options={projectSkills}
          selected={skills}
          onToggle={(value) => setSkills((previous) => toggle(previous, value))}
        />
        {hasFilters ? (
          <Button
            size="small"
            onClick={() => {
              setIndustries([]);
              setSkills([]);
            }}
            sx={{ alignSelf: "flex-start" }}
          >
            Clear filters
          </Button>
        ) : null}
      </Stack>

      <TileSection title="Featured">
        {featured.length ? (
          <TileGrid>
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </TileGrid>
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            No featured project matches these filters.
          </Typography>
        )}
      </TileSection>

      {archived.length ? (
        <Box component="section">
          <Typography variant="h2" sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" }, fontWeight: 600, mb: 1.4 }}>
            Archive
          </Typography>
          <Paper sx={{ borderRadius: "12px", bgcolor: alpha("#ffffff", 0.7), borderColor: alpha(INK, 0.1), p: 0.6 }}>
            {archived.map((project) => (
              <ArchiveRow key={project.id} project={project} />
            ))}
          </Paper>
        </Box>
      ) : null}
    </PageShell>
  );
}
