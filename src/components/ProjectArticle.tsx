"use client";

import type { ReactNode } from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { Box, Button, CardMedia, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { RichText } from "@/components/RichText";
import { PageShell, PrevNext } from "@/components/SiteTiles";
import { TechnologyPin } from "@/components/TechnologyPin";
import { type PortfolioProject, projects } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

const INK = "#132433";
const ACCENT = "#c75b1e";

function Section({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Box component="section" sx={{ mt: { xs: 3, md: 3.6 } }}>
      <Stack direction="row" spacing={0.9} alignItems="center" sx={{ mb: 1 }}>
        <Box sx={{ color: ACCENT, display: "flex", "& svg": { fontSize: 20 } }} aria-hidden>
          {icon}
        </Box>
        <Typography component="h2" sx={{ fontWeight: 700, fontSize: { xs: "1.15rem", md: "1.25rem" } }}>
          {title}
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 3, display: "grid", gap: 0.8 }}>
      {items.map((item) => (
        <Typography key={item} component="li" variant="body1" sx={{ lineHeight: 1.7, "&::marker": { color: ACCENT } }}>
          <RichText text={item} />
        </Typography>
      ))}
    </Box>
  );
}

/** One project as a readable page: the pitch and links up top, then the story in sections. */
export function ProjectArticle({ project }: { project: PortfolioProject }) {
  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <PageShell>
      <Box sx={{ maxWidth: 820, mx: "auto" }}>
        <Chip label={project.kicker} size="small" sx={{ bgcolor: alpha(ACCENT, 0.1), color: "primary.dark", fontWeight: 600 }} />
        <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, fontWeight: 700, lineHeight: 1.15, mt: 1 }}>
          {project.title}
        </Typography>
        <Typography sx={{ mt: 1.2, fontSize: { xs: "1.08rem", md: "1.2rem" }, lineHeight: 1.55, color: alpha(INK, 0.8) }}>
          <RichText text={project.headline} />
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {project.liveUrl ? (
            <Button
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              disableElevation
              endIcon={<OpenInNewRoundedIcon />}
              sx={{ bgcolor: INK, "&:hover": { bgcolor: alpha(INK, 0.86) } }}
            >
              Live demo
            </Button>
          ) : null}
          <Button
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            startIcon={<GitHubIcon />}
            sx={{ color: INK, borderColor: alpha(INK, 0.3) }}
          >
            Code
          </Button>
        </Stack>

        {project.imageSrc ? (
          <CardMedia
            component="img"
            src={withBasePath(project.imageSrc)}
            alt={`${project.title} screenshot`}
            sx={{ mt: 3, width: "100%", borderRadius: "8px", border: `1px solid ${alpha(INK, 0.1)}` }}
          />
        ) : null}

        <Section icon={<FavoriteRoundedIcon />} title="Why I built it">
          <Typography variant="body1" sx={{ lineHeight: 1.75 }}>
            <RichText text={project.motivation} />
          </Typography>
        </Section>
        <Section icon={<AutoAwesomeRoundedIcon />} title="What it does">
          <Bullets items={project.capabilities} />
        </Section>
        <Section icon={<BuildRoundedIcon />} title="How I built it">
          <Bullets items={project.build} />
        </Section>
        <Section icon={<LightbulbRoundedIcon />} title="What I learned">
          <Bullets items={project.lessons} />
        </Section>
        {project.deploy ? (
          <Section icon={<RocketLaunchRoundedIcon />} title="How it goes live">
            <Typography variant="body1" sx={{ lineHeight: 1.75 }}>
              <RichText text={project.deploy} />
            </Typography>
          </Section>
        ) : null}

        <Typography
          variant="caption"
          component="h2"
          sx={{ display: "block", mt: 4, mb: 1, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: alpha(INK, 0.6) }}
        >
          Built with
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.7}>
          {project.stack.map((item) => (
            <TechnologyPin key={item} label={item} />
          ))}
        </Stack>

        <PrevNext
          previous={previous ? { href: `/projects/${previous.id}/`, label: previous.title } : undefined}
          next={next ? { href: `/projects/${next.id}/`, label: next.title } : undefined}
        />
      </Box>
    </PageShell>
  );
}
