"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { RoleStoryArticle } from "@/components/RoleStoryArticle";
import { PageShell, PrevNext } from "@/components/SiteTiles";
import { HeadlineStats, WinsBrowser } from "@/components/WinsBrowser";
import { experienceTimeline, type CareerEntry } from "@/data/portfolio";
import { roleStories } from "@/data/roleStories";
import { wins } from "@/data/wins";

const INK = "#132433";

// Wins carry a company only when they are not from OpenCFO.
const winCompany: Record<string, string | undefined> = {
  OpenCFO: undefined,
  "Expedia Group": "Expedia",
};

function SubHeading({ children }: { children: string }) {
  return (
    <Typography variant="h2" sx={{ fontSize: { xs: "1.3rem", md: "1.55rem" }, fontWeight: 700, mt: { xs: 4, md: 5 }, mb: 1.6 }}>
      {children}
    </Typography>
  );
}

/** A role told like a post: who, when, what I did, then the stories behind it. */
export function CompanyView({ entry }: { entry: CareerEntry }) {
  const index = experienceTimeline.findIndex((item) => item.slug === entry.slug);
  const newer = experienceTimeline[index - 1];
  const older = experienceTimeline[index + 1];

  const companyWins = entry.company in winCompany ? wins.filter((win) => win.company === winCompany[entry.company]) : [];
  const stories = roleStories[entry.company] ?? [];

  return (
    <PageShell>
      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <Typography variant="overline" sx={{ color: alpha(INK, 0.6), letterSpacing: "0.14em", fontWeight: 600 }}>
          {entry.period} · {entry.location}
        </Typography>
        <Typography component="h1" sx={{ fontSize: { xs: "1.9rem", md: "2.6rem" }, fontWeight: 700, lineHeight: 1.15, mt: 0.6 }}>
          {entry.role}{" "}
          <Box component="span" sx={{ color: alpha(INK, 0.5), fontWeight: 500 }}>
            @
          </Box>{" "}
          {entry.company}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1.6, lineHeight: 1.75, color: alpha(INK, 0.78) }}>
          {entry.summary}
        </Typography>

        {entry.company === "OpenCFO" ? (
          <Box sx={{ mt: 3 }}>
            <HeadlineStats />
          </Box>
        ) : null}

        <SubHeading>What I did</SubHeading>
        <Stack component="ul" spacing={1.1} sx={{ m: 0, pl: 2.4 }}>
          {entry.highlights.map((bullet) => (
            <Typography key={bullet.label} component="li" variant="body1" sx={{ lineHeight: 1.7 }}>
              <Box component="strong" sx={{ fontWeight: 700 }}>
                {bullet.label}:
              </Box>{" "}
              {bullet.text}
            </Typography>
          ))}
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={0.7} sx={{ mt: 2.4 }}>
          {entry.stack.map((item) => (
            <Chip key={item} label={item} size="small" variant="outlined" sx={{ borderColor: alpha(INK, 0.2) }} />
          ))}
        </Stack>
      </Box>

      {companyWins.length ? (
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          <SubHeading>What I shipped, one story each</SubHeading>
          <Typography variant="body2" sx={{ color: alpha(INK, 0.66), mb: 1.6 }}>
            Each story in four parts: the context, what I did, what changed, and what I learned.
          </Typography>
          <WinsBrowser items={companyWins} />
        </Box>
      ) : null}

      {stories.length ? (
        <Box sx={{ maxWidth: 860, mx: "auto" }}>
          <SubHeading>{companyWins.length ? "Longer stories" : "The stories behind it"}</SubHeading>
          <Stack spacing={2}>
            {stories.map((story) => (
              <RoleStoryArticle key={story.id} story={story} />
            ))}
          </Stack>
        </Box>
      ) : null}

      <Box sx={{ maxWidth: 860, mx: "auto" }}>
        <PrevNext
          previous={newer ? { href: `/experience/${newer.slug}/`, label: newer.company } : undefined}
          next={older ? { href: `/experience/${older.slug}/`, label: older.company } : undefined}
        />
      </Box>
    </PageShell>
  );
}
