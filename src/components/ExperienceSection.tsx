"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import {
  Box,
  ButtonBase,
  Chip,
  Collapse,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { SectionHeading } from "@/components/SectionHeading";
import { TechnologyPin } from "@/components/TechnologyPin";
import {
  experienceTimeline,
  type ExperienceProject,
  type ExperienceSkill,
} from "@/data/portfolio";

type RoadPoint = {
  x: number;
  y: number;
};

type ParsedTimelinePoint = {
  key: string;
  label: string;
  timestamp: number;
};

type ParsedTimelinePeriod = {
  start: ParsedTimelinePoint;
  end: ParsedTimelinePoint;
  label: string;
};

type TimelineMilestone = ParsedTimelinePoint & {
  position: number;
};

const MAGIC_GRADIENT_START = "#ff3bb5";
const MAGIC_GRADIENT_END = "#ff7b38";
const MOBILE_TIMELINE_TOP = "calc(env(safe-area-inset-top) + 112px)";
const REQUESTED_MILESTONES = [
  "Present",
  "May 2022",
  "April 2022",
  "June 2021",
  "May 2021",
  "October 2018",
  "August 2018",
] as const;
const EXPERIENCE_SEGMENT_TOKENS: Record<string, { start: string; end: string }> = {
  "Expedia Group": { start: "Present", end: "May 2022" },
  "Global Traffic Technologies": { start: "April 2022", end: "June 2021" },
  "Moaedat Ltd.": { start: "May 2021", end: "August 2018" },
};
const monthIndexByToken: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getMonthKey(timestamp: number) {
  const value = new Date(timestamp);
  return `${value.getUTCFullYear()}-${value.getUTCMonth() + 1}`;
}

function parseTimelinePoint(token: string): ParsedTimelinePoint {
  const trimmed = token.trim();

  if (/present/i.test(trimmed)) {
    const now = new Date();
    const timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);

    return {
      key: getMonthKey(timestamp),
      label: "Present",
      timestamp,
    };
  }

  const compact = trimmed.replace(/,/g, "");
  const [monthTokenRaw = "", yearTokenRaw = ""] = compact.split(/\s+/);
  const monthToken = monthTokenRaw.toLowerCase();
  const year = Number(yearTokenRaw.match(/\d{4}/)?.[0] ?? yearTokenRaw);
  const monthIndex = monthIndexByToken[monthToken];

  if (Number.isFinite(year) && monthIndex !== undefined) {
    const timestamp = Date.UTC(year, monthIndex, 1);

    return {
      key: getMonthKey(timestamp),
      label: trimmed,
      timestamp,
    };
  }

  const yearFromToken = Number(trimmed.match(/\d{4}/)?.[0] ?? NaN);

  if (Number.isFinite(yearFromToken)) {
    const timestamp = Date.UTC(yearFromToken, 0, 1);

    return {
      key: getMonthKey(timestamp),
      label: `${yearFromToken}`,
      timestamp,
    };
  }

  const fallback = Date.UTC(1970, 0, 1);

  return {
    key: getMonthKey(fallback),
    label: trimmed,
    timestamp: fallback,
  };
}

function parseTimelinePeriod(period: string): ParsedTimelinePeriod {
  const [rawStart = period, rawEnd = ""] = period.split(" - ").map((part) => part.trim());
  const start = parseTimelinePoint(rawStart);
  const end = parseTimelinePoint(rawEnd || rawStart);

  return {
    start,
    end,
    label: `${start.label} - ${end.label}`,
  };
}

