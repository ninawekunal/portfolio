"use client";

import type { ReactNode } from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { RichText } from "@/components/RichText";
import { TechnologyPin } from "@/components/TechnologyPin";
import type { PortfolioProject } from "@/data/portfolio";

const GRADIENT = "linear-gradient(90deg, #ff3bb5 0%, #ff7b38 100%)";

type Tone = "dark" | "light";

const TONES: Record<
  Tone,
  { heading: string; body: string; muted: string; rule: string; icon: string }
> = {
  dark: {
    heading: alpha("#ffffff", 0.97),
    body: alpha("#e4ecff", 0.88),
    muted: alpha("#dce8ff", 0.66),
    rule: alpha("#ffffff", 0.12),
    icon: "#f5be42",
  },
  light: {
    heading: "#132433",
    body: alpha("#132433", 0.82),
    muted: alpha("#132433", 0.6),
    rule: alpha("#132433", 0.1),
    icon: "#c75b1e",
  },
};

function Section({
  icon,
  title,
  tone,
  children,
}: {
  icon: ReactNode;
  title: string;
  tone: Tone;
  children: ReactNode;
}) {
  const colors = TONES[tone];

  return (
    <Box component="section">
      <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mb: 0.7 }}>
        <Box
          sx={{
            color: colors.icon,
            display: "flex",
            "& svg": { fontSize: 18 },
          }}
          aria-hidden
        >
          {icon}
        </Box>
        <Typography
          component="h4"
          sx={{ fontWeight: 700, fontSize: "1rem", color: colors.heading }}
        >
          {title}
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}

function Bullets({ items, tone }: { items: string[]; tone: Tone }) {
  const colors = TONES[tone];

  return (
    <Box component="ul" sx={{ m: 0, pl: 3.2, display: "grid", gap: 0.6 }}>
      {items.map((item) => (
        <Typography
          key={item}
          component="li"
          variant="body2"
          sx={{
            lineHeight: 1.66,
            color: colors.body,
            "&::marker": { color: colors.icon },
          }}
        >
          <RichText text={item} />
        </Typography>
      ))}
    </Box>
  );
}

function BuiltWith({ project, tone }: { project: PortfolioProject; tone: Tone }) {
  return (
    <>
      <Typography
        variant="caption"
        component="h4"
        sx={{
          color: TONES[tone].muted,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          mb: 0.8,
        }}
      >
        Built with
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={0.7}>
        {project.stack.map((item) => (
          <TechnologyPin key={`${project.id}-${item}-detail`} label={item} />
        ))}
      </Stack>
    </>
  );
}

function EdgeArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <IconButton
      aria-label={label}
      onClick={onClick}
      size="small"
      sx={{
        position: "absolute",
        top: "50%",
        [side]: { xs: 4, md: 10 },
        width: { xs: 32, md: 36 },
        height: { xs: 32, md: 36 },
        transform: "translateY(-50%)",
        zIndex: 2,
        color: "#ffffff",
        backgroundImage: GRADIENT,
        border: `2px solid ${alpha("#ffffff", 0.85)}`,
        boxShadow: `0 6px 18px -8px ${alpha("#000000", 0.6)}`,
        "&:hover": { backgroundImage: GRADIENT, filter: "brightness(1.08)" },
      }}
    >
      {side === "left" ? (
        <ChevronLeftRoundedIcon />
      ) : (
        <ChevronRightRoundedIcon />
      )}
    </IconButton>
  );
}

/**
 * The full story of one project. Header and technology footer stay put; the
 * sections between them scroll. The edge arrows step through the current list.
 */
export function ProjectDetail({
  project,
  tone,
  position,
  onPrev,
  onNext,
}: {
  project: PortfolioProject;
  tone: Tone;
  position: { index: number; total: number };
  onPrev: () => void;
  onNext: () => void;
}) {
  const colors = TONES[tone];
  const canStep = position.total > 1;

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      {canStep ? (
        <>
          <EdgeArrow side="left" label="Previous project" onClick={onPrev} />
          <EdgeArrow side="right" label="Next project" onClick={onNext} />
        </>
      ) : null}

      <Box
        sx={{
          px: { xs: 6, md: 6.5 },
          pt: { xs: 2, md: 2.4 },
          pb: 1.4,
          borderBottom: `1px solid ${colors.rule}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
          gap={1}
        >
          <Typography
            variant="h5"
            component="h3"
            sx={{
              color: colors.heading,
              fontSize: { xs: "1.35rem", md: "1.6rem" },
              lineHeight: 1.2,
              mr: 0.4,
            }}
          >
            {project.title}
          </Typography>
          <Tooltip title="Open the repository">
            <IconButton
              component="a"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open the ${project.title} repository in a new tab`}
              size="small"
              sx={{ color: colors.heading, border: `1px solid ${colors.rule}` }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {project.liveUrl ? (
            <Button
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              variant="contained"
              endIcon={
                <OpenInNewRoundedIcon sx={{ fontSize: "16px !important" }} />
              }
              sx={{
                backgroundImage: GRADIENT,
                color: "#ffffff",
                py: 0.5,
                px: 1.6,
                fontSize: "0.82rem",
              }}
            >
              View live demo
            </Button>
          ) : null}
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <Chip
            label={project.kicker}
            size="small"
            sx={{
              bgcolor:
                tone === "dark"
                  ? alpha("#3a1835", 0.92)
                  : alpha("#c75b1e", 0.1),
              border: `1px solid ${tone === "dark" ? alpha("#f6b4e8", 0.58) : alpha("#c75b1e", 0.3)}`,
              color: tone === "dark" ? alpha("#ffe7f8", 0.96) : "primary.dark",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: colors.muted,
              fontFamily: "var(--font-numeric), monospace",
            }}
          >
            {position.index + 1} / {position.total}
          </Typography>
        </Stack>
        <Typography
          sx={{
            mt: 1.1,
            fontSize: { xs: "1.02rem", md: "1.1rem" },
            lineHeight: 1.55,
            color: colors.heading,
            fontWeight: 500,
          }}
        >
          {project.headline}
        </Typography>
      </Box>

      <Stack
        spacing={2.2}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: { xs: 6, md: 6.5 },
          py: 2,
          overscrollBehavior: "contain",
        }}
      >
        <Section
          icon={<FavoriteRoundedIcon />}
          title="Why I built it"
          tone={tone}
        >
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.7, color: colors.body }}
          >
            <RichText text={project.motivation} />
          </Typography>
        </Section>
        <Section
          icon={<AutoAwesomeRoundedIcon />}
          title="What it does"
          tone={tone}
        >
          <Bullets items={project.capabilities} tone={tone} />
        </Section>
        <Section
          icon={<LightbulbRoundedIcon />}
          title="What I learned"
          tone={tone}
        >
          <Bullets items={project.lessons} tone={tone} />
        </Section>
        <Section icon={<BuildRoundedIcon />} title="How I built it" tone={tone}>
          <Bullets items={project.build} tone={tone} />
        </Section>
        {project.deploy ? (
          <Section
            icon={<RocketLaunchRoundedIcon />}
            title="How it goes live"
            tone={tone}
          >
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.7, color: colors.body }}
            >
              <RichText text={project.deploy} />
            </Typography>
          </Section>
        ) : null}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            pt: 1.4,
            borderTop: `1px solid ${colors.rule}`,
          }}
        >
          <BuiltWith project={project} tone={tone} />
        </Box>
      </Stack>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          px: 6.5,
          py: 1.3,
          borderTop: `1px solid ${colors.rule}`,
        }}
      >
        <BuiltWith project={project} tone={tone} />
      </Box>
    </Box>
  );
}
