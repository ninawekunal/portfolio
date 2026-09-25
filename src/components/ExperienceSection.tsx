"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
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
  type CareerEntry,
  type ExperienceProject,
  type ExperienceSkill,
} from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";
import { numericSx } from "@/lib/typography";

const ACCENT = "#c75b1e";

function SkillAccordion({
  skill,
  expanded,
  onToggle,
}: {
  skill: ExperienceSkill;
  expanded: boolean;
  onToggle: () => void;
}) {
  const fullText = `${skill.skill} ${skill.whereApplied}`.toLowerCase();
  const skillBrandLogo =
    fullText.includes("splunk")
      ? "/brand-icons/splunk.svg"
      : fullText.includes("datadog")
        ? "/brand-icons/datadog.svg"
        : fullText.includes("pagerduty")
          ? "/brand-icons/pagerduty.svg"
          : null;
  const SkillIconComponent = fullText.includes("mfa") || fullText.includes("sms")
    ? SmsRoundedIcon
    : fullText.includes("acr")
      ? LockRoundedIcon
      : fullText.includes("feature flag")
        ? TuneRoundedIcon
        : fullText.includes("centralized identity") || fullText.includes("identity")
            ? PersonRoundedIcon
            : fullText.includes("rest") || fullText.includes("api")
              ? ApiRoundedIcon
              : AutoAwesomeRoundedIcon;

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
          {skillBrandLogo ? (
            <Box
              component="img"
              src={withBasePath(skillBrandLogo)}
              alt={`${skill.skill} icon`}
              sx={{
                width: 18,
                height: 18,
                mt: 0.2,
                objectFit: "contain",
                flexShrink: 0,
                p: 0.2,
                bgcolor: "#ffffff",
                borderRadius: "6px",
              }}
            />
          ) : (
            <SkillIconComponent
              sx={{
                color: alpha("#f5be42", 0.95),
                fontSize: 17,
                mt: 0.22,
                flexShrink: 0,
              }}
            />
          )}
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
          <Typography variant="subtitle2" component="h5" sx={{ lineHeight: 1.28 }}>
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


function RoleTimeline({
  entries,
  activeIndex,
  onSelect,
}: {
  entries: CareerEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;

    if (!step) return;

    event.preventDefault();
    const next = Math.min(Math.max(index + step, 0), entries.length - 1);
    onSelect(next);
    itemRefs.current[next]?.focus();
  };

  return (
    <Timeline
      aria-label="Roles, newest first"
      sx={{
        m: 0,
        p: 0,
        [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
      }}
    >
      {entries.map((entry, index) => {
        const isActive = index === activeIndex;
        const isLast = index === entries.length - 1;

        return (
          <TimelineItem key={entry.company} sx={{ minHeight: 0 }}>
            <TimelineSeparator>
              <TimelineDot
                variant={isActive ? "filled" : "outlined"}
                sx={{
                  my: 1.4,
                  boxShadow: "none",
                  borderWidth: 2,
                  borderColor: isActive ? ACCENT : alpha("#132433", 0.28),
                  bgcolor: isActive ? ACCENT : "#fffdf8",
                  transition: "background-color 160ms ease, border-color 160ms ease",
                }}
              />
              {isLast ? null : <TimelineConnector sx={{ bgcolor: alpha("#132433", 0.14), width: 2 }} />}
            </TimelineSeparator>
            <TimelineContent sx={{ py: 0.5, pr: 0, pl: 1.2 }}>
              <ButtonBase
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                onClick={() => onSelect(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                aria-current={isActive ? "true" : undefined}
                sx={{
                  width: "100%",
                  display: "block",
                  textAlign: "left",
                  borderRadius: "12px",
                  px: 1.1,
                  py: 0.8,
                  border: "1px solid",
                  borderColor: isActive ? alpha(ACCENT, 0.35) : "transparent",
                  bgcolor: isActive ? alpha(ACCENT, 0.08) : "transparent",
                  transition: "background-color 160ms ease, border-color 160ms ease",
                  "&:hover": { bgcolor: isActive ? alpha(ACCENT, 0.1) : alpha("#132433", 0.05) },
                }}
              >
                <Typography
                  component="span"
                  sx={{ display: "block", fontWeight: 700, fontSize: "0.98rem", lineHeight: 1.3, color: isActive ? "primary.dark" : "text.primary" }}
                >
                  {entry.company}
                </Typography>
                <Typography component="span" variant="body2" sx={{ display: "block", color: "text.secondary", lineHeight: 1.4 }}>
                  {entry.role}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ ...numericSx, fontWeight: 500, display: "block", color: alpha("#132433", 0.6), mt: 0.3 }}
                >
                  {entry.period}
                </Typography>
              </ButtonBase>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

export function ExperienceSection() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const headingRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSkillsByCompany, setExpandedSkillsByCompany] = useState<Record<string, string | null>>({});
  const [projectDialog, setProjectDialog] = useState<{
    company: string;
    project: ExperienceProject;
  } | null>(null);

  const activeEntry = experienceTimeline[activeIndex] ?? experienceTimeline[0];
  const activeCompanyExpandedSkill = expandedSkillsByCompany[activeEntry.company] ?? null;

  const selectRole = (index: number) => {
    setActiveIndex(index);

    // On a phone the detail sits under the timeline, so bring it into view.
    if (!isDesktop) {
      window.requestAnimationFrame(() => headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        pt: { xs: 2.8, md: 3.5 },
        pb: { xs: 4.8, md: 5.6 },
        scrollMarginTop: 100,
      }}
    >
      <Container maxWidth="xl">
        <Paper
          sx={{
            p: { xs: 1.35, md: 2.2 },
            borderRadius: "32px",
            bgcolor: alpha("#fff8ee", 0.92),
            border: `1px solid ${alpha("#132433", 0.1)}`,
          }}
        >
          <Stack spacing={3}>
            <SectionHeading
              eyebrow="Experience"
              title="Where I have worked"
              body="Newest first. Pick a role on the timeline, then open a project or a skill for the detail behind it."
            />

            <Box
              sx={{
                display: "grid",
                gap: 1.6,
                alignItems: "start",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "minmax(260px, 320px) minmax(0, 1fr)",
                },
              }}
            >
              <Paper
                sx={{
                  p: { xs: 1.1, md: 1.4 },
                  borderRadius: "22px",
                  bgcolor: "#fffdf8",
                  position: { md: "sticky" },
                  top: { md: "calc(var(--site-header-height, 96px) + 16px)" },
                }}
              >
                <RoleTimeline entries={experienceTimeline} activeIndex={activeIndex} onSelect={selectRole} />
              </Paper>

              <Paper
                sx={{
                  borderRadius: "30px",
                  bgcolor: alpha("#fffdf8", 0.88),
                  px: { xs: 1.4, md: 1.8 },
                  py: { xs: 1.4, md: 1.8 },
                  scrollMarginTop: 120,
                }}
                ref={headingRef}
              >
                <Stack spacing={1.35}>
                  <Stack spacing={0.68}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          fontSize: { xs: "1.38rem", sm: "1.5rem", md: "2rem" },
                          fontWeight: 800,
                          color: "primary.dark",
                          minWidth: 0,
                          lineHeight: 1.22,
                        }}
                      >
                        {activeEntry.company}
                      </Typography>
                      <Chip
                        size="small"
                        icon={<PlaceRoundedIcon sx={{ fontSize: 16 }} />}
                        label={activeEntry.location}
                        variant="outlined"
                        sx={{
                          maxWidth: { xs: "52%", sm: "none" },
                          bgcolor: alpha("#ffffff", 0.74),
                          borderColor: alpha("#132433", 0.15),
                          "& .MuiChip-label": {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        }}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Typography variant="subtitle1" sx={{ color: "text.secondary", fontWeight: 600, minWidth: 0 }}>
                        {activeEntry.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ ...numericSx, fontWeight: 500, color: "text.secondary", flexShrink: 0, textAlign: "right" }}
                      >
                        {activeEntry.period}
                      </Typography>
                    </Stack>
                  </Stack>

                  {activeEntry.projects?.length ? (
                    <Stack spacing={0.9}>
                      <Typography variant="subtitle1" component="h4">
                        Projects
                      </Typography>
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
                      <Typography variant="subtitle1" component="h4">
                        Skills, with where I used them
                      </Typography>
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
              </Paper>
            </Box>
          </Stack>
        </Paper>
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
                      <Typography variant="subtitle2" sx={{ ...numericSx, lineHeight: 1.22 }}>
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
