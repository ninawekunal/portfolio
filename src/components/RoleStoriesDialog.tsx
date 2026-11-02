"use client";

import { useState } from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  ButtonBase,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import { CarlCard, WinMetricsCard } from "@/components/WinCarl";
import type { RoleStory } from "@/data/roleStories";

const ACCENT = "#c75b1e";

/** One story at a time, so a phone reader never scrolls past four stories to find one. */
export function RoleStoriesDialog({
  company,
  stories,
  open,
  onClose,
}: {
  company: string;
  stories: RoleStory[];
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [index, setIndex] = useState(0);

  const story = stories[index] ?? stories[0];
  if (!story) {
    return null;
  }

  const go = (next: number) => setIndex((next + stories.length) % stories.length);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      aria-labelledby="role-story-title"
      slotProps={{ transition: { onExited: () => setIndex(0) } }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 1.1,
          pr: 1,
          pb: 1,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
            {company} · story {index + 1} of {stories.length}
          </Typography>
          <Typography id="role-story-title" variant="h6" component="h2" sx={{ lineHeight: 1.24, mt: 0.3 }}>
            {story.title}
          </Typography>
          <Chip
            size="small"
            label={story.ownership}
            sx={{ mt: 0.8, bgcolor: alpha(ACCENT, 0.1), color: "primary.dark" }}
          />
        </Box>
        <IconButton aria-label="Close stories" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 0.4 }}>
        <Stack spacing={1.1}>
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
      </DialogContent>

      {stories.length > 1 ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1.5,
            py: 1,
            borderTop: `1px solid ${alpha("#132433", 0.1)}`,
          }}
        >
          <IconButton aria-label="Previous story" onClick={() => go(index - 1)}>
            <ChevronLeftRoundedIcon />
          </IconButton>
          <Stack direction="row" spacing={0.7} role="tablist" aria-label="Stories">
            {stories.map((item, itemIndex) => (
              <ButtonBase
                key={item.id}
                role="tab"
                aria-selected={itemIndex === index}
                aria-label={item.title}
                onClick={() => setIndex(itemIndex)}
                sx={{
                  width: itemIndex === index ? 22 : 10,
                  height: 10,
                  borderRadius: 999,
                  bgcolor: itemIndex === index ? ACCENT : alpha("#132433", 0.22),
                  transition: "width 160ms ease",
                }}
              />
            ))}
          </Stack>
          <IconButton aria-label="Next story" onClick={() => go(index + 1)}>
            <ChevronRightRoundedIcon />
          </IconButton>
        </Stack>
      ) : null}
    </Dialog>
  );
}
