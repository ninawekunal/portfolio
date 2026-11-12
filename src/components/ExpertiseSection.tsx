"use client";

import { useState } from "react";
import { Box, Chip, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
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

/** Work grouped by area: pick an area, pick a story, read it as context, action, result and learning. */
export function ExpertiseSection() {
  const [areaIndex, setAreaIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  const area = areas[areaIndex];
  const story = area?.resolved[storyIndex] ?? area?.resolved[0];
  if (!area || !story) return null;

  return (
    <Box component="section" sx={{ mt: { xs: 5, md: 7 } }}>
      <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 600 }}>
        What I have done, by area
      </Typography>
      <Tabs
        value={areaIndex}
        onChange={(_event, value: number) => {
          setAreaIndex(value);
          setStoryIndex(0);
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

      <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.8} sx={{ mt: 1.6 }} role="group" aria-label="Stories">
        {area.resolved.map((item, index) => {
          const active = index === storyIndex;
          return (
            <Chip
              key={item.key}
              label={item.title}
              clickable
              onClick={() => setStoryIndex(index)}
              aria-pressed={active}
              variant={active ? "filled" : "outlined"}
              sx={{
                maxWidth: "100%",
                bgcolor: active ? INK : alpha("#ffffff", 0.7),
                color: active ? "#fffaf2" : "text.primary",
                borderColor: alpha(INK, 0.2),
                "&:hover": { bgcolor: active ? INK : alpha(INK, 0.08) },
              }}
            />
          );
        })}
      </Stack>

      <Paper
        component="article"
        sx={{ mt: 2, p: { xs: 1.8, md: 2.4 }, borderRadius: "16px", bgcolor: alpha("#ffffff", 0.86), borderColor: alpha(INK, 0.1) }}
      >
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} flexWrap="wrap" useFlexGap>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {story.title}
          </Typography>
          <Chip size="small" label={story.company} sx={{ bgcolor: alpha(INK, 0.06) }} />
        </Stack>
        <Box
          sx={{
            mt: 1.6,
            display: "grid",
            gap: 1.1,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            alignItems: "start",
          }}
        >
          <CarlCard kind="context">
            <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
              <RichText text={story.context} />
            </Typography>
          </CarlCard>
          <CarlCard kind="action">
            <Box component="ul" sx={{ m: 0, pl: 2.2, display: "grid", gap: 0.5 }}>
              {story.action.map((step) => (
                <Typography key={step} component="li" variant="body2" sx={{ lineHeight: 1.6 }}>
                  <RichText text={step} />
                </Typography>
              ))}
            </Box>
          </CarlCard>
          <CarlCard kind="result">
            <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
              <RichText text={story.result} />
            </Typography>
          </CarlCard>
          {story.learning ? (
            <CarlCard kind="learning">
              <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
                <RichText text={story.learning} />
              </Typography>
            </CarlCard>
          ) : null}
        </Box>
      </Paper>
    </Box>
  );
}