function buildTimelineMilestones(periods: ParsedTimelinePeriod[]): TimelineMilestone[] {
  const milestonesByMonth = new Map<string, ParsedTimelinePoint>();

  REQUESTED_MILESTONES.forEach((token) => {
    const parsed = parseTimelinePoint(token);
    milestonesByMonth.set(parsed.key, parsed);
  });

  periods.forEach((period) => {
    if (!milestonesByMonth.has(period.start.key)) {
      milestonesByMonth.set(period.start.key, period.start);
    }

    if (!milestonesByMonth.has(period.end.key)) {
      milestonesByMonth.set(period.end.key, period.end);
    }
  });

  const sorted = Array.from(milestonesByMonth.values()).sort((first, second) => second.timestamp - first.timestamp);

  if (!sorted.length) {
    return [];
  }

  if (sorted.length === 1) {
    return [{ ...sorted[0], position: 0 }];
  }

  const monthMs = 1000 * 60 * 60 * 24 * 30.44;
  const gapWeights = sorted.slice(0, -1).map((current, index) => {
    const next = sorted[index + 1];
    const monthsDiff = Math.max((current.timestamp - next.timestamp) / monthMs, 1);

    // Keep spacing date-aware while avoiding huge visual jumps over multi-year gaps.
    return Math.sqrt(monthsDiff) + 1.75;
  });

  const totalGapWeight = Math.max(gapWeights.reduce((sum, gap) => sum + gap, 0), 1);
  let traversed = 0;

  return sorted.map((milestone, index) => {
    if (index === 0) {
      return { ...milestone, position: 0 };
    }

    traversed += gapWeights[index - 1] / totalGapWeight;

    return {
      ...milestone,
      position: clamp(traversed, 0, 1),
    };
  });
}

function getVerticalRoadPoints(positions: number[]): RoadPoint[] {
  if (positions.length <= 1) {
    return [{ x: 50, y: 50 }];
  }

  const topPadding = 8;
  const bottomPadding = 8;
  const usableHeight = 100 - topPadding - bottomPadding;

  return positions.map((position) => {
    const wave = Math.sin(position * Math.PI * 2.3);

    return {
      x: clamp(50 + wave * 22, 18, 82),
      y: topPadding + position * usableHeight,
    };
  });
}

function getMobileWindingPoints(positions: number[]): RoadPoint[] {
  if (positions.length <= 1) {
    return [{ x: 50, y: 50 }];
  }

  return positions.map((position) => {
    return {
      x: 6 + position * 88,
      y: clamp(50 + Math.sin(position * Math.PI * 10) * 24, 18, 82),
    };
  });
}

function getVerticalRoadPath(points: RoadPoint[]) {
  if (!points.length) {
    return "";
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const midY = previous.y + (current.y - previous.y) * 0.5;

    path += ` C ${previous.x} ${midY}, ${current.x} ${midY}, ${current.x} ${current.y}`;
  }

  return path;
}

function getHorizontalRoadPath(points: RoadPoint[]) {
  if (!points.length) {
    return "";
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const midX = previous.x + (current.x - previous.x) * 0.5;

    path += ` C ${midX} ${previous.y}, ${midX} ${current.y}, ${current.x} ${current.y}`;
  }

  return path;
}

function SkillAccordion({
  skill,
  expanded,
  onToggle,
}: {
  skill: ExperienceSkill;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "18px",
        bgcolor: alpha("#071226", 0.95),
        borderColor: alpha("#2a3f66", 0.88),
        overflow: "hidden",
      }}
    >
      <ButtonBase
        onClick={onToggle}
        sx={{
          width: "100%",
          textAlign: "left",
          px: 1.3,
          py: 0.92,
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ minWidth: 0 }}>
          <AutoAwesomeRoundedIcon
            sx={{
              color: alpha("#f5be42", 0.95),
              fontSize: 17,
              mt: 0.22,
              flexShrink: 0,
            }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ color: alpha("#ffffff", 0.95) }}>
              {skill.skill}
            </Typography>
            <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.68) }}>
              {skill.whereApplied}
            </Typography>
          </Box>
        </Stack>
        <ExpandMoreRoundedIcon
          sx={{
            color: alpha("#ffffff", 0.78),
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms ease",
          }}
        />
      </ButtonBase>

      <Collapse in={expanded} timeout={220}>
        <Stack
          spacing={0.45}
          sx={{
            px: 1.6,
            pb: 1.15,
            pt: 0.25,
            pr: 1.4,
            borderTop: `1px solid ${alpha("#2a3f66", 0.58)}`,
          }}
        >
          <Typography variant="body2" sx={{ color: "#ffffff", lineHeight: 1.62 }}>
            {skill.whereApplied}
          </Typography>
          <Typography variant="body2" sx={{ color: "#ffffff", lineHeight: 1.62 }}>
            {skill.outcome}
          </Typography>
        </Stack>
      </Collapse>
    </Paper>
  );
}

