"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { type PortfolioProject, projectFilters, projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { withBasePath } from "@/lib/assetPath";

type RepoSnapshot = {
  forks: number;
  homepage?: string;
  issues: number;
  language?: string | null;
  stars: number;
  topics: string[];
  updatedAt: string;
};

function formatGitHubDate(value?: string) {
  if (!value) {
    return "Curated portfolio snapshot";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 5,
        bgcolor: alpha("#ffffff", 0.72),
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h6" sx={{ mt: 0.4 }}>
        {value}
      </Typography>
    </Paper>
  );
}

function ProjectSelector({
  project,
  selected,
  onClick,
}: {
  project: PortfolioProject;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: "100%",
        borderRadius: 6,
        textAlign: "left",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          p: 2.3,
          borderRadius: 6,
          bgcolor: selected ? alpha("#132433", 0.95) : alpha("#fffdf8", 0.75),
          color: selected ? "#f8fbff" : "text.primary",
          borderColor: selected ? alpha("#132433", 0.9) : "divider",
          transition: "transform 180ms ease, background-color 180ms ease, color 180ms ease",
          transform: selected ? "translateY(-2px)" : "none",
        }}
      >
        <Stack spacing={1.2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography variant="subtitle1">{project.title}</Typography>
            <Chip
              label={project.kicker}
              size="small"
              sx={{
                bgcolor: selected ? alpha("#ffffff", 0.12) : alpha("#c75b1e", 0.12),
                color: "inherit",
              }}
            />
          </Stack>
          <Typography
            variant="body2"
            sx={{
              color: selected ? alpha("#f8fbff", 0.74) : "text.secondary",
              lineHeight: 1.65,
            }}
          >
            {project.headline}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.8}>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                size="small"
                label={tag}
                variant="outlined"
                sx={{
                  borderColor: selected ? alpha("#ffffff", 0.2) : alpha("#132433", 0.12),
                  color: "inherit",
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </ButtonBase>
  );
}

