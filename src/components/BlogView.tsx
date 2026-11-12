"use client";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Card, CardActionArea, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { PageShell } from "@/components/SiteTiles";
import { profile } from "@/data/portfolio";
import { publications, writingHeading, type Publication } from "@/data/writing";

const TEAL = "#0a4741";
const ORANGE = "#c75b1e";

function PostCard({ post }: { post: Publication }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "22px",
        border: `1px solid ${alpha("#5cc3b4", 0.45)}`,
        bgcolor: alpha("#ffffff", 0.9),
        transition: "box-shadow 200ms ease, transform 200ms ease",
        "&:hover": { boxShadow: `0 18px 40px -24px ${alpha(TEAL, 0.5)}`, transform: "translateY(-2px)" },
      }}
    >
      <CardActionArea
        component="a"
        href={post.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${post.title}, on ${post.outlet}. Opens in a new tab.`}
        sx={{ height: "100%", p: { xs: 2.4, md: 3 }, display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <Stack direction="row" alignItems="center" spacing={1.2} flexWrap="wrap" useFlexGap>
          <Chip
            label={post.category}
            size="small"
            sx={{ bgcolor: alpha("#5cc3b4", 0.16), color: TEAL, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}
          />
          <Typography variant="body2" sx={{ color: alpha(TEAL, 0.65) }}>
            {post.date} · {post.readingTime}
          </Typography>
        </Stack>
        <Typography
          component="h2"
          sx={{ mt: 2, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: { xs: "1.5rem", md: "1.75rem" }, lineHeight: 1.2, color: TEAL }}
        >
          {post.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1.6, color: alpha(TEAL, 0.7), lineHeight: 1.7 }}>
          {post.summary}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: "auto", pt: 2.4 }}>
          <Typography variant="body2" sx={{ color: alpha(TEAL, 0.72) }}>
            By {profile.name} · {post.outlet}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.4} sx={{ color: ORANGE }}>
            <Typography component="span" sx={{ fontWeight: 700 }}>
              Read article
            </Typography>
            <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export function BlogView() {
  return (
    <PageShell>
      <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, fontWeight: 700 }}>
        Blog
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: alpha("#132433", 0.72), maxWidth: 680, lineHeight: 1.7 }}>
        {writingHeading.title} {writingHeading.body}
      </Typography>
      <Box
        sx={{
          mt: { xs: 3, md: 4 },
          display: "grid",
          gap: { xs: 2, md: 3 },
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {publications.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>
    </PageShell>
  );
}
