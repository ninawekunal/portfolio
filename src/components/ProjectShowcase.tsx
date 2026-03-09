"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
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

import { TechnologyPin } from "@/components/TechnologyPin";
import { type PortfolioProject, projectFilters, projects } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

const MAGIC_GRADIENT_START = "#ff3bb5";
const MAGIC_GRADIENT_END = "#ff7b38";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function LessonsList({
  project,
  itemColor,
}: {
  project: PortfolioProject;
  itemColor: string;
}) {
  return (
    <Stack spacing={0.72}>
      {project.lessonsLearned.map((item) => (
        <Stack key={item} direction="row" spacing={0.75} alignItems="flex-start">
          <LightbulbRoundedIcon
            sx={{
              fontSize: 16,
              color: alpha("#f5be42", 0.95),
              mt: "3px",
              flexShrink: 0,
            }}
          />
          <Typography variant="body2" sx={{ color: itemColor, lineHeight: 1.72 }}>
            {item}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export function ProjectShowcase() {
  const theme = useTheme();
  const isCompactScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[0]?.id ?? null);
  const [demoProject, setDemoProject] = useState<PortfolioProject | null>(null);
  const [mobileProjectDetail, setMobileProjectDetail] = useState<PortfolioProject | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

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

  const openLiveDemo = (project: PortfolioProject) => {
    if (!project.liveUrl) {
      return;
    }

    if (isCompactScreen) {
      setDemoProject(project);
      return;
    }

    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
  };

  const handleProjectCardClick = (project: PortfolioProject) => {
    setSelectedProjectId(project.id);

    if (isMobile) {
      setMobileProjectDetail(project);
    }
  };

  const scrollCarousel = (direction: "up" | "down") => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    const cards = Array.from(node.querySelectorAll("[data-project-card='true']")) as HTMLElement[];

    if (!cards.length) {
      return;
    }

    const currentScrollTop = node.scrollTop;
    let nearestIndex = 0;
    let smallestOffsetDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetTop - currentScrollTop);
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

    node.scrollTo({
      top: cards[nextIndex].offsetTop,
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
                  fontWeight: 500,
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
                Browse a vertical carousel of projects on the left and inspect implementation depth on the right.
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
                  <Stack direction="row" spacing={0.6}>
                    <IconButton
                      size="small"
                      aria-label="Scroll project carousel up"
                      onClick={() => scrollCarousel("up")}
                      sx={{ color: alpha("#ffffff", 0.82), border: `1px solid ${alpha("#ffffff", 0.22)}` }}
                    >
                      <KeyboardArrowUpRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="Scroll project carousel down"
                      onClick={() => scrollCarousel("down")}
                      sx={{ color: alpha("#ffffff", 0.82), border: `1px solid ${alpha("#ffffff", 0.22)}` }}
                    >
                      <KeyboardArrowDownRoundedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                <Box
                  ref={carouselRef}
                  sx={{
                    px: 1.2,
                    pb: 1.2,
                    maxHeight: { xs: "min(70dvh, 500px)", md: 570 },
                    overflowY: "auto",
                    overscrollBehaviorY: "contain",
                    scrollBehavior: "smooth",
                    scrollSnapType: { xs: "none", md: "y proximity" },
                    scrollPaddingTop: 4,
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
                            scrollSnapAlign: { xs: "none", md: "start" },
                            scrollSnapStop: { xs: "normal", md: "always" },
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
                                <Typography variant="subtitle1" sx={{ color: alpha("#ffffff", 0.97), fontWeight: 700 }}>
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
                                {project.headline}
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
                    position: "sticky",
                    top: "calc(env(safe-area-inset-top) + 104px)",
                    overflow: "hidden",
                    borderRadius: "28px",
                    border: `1px solid ${alpha("#ffffff", 0.18)}`,
                    bgcolor: alpha("#0f1321", 0.94),
                  }}
                >
                  <Stack spacing={1.3} sx={{ p: 1.6, borderBottom: `1px solid ${alpha("#ffffff", 0.12)}` }}>
                    <Typography variant="overline" sx={{ letterSpacing: "0.12em", color: alpha("#fff6d8", 0.9) }}>
                      Project Details
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 0.2, color: alpha("#ffffff", 0.97) }}>
                      {selectedProject.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: alpha("#dce8ff", 0.84), lineHeight: 1.66 }}>
                      {selectedProject.summary}
                    </Typography>
                    <Typography variant="caption" sx={{ color: alpha("#dce8ff", 0.74), lineHeight: 1.55 }}>
                      {selectedProject.demoInteractionHint ??
                        "Interact with this demo to inspect the primary workflow and state transitions."}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.7}>
                      {selectedProject.stack.map((item) => (
                        <TechnologyPin key={`${selectedProject.id}-${item}-detail`} label={item} />
                      ))}
                    </Stack>
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 0.45, color: alpha("#ffffff", 0.93) }}>
                        What I learned
                      </Typography>
                      <LessonsList project={selectedProject} itemColor={alpha("#e4ecff", 0.84)} />
                    </Box>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.05}>
                      <Button
                        href={selectedProject.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        variant="contained"
                        startIcon={<GitHubIcon />}
                        sx={{
                          backgroundImage: `linear-gradient(90deg, ${MAGIC_GRADIENT_START} 0%, ${MAGIC_GRADIENT_END} 100%)`,
                        }}
                      >
                        View repository
                      </Button>
                      <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<OpenInNewRoundedIcon />}
                        disabled={!selectedProject.liveUrl}
                        onClick={() => openLiveDemo(selectedProject)}
                        sx={{ borderColor: alpha("#ffffff", 0.34), color: alpha("#ffffff", 0.9) }}
                      >
                        Open live demo
                      </Button>
                    </Stack>
                  </Stack>

                  {selectedProject.liveUrl && !isMobile ? (
                    <Box sx={{ width: "100%", height: "66dvh", minHeight: 460, bgcolor: "#ffffff" }}>
                      <Box
                        component="iframe"
                        src={selectedProject.liveUrl}
                        title={`${selectedProject.title} live demo`}
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        sx={{ width: "100%", height: "100%", border: 0, display: "block" }}
                      />
                    </Box>
                  ) : (
                    <Stack spacing={1.2} sx={{ p: 1.7 }}>
                      <Paper
                        variant="outlined"
                        sx={{
                          overflow: "hidden",
                          borderRadius: "18px",
                          bgcolor: alpha("#0a1528", 0.75),
                          borderColor: alpha("#ffffff", 0.16),
                        }}
                      >
                        <Image
                          src={withBasePath(selectedProject.posterSrc)}
                          alt={selectedProject.posterAlt}
                          width={960}
                          height={720}
                          priority={selectedProject.id === projects[0].id}
                          style={{ display: "block", width: "100%", height: "auto" }}
                        />
                      </Paper>
                    </Stack>
                  )}
                </Paper>
              ) : null}
            </Box>
          </Stack>
        </Paper>
      </Container>

      <Dialog
        open={Boolean(mobileProjectDetail && isMobile)}
        onClose={() => setMobileProjectDetail(null)}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            pr: 1,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ lineHeight: 1.24 }}>
              {mobileProjectDetail?.title}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.32 }}>
              {mobileProjectDetail?.kicker}
            </Typography>
          </Box>
          <IconButton aria-label="Close project details" onClick={() => setMobileProjectDetail(null)}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0.4 }}>
          {mobileProjectDetail ? (
            <Stack spacing={1.2}>
              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.68 }}>
                {mobileProjectDetail.summary}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.55 }}>
                {mobileProjectDetail.demoInteractionHint ??
                  "Interact with this demo to inspect the primary workflow and state transitions."}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.7}>
                {mobileProjectDetail.stack.map((item) => (
                  <TechnologyPin key={`${mobileProjectDetail.id}-${item}-mobile-detail`} label={item} />
                ))}
              </Stack>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 0.45 }}>
                  What I learned
                </Typography>
                <LessonsList project={mobileProjectDetail} itemColor="text.primary" />
              </Box>
              <Stack spacing={0.9}>
                <Button
                  href={mobileProjectDetail.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  startIcon={<GitHubIcon />}
                  sx={{
                    backgroundImage: `linear-gradient(90deg, ${MAGIC_GRADIENT_START} 0%, ${MAGIC_GRADIENT_END} 100%)`,
                  }}
                >
                  View repository
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<OpenInNewRoundedIcon />}
                  disabled={!mobileProjectDetail.liveUrl}
                  onClick={() => {
                    openLiveDemo(mobileProjectDetail);
                    setMobileProjectDetail(null);
                  }}
                >
                  Open live demo
                </Button>
              </Stack>
            </Stack>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(demoProject)}
        onClose={() => setDemoProject(null)}
        maxWidth="xl"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : "20px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            pr: 1,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              {demoProject?.title} · Live demo
            </Typography>
            {demoProject?.liveUrl ? (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mt: 0.4, lineHeight: 1.55 }}
              >
                {demoProject.demoInteractionHint ??
                  "Interact with the demo to inspect the main flow and transitions."}
              </Typography>
            ) : null}
          </Box>
          <IconButton aria-label="Close live demo" onClick={() => setDemoProject(null)}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {demoProject?.liveUrl ? (
            <Box sx={{ width: "100%", height: { xs: "calc(100dvh - 112px)", md: "80dvh" }, bgcolor: "#ffffff" }}>
              <Box
                component="iframe"
                src={demoProject.liveUrl}
                title={`${demoProject.title} live demo`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                sx={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            </Box>
          ) : (
            <Box sx={{ p: 2.2 }}>
              <Typography variant="body2" color="text.secondary">
                This project does not currently expose a live demo URL.
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