export function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
  const [repoSnapshots, setRepoSnapshots] = useState<Record<string, RepoSnapshot>>({});
  const [snapshotStatus, setSnapshotStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ?? filteredProjects[0];

  useEffect(() => {
    let active = true;

    async function loadSnapshots() {
      try {
        const entries = await Promise.all(
          projects.map(async (project) => {
            const response = await fetch(`https://api.github.com/repos/${project.githubSlug}`, {
              headers: {
                Accept: "application/vnd.github+json",
              },
            });

            if (!response.ok) {
              throw new Error(`GitHub API request failed for ${project.githubSlug}`);
            }

            const data = (await response.json()) as {
              forks_count: number;
              homepage: string | null;
              language: string | null;
              open_issues_count: number;
              stargazers_count: number;
              topics?: string[];
              updated_at: string;
            };

            return [
              project.id,
              {
                forks: data.forks_count,
                homepage: data.homepage ?? undefined,
                issues: data.open_issues_count,
                language: data.language,
                stars: data.stargazers_count,
                topics: data.topics ?? [],
                updatedAt: data.updated_at,
              },
            ] as const;
          }),
        );

        if (!active) {
          return;
        }

        setRepoSnapshots(Object.fromEntries(entries));
        setSnapshotStatus("ready");
      } catch {
        if (active) {
          setSnapshotStatus("error");
        }
      }
    }

    void loadSnapshots();

    return () => {
      active = false;
    };
  }, []);

  const selectedSnapshot = selectedProject ? repoSnapshots[selectedProject.id] : undefined;
  const liveUrl = selectedSnapshot?.homepage || selectedProject?.liveUrl;

  return (
    <Box
      component="section"
      id="projects"
      sx={{ py: { xs: 5, md: 6 }, scrollMarginTop: 100 }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <SectionHeading
            eyebrow="Project Showcase"
            title="Interactive proof of skill."
            body="The content is curated for fast review, and the panel below still pulls current GitHub metadata so the portfolio stays connected to the work itself."
          />

          <Stack direction="row" gap={1} flexWrap="wrap">
            {projectFilters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                clickable
                color={activeFilter === filter ? "primary" : undefined}
                onClick={() => {
                  setActiveFilter(filter);

                  const nextProjects =
                    filter === "All"
                      ? projects
                      : projects.filter((project) => project.tags.includes(filter));

                  if (nextProjects.length > 0) {
                    setSelectedProjectId(nextProjects[0].id);
                  }
                }}
                variant={activeFilter === filter ? "filled" : "outlined"}
                sx={{
                  bgcolor:
                    activeFilter === filter ? undefined : alpha("#ffffff", 0.6),
                }}
              />
            ))}
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: 2.2,
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(280px, 0.55fr) minmax(0, 1fr)",
              },
              alignItems: "start",
            }}
          >
            <Stack spacing={1.5}>
              {filteredProjects.map((project) => (
                <ProjectSelector
                  key={project.id}
                  project={project}
                  selected={project.id === selectedProject?.id}
                  onClick={() => setSelectedProjectId(project.id)}
                />
              ))}
            </Stack>

            {selectedProject ? (
              <Paper
                sx={{
                  p: { xs: 2.1, md: 2.6 },
                  borderRadius: "28px",
                  bgcolor: alpha("#fffdf8", 0.8),
                }}
              >
                <Stack spacing={2.3}>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 2.5,
                      gridTemplateColumns: {
                        xs: "1fr",
                        xl: "minmax(320px, 420px) minmax(0, 1fr)",
                      },
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        overflow: "hidden",
                        borderRadius: "24px",
                        bgcolor: alpha("#132433", 0.04),
                      }}
                    >
                      {liveUrl ? (
                        <Box
                          sx={{
                            width: "100%",
                            aspectRatio: "4 / 3",
                            bgcolor: "#ffffff",
                          }}
                        >
                          <Box
                            component="iframe"
                            src={liveUrl}
                            title={`${selectedProject.title} live demo`}
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            sx={{
                              width: "100%",
                              height: "100%",
                              border: 0,
                              display: "block",
                            }}
                          />
                        </Box>
                      ) : (
                        <Image
                          src={withBasePath(selectedProject.posterSrc)}
                          alt={selectedProject.posterAlt}
                          width={960}
                          height={720}
                          priority={selectedProject.id === projects[0].id}
                          style={{ display: "block", width: "100%", height: "auto" }}
                        />
                      )}
                    </Paper>

                    <Stack spacing={2.2}>
                      <Box>
                        <Typography variant="overline" color="primary.dark" sx={{ letterSpacing: "0.14em" }}>
                          {selectedProject.kicker}
                        </Typography>
                        <Typography variant="h4" sx={{ mt: 0.55 }}>
                          {selectedProject.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ mt: 0.9, color: "text.secondary", lineHeight: 1.72 }}
                        >
                          {selectedProject.summary}
                        </Typography>
                      </Box>

                      <Box
                      sx={{
                          borderRadius: "22px",
                          px: 2.1,
                          py: 1.55,
                          bgcolor: alpha("#132433", 0.03),
                        }}
                      >
                        <Typography variant="subtitle2" color="text.primary">
                          Scope owned
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6, lineHeight: 1.7 }}>
                          {selectedProject.role}
                        </Typography>
                      </Box>

                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {selectedProject.stack.map((item) => (
                          <Chip key={item} label={item} variant="outlined" />
                        ))}
                      </Stack>

                      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.3}>
                        <Button
                          href={selectedProject.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          variant="contained"
                          startIcon={<GitHubIcon />}
                        >
                          View repository
                        </Button>
                        {liveUrl ? (
                          <Button
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            variant="outlined"
                            color="inherit"
                            startIcon={<OpenInNewRoundedIcon />}
                          >
                            Open live demo
                          </Button>
                        ) : null}
                      </Stack>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gap: 1.4,
                      gridTemplateColumns: {
                        xs: "repeat(2, minmax(0, 1fr))",
                        md: "repeat(4, minmax(0, 1fr))",
                      },
                    }}
                  >
                    <StatCard
                      label="GitHub updated"
                      value={formatGitHubDate(selectedSnapshot?.updatedAt)}
                    />
                    <StatCard
                      label="Primary language"
                      value={selectedSnapshot?.language ?? "TypeScript-heavy"}
                    />
                    <StatCard
                      label="Stars / forks"
                      value={`${selectedSnapshot?.stars ?? 0} / ${selectedSnapshot?.forks ?? 0}`}
                    />
                    <StatCard
                      label="Open issues"
                      value={String(selectedSnapshot?.issues ?? 0)}
                    />
                  </Box>

                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {selectedProject.tags.map((tag) => (
                      <Chip
                        key={tag}
                        icon={<BoltRoundedIcon />}
                        label={tag}
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                    {(selectedSnapshot?.topics ?? []).slice(0, 4).map((topic) => (
                      <Chip
                        key={topic}
                        icon={<CodeRoundedIcon />}
                        label={topic}
                        variant="outlined"
                        sx={{ bgcolor: alpha("#ffffff", 0.58) }}
                      />
                    ))}
                  </Stack>

                  <Divider />

                  <Box
                    sx={{
                      display: "grid",
                      gap: 2,
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                      },
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: "22px", bgcolor: alpha("#ffffff", 0.68) }}
                    >
                      <Stack spacing={1.2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <TaskAltRoundedIcon color="primary" fontSize="small" />
                          <Typography variant="subtitle1">Highlights</Typography>
                        </Stack>
                        {selectedProject.highlights.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {item}
                          </Typography>
                        ))}
                      </Stack>
                    </Paper>

                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: "22px", bgcolor: alpha("#ffffff", 0.68) }}
                    >
                      <Stack spacing={1.2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <LanRoundedIcon color="secondary" fontSize="small" />
                          <Typography variant="subtitle1">Architecture</Typography>
                        </Stack>
                        {selectedProject.architecture.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {item}
                          </Typography>
                        ))}
                      </Stack>
                    </Paper>

                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: "22px", bgcolor: alpha("#ffffff", 0.68) }}
                    >
                      <Stack spacing={1.2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <InsightsRoundedIcon color="info" fontSize="small" />
                          <Typography variant="subtitle1">Why it matters</Typography>
                        </Stack>
                        {selectedProject.valueSignals.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {item}
                          </Typography>
                        ))}
                      </Stack>
                    </Paper>

                    <Paper
                      variant="outlined"
                      sx={{ p: 2, borderRadius: "22px", bgcolor: alpha("#ffffff", 0.68) }}
                    >
                      <Stack spacing={1.2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarMonthRoundedIcon color="action" fontSize="small" />
                          <Typography variant="subtitle1">Repository evidence</Typography>
                        </Stack>
                        {selectedProject.evidence.map((item) => (
                          <Typography key={item} variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {item}
                          </Typography>
                        ))}
                      </Stack>
                    </Paper>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {snapshotStatus === "ready"
                      ? "GitHub metadata is loaded live from the public repository API."
                      : snapshotStatus === "error"
                        ? "GitHub metadata could not be refreshed, so the portfolio is using curated project context only."
                        : "Refreshing GitHub metadata for the selected projects."}
                  </Typography>
                </Stack>
              </Paper>
            ) : null}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
