"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  Box,
  Button,
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

import { TechnologyPin } from "@/components/TechnologyPin";
import { type PortfolioProject, projectFilters, projects } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

const MAGIC_GRADIENT_START = "#ff3bb5";
const MAGIC_GRADIENT_END = "#ff7b38";

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
        <Stack
          key={item}
          direction="row"
          spacing={0.75}
          alignItems="flex-start"
        >
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
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [demoProject, setDemoProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(activeFilter)),
    [activeFilter],
  );

  const selectedProject =
    filteredProjects.find((project) => project.id === expandedProjectId) ?? filteredProjects[0] ?? null;

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
            <Stack spacing={1.5} sx={{ maxWidth: 860, mx: "auto", textAlign: "center" }}>
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
                Use the cards to inspect project implementation details while the right panel keeps the selected
                project preview active on desktop.
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

                    if (!nextProjects.length) {
                      setExpandedProjectId(null);
                      return;
                    }

                    setExpandedProjectId(null);
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
                  lg: "minmax(340px, 0.62fr) minmax(0, 1fr)",
                },
                alignItems: "start",
              }}
            >
              <Stack spacing={1.5}>
                {filteredProjects.map((project) => {
                  const isExpanded = expandedProjectId === project.id;

                  return (
                    <Paper
                      key={project.id}
                      sx={{
                        overflow: "hidden",
                        borderRadius: "24px",
                        bgcolor: isExpanded ? alpha("#0f1321", 0.94) : alpha("#0f1321", 0.86),
                        border: `1px solid ${
                          isExpanded ? alpha("#f6b4e8", 0.4) : alpha("#ffffff", 0.16)
                        }`,
                        transition: "border-color 180ms ease, box-shadow 180ms ease",
                      }}
                    >
                      <ButtonBase
                        onClick={() =>
                          setExpandedProjectId((previous) => (previous === project.id ? null : project.id))
                        }
                        sx={{
                          width: "100%",
                          textAlign: "left",
                          px: { xs: 1.55, md: 2.1 },
                          py: { xs: 1.45, md: 1.7 },
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 1,
                        }}
                      >
                        <Stack spacing={0.8} sx={{ minWidth: 0 }}>
                          <Stack direction="row" spacing={0.85} alignItems="center" flexWrap="wrap" useFlexGap>
                            <Typography variant="h6" sx={{ lineHeight: 1.18, color: alpha("#ffffff", 0.97) }}>
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

                          <Typography variant="body2" sx={{ lineHeight: 1.66, color: alpha("#e4ecff", 0.82) }}>
                            {project.headline}
                          </Typography>

                          <Stack direction="row" flexWrap="wrap" gap={0.75}>
                            {project.tags.map((tag) => (
                              <Chip
                                key={tag}
                                size="small"
                                label={tag}
                                variant="outlined"
                                sx={{
                                  borderColor: alpha("#ffffff", 0.2),
                                  color: alpha("#dce8ff", 0.86),
                                }}
                              />
                            ))}
                          </Stack>

                          <Stack direction="row" flexWrap="wrap" gap={0.55}>
                            {project.stack.slice(0, 6).map((item) => (
                              <TechnologyPin key={`${project.id}-${item}-collapsed`} label={item} />
                            ))}
                            {project.stack.length > 6 ? (
                              <Chip
                                size="small"
                                label={`+${project.stack.length - 6}`}
                                variant="outlined"
                                sx={{
                                  borderColor: alpha("#ffffff", 0.28),
                                  color: alpha("#dce8ff", 0.84),
                                }}
                              />
                            ) : null}
                          </Stack>
                        </Stack>

                        <ExpandMoreRoundedIcon
                          sx={{
                            mt: 0.35,
                            color: alpha("#dce8ff", 0.82),
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 180ms ease",
                          }}
                        />
                      </ButtonBase>

                      <Collapse in={isExpanded} timeout={220} unmountOnExit>
                        <Stack spacing={1.5} sx={{ px: { xs: 1.55, md: 2.1 }, pb: { xs: 1.55, md: 2.1 } }}>
                          <Box>
                            <Typography variant="subtitle2" sx={{ mb: 0.5, color: alpha("#ffffff", 0.93) }}>
                              What I learned
                            </Typography>
                            <LessonsList project={project} itemColor={alpha("#e4ecff", 0.84)} />
                          </Box>

                          <Paper
                            variant="outlined"
                            sx={{
                              borderRadius: "18px",
                              px: 1.6,
                              py: 1.2,
                              bgcolor: alpha("#0a1528", 0.78),
                              borderColor: alpha("#ffffff", 0.15),
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ color: alpha("#ffffff", 0.95) }}>
                              Scope owned
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 0.45, lineHeight: 1.68, color: alpha("#dce8ff", 0.82) }}>
                              {project.role}
                            </Typography>
                          </Paper>

                          <Box>
                            <Typography variant="subtitle2" sx={{ mb: 0.75, color: alpha("#ffffff", 0.93) }}>
                              Relevant stack
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={0.7}>
                              {project.stack.map((item) => (
                                <TechnologyPin key={`${project.id}-${item}`} label={item} />
                              ))}
                            </Stack>
                          </Box>

                          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.1}>
                            <Button
                              href={project.repoUrl}
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
                              disabled={!project.liveUrl}
                              onClick={() => openLiveDemo(project)}
                              sx={{ borderColor: alpha("#ffffff", 0.34), color: alpha("#ffffff", 0.9) }}
                            >
                              Open live demo
                            </Button>

                          </Stack>
                        </Stack>
                      </Collapse>
                    </Paper>
                  );
                })}
              </Stack>

              {selectedProject ? (
                <Paper
                  sx={{
                    display: { xs: "none", lg: "block" },
                    position: "sticky",
                    top: "calc(env(safe-area-inset-top) + 104px)",
                    overflow: "hidden",
                    borderRadius: "28px",
                    border: `1px solid ${alpha("#ffffff", 0.18)}`,
                    bgcolor: alpha("#0f1321", 0.94),
                  }}
                >
                  <Box sx={{ p: 1.7, borderBottom: `1px solid ${alpha("#ffffff", 0.12)}` }}>
                    <Typography variant="overline" sx={{ letterSpacing: "0.12em", color: alpha("#fff6d8", 0.9) }}>
                      Live Project Preview
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 0.2, color: alpha("#ffffff", 0.97) }}>
                      {selectedProject.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.35, color: alpha("#dce8ff", 0.82), lineHeight: 1.6 }}>
                      {selectedProject.demoInteractionHint ??
                        "Interact with this demo to inspect the primary workflow and state transitions."}
                    </Typography>
                  </Box>

                  {selectedProject.liveUrl ? (
                    <Box sx={{ width: "100%", height: "78dvh", minHeight: 560, bgcolor: "#ffffff" }}>
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
                      <Typography variant="body2" sx={{ color: alpha("#dce8ff", 0.8) }}>
                        No live deployment for this project yet. Diagram preview shown instead.
                      </Typography>
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
              <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.4, lineHeight: 1.55 }}>
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
