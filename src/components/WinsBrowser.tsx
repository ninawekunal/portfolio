"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Box,
  ButtonBase,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import {
  headlineStats,
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
const RAIL_HEIGHT = { xs: 380, sm: 400, md: 660 };
const PANEL_HEIGHT = { xs: 560, sm: 600, md: 660 };

function RailItem({
  win,
  isActive,
  activeRef,
  onSelect,
}: {
  win: Win;
  isActive: boolean;
  activeRef: RefObject<HTMLButtonElement | null>;
  onSelect: (id: string) => void;
}) {
  const meta = themeMeta[win.theme];
  return (
    <ButtonBase
      ref={isActive ? activeRef : undefined}
      role="option"
      aria-selected={isActive}
      onClick={() => onSelect(win.id)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 1,
        width: "100%",
        textAlign: "left",
        border: "1px solid",
        borderColor: isActive ? alpha(meta.color, 0.4) : "transparent",
        bgcolor: isActive ? alpha(meta.color, 0.1) : "transparent",
        borderRadius: "12px",
        px: 1.1,
        py: 0.9,
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
    </ButtonBase>
  );
}

function WinsRail({
  all,
  items,
  activeId,
  onSelect,
  filter,
  onFilterChange,
}: {
  all: Win[];
  items: Win[];
  activeId: string | null;
  onSelect: (id: string) => void;
  filter: WinThemeFilter["id"];
  onFilterChange: (filter: WinThemeFilter["id"]) => void;
}) {
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  // "Everything" reads as one long list, so it gets a small heading per theme.
  const groups: { theme: WinTheme | null; items: Win[] }[] =
    filter === "all"
      ? (Object.keys(themeMeta) as WinTheme[])
          .map((theme) => ({ theme, items: items.filter((win) => win.theme === theme) }))
          .filter((group) => group.items.length > 0)
      : [{ theme: null, items }];

  return (
    <Paper
      component="nav"
      aria-label="Ship list"
      sx={{
        height: RAIL_HEIGHT,
        borderRadius: "20px",
        bgcolor: alpha("#ffffff", 0.78),
        borderColor: alpha("#132433", 0.1),
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Stack
        spacing={1.2}
        sx={{ px: 1.6, pt: 1.4, pb: 1.2, borderBottom: `1px solid ${alpha("#132433", 0.08)}`, flexShrink: 0 }}
      >
        <Stack direction="row" alignItems="baseline" justifyContent="space-between">
          <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 700 }}>
            Ship list
          </Typography>
          <Typography variant="caption" sx={{ ...numericSx, color: "text.secondary" }}>
            {items.length} {items.length === 1 ? "story" : "stories"}
          </Typography>
        </Stack>
        <TextField
          select
          size="small"
          label="Showing"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value as WinThemeFilter["id"])}
        >
          {winThemeFilters
            .map((option) => ({
              ...option,
              count: option.id === "all" ? all.length : all.filter((win) => win.theme === option.id).length,
            }))
            .filter((option) => option.count > 0)
            .map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label} · {option.count}
              </MenuItem>
            ))}
        </TextField>
      </Stack>
      <Box sx={{ flex: 1, overflowY: "auto", p: 0.8 }}>
        <Stack spacing={0.3} role="listbox" aria-label="Wins">
          {groups.map((group) => (
            <Fragment key={group.theme ?? "selected"}>
              {group.theme ? (
                <Typography
                  variant="caption"
                  sx={{
                    px: 1.1,
                    pt: 1,
                    pb: 0.2,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: themeMeta[group.theme].color,
                  }}
                >
                  {themeMeta[group.theme].label}
                </Typography>
              ) : null}
              {group.items.map((win) => (
                <RailItem
                  key={win.id}
                  win={win}
                  isActive={win.id === activeId}
                  activeRef={activeRef}
                  onSelect={onSelect}
                />
              ))}
            </Fragment>
          ))}
        </Stack>
      </Box>
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

/** The stats band from the old hero, for the OpenCFO page. */
export function HeadlineStats() {
  return (
    <Paper sx={{ p: { xs: 1.6, md: 2 }, borderRadius: "16px", bgcolor: alpha("#132433", 0.96), color: "#f8fbff" }}>
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
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {headlineStats.map((stat) => (
          <Box key={stat.label}>
            <Typography component="dt" sx={{ ...numericSx, fontSize: { xs: "1.4rem", md: "1.6rem" }, lineHeight: 1, color: "#f0b07b" }}>
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
  );
}

/** The ship list and the story panel for one company's wins. */
export function WinsBrowser({ items }: { items: Win[] }) {
  // Opening on one theme keeps a long list from feeling like a wall; a short list shows everything.
  const initialFilter: WinThemeFilter["id"] =
    items.length > 6 && items.some((win) => win.theme === "trust") ? "trust" : "all";
  const [activeFilter, setActiveFilter] = useState<WinThemeFilter["id"]>(initialFilter);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredWins = useMemo(
    () => (activeFilter === "all" ? items : items.filter((win) => win.theme === activeFilter)),
    [activeFilter, items],
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
    <Box
      onKeyDown={handleKeyDown}
      sx={{
        display: "grid",
        gap: 1.4,
        gridTemplateColumns: { xs: "1fr", md: "300px minmax(0, 1fr)" },
        alignItems: "start",
      }}
    >
      <WinsRail
        all={items}
        items={filteredWins}
        activeId={activeWin?.id ?? null}
        onSelect={(id) => {
          const index = filteredWins.findIndex((win) => win.id === id);
          if (index >= 0) setActiveIndex(index);
        }}
        filter={activeFilter}
        onFilterChange={(filter) => {
          setActiveFilter(filter);
          setActiveIndex(0);
        }}
      />
      {activeWin ? (
        <WinPanel win={activeWin} index={activeIndex} total={filteredWins.length} onPrev={goPrev} onNext={goNext} />
      ) : null}
    </Box>
  );
}
