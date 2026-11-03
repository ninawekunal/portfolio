"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Container,
  Dialog,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { ProjectDetail } from "@/components/ProjectDetail";
import { plainText } from "@/components/RichText";
import { SectionHeading } from "@/components/SectionHeading";
import { TechnologyPin } from "@/components/TechnologyPin";
import { type PortfolioProject, projectIndustries, projects, projectSkills } from "@/data/portfolio";

const ACCENT = "#c75b1e";
const INK = "#132433";
const CARD_WIDTH = 320;
const CARD_GAP = 14;
/** Pixels per second the marquee drifts while nobody is touching it. */
const DRIFT_SPEED = 28;
/** Below this many cards the row fits on screen, so it stays still. */
const MIN_CARDS_TO_DRIFT = 4;

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

function ProjectCard({ project, onOpen }: { project: PortfolioProject; onOpen: () => void }) {
  const topSkills = project.stack.slice(0, 3);
  const moreCount = project.stack.length - topSkills.length;

  return (
    <Paper
      sx={{
        width: CARD_WIDTH,
        flexShrink: 0,
        borderRadius: "20px",
        bgcolor: alpha("#ffffff", 0.86),
        borderColor: alpha(INK, 0.1),
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "border-color 160ms ease",
        "&:hover": { borderColor: alpha(ACCENT, 0.45) },
      }}
    >
      <ButtonBase
        onClick={onOpen}
        aria-label={`Open details for ${project.title}`}
        sx={{ flex: 1, display: "block", textAlign: "left", px: 1.6, pt: 1.5, pb: 1.1 }}
      >
        <Typography variant="caption" sx={{ color: "primary.dark", fontWeight: 600 }}>
          {project.kicker}
        </Typography>
        <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700, lineHeight: 1.3, mt: 0.2 }}>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.55,
            mt: 0.5,
            minHeight: "3.1em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {plainText(project.headline)}
        </Typography>
        <Stack direction="row" gap={0.5} alignItems="center" sx={{ mt: 1.1, overflow: "hidden" }}>
          {topSkills.map((item) => (
            <TechnologyPin
              key={item}
              label={item}
              sx={{ px: 0.75, py: 0.4, borderRadius: "10px", flexShrink: 1, minWidth: 0, "& .MuiTypography-root": { fontSize: "0.78rem" } }}
            />
          ))}
          {moreCount > 0 ? (
            <Chip size="small" label={`+${moreCount}`} sx={{ flexShrink: 0, bgcolor: alpha(INK, 0.06) }} />
          ) : null}
        </Stack>
      </ButtonBase>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1.6, py: 0.9, borderTop: `1px solid ${alpha(INK, 0.08)}` }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Tap for the full story
        </Typography>
        {project.liveUrl ? (
          <Button
            size="small"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />}
            sx={{ color: "primary.dark", fontWeight: 700 }}
          >
            Live demo
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
}

export function ProjectShowcase() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const [industries, setIndustries] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(
    () => projects.filter((project) => matches(project, industries, skills)),
    [industries, skills],
  );

  const drifts = !prefersReducedMotion && filtered.length >= MIN_CARDS_TO_DRIFT;
  const openIndex = filtered.findIndex((project) => project.id === openId);
  const openProject = openIndex >= 0 ? filtered[openIndex] : null;

  // The list is drawn twice while drifting; jumping back by one copy's width when
  // the first copy has scrolled out keeps the loop seamless, and swiping still works.
  useEffect(() => {
    const node = trackRef.current;
    if (!node || !drifts || paused || openId) return;

    let frame = 0;
    let last = performance.now();
    let carry = 0;
    const tick = (now: number) => {
      carry += ((now - last) / 1000) * DRIFT_SPEED;
      last = now;
      const step = Math.floor(carry);
      if (step > 0) {
        carry -= step;
        const loopWidth = node.scrollWidth / 2;
        node.scrollLeft = node.scrollLeft + step >= loopWidth ? node.scrollLeft + step - loopWidth : node.scrollLeft + step;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [drifts, paused, openId]);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, [industries, skills]);

  const nudge = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * (CARD_WIDTH + CARD_GAP), behavior: "smooth" });
  };

  const step = (delta: number) => {
    const total = filtered.length;
    if (!total || openIndex < 0) return;
    setOpenId(filtered[(((openIndex + delta) % total) + total) % total].id);
  };

  const hasFilters = industries.length > 0 || skills.length > 0;

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 4, md: 5 }, scrollMarginTop: 100 }}>
      <Container maxWidth="xl">
        <Stack spacing={2.2}>
          <SectionHeading
            eyebrow="Projects"
            title="Side projects"
            body="Things I built on my own time, with the code public. Open a card for why I built it, what it does, what it taught me, and how it ships."
          />

          <Stack spacing={0.9}>
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
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {filtered.length} of {projects.length} projects
              {hasFilters ? (
                <Button
                  size="small"
                  onClick={() => {
                    setIndustries([]);
                    setSkills([]);
                  }}
                  sx={{ ml: 1, minWidth: 0 }}
                >
                  Clear filters
                </Button>
              ) : null}
            </Typography>
            <Stack direction="row" spacing={0.6}>
              <IconButton
                size="small"
                aria-label="Scroll projects left"
                onClick={() => nudge(-1)}
                sx={{ border: `1px solid ${alpha(INK, 0.12)}` }}
              >
                <ChevronLeftRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Scroll projects right"
                onClick={() => nudge(1)}
                sx={{ border: `1px solid ${alpha(INK, 0.12)}` }}
              >
                <ChevronRightRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          {filtered.length ? (
            <Box
              ref={trackRef}
              aria-label="Projects"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              sx={{
                display: "flex",
                gap: `${CARD_GAP}px`,
                overflowX: "auto",
                pb: 1,
                mx: { xs: -2, sm: 0 },
                px: { xs: 2, sm: 0 },
                scrollbarWidth: "thin",
                maskImage: drifts
                  ? "linear-gradient(90deg, transparent, #000 24px, #000 calc(100% - 24px), transparent)"
                  : undefined,
              }}
            >
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={() => setOpenId(project.id)} />
              ))}
              {drifts ? (
                <Box aria-hidden inert sx={{ display: "flex", gap: `${CARD_GAP}px` }}>
                  {filtered.map((project) => (
                    <ProjectCard key={`${project.id}-loop`} project={project} onOpen={() => setOpenId(project.id)} />
                  ))}
                </Box>
              ) : null}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "text.secondary", py: 3 }}>
              No project matches both filters. Clear one to see more.
            </Typography>
          )}
        </Stack>
      </Container>

      <Dialog
        open={Boolean(openProject)}
        onClose={() => setOpenId(null)}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { height: fullScreen ? "100%" : "min(86vh, 820px)", position: "relative" } } }}
      >
        <IconButton
          aria-label="Close project details"
          onClick={() => setOpenId(null)}
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 3 }}
        >
          <CloseRoundedIcon />
        </IconButton>
        {openProject ? (
          <ProjectDetail
            project={openProject}
            tone="light"
            position={{ index: openIndex, total: filtered.length }}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        ) : null}
      </Dialog>
    </Box>
  );
}
