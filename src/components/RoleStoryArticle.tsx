"use client";

import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { CarlCard, WinMetricsCard } from "@/components/WinCarl";
import type { RoleStory } from "@/data/roleStories";

const ACCENT = "#c75b1e";

/** One longer story from a role, laid out in full on the company page. */
export function RoleStoryArticle({ story }: { story: RoleStory }) {
  return (
    <Paper
      component="article"
      sx={{ p: { xs: 1.8, md: 2.4 }, borderRadius: "16px", bgcolor: alpha("#ffffff", 0.86), borderColor: alpha("#132433", 0.1) }}
    >
      <Typography variant="h6" component="h3" sx={{ lineHeight: 1.3, fontWeight: 700 }}>
        {story.title}
      </Typography>
      <Chip size="small" label={story.ownership} sx={{ mt: 0.8, bgcolor: alpha(ACCENT, 0.1), color: "primary.dark" }} />
      <Stack spacing={1.1} sx={{ mt: 1.6 }}>
        <CarlCard kind="context">
          <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
            {story.context}
          </Typography>
        </CarlCard>
        <CarlCard kind="action">
          <Box component="ul" sx={{ m: 0, pl: 2.2 }}>
            {story.action.map((step) => (
              <Typography key={step} component="li" variant="body2" sx={{ lineHeight: 1.65, mb: 0.4 }}>
                {step}
              </Typography>
            ))}
          </Box>
        </CarlCard>
        <CarlCard kind="result">
          <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
            {story.result}
          </Typography>
        </CarlCard>
        {story.learning ? (
          <CarlCard kind="learning">
            <Typography variant="body2" sx={{ lineHeight: 1.65 }}>
              {story.learning}
            </Typography>
          </CarlCard>
        ) : null}
        {story.metrics?.length ? <WinMetricsCard metrics={story.metrics} accent={ACCENT} /> : null}
      </Stack>
    </Paper>
  );
}
