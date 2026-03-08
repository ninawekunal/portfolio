"use client";

import {
  useCallback,
  useEffect,
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
  Tooltip,
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
import { withBasePath } from "@/lib/assetPath";

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
}: {
  technology: OrbitTechnology;
}) {
  const brandSrc = brandIconMap[technology.icon];
  const brandSrcWithBasePath = brandSrc ? withBasePath(brandSrc) : undefined;
  const Icon = fallbackIconMap[technology.icon] ?? WidgetsRoundedIcon;
  const tooltipDescription = technology.subItems?.length
    ? `${technology.summary} Includes: ${technology.subItems.join(", ")}.`
    : technology.summary;

  return (
    <Tooltip
      title={tooltipDescription}
      arrow
      enterDelay={180}
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            maxWidth: 360,
            fontSize: "0.8rem",
            lineHeight: 1.52,
            bgcolor: alpha("#0d1728", 0.98),
            border: `1px solid ${alpha("#8ec6ff", 0.42)}`,
            color: alpha("#edf4ff", 0.95),
          },
        },
        arrow: {
          sx: { color: alpha("#0d1728", 0.98) },
        },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          px: 1.3,
          py: 0.85,
          borderRadius: "16px",
          bgcolor: alpha("#111722", 0.94),
          borderColor: alpha("#ffffff", 0.16),
          color: alpha("#ffffff", 0.94),
          transition: "all 160ms ease",
          "&:hover": {
            borderColor: alpha("#8ec6ff", 0.6),
            bgcolor: alpha("#17263b", 0.96),
            transform: "translateY(-1px)",
          },
        }}
      >
        <Stack direction="row" spacing={0.85} alignItems="center">
          {brandSrc ? (
            <Box
              component="img"
              src={brandSrcWithBasePath}
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
    </Tooltip>
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
      src={withBasePath("/profile_picture.jpeg")}
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const topTrackRef = useRef<HTMLDivElement | null>(null);
  const dragTargetRef = useRef<"top" | null>(null);
  const dragPreviewRef = useRef<number | null>(null);
  const horizontalLockRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedNicheId, setExpandedNicheId] = useState<string | null>(null);
  const [draggingTarget, setDraggingTarget] = useState<"top" | null>(null);
  const [dragPreviewIndex, setDragPreviewIndex] = useState<number | null>(null);
  const [showPortraitFallback, setShowPortraitFallback] = useState(false);

  const totalSteps = offerViews.length;
  const activeView: OfferView = offerViews[activeIndex] ?? offerViews[0];
  const progress = activeIndex / Math.max(totalSteps - 1, 1);
  const visualProgress =
    dragPreviewIndex !== null ? dragPreviewIndex / Math.max(totalSteps - 1, 1) : progress;

  const jumpToStep = useCallback((index: number) => {
    const clampedIndex = clamp(index, 0, totalSteps - 1);
    setActiveIndex(clampedIndex);
  }, [totalSteps]);

  const getPointerStepIndex = useCallback(
    (clientX: number) => {
      const track = topTrackRef.current;

      if (!track) {
        return activeIndex;
      }

      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
      return clamp(Math.round(ratio * (totalSteps - 1)), 0, totalSteps - 1);
    },
    [activeIndex, totalSteps],
  );

  const jumpToPointerPosition = useCallback(
    (clientX: number) => {
      const nextIndex = getPointerStepIndex(clientX);
      jumpToStep(nextIndex);
    },
    [getPointerStepIndex, jumpToStep],
  );

  const setPointerPreview = useCallback(
    (clientX: number) => {
      const nextIndex = getPointerStepIndex(clientX);
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

  useEffect(() => {
    const root = sectionRef.current;

    if (!root) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < 34 || Math.abs(event.deltaX) <= Math.abs(event.deltaY) + 8) {
        return;
      }

      event.preventDefault();

      if (horizontalLockRef.current) {
        return;
      }

      horizontalLockRef.current = true;
      const direction = event.deltaX > 0 ? 1 : -1;
      jumpToStep(activeIndex + direction);

      window.setTimeout(() => {
        horizontalLockRef.current = false;
      }, 380);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      root.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, jumpToStep]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!dragTargetRef.current) {
        return;
      }

      setPointerPreview(event.clientX);
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
              ref={sectionRef}
              sx={{
                borderRadius: "24px",
                border: `1px solid ${alpha("#ffffff", 0.12)}`,
                bgcolor: alpha("#0f1321", 0.7),
                touchAction: "pan-y",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: { xs: 1.15, md: 1.35 },
                }}
              >
                <Paper
                  sx={{
                    p: { xs: 1.7, md: 1.9 },
                    borderRadius: "20px",
                    bgcolor: alpha("#0f1321", 0.9),
                    border: `1px solid ${alpha("#ffffff", 0.12)}`,
                    position: "sticky",
                    top: { xs: 70, md: 80, lg: 14 },
                    zIndex: 7,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: alpha("#ffffff", 0.95) }}>
                    Milestone Progress
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.2, color: alpha("#ffffff", 0.68), lineHeight: 1.55 }}
                  >
                    Drag or tap to jump between core skills.
                  </Typography>
                  <Box
                    sx={{ mt: 1, px: { xs: 1.1, md: 1.45 }, pb: 0.2 }}
                  >
                    <Box
                      ref={topTrackRef}
                      onClick={(event) => jumpToPointerPosition(event.clientX)}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        dragTargetRef.current = "top";
                        setDraggingTarget("top");
                        setPointerPreview(event.clientX);
                      }}
                      sx={{
                        height: 11,
                        borderRadius: 999,
                        bgcolor: alpha("#ffffff", 0.14),
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
                          width: { xs: 24, md: 28 },
                          height: { xs: 24, md: 28 },
                          borderRadius: "50%",
                          border: `1.5px solid ${alpha("#ffffff", 0.36)}`,
                          bgcolor: alpha("#101726", 0.95),
                          p: "1.5px",
                          boxShadow: `0 0 0 1px ${alpha("#0b101b", 0.95)}`,
                          zIndex: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        >
                          <ProfileAvatar
                            size={24}
                            showFallback={showPortraitFallback}
                            onError={() => setShowPortraitFallback(true)}
                          />
                        </Box>
                      </Box>
                      {draggingTarget === "top" && dragPreviewIndex !== null ? (
                        <Paper
                          elevation={0}
                          sx={{
                            position: "absolute",
                            left: `${visualProgress * 100}%`,
                            top: -9,
                            transform: "translate(-50%, -100%)",
                            px: 0.8,
                            py: 0.25,
                            borderRadius: "10px",
                            border: `1px solid ${alpha("#8ec6ff", 0.55)}`,
                            bgcolor: alpha("#0f2034", 0.98),
                            pointerEvents: "none",
                            maxWidth: 180,
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
                  <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mt: 0.8 }}>
                    {offerViews.map((view, index) => (
                      <Button
                        key={view.id}
                        onClick={() => jumpToStep(index)}
                        color="inherit"
                        size="small"
                        sx={{
                          textTransform: "none",
                          minHeight: 24,
                          px: 0.9,
                          borderRadius: "999px",
                          border: `1px solid ${
                            index === activeIndex
                              ? alpha("#f5be42", 0.55)
                              : alpha("#ffffff", 0.2)
                          }`,
                          color:
                            index === activeIndex
                              ? alpha("#fff6d8", 0.98)
                              : alpha("#ffffff", 0.78),
                          bgcolor:
                            index === activeIndex
                              ? alpha("#5b4916", 0.5)
                              : alpha("#131b2a", 0.75),
                        }}
                      >
                        {view.label}
                      </Button>
                    ))}
                  </Stack>
                </Paper>

                <Box sx={{ position: "relative", minWidth: 0, mt: { xs: 1.8, md: 2 } }}>
                  <Box>
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
                        <Typography
                          variant="caption"
                          sx={{ display: { xs: "block", lg: "none" }, color: alpha("#ffffff", 0.65) }}
                        >
                          Swipe left/right to switch core skills. Scroll vertically to read details.
                        </Typography>

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

                        <Box
                          sx={{
                            display: "grid",
                            gap: 1.1,
                            gridTemplateColumns: {
                              xs: "1fr",
                              lg: "minmax(0, 0.95fr) minmax(0, 1.05fr)",
                            },
                            alignItems: "start",
                          }}
                        >
                          <Box>
                            <Typography variant="subtitle1" sx={{ color: alpha("#ffffff", 0.96), mb: 0.8 }}>
                              Worked on
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.7}>
                              {activeView.technologies.map((technology) => {
                                return (
                                  <TechnologyPin key={technology.id} technology={technology} />
                                );
                              })}
                            </Stack>
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
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
