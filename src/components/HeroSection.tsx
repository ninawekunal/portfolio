import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import {
  careerHighlights,
  focusItems,
  heroBadges,
  impactMetrics,
  profile,
  topSkillsFromProfile,
} from "@/data/portfolio";

export function HeroSection() {
  return (
    <Box
      component="section"
      id="top"
      sx={{
        pt: { xs: 4, md: 5 },
        pb: { xs: 5, md: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Paper
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "32px",
            p: { xs: 2.5, md: 3.25 },
            bgcolor: "rgba(255, 253, 248, 0.84)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at top left, ${alpha(
                "#f0b07b",
                0.28,
              )}, transparent 34%), radial-gradient(circle at bottom right, ${alpha(
                "#285873",
                0.1,
              )}, transparent 28%)`,
              pointerEvents: "none",
            }}
          />

          <Stack spacing={2.5} sx={{ position: "relative" }}>
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "1fr",
                  xl: "minmax(0, 1.2fr) minmax(320px, 0.82fr)",
                },
                alignItems: "start",
              }}
            >
              <Stack spacing={2.2}>
                <Chip
                  icon={<AutoAwesomeRoundedIcon />}
                  label="Portfolio for hiring managers and technical decision-makers"
                  sx={{
                    alignSelf: "flex-start",
                    bgcolor: alpha("#ffffff", 0.82),
                  }}
                />

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    icon={<PlaceRoundedIcon />}
                    label={profile.location}
                    variant="outlined"
                    sx={{ borderColor: alpha("#132433", 0.12), bgcolor: alpha("#ffffff", 0.62) }}
                  />
                  <Chip
                    label="4+ years professional experience"
                    variant="outlined"
                    sx={{ borderColor: alpha("#132433", 0.12), bgcolor: alpha("#ffffff", 0.62) }}
                  />
                </Stack>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.7rem", md: "clamp(3.2rem, 5vw, 4.35rem)" },
                    maxWidth: 860,
                  }}
                >
                  {profile.headline}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    lineHeight: 1.72,
                    color: "text.secondary",
                    maxWidth: 770,
                  }}
                >
                  {profile.summary}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.98rem", md: "1rem" },
                    lineHeight: 1.7,
                    maxWidth: 760,
                  }}
                >
                  {profile.audience}
                </Typography>

                <Stack direction="row" spacing={1.1} flexWrap="wrap" useFlexGap>
                  <Button href="#projects" variant="contained" endIcon={<LaunchRoundedIcon />}>
                    Explore projects
                  </Button>
                  <Button
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    color="inherit"
                    startIcon={<DescriptionRoundedIcon />}
                  >
                    Resume PDF
                  </Button>
                  <Button
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    color="inherit"
                    startIcon={<LinkedInIcon />}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="text"
                    color="inherit"
                    startIcon={<GitHubIcon />}
                  >
                    GitHub
                  </Button>
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {heroBadges.map((badge) => (
                    <Chip
                      key={badge}
                      label={badge}
                      variant="outlined"
                      sx={{
                        borderColor: alpha("#132433", 0.12),
                        bgcolor: alpha("#ffffff", 0.64),
                      }}
                    />
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={1.5}>
                <Paper
                  sx={{
                    p: 2.2,
                    borderRadius: "24px",
                    bgcolor: alpha("#132433", 0.95),
                    color: "#f8fbff",
                  }}
                >
                  <Stack spacing={1.2}>
                    <Typography variant="overline" sx={{ letterSpacing: "0.14em", opacity: 0.72 }}>
                      Profile Snapshot
                    </Typography>
                    {focusItems.map((item) => (
                      <Box key={item.label}>
                        <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.78, lineHeight: 1.68, mt: 0.35 }}>
                          {item.detail}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Paper>

                <Paper
                  sx={{
                    p: 2.1,
                    borderRadius: "24px",
                    bgcolor: alpha("#ffffff", 0.74),
                  }}
                >
                  <Stack spacing={1.35}>
                    <Typography variant="subtitle1">Top skills from profile export</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={0.9}>
                      {topSkillsFromProfile.map((skill) => (
                        <Chip key={skill} label={skill} color="secondary" variant="outlined" />
                      ))}
                    </Stack>
                    {careerHighlights.slice(0, 3).map((item) => (
                      <Typography key={item} variant="body2" color="text.secondary" sx={{ lineHeight: 1.68 }}>
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Paper>
              </Stack>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: 1.2,
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  lg: "repeat(5, minmax(0, 1fr))",
                },
              }}
            >
              {impactMetrics.map((metric) => (
                <Paper
                  key={metric.label}
                  variant="outlined"
                  sx={{
                    p: 1.7,
                    borderRadius: "22px",
                    bgcolor: alpha("#ffffff", 0.72),
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {metric.label}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 0.35, mb: 0.45 }}>
                    {metric.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.55, display: "block" }}>
                    {metric.detail}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
