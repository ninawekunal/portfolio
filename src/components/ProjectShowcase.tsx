"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  Box,
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
import { TechnologyPin } from "@/components/TechnologyPin";
import { type PortfolioProject, projectFilters, projects } from "@/data/portfolio";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ProjectShowcase() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id ?? null);
  const [mobileProjectDetail, setMobileProjectDetail] = useState<PortfolioProject | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselScrollState, setCarouselScrollState] = useState(() => ({
    hasOverflow: false,
    canScrollUp: false,
    canScrollDown: false,
  }));

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(activeFilter)),
    [activeFilter],
  );

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ??
    filteredProjects[0] ??
    null;

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  const stepProject = (delta: number) => {
    const total = filteredProjects.length;

    if (!total) return;

    const next = filteredProjects[(((selectedIndex + delta) % total) + total) % total];
    setSelectedProjectId(next.id);

    if (mobileProjectDetail) setMobileProjectDetail(next);
  };

  const handleProjectCardClick = (project: PortfolioProject) => {
    setSelectedProjectId(project.id);

    if (isMobile) {
      setMobileProjectDetail(project);
    }
  };

  const updateCarouselScrollState = useCallback(() => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const hasOverflow = node.scrollHeight > node.clientHeight + 1;
    const canScrollUp = node.scrollTop > 0;
    const canScrollDown = node.scrollTop + node.clientHeight < node.scrollHeight - 1;

    setCarouselScrollState((prev) => {
      if (
        prev.hasOverflow === hasOverflow &&
        prev.canScrollUp === canScrollUp &&
        prev.canScrollDown === canScrollDown
      ) {
        return prev;
      }

      return { hasOverflow, canScrollUp, canScrollDown };
    });
  }, []);

  useEffect(() => {
    updateCarouselScrollState();

    const node = carouselRef.current;
    if (!node) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => updateCarouselScrollState());
    resizeObserver.observe(node);

    window.addEventListener("resize", updateCarouselScrollState, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateCarouselScrollState);
    };
  }, [updateCarouselScrollState, filteredProjects.length]);

  const scrollCarousel = (direction: "up" | "down") => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const cards = Array.from(node.querySelectorAll("[data-project-card='true']")) as HTMLElement[];

    if (!cards.length) {
      return;
    }

    const nodeRect = node.getBoundingClientRect();
    const currentScrollTop = node.scrollTop;
    let nearestIndex = 0;
    let smallestOffsetDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardScrollTop = currentScrollTop + (cardRect.top - nodeRect.top);
      const distance = Math.abs(cardScrollTop - currentScrollTop);
      if (distance < smallestOffsetDistance) {
        smallestOffsetDistance = distance;
        nearestIndex = index;
      }
    });

    const nextIndex = clamp(
      nearestIndex + (direction === "down" ? 1 : -1),
      0,
      cards.length - 1,
    );

    const targetRect = cards[nextIndex].getBoundingClientRect();
    const targetScrollTop = currentScrollTop + (targetRect.top - nodeRect.top);

    node.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  };

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 5, md: 6 }, scrollMarginTop: 100 }}>
      <Container maxWidth="xl">
        <Paper
          sx={{
            p: { xs: 2.1, md: 3.1 },
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
          <Stack spacing={3}>
            <Stack spacing={1.5} sx={{ maxWidth: 820, mx: "auto", textAlign: "center" }}>
              <Typography
                variant="overline"
                sx={{
                  fontSize: { xs: "0.88rem", md: "1.02rem" },
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  opacity: 0.78,
                  display: "block",
                }}
              >
                PROJECT SHOWCASE
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "2.55rem" },
                  color: alpha("#ffffff", 0.97),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 0.35,
                }}
              >
                Interactive proof of
                <Box
                  component="span"
                  sx={{
                    fontStyle: "italic",
                    display: "inline-block",
                    pr: "0.3em",
                    backgroundImage: "linear-gradient(90deg, #ff3bb5 0%, #ff7b38 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  skills
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ color: alpha("#e4ecff", 0.84), lineHeight: 1.72 }}>
                Side projects with the code public. Pick one to see why I built it, what it does, what it taught me, and how it ships.
              </Typography>
            </Stack>

            <Stack direction="row" gap={1} flexWrap="wrap">
              {projectFilters.map((filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  clickable
                  onClick={() => {
                    setActiveFilter(filter);
                    const nextProjects =
                      filter === "All"
                        ? projects
                        : projects.filter((project) => project.tags.includes(filter));
                    setSelectedProjectId(nextProjects[0]?.id ?? null);
                    setMobileProjectDetail(null);
                  }}
                  variant="outlined"
                  sx={{
                    borderColor:
                      activeFilter === filter
                        ? alpha("#f5be42", 0.55)
                        : alpha("#ffffff", 0.2),
                    color:
                      activeFilter === filter
                        ? alpha("#fff6d8", 0.98)
                        : alpha("#dce8ff", 0.86),
                    bgcolor:
                      activeFilter === filter
                        ? alpha("#5b4916", 0.5)
                        : alpha("#101726", 0.82),
                  }}
                />
              ))}
            </Stack>

            <Box
              sx={{
                display: "grid",
                gap: 2.2,
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "minmax(340px, 0.54fr) minmax(0, 1fr)",
                },
                alignItems: "start",
              }}
            >
              <Paper
                sx={{
                  borderRadius: "22px",
                  bgcolor: alpha("#0f1321", 0.82),
                  border: `1px solid ${alpha("#ffffff", 0.16)}`,
                  overflow: "hidden",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1.2, py: 1 }}>
                  <Typography variant="subtitle2" sx={{ color: alpha("#ffffff", 0.9) }}>
                    Project carousel
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.6}
                    sx={{
                      opacity: carouselScrollState.hasOverflow ? 1 : 0,
                      pointerEvents: carouselScrollState.hasOverflow ? "auto" : "none",
                      transition: "opacity 180ms ease",
                    }}
                  >
                    <IconButton
                      size="small"
                      aria-label="Scroll project carousel up"
                      onClick={() => scrollCarousel("up")}
                      disabled={!carouselScrollState.canScrollUp}
                      sx={{ color: alpha("#ffffff", 0.82), border: `1px solid ${alpha("#ffffff", 0.22)}` }}
                    >
                      <KeyboardArrowUpRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Scroll project carousel down"
                      onClick={() => scrollCarousel("down")}
                      disabled={!carouselScrollState.canScrollDown}
                      sx={{ color: alpha("#ffffff", 0.82), border: `1px solid ${alpha("#ffffff", 0.22)}` }}
                    >
                      <KeyboardArrowDownRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                <Box
                  ref={carouselRef}
                  tabIndex={0}
                  aria-label="Project carousel list"
                  onWheel={(event) => {
                    const node = carouselRef.current;
                    if (!node) {
                      return;
                    }

                    if (node.scrollHeight <= node.clientHeight) {
                      return;
                    }

                    const scrollingUp = event.deltaY < 0;
                    const scrollingDown = event.deltaY > 0;
                    const atTop = node.scrollTop <= 0;
                    const atBottom = Math.ceil(node.scrollTop + node.clientHeight) >= node.scrollHeight;

                    if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
                      return;
                    }

                    event.preventDefault();
                    node.scrollTop += event.deltaY;
                  }}
                  onScroll={() => updateCarouselScrollState()}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      scrollCarousel("up");
                      return;
                    }

                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      scrollCarousel("down");
                      return;
                    }

                    const node = carouselRef.current;
                    if (!node) {
                      return;
                    }

                    if (event.key === "PageUp") {
                      event.preventDefault();
                      node.scrollBy({ top: -node.clientHeight * 0.9, behavior: "smooth" });
                      return;
                    }

                    if (event.key === "PageDown") {
                      event.preventDefault();
                      node.scrollBy({ top: node.clientHeight * 0.9, behavior: "smooth" });
                      return;
                    }

                    if (event.key === "Home") {
                      event.preventDefault();
                      node.scrollTo({ top: 0, behavior: "smooth" });
                      return;
                    }

                    if (event.key === "End") {
                      event.preventDefault();
                      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
                    }
                  }}
                  sx={{
                    px: 1.2,
                    pb: 1.2,
                    maxHeight: { xs: "min(52dvh, 420px)", md: 600 },
                    overflowY: "auto",
                    overscrollBehaviorY: "contain",
                    scrollBehavior: "auto",
                    scrollbarGutter: "stable",
                    WebkitOverflowScrolling: "touch",
                    outline: "none",
                  }}
                >
                  <Stack spacing={1.2}>
                    {filteredProjects.map((project) => {
                      const isSelected = selectedProject?.id === project.id;

                      return (
                        <Paper
                          data-project-card="true"
                          key={project.id}
                          sx={{
                            overflow: "hidden",
                            borderRadius: "20px",
                            minHeight: { xs: "auto", md: 172 },
                            bgcolor: isSelected ? alpha("#1b2235", 0.95) : alpha("#0f1321", 0.9),
                            border: `1px solid ${
                              isSelected ? alpha("#f6b4e8", 0.42) : alpha("#ffffff", 0.16)
                            }`,
                            transition: "border-color 180ms ease, background-color 180ms ease, transform 180ms ease",
                          }}
                        >
                          <ButtonBase
                            onClick={() => handleProjectCardClick(project)}
                            sx={{
                              width: "100%",
                              textAlign: "left",
                              px: { xs: 1.4, md: 1.6 },
                              py: { xs: 1.25, md: 1.35 },
                              alignItems: "flex-start",
                            }}
                          >
                            <Stack spacing={0.75} sx={{ width: "100%", minWidth: 0 }}>
                              <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" useFlexGap>
                                <Typography
                                  variant="subtitle1"
                                  component="h3"
                                  sx={{ color: alpha("#ffffff", 0.97), fontWeight: 700 }}
                                >
                                  {project.title}
                                </Typography>
                                <Chip
                                  label={project.kicker}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha("#3a1835", 0.92),
                                    border: `1px solid ${alpha("#f6b4e8", 0.58)}`,
                                    color: alpha("#ffe7f8", 0.96),
                                  }}
                                />
                              </Stack>

                              <Typography variant="body2" sx={{ lineHeight: 1.62, color: alpha("#e4ecff", 0.82) }}>
                                {plainText(project.headline)}
                              </Typography>

                              <Stack direction="row" flexWrap="wrap" gap={0.55}>
                                {project.stack.slice(0, 5).map((item) => (
                                  <TechnologyPin key={`${project.id}-${item}-carousel`} label={item} />
                                ))}
                                {project.stack.length > 5 ? (
                                  <Chip
                                    size="small"
                                    label={`+${project.stack.length - 5}`}
                                    variant="outlined"
                                    sx={{
                                      borderColor: alpha("#ffffff", 0.28),
                                      color: alpha("#dce8ff", 0.84),
                                    }}
                                  />
                                ) : null}
                              </Stack>
                            </Stack>
                          </ButtonBase>
                        </Paper>
                      );
                    })}
                  </Stack>
                </Box>
              </Paper>

              {selectedProject && !isMobile ? (
                <Paper
                  sx={{
                    position: { lg: "sticky" },
                    top: "calc(var(--site-header-height, 96px) + 12px)",
                    height: 660,
                    overflow: "hidden",
                    borderRadius: "28px",
                    border: `1px solid ${alpha("#ffffff", 0.18)}`,
                    bgcolor: alpha("#0f1321", 0.94),
                  }}
                >
                  <ProjectDetail
                    project={selectedProject}
                    tone="dark"
                    position={{ index: selectedIndex, total: filteredProjects.length }}
                    onPrev={() => stepProject(-1)}
                    onNext={() => stepProject(1)}
                  />
                </Paper>
              ) : null}
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Dialog
        open={Boolean(mobileProjectDetail && isMobile)}
        onClose={() => setMobileProjectDetail(null)}
        fullScreen
        slotProps={{ paper: { sx: { bgcolor: "#0f1321", border: "none" } } }}
      >
        <IconButton
          aria-label="Close project details"
          onClick={() => setMobileProjectDetail(null)}
          sx={{ position: "absolute", top: 10, right: 10, zIndex: 3, color: alpha("#ffffff", 0.9) }}
        >
          <CloseRoundedIcon />
        </IconButton>
        {mobileProjectDetail ? (
          <ProjectDetail
            project={mobileProjectDetail}
            tone="dark"
            position={{ index: selectedIndex, total: filteredProjects.length }}
            onPrev={() => stepProject(-1)}
            onNext={() => stepProject(1)}
          />
        ) : null}
      </Dialog>
    </Box>
  );
}
