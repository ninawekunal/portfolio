"use client";

import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { RichText } from "@/components/RichText";
import { CarlCard } from "@/components/WinCarl";
import { expertiseAreas, type StoryRef } from "@/data/expertise";
import { roleStories } from "@/data/roleStories";
import { wins } from "@/data/wins";

const INK = "#132433";

type Story = {
  key: string;
  title: string;
  company: string;
  context: string;
  action: string[];
  result: string;
  learning?: string;
};

function resolveStory(ref: StoryRef): Story | null {
  if (ref.source === "win") {
    const win = wins.find((item) => item.id === ref.id);
    if (!win) return null;
    return {
      key: `win-${win.id}`,
      title: win.title,
      company: win.company === "Expedia" ? "Expedia Group" : (win.company ?? "OpenCFO"),
      context: win.context,
      action: win.action,
      result: win.result,
      learning: win.learning,
    };
  }
  for (const [company, stories] of Object.entries(roleStories)) {
    const story = stories.find((item) => item.id === ref.id);
    if (story) {
      return {
        key: `role-${story.id}`,
        title: story.title,
        company,
        context: story.context,
        action: story.action,
        result: story.result,
        learning: story.learning,
      };
    }
  }
  return null;
}

const areas = expertiseAreas.map((area) => ({
  ...area,
  resolved: area.stories.map(resolveStory).filter((story): story is Story => story !== null),
}));

/** Work grouped by area: each story is a one-line TL;DR that opens to its context, action and learning. */
export function ExpertiseSection() {
  const [areaIndex, setAreaIndex] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(areas[0]?.resolved[0]?.key ?? null);

  const area = areas[areaIndex];
  if (!area) return null;

  return (
    <Box component="section" sx={{ mt: { xs: 5, md: 7 } }}>
      <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 600 }}>
        What I have done, by area
      </Typography>
      <Tabs
        value={areaIndex}
        onChange={(_event, value: number) => {
          setAreaIndex(value);
          setExpanded(areas[value]?.resolved[0]?.key ?? null);
        }}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Areas of work"
        sx={{ mt: 1.6, borderBottom: `1px solid ${alpha(INK, 0.12)}` }}
      >
        {areas.map((item) => (
          <Tab key={item.id} label={item.label} sx={{ textTransform: "none", fontWeight: 600 }} />
        ))}
      </Tabs>

      <Typography variant="body1" sx={{ mt: 2, color: alpha(INK, 0.72), lineHeight: 1.7 }}>
        {area.summary}
      </Typography>

      <Stack spacing={1.2} sx={{ mt: 2 }}>
        {area.resolved.map((item) => (
          <Accordion
            key={item.key}
            expanded={expanded === item.key}
            onChange={(_event, open) => setExpanded(open ? item.key : null)}
            disableGutters
            elevation={0}
            sx={{
              borderRadius: "14px !important",
              border: `1px solid ${alpha(INK, 0.12)}`,
              bgcolor: alpha("#ffffff", 0.86),
              "&::before": { display: "none" },
              overflow: "hidden",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon />}
              aria-controls={`${item.key}-content`}
              id={`${item.key}-header`}
              sx={{ px: { xs: 1.8, md: 2.2 }, py: 0.6, "& .MuiAccordionSummary-content": { my: 1.2 } }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" useFlexGap>
                  <Typography component="h3" sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.35 }}>
                    {item.title}
                  </Typography>
                  <Chip size="small" label={item.company} sx={{ bgcolor: alpha(INK, 0.06) }} />
                </Stack>
                <Typography variant="body2" sx={{ mt: 0.6, color: alpha(INK, 0.72), lineHeight: 1.55 }}>
                  <Box component="strong" sx={{ color: "#2e7d4f", fontWeight: 700 }}>
                    TL;DR{" "}
                  </Box>
                  <RichText text={item.result} />
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 1.8, md: 2.2 }, pt: 0, pb: 2.2 }}>
              <Stack spacing={1.1}>
                <CarlCard kind="context">
                  <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
                    <RichText text={item.context} />
                  </Typography>
                </CarlCard>
                <CarlCard kind="action">
                  <Box component="ul" sx={{ m: 0, pl: 2.2, display: "grid", gap: 0.5 }}>
                    {item.action.map((step) => (
                      <Typography key={step} component="li" variant="body2" sx={{ lineHeight: 1.6 }}>
                        <RichText text={step} />
                      </Typography>
                    ))}
                  </Box>
                </CarlCard>
                {item.learning ? (
                  <CarlCard kind="learning">
                    <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
                      <RichText text={item.learning} />
                    </Typography>
                  </CarlCard>
                ) : null}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}
