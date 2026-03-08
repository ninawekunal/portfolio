"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ElementType } from "react";
import Image from "next/image";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
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
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import {
  offerHeading,
  offerViews,
  type OrbitNicheTechnique,
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
  onClick,
}: {
  technology: OrbitTechnology;
  onClick: (technology: OrbitTechnology) => void;
}) {
  const brandSrc = brandIconMap[technology.icon];
  const Icon = fallbackIconMap[technology.icon] ?? WidgetsRoundedIcon;

  const tooltipBody = (
    <Box sx={{ p: 0.4, maxWidth: 320 }}>
      <Typography variant="subtitle2">{technology.label}</Typography>
      <Typography
        variant="body2"
        sx={{ mt: 0.45, color: alpha("#ffffff", 0.88), lineHeight: 1.55 }}
      >
        {technology.summary}
      </Typography>
      {technology.subItems?.length ? (
        <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mt: 0.65 }}>
          {technology.subItems.map((item) => (
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
    </Box>
  );

  return (
    <Tooltip arrow title={tooltipBody}>
      <ButtonBase
        onClick={() => onClick(technology)}
        sx={{ borderRadius: "16px", textAlign: "left", minWidth: 0 }}
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
            transition: "all 140ms ease",
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
    </Tooltip>
  );
}

export function WhatIOfferSection() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const desktopTrackRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dragTargetRef = useRef<"desktop" | "mobile" | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const wheelLockRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTechnology, setSelectedTechnology] = useState<OrbitTechnology | null>(null);
  const [selectedNiche, setSelectedNiche] = useState<OrbitNicheTechnique | null>(null);
  const [showPortraitFallback, setShowPortraitFallback] = useState(false);

  const totalSteps = offerViews.length;
  const activeView: OfferView = offerViews[activeIndex] ?? offerViews[0];
  const progress = activeIndex / Math.max(totalSteps - 1, 1);

  const relatedProjects = useMemo(() => {
    if (!selectedTechnology) {
      return [];
    }

    return projects.filter((project) => selectedTechnology.projectIds.includes(project.id));
  }, [selectedTechnology]);

  const jumpToStep = useCallback((index: number) => {
    const root = scrollerRef.current;
    const node = stepRefs.current[index];

    if (!root || !node) {
      return;
    }

    root.scrollTo({ top: index === 0 ? 0 : node.offsetTop, behavior: "smooth" });
  }, []);

  const jumpToPointerPosition = useCallback(
    (clientCoordinate: number, target: "desktop" | "mobile") => {
      const track = target === "desktop" ? desktopTrackRef.current : mobileTrackRef.current;

      if (!track) {
        return;
      }

      const rect = track.getBoundingClientRect();
      const ratio =
        target === "desktop"
          ? clamp((clientCoordinate - rect.top) / Math.max(rect.height, 1), 0, 1)
          : clamp((clientCoordinate - rect.left) / Math.max(rect.width, 1), 0, 1);
      const nextIndex = clamp(Math.round(ratio * (totalSteps - 1)), 0, totalSteps - 1);

      jumpToStep(nextIndex);
    },
    [jumpToStep, totalSteps],
  );

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
  }, [syncActiveStep]);

  useEffect(() => {
    const root = scrollerRef.current;

    if (!root) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) {
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
      }, 360);
    };

    root.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      root.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, jumpToStep, totalSteps]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!dragTargetRef.current) {
        return;
      }

      jumpToPointerPosition(
        dragTargetRef.current === "desktop" ? event.clientY : event.clientX,
        dragTargetRef.current,
      );
    };

    const onPointerUp = () => {
      dragTargetRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [jumpToPointerPosition]);

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
                height: { xs: "74vh", md: "78vh", lg: "82vh" },
                overflowY: "auto",
                scrollSnapType: "y mandatory",
                overscrollBehavior: "contain",
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
                          jumpToPointerPosition(event.clientY, "desktop");
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
                            height: `${Math.max(progress * 420, 0)}px`,
                            bgcolor: alpha("#f5be42", 0.92),
                          }}
                        />

                        <Box
                          sx={{
                            position: "absolute",
                            left: 16,
                            top: `${Math.min(progress * 420, 418)}px`,
                            transform: "translate(-50%, -50%)",
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            border: `2px solid ${alpha("#ffffff", 0.28)}`,
                            bgcolor: alpha("#101726", 0.95),
                            overflow: "hidden",
                            zIndex: 3,
                          }}
                        >
                          {showPortraitFallback ? (
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
                          ) : (
                            <Box
                              component="img"
                              src="/profile_picture.jpeg"
                              alt="Kunal portrait"
                              onError={() => setShowPortraitFallback(true)}
                              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          )}
                        </Box>
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
                  <Box sx={{ position: "sticky", top: 10, zIndex: 2 }}>
                    <Paper
                      sx={{
                        p: { xs: 1.2, md: 1.5 },
                        borderRadius: "22px",
                        bgcolor: alpha("#0f1321", 0.93),
                        border: `1px solid ${alpha("#ffffff", 0.12)}`,
                        width: "100%",
                      }}
                    >
                      <Stack spacing={1.2}>
                        <Box sx={{ display: { xs: "block", lg: "none" } }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" sx={{ color: alpha("#ffffff", 0.84) }}>
                              Milestone {activeIndex + 1} / {totalSteps}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: alpha("#f5be42", 0.92) }}>
                              {activeView.label}
                            </Typography>
                          </Stack>

                          <Box
                            ref={mobileTrackRef}
                            onClick={(event) => jumpToPointerPosition(event.clientX, "mobile")}
                            onPointerDown={(event) => {
                              event.preventDefault();
                              dragTargetRef.current = "mobile";
                              jumpToPointerPosition(event.clientX, "mobile");
                            }}
                            sx={{
                              mt: 0.75,
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
                                width: `${progress * 100}%`,
                                height: "100%",
                                borderRadius: 999,
                                bgcolor: alpha("#f5be42", 0.92),
                              }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                left: `${progress * 100}%`,
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                border: `2px solid ${alpha("#ffffff", 0.24)}`,
                                bgcolor: alpha("#101726", 0.95),
                                overflow: "hidden",
                              }}
                            >
                              {showPortraitFallback ? (
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
                              ) : (
                                <Box
                                  component="img"
                                  src="/profile_picture.jpeg"
                                  alt="Kunal portrait"
                                  onError={() => setShowPortraitFallback(true)}
                                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                              )}
                            </Box>
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

                        <Stack spacing={0.65}>
                          {activeView.nicheTechniques.map((niche) => {
                            const nicheTooltip = (
                              <Box sx={{ p: 0.4, maxWidth: 320 }}>
                                <Typography variant="subtitle2">{niche.label}</Typography>
                                <Typography
                                  variant="body2"
                                  sx={{ mt: 0.45, color: alpha("#ffffff", 0.88), lineHeight: 1.58 }}
                                >
                                  {niche.proof}
                                </Typography>
                                {niche.subItems?.length ? (
                                  <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mt: 0.65 }}>
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
                            );

                            return (
                              <Tooltip key={niche.id} arrow title={nicheTooltip} disableTouchListener>
                                <ButtonBase
                                  onClick={() => setSelectedNiche(niche)}
                                  sx={{
                                    justifyContent: "flex-start",
                                    borderRadius: "14px",
                                    px: 0.4,
                                    py: 0.35,
                                  }}
                                >
                                  <Box sx={{ display: "flex", gap: 0.9, alignItems: "center" }}>
                                    <AutoAwesomeRoundedIcon
                                      sx={{ color: alpha("#f5be42", 0.94), fontSize: 17, flexShrink: 0 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: alpha("#ffffff", 0.86),
                                        fontWeight: 500,
                                        lineHeight: 1.5,
                                        textAlign: "left",
                                      }}
                                    >
                                      {niche.label}
                                    </Typography>
                                  </Box>
                                </ButtonBase>
                              </Tooltip>
                            );
                          })}
                        </Stack>

                        <Box>
                          <Typography variant="subtitle1" sx={{ color: alpha("#ffffff", 0.96), mb: 0.8 }}>
                            Technology pins
                          </Typography>
                          <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.7}>
                            {activeView.technologies.map((technology) => (
                              <TechnologyPin
                                key={technology.id}
                                technology={technology}
                                onClick={setSelectedTechnology}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>

                  <Stack spacing={0}>
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

      <Dialog
        open={Boolean(selectedNiche)}
        onClose={() => setSelectedNiche(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            bgcolor: alpha("#0c1018", 0.98),
            color: "#f7f9ff",
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: `1px solid ${alpha("#ffffff", 0.1)}` }}>
          {selectedNiche?.label}
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: alpha("#ffffff", 0.1) }}>
          <Stack spacing={1.1}>
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.84), lineHeight: 1.7 }}>
              {selectedNiche?.proof}
            </Typography>
            {selectedNiche?.subItems?.length ? (
              <Stack direction="row" flexWrap="wrap" gap={0.7}>
                {selectedNiche.subItems.map((item) => (
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
          </Stack>
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${alpha("#ffffff", 0.1)}` }}>
          <Button color="inherit" onClick={() => setSelectedNiche(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(selectedTechnology)}
        onClose={() => setSelectedTechnology(null)}
        fullWidth
        maxWidth="md"
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: "24px",
            bgcolor: alpha("#0c1018", 0.98),
            color: "#f7f9ff",
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: `1px solid ${alpha("#ffffff", 0.1)}` }}>
          <Stack spacing={0.6}>
            <Typography variant="h5">{selectedTechnology?.label}</Typography>
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.74) }}>
              {selectedTechnology?.summary}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: alpha("#ffffff", 0.1), maxHeight: "70vh" }}>
          <Stack spacing={1.2}>
            {relatedProjects.length > 0 ? (
              relatedProjects.map((project) => (
                <Paper
                  key={project.id}
                  variant="outlined"
                  sx={{
                    p: 1.3,
                    borderRadius: "16px",
                    bgcolor: alpha("#141b29", 0.95),
                    borderColor: alpha("#ffffff", 0.12),
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1.2,
                      gridTemplateColumns: { xs: "1fr", sm: "160px minmax(0, 1fr)" },
                    }}
                  >
                    <Paper variant="outlined" sx={{ borderRadius: "12px", overflow: "hidden" }}>
                      <Image
                        src={project.posterSrc}
                        alt={project.posterAlt}
                        width={640}
                        height={400}
                        style={{ display: "block", width: "100%", height: "auto" }}
                      />
                    </Paper>

                    <Stack spacing={0.8}>
                      <Typography variant="overline" sx={{ color: alpha("#ffffff", 0.7) }}>
                        {project.kicker}
                      </Typography>
                      <Typography variant="h6">{project.title}</Typography>
                      <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8), lineHeight: 1.66 }}>
                        {project.headline}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={0.7}>
                        {project.stack.slice(0, 6).map((item) => (
                          <Chip
                            key={item}
                            size="small"
                            label={item}
                            variant="outlined"
                            sx={{ borderColor: alpha("#ffffff", 0.18), color: alpha("#ffffff", 0.88) }}
                          />
                        ))}
                      </Stack>
                      <Box>
                        <Button
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          color="inherit"
                          variant="outlined"
                          startIcon={<OpenInNewRoundedIcon />}
                          sx={{ borderColor: alpha("#ffffff", 0.28) }}
                        >
                          View repository
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              ))
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: "16px",
                  bgcolor: alpha("#141b29", 0.95),
                  borderColor: alpha("#ffffff", 0.12),
                }}
              >
                <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.82), lineHeight: 1.7 }}>
                  This area is represented in production/resume work and architectural exposure, but
                  it does not yet have a dedicated public showcase repository in this portfolio.
                </Typography>
              </Paper>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid ${alpha("#ffffff", 0.1)}` }}>
          <Button color="inherit" onClick={() => setSelectedTechnology(null)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
