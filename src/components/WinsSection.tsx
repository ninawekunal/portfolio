"use client";

import { useMemo, useState } from "react";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Collapse,
  Container,
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

const themeMeta: Record<WinTheme, { label: string; color: string; Icon: typeof BoltRoundedIcon }> = {
  customers: { label: "For customers", color: "#c75b1e", Icon: GroupsRoundedIcon },
  speed: { label: "Speed", color: "#9b5d08", Icon: BoltRoundedIcon },
  trust: { label: "Trust and security", color: "#0f6b62", Icon: ShieldRoundedIcon },
  tooling: { label: "Team tooling", color: "#285873", Icon: BuildRoundedIcon },
};

function WinCard({
  win,
  expanded,
  onToggle,
}: {
  win: Win;
  expanded: boolean;
  onToggle: () => void;
}) {
  const meta = themeMeta[win.theme];
  const detailId = `win-${win.id}-detail`;

  return (
    <Paper
      component="article"
      sx={{
        borderRadius: "20px",
        bgcolor: alpha("#ffffff", 0.78),
        borderColor: expanded ? alpha(meta.color, 0.45) : alpha("#132433", 0.1),
        overflow: "hidden",
        transition: "border-color 160ms ease",
      }}
    >
      <ButtonBase
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailId}
        sx={{
          width: "100%",
          textAlign: "left",
          display: "block",
          px: { xs: 1.6, md: 1.9 },
          py: { xs: 1.4, md: 1.6 },
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
            <Stack direction="row" spacing={0.7} alignItems="center" sx={{ minWidth: 0 }}>
              <meta.Icon sx={{ fontSize: 16, color: meta.color, flexShrink: 0 }} aria-hidden />
              <Typography
                variant="caption"
                sx={{ color: meta.color, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}
              >
                {meta.label}
              </Typography>
            </Stack>
            <ExpandMoreRoundedIcon
              sx={{
                color: alpha("#132433", 0.6),
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 160ms ease",
                flexShrink: 0,
              }}
              aria-hidden
            />
          </Stack>

          <Typography
            variant="h3"
            sx={{ fontSize: { xs: "1.08rem", md: "1.18rem" }, lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            {win.title}
          </Typography>

          <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" useFlexGap>
            <Typography
              component="span"
              sx={{
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.45rem", md: "1.6rem" },
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: meta.color,
                whiteSpace: "nowrap",
              }}
            >
              {win.metric}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
              {win.metricLabel}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.75} alignItems="flex-start">
            <PersonRoundedIcon sx={{ fontSize: 16, mt: "3px", color: alpha("#132433", 0.55), flexShrink: 0 }} aria-hidden />
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              <Box component="span" sx={{ fontWeight: 700 }}>
                Who felt it:{" "}
              </Box>
              {win.who}
            </Typography>
          </Stack>
        </Stack>
      </ButtonBase>

      <Collapse in={expanded} timeout={200} unmountOnExit>
        <Stack
          id={detailId}
          spacing={1.1}
          sx={{
            px: { xs: 1.6, md: 1.9 },
            pb: { xs: 1.6, md: 1.9 },
            pt: 0.4,
            borderTop: `1px solid ${alpha("#132433", 0.08)}`,
          }}
        >
          <DetailRow label="What was wrong" text={win.problem} />
          <DetailRow label="What I did" text={win.action} />
          <DetailRow label="What changed" text={win.result} accent={meta.color} />
          {win.tradeoff ? <DetailRow label="What I said no to" text={win.tradeoff} /> : null}
        </Stack>
      </Collapse>
    </Paper>
  );
}

function DetailRow({ label, text, accent }: { label: string; text: string; accent?: string }) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: accent ?? alpha("#132433", 0.6),
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography variant="body2" sx={{ lineHeight: 1.68 }}>
        {text}
      </Typography>
    </Box>
  );
}

const INITIAL_VISIBLE = 6;

export function WinsSection() {
  const [activeFilter, setActiveFilter] = useState<WinThemeFilter["id"]>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredWins = useMemo(
    () => (activeFilter === "all" ? wins : wins.filter((win) => win.theme === activeFilter)),
    [activeFilter],
  );
  const hiddenCount = Math.max(filteredWins.length - INITIAL_VISIBLE, 0);
  const visibleWins = showAll || hiddenCount === 0 ? filteredWins : filteredWins.slice(0, INITIAL_VISIBLE);

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
                        fontFamily: "var(--font-display), sans-serif",
                        fontWeight: 700,
                        fontSize: { xs: "1.55rem", md: "1.8rem" },
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
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
                Tap a card for the problem, the fix, and what I said no to.
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
                      setExpandedId(null);
                      setShowAll(false);
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
            sx={{
              display: "grid",
              gap: 1.4,
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              },
              alignItems: "start",
            }}
          >
            {visibleWins.map((win) => (
              <WinCard
                key={win.id}
                win={win}
                expanded={expandedId === win.id}
                onToggle={() => setExpandedId((previous) => (previous === win.id ? null : win.id))}
              />
            ))}
          </Box>

          {hiddenCount > 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant={showAll ? "text" : "outlined"}
                color="inherit"
                onClick={() => setShowAll((previous) => !previous)}
                endIcon={
                  <ExpandMoreRoundedIcon
                    sx={{ transform: showAll ? "rotate(180deg)" : "none", transition: "transform 160ms ease" }}
                  />
                }
                sx={{ borderColor: alpha("#132433", 0.3) }}
              >
                {showAll ? "Show fewer" : `Show ${hiddenCount} more`}
              </Button>
            </Box>
          ) : null}

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {winsHeading.footnote}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
