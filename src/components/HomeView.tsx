"use client";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { BlogCard, CertificationCard, EducationCard, ExperienceCard, ProjectCard } from "@/components/ExperienceCard";
import { DarkButton, PageShell, TileGrid, TileSection } from "@/components/SiteTiles";
import { certifications, certificationsSourceUrl, education, experienceTimeline, profile, projects } from "@/data/portfolio";
import { publications } from "@/data/writing";
import { withBasePath } from "@/lib/assetPath";

const INK = "#132433";
const HOME_TILES = 3;

export function HomeView() {
  const featured = projects.filter((project) => project.featured).slice(0, HOME_TILES);

  return (
    <PageShell>
      <Stack alignItems="center" spacing={{ xs: 1.8, md: 2 }} sx={{ textAlign: "center", pt: { xs: 1, md: 1.5 }, pb: { xs: 2, md: 2 } }}>
        <Typography
          component="h1"
          sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, lineHeight: 1.45, maxWidth: 620, color: INK, textWrap: "balance" }}
        >
          <Box component="strong" sx={{ fontWeight: 700 }}>
            Hi, I&rsquo;m Kunal
          </Box>
          , a product engineer who ships the whole thing, for the person on the other side of the screen.
        </Typography>
        <Avatar
          src={withBasePath("/profile_picture.jpeg")}
          alt={profile.name}
          sx={{ width: { xs: 160, md: 180 }, height: { xs: 160, md: 180 } }}
        />
        <Typography variant="body2" sx={{ color: alpha(INK, 0.66), maxWidth: 560 }}>
          Founding full-stack engineer at OpenCFO, an AI-native accounts payable platform, after four years on
          partner identity at Expedia. {profile.location}.
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <IconButton href={`mailto:${profile.email}`} aria-label="Email" sx={{ color: INK }}>
            <EmailRoundedIcon />
          </IconButton>
          <IconButton href={profile.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub" sx={{ color: INK }}>
            <GitHubIcon />
          </IconButton>
          <IconButton href={profile.linkedInUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn" sx={{ color: INK }}>
            <LinkedInIcon />
          </IconButton>
        </Stack>
        <DarkButton href={withBasePath(profile.resumeUrl)} external>
          Resume
        </DarkButton>
      </Stack>

      <TileSection title="Experience" moreHref="/experience/" moreLabel="All experience">
        <TileGrid>
          {experienceTimeline.slice(0, HOME_TILES).map((entry) => (
            <ExperienceCard key={entry.slug} entry={entry} />
          ))}
        </TileGrid>
      </TileSection>

      <TileSection title="Projects" eyebrow="Featured" moreHref="/projects/" moreLabel="All projects">
        <TileGrid>
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TileGrid>
      </TileSection>

      <TileSection title="Blog" moreHref="/blog/" moreLabel="All posts">
        <TileGrid>
          {publications.slice(0, HOME_TILES).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </TileGrid>
      </TileSection>

      <TileSection title="Education">
        <TileGrid>
          {education.map((entry) => (
            <EducationCard key={entry.school} entry={entry} />
          ))}
        </TileGrid>
      </TileSection>

      <TileSection
        title="Certifications"
        eyebrow="Most recent"
        moreHref={certificationsSourceUrl}
        moreLabel="All certifications"
        moreExternal
      >
        <TileGrid>
          {certifications.slice(0, HOME_TILES).map((entry) => (
            <CertificationCard key={entry.title} entry={entry} />
          ))}
        </TileGrid>
      </TileSection>

    </PageShell>
  );
}
