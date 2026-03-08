"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SettingsEthernetRoundedIcon from "@mui/icons-material/SettingsEthernetRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded";
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
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import {
  offerHeading,
  offerViews,
  type OfferView,
  type OrbitTechnology,
} from "@/data/offer";
import { projects } from "@/data/portfolio";

const fallbackIconMap: Record<string, ElementType> = {
  node: DnsRoundedIcon,
  jwt: SecurityRoundedIcon,
  rest: RouteRoundedIcon,
  grpc: SettingsEthernetRoundedIcon,
  document: PictureAsPdfRoundedIcon,
  rag: SmartToyRoundedIcon,
  agentic: AutoAwesomeRoundedIcon,
  redis: HubRoundedIcon,
  qstash: SendRoundedIcon,
  kubernetes: CloudQueueRoundedIcon,
  observability: InsightsRoundedIcon,
  sql: TableChartRoundedIcon,
  style: AutoAwesomeRoundedIcon,
  javascript: CodeRoundedIcon,
};

const brandIconMap: Record<string, string> = {
  react: "/brand-icons/react.svg",
  next: "/brand-icons/nextjs.svg",
  typescript: "/brand-icons/typescript.svg",
  material: "/brand-icons/materialui.svg",
  node: "/brand-icons/nodejs.svg",
  spring: "/brand-icons/springboot.svg",
  graphql: "/brand-icons/graphql.svg",
  postgres: "/brand-icons/postgresql.svg",
  opencv: "/brand-icons/opencv.svg",
  sklearn: "/brand-icons/scikitlearn.svg",
  mapbox: "/brand-icons/mapbox.svg",
  aws: "/brand-icons/aws.svg",
  redis: "/brand-icons/redis.svg",
  kubernetes: "/brand-icons/kubernetes.svg",
  javascript: "/brand-icons/javascript.svg",
  python: "/brand-icons/python.svg",
  java: "/brand-icons/java.svg",
  kotlin: "/brand-icons/kotlin.svg",
  jest: "/brand-icons/jest.svg",
  cypress: "/brand-icons/cypress.svg",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function TechnologyPin({
  technology,
  selected,
  onClick,
}: {
  technology: OrbitTechnology;
  selected: boolean;
  onClick: () => void;
}) {
  const brandSrc = brandIconMap[technology.icon];
  const Icon = fallbackIconMap[technology.icon] ?? WidgetsRoundedIcon;

  return (
    <ButtonBase onClick={onClick} sx={{ borderRadius: "16px", textAlign: "left", minWidth: 0 }}>
      <Paper
        variant="outlined"
        sx={{
          px: 1.3,
          py: 0.85,
          borderRadius: "16px",
          bgcolor: selected ? alpha("#1a2d48", 0.96) : alpha("#111722", 0.94),
          borderColor: selected ? alpha("#8ec6ff", 0.72) : alpha("#ffffff", 0.16),
          color: alpha("#ffffff", 0.94),
          transition: "all 160ms ease",
          "&:hover": {
            borderColor: alpha("#8ec6ff", 0.55),
            transform: "translateY(-1px)",
          },
        }}
      >
        <Stack direction="row" spacing={0.85} alignItems="center">
          {brandSrc ? (
            <Box
              component="img"
              src={brandSrc}
              alt={`${technology.label} logo`}
              sx={{ width: 16, height: 16, objectFit: "contain", flexShrink: 0 }}
            />
          ) : (
            <Icon sx={{ fontSize: 16, color: alpha("#cfe6ff", 0.92) }} />
          )}
          <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
            {technology.label}
          </Typography>
        </Stack>
      </Paper>
    </ButtonBase>
  );
}

function ProfileAvatar({
  size,
  showFallback,
  onError,
}: {
  size: number;
  showFallback: boolean;
  onError: () => void;
}) {
  if (showFallback) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          bgcolor: alpha("#223858", 0.95),
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          KN
        </Typography>
      </Box>
    );
  }

  return (
    <Image
      src="/profile_picture.jpeg"
      alt="Kunal portrait"
      width={size}
      height={size}
      onError={onError}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

export function WhatIOfferSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dragTargetRef = useRef<"desktop" | "mobile" | null>(null);
  const dragPreviewRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedTechnologyId, setExpandedTechnologyId] = useState<string | null>(null);
  const [expandedNicheId, setExpandedNicheId] = useState<string | null>(null);
  const [draggingTarget, setDraggingTarget] = useState<"desktop" | "mobile" | null>(null);
  const [dragPreviewIndex, setDragPreviewIndex] = useState<number | null>(null);
  const [showPortraitFallback, setShowPortraitFallback] = useState(false);

  const totalSteps = offerViews.length;
  const activeView: OfferView = offerViews[activeIndex] ?? offerViews[0];
  const progress = activeIndex / Math.max(totalSteps - 1, 1);
  const visualProgress =
    dragPreviewIndex !== null ? dragPreviewIndex / Math.max(totalSteps - 1, 1) : progress;

  const expandedTechnology = useMemo(
    () => activeView.technologies.find((technology) => technology.id === expandedTechnologyId) ?? null,
    [activeView, expandedTechnologyId],
  );

  const relatedProjects = useMemo(() => {
    if (!expandedTechnology) {
      return [];
    }

    return projects.filter((project) => expandedTechnology.projectIds.includes(project.id));
  }, [expandedTechnology]);

  const jumpToStep = useCallback((index: number) => {
    const clampedIndex = clamp(index, 0, totalSteps - 1);

    if (isMobile) {
      setActiveIndex(clampedIndex);
      return;
    }

    const root = scrollerRef.current;
    const node = stepRefs.current[clampedIndex];

    if (!root || !node) {
      return;
    }

    root.scrollTo({ top: clampedIndex === 0 ? 0 : node.offsetTop, behavior: "smooth" });
  }, [isMobile, totalSteps]);

  const getPointerStepIndex = useCallback(
    (clientCoordinate: number, target: "desktop" | "mobile") => {
      const track = target === "desktop" ? desktopTrackRef.current : mobileTrackRef.current;

      if (!track) {
        return activeIndex;
      }

      const rect = track.getBoundingClientRect();
      const ratio =
        target === "desktop"
          ? clamp((clientCoordinate - rect.top) / Math.max(rect.height, 1), 0, 1)
          : clamp((clientCoordinate - rect.left) / Math.max(rect.width, 1), 0, 1);
      return clamp(Math.round(ratio * (totalSteps - 1)), 0, totalSteps - 1);
    },
    [activeIndex, totalSteps],
  );

  const jumpToPointerPosition = useCallback(
    (clientCoordinate: number, target: "desktop" | "mobile") => {
      const nextIndex = getPointerStepIndex(clientCoordinate, target);
      jumpToStep(nextIndex);
    },
    [getPointerStepIndex, jumpToStep],
  );

  const setPointerPreview = useCallback(
    (clientCoordinate: number, target: "desktop" | "mobile") => {
      const nextIndex = getPointerStepIndex(clientCoordinate, target);
      dragPreviewRef.current = nextIndex;
      setDragPreviewIndex((previous) => (previous === nextIndex ? previous : nextIndex));
    },
    [getPointerStepIndex],
  );

  const clearDragState = useCallback(() => {
    dragTargetRef.current = null;
    dragPreviewRef.current = null;
    setDraggingTarget(null);
    setDragPreviewIndex(null);
  }, []);

  const syncActiveStep = useCallback(() => {
    const root = scrollerRef.current;

    if (!root) {
      return;
    }

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    stepRefs.current.forEach((node, index) => {
      if (!node) {
        return;
      }

      const distance = Math.abs(node.offsetTop - root.scrollTop);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex((previous) => (previous === nearestIndex ? previous : nearestIndex));
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const root = scrollerRef.current;

    if (!root) {
      return;
    }

    const onScroll = () => {
      if (scrollRafRef.current !== null) {
        return;
      }

      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        syncActiveStep();
      });
    };

    root.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      root.removeEventListener("scroll", onScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [isMobile, syncActiveStep]);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const root = scrollerRef.current;

    if (!root) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 24) {
        return;
      }

      event.preventDefault();

      if (wheelLockRef.current) {
        return;
      }

      wheelLockRef.current = true;
      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = clamp(activeIndex + direction, 0, totalSteps - 1);

      if (nextIndex === activeIndex) {
        wheelLockRef.current = false;
        return;
      }

      jumpToStep(nextIndex);

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 440);
    };

    root.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      root.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, isMobile, jumpToStep, totalSteps]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!dragTargetRef.current) {
        return;
      }

      setPointerPreview(
        dragTargetRef.current === "desktop" ? event.clientY : event.clientX,
        dragTargetRef.current,
      );
    };

    const onPointerUp = () => {
      const previewIndex = dragPreviewRef.current;

      if (previewIndex !== null) {
        jumpToStep(previewIndex);
      }

      clearDragState();
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [clearDragState, jumpToStep, setPointerPreview]);

  const onMobileSwipeStart = useCallback((event: ReactTouchEvent<HTMLDivElement>) => {
    if (!isMobile) {
      return;
    }

    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, [isMobile]);

  const onMobileSwipeEnd = useCallback(
    (event: ReactTouchEvent<HTMLDivElement>) => {
      if (!isMobile || !touchStartRef.current) {
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      if (Math.abs(deltaX) < 88 || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) {
        return;
      }

      if (deltaX < 0) {
        jumpToStep(activeIndex + 1);
      } else {
        jumpToStep(activeIndex - 1);
      }
    },
    [activeIndex, isMobile, jumpToStep],
  );

  return (
    <Box component="section" id="what-i-offer" sx={{ py: { xs: 5, md: 6 }, scrollMarginTop: 100 }}>
      <Container maxWidth="xl">
        <Paper
          sx={{
            p: { xs: 2.1, md: 3.2 },
            borderRadius: "32px",
            bgcolor: "#080b14",
            color: "#f5f7ff",
            backgroundImage: `radial-gradient(circle at 10% 0%, ${alpha(
              "#2b7fff",
              0.22,
            )}, transparent 36%), radial-gradient(circle at 88% 2%, ${alpha(
              "#fa4dc5",
              0.18,
            )}, transparent 31%)`,
          }}
        >
          <Stack spacing={2.2}>
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: "0.2em", opacity: 0.72 }}>
                {offerHeading.eyebrow}
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.35 }}>
                What I <Box component="span" sx={{ color: "#ee5ac8" }}>Offer</Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mt: 1.1,
                  maxWidth: 940,
                  color: alpha("#ffffff", 0.96),
                  fontWeight: 500,
                  lineHeight: 1.35,
                }}
              >
                {offerHeading.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  maxWidth: 960,
                  color: alpha("#ffffff", 0.78),
                  lineHeight: 1.74,
                }}
              >
                {offerHeading.body}
              </Typography>
            </Box>

            <Box
              ref={scrollerRef}
              sx={{
                height: { xs: "auto", lg: "82vh" },
                overflowY: { xs: "visible", lg: "auto" },
                scrollSnapType: { xs: "none", lg: "y mandatory" },
                overscrollBehavior: { xs: "auto", lg: "contain" },
                borderRadius: "24px",
                border: `1px solid ${alpha("#ffffff", 0.12)}`,
                bgcolor: alpha("#0f1321", 0.7),
                scrollBehavior: "smooth",
                touchAction: "pan-y",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                    xs: "1fr",
                    lg: "260px minmax(0, 1fr)",
                  },
                  alignItems: "start",
                  p: { xs: 1.1, md: 1.35 },
                }}
              >
                <Box sx={{ display: { xs: "none", lg: "block" }, position: "sticky", top: 10 }}>
                  <Paper
                    sx={{
                      p: 1.5,
                      borderRadius: "22px",
                      bgcolor: alpha("#0f1321", 0.9),
                      border: `1px solid ${alpha("#ffffff", 0.12)}`,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: alpha("#ffffff", 0.95) }}>
                      Milestone Progress
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 0.35, color: alpha("#ffffff", 0.68), lineHeight: 1.62 }}
                    >
                      One scroll snap = one core skill section.
                    </Typography>

                    <Box sx={{ mt: 1.3, display: "grid", gridTemplateColumns: "38px 1fr", gap: 1.1 }}>
                      <Box
                        ref={desktopTrackRef}
                        onClick={(event) => jumpToPointerPosition(event.clientY, "desktop")}
                        onPointerDown={(event) => {
                          event.preventDefault();
                          dragTargetRef.current = "desktop";
                          setDraggingTarget("desktop");
                          setPointerPreview(event.clientY, "desktop");
                        }}
                        sx={{
                          position: "relative",
                          height: 420,
                          borderRadius: 999,
                          cursor: "pointer",
                          touchAction: "none",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: 16,
                            top: 0,
                            bottom: 0,
                            width: 4,
                            borderRadius: 999,
                            bgcolor: alpha("#ffffff", 0.15),
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            left: 16,
                            top: 0,
                            width: 4,
                            borderRadius: 999,
                            height: `${Math.max(visualProgress * 420, 0)}px`,
                            bgcolor: alpha("#f5be42", 0.92),
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            left: 16,
                            top: `${Math.min(visualProgress * 420, 418)}px`,
                            transform: "translate(-50%, -50%)",
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            border: `1.5px solid ${alpha("#ffffff", 0.38)}`,
                            bgcolor: alpha("#101726", 0.95),
                            p: "2px",
                            zIndex: 3,
                            boxShadow: `0 0 0 1px ${alpha("#0b101b", 0.95)}`,
                          }}
                        >
                          <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                            <ProfileAvatar
                              size={32}
                              showFallback={showPortraitFallback}
                              onError={() => setShowPortraitFallback(true)}
                            />
                          </Box>
                        </Box>
                        {draggingTarget === "desktop" && dragPreviewIndex !== null ? (
                          <Paper
                            elevation={0}
                            sx={{
                              position: "absolute",
                              left: 30,
                              top: `${Math.min(visualProgress * 420, 418)}px`,
                              transform: "translateY(-50%)",
                              px: 0.8,
                              py: 0.25,
                              borderRadius: "10px",
                              border: `1px solid ${alpha("#8ec6ff", 0.55)}`,
                              bgcolor: alpha("#0f2034", 0.98),
                            }}
                          >
                            <Typography variant="caption" sx={{ color: alpha("#e9f4ff", 0.97) }}>
                              {offerViews[dragPreviewIndex]?.label}
                            </Typography>
                          </Paper>
                        ) : null}
                      </Box>

                      <Stack sx={{ height: 420, justifyContent: "space-between" }}>
                        {offerViews.map((view, index) => (
                          <Button
                            key={view.id}
                            onClick={() => jumpToStep(index)}
                            color="inherit"
                            sx={{
                              justifyContent: "flex-start",
                              textTransform: "none",
                              px: 0,
                              minHeight: 22,
                              color:
                                index === activeIndex
                                  ? alpha("#ffffff", 0.98)
                                  : alpha("#ffffff", 0.72),
                              fontWeight: index === activeIndex ? 600 : 500,
                            }}
                          >
                            {view.label}
                          </Button>
                        ))}
                      </Stack>
                    </Box>
                  </Paper>
                </Box>

                <Box sx={{ position: "relative", minWidth: 0 }}>
                  <Box sx={{ position: { xs: "relative", lg: "sticky" }, top: { lg: 10 }, zIndex: 2 }}>
                    <Paper
                      onTouchStart={onMobileSwipeStart}
                      onTouchEnd={onMobileSwipeEnd}
                      onTouchCancel={() => {
                        touchStartRef.current = null;
                      }}
                      sx={{
                        p: { xs: 1.2, md: 1.5 },
                        borderRadius: "22px",
                        bgcolor: alpha("#0f1321", 0.93),
                        border: `1px solid ${alpha("#ffffff", 0.12)}`,
                        width: "100%",
                        touchAction: "pan-y",
                      }}
                    >
                      <Stack spacing={1.2}>
                        <Box sx={{ display: { xs: "block", lg: "none" } }}>
                          <Typography
                            variant="caption"
                            sx={{ display: "block", mt: 0.2, color: alpha("#ffffff", 0.65) }}
                          >
                            Swipe left/right to switch core skills. Scroll vertically to read details.
                          </Typography>

                          <Box
                            ref={mobileTrackRef}
                            onClick={(event) => jumpToPointerPosition(event.clientX, "mobile")}
                            onPointerDown={(event) => {
                              event.preventDefault();
                              dragTargetRef.current = "mobile";
                              setDraggingTarget("mobile");
                              setPointerPreview(event.clientX, "mobile");
                            }}
                            sx={{
                              mt: 0.65,
                              height: 10,
                              borderRadius: 999,
                              bgcolor: alpha("#ffffff", 0.16),
                              position: "relative",
                              cursor: "pointer",
                              touchAction: "none",
                            }}
                          >
                            <Box
                              sx={{
                                width: `${visualProgress * 100}%`,
                                height: "100%",
                                borderRadius: 999,
                                bgcolor: alpha("#f5be42", 0.92),
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                left: `${visualProgress * 100}%`,
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 26,
                                height: 26,
                                borderRadius: "50%",
                                border: `1.5px solid ${alpha("#ffffff", 0.36)}`,
                                bgcolor: alpha("#101726", 0.95),
                                p: "1.5px",
                                boxShadow: `0 0 0 1px ${alpha("#0b101b", 0.95)}`,
                              }}
                            >
                              <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" }}>
                                <ProfileAvatar
                                  size={22}
                                  showFallback={showPortraitFallback}
                                  onError={() => setShowPortraitFallback(true)}
                                />
                              </Box>
                            </Box>
                            {draggingTarget === "mobile" && dragPreviewIndex !== null ? (
                              <Paper
                                elevation={0}
                                sx={{
                                  position: "absolute",
                                  left: `${visualProgress * 100}%`,
                                  top: -10,
                                  transform: "translate(-50%, -100%)",
                                  px: 0.8,
                                  py: 0.25,
                                  borderRadius: "10px",
                                  border: `1px solid ${alpha("#8ec6ff", 0.55)}`,
                                  bgcolor: alpha("#0f2034", 0.98),
                                  pointerEvents: "none",
                                  maxWidth: 150,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: alpha("#e9f4ff", 0.97),
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    display: "block",
                                  }}
                                >
                                  {offerViews[dragPreviewIndex]?.label}
                                </Typography>
                              </Paper>
                            ) : null}
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            variant="h4"
                            sx={{
                              color: alpha("#ffffff", 0.98),
                              fontSize: { xs: "1.55rem", md: "1.9rem" },
                            }}
                          >
                            {activeView.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ mt: 0.55, color: alpha("#ffffff", 0.9), lineHeight: 1.7 }}
                          >
                            {activeView.description}
                          </Typography>
                        </Box>

                        <Stack spacing={0.75}>
                          {activeView.nicheTechniques.map((niche) => {
                            const isExpanded = expandedNicheId === niche.id;

                            return (
                              <Paper
                                key={niche.id}
                                variant="outlined"
                                sx={{
                                  borderRadius: "14px",
                                  bgcolor: alpha("#101726", 0.82),
                                  borderColor: isExpanded
                                    ? alpha("#f5be42", 0.45)
                                    : alpha("#ffffff", 0.12),
                                  overflow: "hidden",
                                }}
                              >
                                <ButtonBase
                                  onClick={() =>
                                    setExpandedNicheId((previous) =>
                                      previous === niche.id ? null : niche.id,
                                    )
                                  }
                                  sx={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                    textAlign: "left",
                                    px: 0.9,
                                    py: 0.55,
                                  }}
                                >
                                  <Box sx={{ display: "flex", gap: 0.9, alignItems: "center", minWidth: 0 }}>
                                    <AutoAwesomeRoundedIcon
                                      sx={{ color: alpha("#f5be42", 0.94), fontSize: 17, flexShrink: 0 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: alpha("#ffffff", 0.88),
                                        fontWeight: 500,
                                        lineHeight: 1.45,
                                        textAlign: "left",
                                      }}
                                    >
                                      {niche.label}
                                    </Typography>
                                  </Box>
                                  <ExpandMoreRoundedIcon
                                    sx={{
                                      fontSize: 18,
                                      color: alpha("#ffffff", 0.72),
                                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                      transition: "transform 170ms ease",
                                    }}
                                  />
                                </ButtonBase>
                                <Collapse in={isExpanded} timeout={180} unmountOnExit>
                                  <Box sx={{ px: 1.25, pb: 1.1, pt: 0.2 }}>
                                    <Typography
                                      variant="body2"
                                      sx={{ color: alpha("#ffffff", 0.85), lineHeight: 1.66 }}
                                    >
                                      {niche.proof}
                                    </Typography>
                                    {niche.subItems?.length ? (
                                      <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mt: 0.7 }}>
                                        {niche.subItems.map((item) => (
                                          <Chip
                                            key={item}
                                            size="small"
                                            label={item}
                                            variant="outlined"
                                            sx={{
                                              borderColor: alpha("#f6b4e8", 0.58),
                                              color: alpha("#ffe7f8", 0.96),
                                              bgcolor: alpha("#3a1835", 0.92),
                                            }}
                                          />
                                        ))}
                                      </Stack>
                                    ) : null}
                                  </Box>
                                </Collapse>
                              </Paper>
                            );
                          })}
                        </Stack>

                        <Box>
                          <Typography variant="subtitle1" sx={{ color: alpha("#ffffff", 0.96), mb: 0.8 }}>
                            Worked on
                          </Typography>
                          <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.7}>
                            {activeView.technologies.map((technology) => {
                              const isExpanded = expandedTechnologyId === technology.id;

                              return (
                                <TechnologyPin
                                  key={technology.id}
                                  technology={technology}
                                  selected={isExpanded}
                                  onClick={() =>
                                    setExpandedTechnologyId((previous) =>
                                      previous === technology.id ? null : technology.id,
                                    )
                                  }
                                />
                              );
                            })}
                          </Stack>
                          <Collapse in={Boolean(expandedTechnology)} timeout={180} unmountOnExit>
                            <Paper
                              variant="outlined"
                              sx={{
                                mt: 1,
                                p: 1.1,
                                borderRadius: "14px",
                                bgcolor: alpha("#101726", 0.88),
                                borderColor: alpha("#8ec6ff", 0.4),
                              }}
                            >
                              <Typography variant="subtitle2" sx={{ color: alpha("#ffffff", 0.96) }}>
                                {expandedTechnology?.label}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ mt: 0.4, color: alpha("#ffffff", 0.84), lineHeight: 1.62 }}
                              >
                                {expandedTechnology?.summary}
                              </Typography>
                              {expandedTechnology?.subItems?.length ? (
                                <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mt: 0.65 }}>
                                  {expandedTechnology.subItems.map((item) => (
                                    <Chip
                                      key={item}
                                      size="small"
                                      label={item}
                                      variant="outlined"
                                      sx={{
                                        borderColor: alpha("#8ec6ff", 0.58),
                                        color: alpha("#dff0ff", 0.95),
                                        bgcolor: alpha("#17314d", 0.9),
                                      }}
                                    />
                                  ))}
                                </Stack>
                              ) : null}

                              <Box sx={{ mt: 1 }}>
                                {relatedProjects.length > 0 ? (
                                  <Stack spacing={0.75}>
                                    {relatedProjects.map((project) => (
                                      <Paper
                                        key={project.id}
                                        variant="outlined"
                                        sx={{
                                          p: 0.9,
                                          borderRadius: "12px",
                                          bgcolor: alpha("#141b29", 0.94),
                                          borderColor: alpha("#ffffff", 0.12),
                                        }}
                                      >
                                        <Stack spacing={0.55}>
                                          <Typography
                                            variant="overline"
                                            sx={{ color: alpha("#ffffff", 0.66), lineHeight: 1.1 }}
                                          >
                                            {project.kicker}
                                          </Typography>
                                          <Typography variant="subtitle2">{project.title}</Typography>
                                          <Typography
                                            variant="body2"
                                            sx={{ color: alpha("#ffffff", 0.8), lineHeight: 1.58 }}
                                          >
                                            {project.headline}
                                          </Typography>
                                          <Box>
                                            <Button
                                              href={project.repoUrl}
                                              target="_blank"
                                              rel="noreferrer"
                                              color="inherit"
                                              variant="outlined"
                                              size="small"
                                              startIcon={<OpenInNewRoundedIcon />}
                                              sx={{ borderColor: alpha("#ffffff", 0.28) }}
                                            >
                                              Repository
                                            </Button>
                                          </Box>
                                        </Stack>
                                      </Paper>
                                    ))}
                                  </Stack>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    sx={{ color: alpha("#ffffff", 0.76), lineHeight: 1.58 }}
                                  >
                                    This area is represented in production/resume work and architectural
                                    exposure, but it does not yet have a dedicated public showcase repository
                                    in this portfolio.
                                  </Typography>
                                )}
                              </Box>
                            </Paper>
                          </Collapse>
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>

                  <Stack spacing={0} sx={{ display: { xs: "none", lg: "flex" } }}>
                    {offerViews.map((view, index) => (
                      <Box
                        key={view.id}
                        ref={(node: HTMLDivElement | null) => {
                          stepRefs.current[index] = node;
                        }}
                        data-step-index={index}
                        sx={{
                          height: { xs: "74vh", md: "78vh", lg: "82vh" },
                          scrollSnapAlign: "start",
                          scrollSnapStop: "always",
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
