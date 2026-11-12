"use client";

import { Typography } from "@mui/material";

import { ExperienceCard } from "@/components/ExperienceCard";
import { PageShell, TileGrid } from "@/components/SiteTiles";
import { experienceTimeline } from "@/data/portfolio";

export function ExperienceListView() {
  return (
    <PageShell>
      <Typography component="h1" sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, fontWeight: 700, mb: { xs: 3, md: 4 } }}>
        Experience
      </Typography>
      <TileGrid>
        {experienceTimeline.map((entry) => (
          <ExperienceCard key={entry.slug} entry={entry} />
        ))}
      </TileGrid>
    </PageShell>
  );
}