function ExperienceProjectCard({
  project,
  onOpen,
}: {
  project: ExperienceProject;
  onOpen: () => void;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "16px",
        bgcolor: alpha("#ffffff", 0.74),
        borderColor: alpha("#132433", 0.14),
        overflow: "hidden",
      }}
    >
      <ButtonBase
        onClick={onOpen}
        sx={{
          width: "100%",
          textAlign: "left",
          px: 1.15,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 0.8,
        }}
      >
        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.28 }}>
            {project.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "primary.dark", lineHeight: 1.5 }}>
            {project.impact}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.45}>
            {project.technologies.slice(0, 3).map((technology) => (
              <TechnologyPin
                key={`${project.name}-${technology}-mini`}
                label={technology}
                sx={{ px: 0.72, py: 0.44, borderRadius: "10px" }}
              />
            ))}
            {project.technologies.length > 3 ? (
              <Chip
                size="small"
                label={`+${project.technologies.length - 3}`}
                sx={{
                  bgcolor: alpha("#132433", 0.08),
                  color: "text.secondary",
                }}
              />
            ) : null}
          </Stack>
        </Stack>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.1, flexShrink: 0 }}>
          Open
        </Typography>
      </ButtonBase>
    </Paper>
  );
}

export function ExperienceSection() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const contentScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileHeadingRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const mobileScrollStartRef = useRef(0);
  const desktopBoundaryLockRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopEntryProgress, setDesktopEntryProgress] = useState(0);
  const [mobileEntryProgress, setMobileEntryProgress] = useState(0);
  const [focusHeadingOnMobileNav, setFocusHeadingOnMobileNav] = useState(false);
  const [expandedSkillsByCompany, setExpandedSkillsByCompany] = useState<Record<string, string | null>>({});
  const [projectDialog, setProjectDialog] = useState<{
    company: string;
    project: ExperienceProject;
  } | null>(null);

  const stopCount = experienceTimeline.length;
  const parsedPeriods = useMemo(() => experienceTimeline.map((entry) => parseTimelinePeriod(entry.period)), []);
  const timelineMilestones = useMemo(() => buildTimelineMilestones(parsedPeriods), [parsedPeriods]);

  const newestTimelineTimestamp = timelineMilestones[0]?.timestamp ?? 0;
  const oldestTimelineTimestamp =
    timelineMilestones[timelineMilestones.length - 1]?.timestamp ?? newestTimelineTimestamp;
  const timelineSpan = Math.max(newestTimelineTimestamp - oldestTimelineTimestamp, 1);

  const getTimelinePositionFromTimestamp = useCallback(
    (timestamp: number) =>
      clamp((newestTimelineTimestamp - timestamp) / timelineSpan, 0, 1),
    [newestTimelineTimestamp, timelineSpan],
  );

  const experienceSegments = useMemo(
    () =>
      experienceTimeline.map((entry, index) => {
        const period = parsedPeriods[index] ?? parseTimelinePeriod(entry.period);
        const override = EXPERIENCE_SEGMENT_TOKENS[entry.company];

        const boundaryA = override ? parseTimelinePoint(override.start) : period.end;
        const boundaryB = override ? parseTimelinePoint(override.end) : period.start;

        const boundaryAPosition = getTimelinePositionFromTimestamp(boundaryA.timestamp);
        const boundaryBPosition = getTimelinePositionFromTimestamp(boundaryB.timestamp);
        const startPosition = Math.min(boundaryAPosition, boundaryBPosition);
        const endPosition = Math.max(boundaryAPosition, boundaryBPosition);
        const startKey = boundaryAPosition <= boundaryBPosition ? boundaryA.key : boundaryB.key;
        const endKey = boundaryAPosition <= boundaryBPosition ? boundaryB.key : boundaryA.key;

        return {
          start: startPosition,
          end: endPosition,
          startKey,
          endKey,
        };
      }),
    [getTimelinePositionFromTimestamp, parsedPeriods],
  );

  const milestonePositions = useMemo(
    () => timelineMilestones.map((milestone) => milestone.position),
    [timelineMilestones],
  );

  const desktopRoadPoints = useMemo(() => getVerticalRoadPoints(milestonePositions), [milestonePositions]);
  const mobileRoadPoints = useMemo(() => getMobileWindingPoints(milestonePositions), [milestonePositions]);

  const desktopRoadPath = useMemo(() => getVerticalRoadPath(desktopRoadPoints), [desktopRoadPoints]);
  const mobileRoadPath = useMemo(() => getHorizontalRoadPath(mobileRoadPoints), [mobileRoadPoints]);

  const experienceIndexByMilestoneKey = useMemo(() => {
    const indexMap = new Map<string, number>();
    experienceSegments.forEach((segment, index) => {
      indexMap.set(segment.startKey, index);
    });
    return indexMap;
  }, [experienceSegments]);

  const activeEntry = experienceTimeline[activeIndex] ?? experienceTimeline[0];
  const activePeriod = parsedPeriods[activeIndex] ?? parseTimelinePeriod(activeEntry.period);
  const activeSegment = experienceSegments[activeIndex] ?? {
    start: Math.min(
      getTimelinePositionFromTimestamp(activePeriod.end.timestamp),
      getTimelinePositionFromTimestamp(activePeriod.start.timestamp),
    ),
    end: Math.max(
      getTimelinePositionFromTimestamp(activePeriod.end.timestamp),
      getTimelinePositionFromTimestamp(activePeriod.start.timestamp),
    ),
    startKey: activePeriod.end.key,
    endKey: activePeriod.start.key,
  };

  const activeCompanyExpandedSkill = expandedSkillsByCompany[activeEntry.company] ?? null;

  const entryScrollProgress = isDesktop ? desktopEntryProgress : mobileEntryProgress;
  const activeSegmentRange = Math.max(activeSegment.end - activeSegment.start, 0);
  const activeSegmentProgressLength = clamp(entryScrollProgress * activeSegmentRange, 0, activeSegmentRange);
  const timelineProgressAbsolute = clamp(
    activeSegment.start + activeSegmentProgressLength,
    activeSegment.start,
    activeSegment.end,
  );

  const jumpToEntry = useCallback(
    (index: number, options?: { focusHeadingOnMobile?: boolean }) => {
      const clampedIndex = clamp(index, 0, Math.max(stopCount - 1, 0));
      const shouldFocusMobileHeading = Boolean(options?.focusHeadingOnMobile);

      setActiveIndex(clampedIndex);

      if (isDesktop) {
        setDesktopEntryProgress(0);
        return;
      }

      mobileScrollStartRef.current = window.scrollY;
      setMobileEntryProgress(0);
      setFocusHeadingOnMobileNav(shouldFocusMobileHeading);
    },
    [isDesktop, stopCount],
  );

  const goPrevious = useCallback(() => {
    jumpToEntry(activeIndex - 1);
  }, [activeIndex, jumpToEntry]);

  const goNext = useCallback(() => {
    jumpToEntry(activeIndex + 1);
  }, [activeIndex, jumpToEntry]);

  const handlePreviousButton = () => {
    jumpToEntry(activeIndex - 1, { focusHeadingOnMobile: true });
  };

  const handleNextButton = () => {
    jumpToEntry(activeIndex + 1, { focusHeadingOnMobile: true });
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    if (isDesktop) {
      return;
    }

    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLElement>) => {
    if (isDesktop || !touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    touchStartRef.current = null;

    if (Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) {
      return;
    }

    if (deltaX < 0) {
      goNext();
      return;
    }

    goPrevious();
  };

  const handleDesktopContentScroll = useCallback(() => {
    if (!isDesktop) {
      return;
    }

    const panel = contentScrollRef.current;

    if (!panel) {
      return;
    }

    const maxScrollable = panel.scrollHeight - panel.clientHeight;
    const nextProgress = maxScrollable <= 4 ? 1 : clamp(panel.scrollTop / maxScrollable, 0, 1);

    setDesktopEntryProgress((previous) =>
      Math.abs(previous - nextProgress) > 0.001 ? nextProgress : previous,
    );
  }, [isDesktop]);

  const handleDesktopBoundaryWheel = (event: ReactWheelEvent<HTMLElement>) => {
    if (!isDesktop) {
      return;
    }

    if (Math.abs(event.deltaX) < 40 || Math.abs(event.deltaX) < Math.abs(event.deltaY) + 8) {
      return;
    }

    event.preventDefault();

    if (desktopBoundaryLockRef.current) {
      return;
    }

    desktopBoundaryLockRef.current = true;

    if (event.deltaX > 0) {
      jumpToEntry(activeIndex + 1);
    } else {
      jumpToEntry(activeIndex - 1);
    }

    window.setTimeout(() => {
      desktopBoundaryLockRef.current = false;
    }, 260);
  };

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const panel = contentScrollRef.current;
    if (!panel) {
      return;
    }

    panel.scrollTop = 0;
    const frameId = window.requestAnimationFrame(() => {
      handleDesktopContentScroll();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeIndex, handleDesktopContentScroll, isDesktop]);

  useEffect(() => {
    if (isDesktop || !focusHeadingOnMobileNav) {
      return;
    }

    const headingNode = mobileHeadingRef.current;

    if (!headingNode) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const viewportOffset = 154;
      const targetTop = window.scrollY + headingNode.getBoundingClientRect().top - viewportOffset;

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: "smooth",
      });

      setFocusHeadingOnMobileNav(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeIndex, focusHeadingOnMobileNav, isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    mobileScrollStartRef.current = window.scrollY;
    let frameId = 0;

    const updateFromMobileScroll = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        const fillDistance = clamp(window.innerHeight * 0.58, 220, 480);
        const delta = window.scrollY - mobileScrollStartRef.current;
        const nextProgress = clamp(delta / fillDistance, 0, 1);

        setMobileEntryProgress((previous) =>
          Math.abs(previous - nextProgress) > 0.001 ? nextProgress : previous,
        );
      });
    };

    updateFromMobileScroll();
    window.addEventListener("scroll", updateFromMobileScroll, { passive: true });
    window.addEventListener("resize", updateFromMobileScroll);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", updateFromMobileScroll);
      window.removeEventListener("resize", updateFromMobileScroll);
    };
  }, [activeIndex, isDesktop]);

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        py: { xs: 5, md: 6 },
        scrollMarginTop: 100,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <SectionHeading
            eyebrow="Experience"
            title="Professional Experience"
            body="A role-by-role interactive journey. Use the timeline to move through each role, then inspect expandable skill bullets and project depth for concrete delivery evidence."
          />

          <Box
            sx={{
              position: "relative",
              height: "auto",
            }}
          >
            <Box
              sx={{
                position: "static",
                display: "grid",
                gap: 1.6,
                alignItems: "start",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "minmax(250px, 315px) minmax(0, 1fr)",
                },
              }}
            >
              <Paper
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                sx={{
                  p: { xs: 1.2, md: 1.4 },
                  borderRadius: "22px",
                  bgcolor: "#fffdf8",
                  position: { xs: "sticky", md: "relative" },
                  top: { xs: MOBILE_TIMELINE_TOP, md: "auto" },
                  zIndex: 8,
                  overflow: "visible",
                }}
              >
                <IconButton
                  size="small"
                  onClick={handlePreviousButton}
                  disabled={activeIndex === 0}
                  sx={{
                    position: "absolute",
                    left: -16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    color: "#ffffff",
                    backgroundImage: `linear-gradient(90deg, ${MAGIC_GRADIENT_START} 0%, ${MAGIC_GRADIENT_END} 100%)`,
                    border: `2px solid ${alpha("#ffffff", 0.85)}`,
                    "&.Mui-disabled": {
                      color: alpha("#ffffff", 0.65),
                      backgroundImage: `linear-gradient(90deg, ${alpha(
                        MAGIC_GRADIENT_START,
                        0.55,
                      )} 0%, ${alpha(MAGIC_GRADIENT_END, 0.55)} 100%)`,
                      borderColor: alpha("#ffffff", 0.45),
                    },
                  }}
                >
                  <ChevronLeftRoundedIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleNextButton}
                  disabled={activeIndex === stopCount - 1}
                  sx={{
                    position: "absolute",
                    right: -16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    color: "#ffffff",
                    backgroundImage: `linear-gradient(90deg, ${MAGIC_GRADIENT_START} 0%, ${MAGIC_GRADIENT_END} 100%)`,
                    border: `2px solid ${alpha("#ffffff", 0.85)}`,
                    "&.Mui-disabled": {
                      color: alpha("#ffffff", 0.65),
                      backgroundImage: `linear-gradient(90deg, ${alpha(
                        MAGIC_GRADIENT_START,
                        0.55,
                      )} 0%, ${alpha(MAGIC_GRADIENT_END, 0.55)} 100%)`,
                      borderColor: alpha("#ffffff", 0.45),
                    },
                  }}
                >
                  <ChevronRightRoundedIcon />
                </IconButton>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.02rem", md: "1.16rem" },
                    lineHeight: 1.3,
                    fontWeight: 700,
                    px: 0.35,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      backgroundImage: `linear-gradient(90deg, ${MAGIC_GRADIENT_START} 0%, ${MAGIC_GRADIENT_END} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {activeEntry.company}
                  </Box>
                  <Box component="span" sx={{ color: "text.primary", WebkitTextFillColor: "currentColor" }}>
                    {`, ${activeEntry.period}`}
                  </Box>
                </Typography>

                <Box
                  sx={{
                    mt: 0.65,
                    position: "relative",
                    height: { xs: 84, md: 340 },
                  }}
                >
                  <Box
                    component="svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    <defs>
                      <linearGradient id="experienceRoadMobileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={MAGIC_GRADIENT_START} />
                        <stop offset="100%" stopColor={MAGIC_GRADIENT_END} />
                      </linearGradient>
                    </defs>
                    <path
                      d={mobileRoadPath}
                      fill="none"
                      stroke={alpha("#132433", 0.16)}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d={mobileRoadPath}
                      fill="none"
                      stroke="url(#experienceRoadMobileGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeOpacity={0.34}
                      pathLength={1}
                      strokeDasharray={`${activeSegmentRange} 1`}
                      strokeDashoffset={-activeSegment.start}
                    />
                    <path
                      d={mobileRoadPath}
                      fill="none"
                      stroke="url(#experienceRoadMobileGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray={`${activeSegmentProgressLength} 1`}
                      strokeDashoffset={-activeSegment.start}
                    />
                  </Box>

                  <Box
                    component="svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      display: { xs: "none", md: "block" },
                    }}
                  >
                    <defs>
                      <linearGradient id="experienceRoadDesktopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={MAGIC_GRADIENT_START} />
                        <stop offset="100%" stopColor={MAGIC_GRADIENT_END} />
                      </linearGradient>
                    </defs>
                    <path
                      d={desktopRoadPath}
                      fill="none"
                      stroke={alpha("#132433", 0.16)}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <path
                      d={desktopRoadPath}
                      fill="none"
                      stroke="url(#experienceRoadDesktopGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeOpacity={0.34}
                      pathLength={1}
                      strokeDasharray={`${activeSegmentRange} 1`}
                      strokeDashoffset={-activeSegment.start}
                    />
                    <path
                      d={desktopRoadPath}
                      fill="none"
                      stroke="url(#experienceRoadDesktopGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray={`${activeSegmentProgressLength} 1`}
                      strokeDashoffset={-activeSegment.start}
                    />
                  </Box>

                  {timelineMilestones.map((milestone, index) => {
                    const point = (isDesktop ? desktopRoadPoints : mobileRoadPoints)[index];
                    const linkedExperienceIndex = experienceIndexByMilestoneKey.get(milestone.key);
                    const isLinkedMilestone = linkedExperienceIndex !== undefined;
                    const isActiveExperience = linkedExperienceIndex === activeIndex;
                    const isActiveBoundary =
                      milestone.key === activeSegment.startKey || milestone.key === activeSegment.endKey;
                    const fillReached = timelineProgressAbsolute >= milestone.position - 0.006;

                    if (!point) {
                      return null;
                    }

                    return (
                      <Box
                        key={milestone.key}
                        sx={{
                          position: "absolute",
                          left: `calc(${point.x}% - 10px)`,
                          top: `calc(${point.y}% - 10px)`,
                        }}
                      >
                        {isLinkedMilestone ? (
                          <ButtonBase
                            onClick={() => jumpToEntry(linkedExperienceIndex)}
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              border: `2px solid ${
                                isActiveExperience
                                  ? alpha(MAGIC_GRADIENT_END, 0.95)
                                  : alpha("#132433", 0.22)
                              }`,
                              bgcolor: fillReached
                                ? alpha(MAGIC_GRADIENT_END, 0.86)
                                : alpha("#ffffff", 0.95),
                              boxShadow: isActiveExperience
                                ? `0 0 0 5px ${alpha(MAGIC_GRADIENT_START, 0.23)}`
                                : "none",
                              transition: "all 180ms ease",
                            }}
                            aria-label={`View ${experienceTimeline[linkedExperienceIndex]?.company ?? "experience"}`}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 14,
                              height: 14,
                              mt: 0.4,
                              ml: 0.4,
                              borderRadius: "50%",
                              border: `1.5px solid ${alpha("#132433", 0.2)}`,
                              bgcolor: fillReached ? alpha(MAGIC_GRADIENT_END, 0.72) : alpha("#ffffff", 0.92),
                            }}
                          />
                        )}
                        {isDesktop ? (
                          <Typography
                            variant="caption"
                            sx={{
                              position: "absolute",
                              top: index % 2 === 0 ? -1 : 11,
                              left: 26,
                              width: 182,
                              color: isActiveBoundary ? "text.primary" : "text.secondary",
                              fontWeight: isActiveBoundary ? 700 : 500,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {milestone.label}
                          </Typography>
                        ) : null}
                      </Box>
                    );
                  })}
                </Box>
              </Paper>

              <Paper
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "30px",
                  bgcolor: alpha("#fffdf8", 0.88),
                  maxHeight: { md: "calc(100dvh - 156px)" },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "30px",
                    background: `radial-gradient(circle at top right, ${alpha(
                      "#f0b07b",
                      0.28,
                    )}, transparent 35%), radial-gradient(circle at bottom left, ${alpha(
                      "#0f6b62",
                      0.1,
                    )}, transparent 34%)`,
                    pointerEvents: "none",
                  }}
                />

                <Box
                  ref={contentScrollRef}
                  onScroll={handleDesktopContentScroll}
                  onWheel={handleDesktopBoundaryWheel}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  sx={{
                    position: "relative",
                    px: { xs: 1.4, md: 1.8 },
                    py: { xs: 1.4, md: 1.8 },
                    maxHeight: { md: "calc(100dvh - 156px)" },
                    overflowY: { xs: "visible", md: "auto" },
                    pr: { md: 1.2 },
                    scrollbarGutter: { md: "stable" },
                  }}
                >
                <Stack spacing={1.35} sx={{ position: "relative", px: { xs: 0, md: 0.2 } }}>
                  <Stack
                    ref={mobileHeadingRef}
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={1.2}
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: { xs: "1.55rem", md: "2rem" },
                          fontWeight: 800,
                          color: "primary.dark",
                        }}
                      >
                        {activeEntry.company}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mt: 0.2, color: "text.secondary", fontWeight: 600 }}>
                        {activeEntry.role}
                      </Typography>
                    </Box>
                    <Stack spacing={0.6} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
                      <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                        {activePeriod.label}
                      </Typography>
                      <Chip
                        size="small"
                        icon={<PlaceRoundedIcon sx={{ fontSize: 16 }} />}
                        label={activeEntry.location}
                        variant="outlined"
                        sx={{
                          bgcolor: alpha("#ffffff", 0.74),
                          borderColor: alpha("#132433", 0.15),
                        }}
                      />
                    </Stack>
                  </Stack>

                  {!isDesktop ? (
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      Swipe left/right on the timeline card or use arrow buttons to navigate experiences.
                    </Typography>
                  ) : null}

                  {activeEntry.projects?.length ? (
                    <Stack spacing={0.9}>
                      <Typography variant="subtitle1">Projects</Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gap: 0.8,
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                          },
                        }}
                      >
                        {activeEntry.projects.map((project) => (
                          <ExperienceProjectCard
                            key={`${activeEntry.company}-${project.name}`}
                            project={project}
                            onOpen={() => setProjectDialog({ company: activeEntry.company, project })}
                          />
                        ))}
                      </Box>
                    </Stack>
                  ) : null}

                  {activeEntry.skillsApplied?.length ? (
                    <Stack spacing={0.9}>
                      <Typography variant="subtitle1">Learnings/Niches</Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gap: 0.9,
                          gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                          },
                          alignItems: "start",
                        }}
                      >
                        {activeEntry.skillsApplied.map((skill) => (
                          <SkillAccordion
                            key={`${activeEntry.company}-${skill.skill}`}
                            skill={skill}
                            expanded={activeCompanyExpandedSkill === skill.skill}
                            onToggle={() => {
                              setExpandedSkillsByCompany((previous) => ({
                                ...previous,
                                [activeEntry.company]: previous[activeEntry.company] === skill.skill ? null : skill.skill,
                              }));
                            }}
                          />
                        ))}
                      </Box>
                    </Stack>
                  ) : null}

                </Stack>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Stack>
      </Container>

      <Dialog
        open={Boolean(projectDialog)}
        onClose={() => setProjectDialog(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1.1,
            pr: 1,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ lineHeight: 1.24 }}>
              {projectDialog?.project.name}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.35 }}>
              {projectDialog?.company} · {projectDialog?.project.impact}
            </Typography>
          </Box>
          <IconButton
            aria-label="Close project details"
            onClick={() => setProjectDialog(null)}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 0.4 }}>
          <Stack spacing={1.25}>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
              {projectDialog?.project.summary}
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={0.7}>
              {projectDialog?.project.technologies.map((technology) => (
                <TechnologyPin
                  key={`${projectDialog?.project.name ?? "project"}-${technology}-dialog`}
                  label={technology}
                />
              ))}
            </Stack>

            {projectDialog?.project.metrics?.length ? (
              <Paper
                variant="outlined"
                sx={{
                  borderRadius: "14px",
                  px: 1.15,
                  py: 0.95,
                  bgcolor: alpha("#132433", 0.03),
                  borderColor: alpha("#132433", 0.14),
                }}
              >
                <Stack direction="row" flexWrap="wrap" gap={1.2}>
                  {projectDialog.project.metrics.map((metric) => (
                    <Box key={`${projectDialog.project.name}-${metric.label}-dialog`}>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {metric.label}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ lineHeight: 1.22 }}>
                        {metric.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            ) : null}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
