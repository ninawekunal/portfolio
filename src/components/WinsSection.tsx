"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Box,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import {
  headlineStats,
  wins,
  winsHeading,
  winThemeFilters,
  type Win,
  type WinTheme,
  type WinThemeFilter,
} from "@/data/wins";
import { CarlCard, WinMetricsCard } from "@/components/WinCarl";
import { RichText } from "@/components/RichText";
import { numericSx } from "@/lib/typography";

const themeMeta: Record<WinTheme, { label: string; color: string; Icon: typeof BoltRoundedIcon }> = {
  customers: { label: "For customers", color: "#c75b1e", Icon: GroupsRoundedIcon },
  speed: { label: "Speed", color: "#9b5d08", Icon: BoltRoundedIcon },
  trust: { label: "Trust and security", color: "#0f6b62", Icon: ShieldRoundedIcon },
  tooling: { label: "Team tooling", color: "#285873", Icon: BuildRoundedIcon },
};

// Same fixed height on the rail and the panel, at every breakpoint, so neither
// container grows to match the other's content.
const RAIL_HEIGHT = { xs: 280, sm: 320, md: 660 };
const PANEL_HEIGHT = { xs: 560, sm: 600, md: 660 };

function WinsRail({
  items,
  activeId,
  onSelect,
}: {
  items: Win[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  return (
    <Paper
      component="nav"
      aria-label="Ship list"
      sx={{
        height: RAIL_HEIGHT,
        borderRadius: "20px",
        bgcolor: alpha("#ffffff", 0.78),
        borderColor: alpha("#132433", 0.1),
        overflowY: "auto",
        p: 0.8,
      }}
    >
      <Stack spacing={0.3} role="listbox" aria-label="Wins">
        {items.map((win) => {
          const meta = themeMeta[win.theme];
          const isActive = win.id === activeId;
          return (
            <Box
              key={win.id}
              component="button"
              type="button"
              ref={isActive ? activeRef : undefined}
              role="option"
              aria-selected={isActive}
              onClick={() => onSelect(win.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
                textAlign: "left",
                border: "1px solid",
                borderColor: isActive ? alpha(meta.color, 0.4) : "transparent",
                bgcolor: isActive ? alpha(meta.color, 0.1) : "transparent",
                borderRadius: "12px",
                px: 1.1,
                py: 0.9,
                cursor: "pointer",
                font: "inherit",
                color: "inherit",
                "&:hover": { bgcolor: isActive ? alpha(meta.color, 0.12) : alpha("#132433", 0.05) },
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: meta.color, flexShrink: 0 }} />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "0.84rem",
                    fontWeight: isActive ? 700 : 600,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {win.title}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {meta.label}
                </Typography>
              </Box>
              <Typography
                sx={{
                  ...numericSx,
                  fontSize: "0.74rem",
                  color: meta.color,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {win.metric}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Paper>
  );
}

function WinPanel({
  win,
  index,
  total,
  onPrev,
  onNext,
}: {
  win: Win;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const meta = themeMeta[win.theme];

  return (
    <Paper
      component="article"
      aria-live="polite"
      sx={{
        height: PANEL_HEIGHT,
        borderRadius: "20px",
        bgcolor: alpha("#ffffff", 0.86),
        borderColor: alpha(meta.color, 0.35),
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", px: { xs: 1.8, md: 2.4 }, py: { xs: 1.8, md: 2.2 } }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
          <Stack direction="row" spacing={0.7} alignItems="center">
            <meta.Icon sx={{ fontSize: 16, color: meta.color, flexShrink: 0 }} aria-hidden />
            <Typography
              variant="caption"
              sx={{ color: meta.color, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              {meta.label}
              {win.company ? ` · ${win.company}` : ""}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
            <IconButton
              size="small"
              onClick={onPrev}
              aria-label="Previous story"
              sx={{ border: `1px solid ${alpha("#132433", 0.12)}` }}
            >
              <KeyboardArrowLeftRoundedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onNext}
              aria-label="Next story"
              sx={{ border: `1px solid ${alpha("#132433", 0.12)}` }}
            >
              <KeyboardArrowRightRoundedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Typography
          variant="h3"
          sx={{ fontSize: { xs: "1.2rem", md: "1.4rem" }, lineHeight: 1.28, letterSpacing: "-0.01em", fontWeight: 700, mt: 0.8 }}
        >
          {win.title}
        </Typography>

        <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 0.8 }}>
          <Typography
            component="span"
            sx={{
              ...numericSx,
              fontSize: { xs: "1.5rem", md: "1.8rem" },
              lineHeight: 1,
              color: meta.color,
            }}
          >
            {win.metric}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
            {win.metricLabel}
          </Typography>
        </Stack>

        <Stack spacing={1.1} sx={{ mt: 1.8 }}>
          <CarlCard kind="context">
            <Typography variant="body2" sx={{ lineHeight: 1.6, fontWeight: 600, color: "text.primary" }}>
              Who felt it: <Box component="span" sx={{ fontWeight: 400 }}>{win.who}</Box>
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.68, color: "text.primary", mt: 0.6 }}>
              <RichText text={win.context} />
            </Typography>
          </CarlCard>
          <CarlCard kind="action">
            <Box component="ul" sx={{ m: 0, pl: 2.2, display: "grid", gap: 0.55 }}>
              {win.action.map((step) => (
                <Typography key={step} component="li" variant="body2" sx={{ lineHeight: 1.62, color: "text.primary" }}>
                  <RichText text={step} />
                </Typography>
              ))}
            </Box>
          </CarlCard>
          <CarlCard kind="result">
            <Typography variant="body2" sx={{ lineHeight: 1.68, color: "text.primary" }}>
              <RichText text={win.result} />
            </Typography>
          </CarlCard>
          <CarlCard kind="learning">
            <Typography variant="body2" sx={{ lineHeight: 1.68, color: "text.primary" }}>
              <RichText text={win.learning} />
            </Typography>
          </CarlCard>
          <WinMetricsCard metrics={win.metrics} accent={meta.color} />
        </Stack>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: { xs: 1.8, md: 2.4 }, py: 1, borderTop: `1px solid ${alpha("#132433", 0.08)}`, flexShrink: 0 }}
      >
        <Typography variant="caption" sx={{ ...numericSx, fontWeight: 500, color: "text.secondary" }}>
          {index + 1} of {total}
        </Typography>
        <Stack direction="row" spacing={0.4} sx={{ display: { xs: "none", sm: "flex" } }}>
          {Array.from({ length: total }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 4,
                borderRadius: "3px",
                bgcolor: i <= index ? meta.color : alpha("#132433", 0.12),
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

export function WinsSection() {
  const [activeFilter, setActiveFilter] = useState<WinThemeFilter["id"]>("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredWins = useMemo(
    () => (activeFilter === "all" ? wins : wins.filter((win) => win.theme === activeFilter)),
    [activeFilter],
  );

  const activeWin = filteredWins[activeIndex] ?? filteredWins[0] ?? null;

  const goTo = (index: number) => {
    const total = filteredWins.length;
    setActiveIndex(((index % total) + total) % total);
  };
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      goPrev();
    }
  };

  return (
    <Box component="section" id="wins" sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 3, md: 4 }, scrollMarginTop: 100 }}>
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 2.4, md: 3.2 }}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 2, lg: 3 },
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.25fr) minmax(300px, 0.75fr)" },
              alignItems: "start",
            }}
          >
            <Stack spacing={1.6}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: { xs: "0.1em", md: "0.18em" },
                  fontSize: { xs: "0.7rem", md: "0.75rem" },
                  lineHeight: 1.5,
                  fontWeight: 600,
                  color: "secondary.dark",
                }}
              >
                {winsHeading.eyebrow}
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.1rem" },
                  lineHeight: 1.06,
                  maxWidth: 860,
                }}
              >
                {winsHeading.title}
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 760, lineHeight: 1.75, color: "text.secondary" }}>
                {winsHeading.body}
              </Typography>
              <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.8}>
                {winsHeading.habits.map((habit) => (
                  <Chip
                    key={habit}
                    icon={<CheckRoundedIcon sx={{ fontSize: 16 }} />}
                    label={habit}
                    sx={{
                      bgcolor: alpha("#0f6b62", 0.08),
                      color: "secondary.dark",
                      border: `1px solid ${alpha("#0f6b62", 0.22)}`,
                      "& .MuiChip-icon": { color: "secondary.dark" },
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            <Paper
              sx={{
                p: { xs: 1.6, md: 2 },
                borderRadius: "24px",
                bgcolor: alpha("#132433", 0.96),
                color: "#f8fbff",
              }}
            >
              <Typography variant="overline" sx={{ letterSpacing: "0.16em", opacity: 0.7 }}>
                21 weeks at OpenCFO
              </Typography>
              <Box
                component="dl"
                sx={{
                  m: 0,
                  mt: 1,
                  display: "grid",
                  gap: 1.2,
                  gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))", lg: "repeat(2, minmax(0, 1fr))" },
                }}
              >
                {headlineStats.map((stat) => (
                  <Box key={stat.label}>
                    <Typography
                      component="dt"
                      sx={{
                        ...numericSx,
                        fontSize: { xs: "1.4rem", md: "1.6rem" },
                        lineHeight: 1,
                        color: "#f0b07b",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography component="dd" variant="subtitle2" sx={{ m: 0, mt: 0.4, lineHeight: 1.2 }}>
                      {stat.label}
                    </Typography>
                    <Typography component="dd" variant="caption" sx={{ m: 0, opacity: 0.7, lineHeight: 1.4, display: "block" }}>
                      {stat.detail}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          <Stack spacing={1.4}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={1}
            >
              <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" } }}>
                What I shipped, one card each
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Each story in four parts: the context, what I did, what changed, and what I learned.
              </Typography>
            </Stack>

            <Stack direction="row" gap={0.8} flexWrap="wrap" role="group" aria-label="Filter wins by theme">
              {winThemeFilters.map((filter) => {
                const isActive = activeFilter === filter.id;
                const count = filter.id === "all" ? wins.length : wins.filter((win) => win.theme === filter.id).length;

                return (
                  <Chip
                    key={filter.id}
                    label={`${filter.label} · ${count}`}
                    clickable
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setActiveIndex(0);
                    }}
                    variant={isActive ? "filled" : "outlined"}
                    aria-pressed={isActive}
                    sx={{
                      bgcolor: isActive ? "#132433" : alpha("#ffffff", 0.7),
                      color: isActive ? "#fffaf2" : "text.primary",
                      borderColor: alpha("#132433", 0.2),
                      "&:hover": { bgcolor: isActive ? "#132433" : alpha("#132433", 0.08) },
                    }}
                  />
                );
              })}
            </Stack>
          </Stack>

          <Box
            onKeyDown={handleKeyDown}
            sx={{
              display: "grid",
              gap: 1.4,
              gridTemplateColumns: { xs: "1fr", md: "300px minmax(0, 1fr)" },
              alignItems: "start",
            }}
          >
            <WinsRail items={filteredWins} activeId={activeWin?.id ?? null} onSelect={(id) => {
              const index = filteredWins.findIndex((win) => win.id === id);
              if (index >= 0) setActiveIndex(index);
            }} />
            {activeWin ? (
              <WinPanel win={activeWin} index={activeIndex} total={filteredWins.length} onPrev={goPrev} onNext={goNext} />
            ) : null}
          </Box>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {winsHeading.footnote}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
