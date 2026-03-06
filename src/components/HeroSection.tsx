import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import {
  careerHighlights,
  heroBadges,
  heroSignals,
  impactMetrics,
  profile,
} from "@/data/portfolio";

const heroCardSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "32px",
  p: { xs: 3, md: 4 },
  bgcolor: "rgba(255, 253, 248, 0.82)",
} as const;

export function HeroSection() {
  return (
    <Box
      component="section"
      id="top"
      sx={{
        pt: { xs: 5, md: 8 },
        pb: { xs: 7, md: 9 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              xl: "minmax(0, 1.2fr) minmax(360px, 0.82fr)",
            },
            alignItems: "start",
          }}
        >
          <Paper sx={heroCardSx}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at top left, ${alpha(
                  "#f0b07b",
                  0.34,
                )}, transparent 34%), radial-gradient(circle at bottom right, ${alpha(
                  "#285873",
                  0.12,
                )}, transparent 28%)`,
                pointerEvents: "none",
              }}
            />
            <Stack spacing={3} sx={{ position: "relative" }}>
              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label="Portfolio for hiring managers and technical decision-makers"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: alpha("#ffffff", 0.8),
                }}
              />

              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    icon={<PlaceRoundedIcon />}
                    label={profile.location}
                    variant="outlined"
                    sx={{
                      borderColor: alpha("#132433", 0.12),
                      bgcolor: alpha("#ffffff", 0.6),
                    }}
                  />
                  <Chip
                    label="4+ years professional experience"
                    variant="outlined"
                    sx={{
                      borderColor: alpha("#132433", 0.12),
                      bgcolor: alpha("#ffffff", 0.6),
                    }}
                  />
                </Stack>

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", md: "clamp(3.75rem, 6vw, 5.5rem)" },
                    maxWidth: 920,
                  }}
                >
                  {profile.headline}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1.05rem", md: "1.18rem" },
                    lineHeight: 1.8,
                    color: "text.secondary",
                    maxWidth: 780,
                  }}
                >
                  {profile.summary}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    lineHeight: 1.75,
                    maxWidth: 760,
                  }}
                >
                  {profile.audience}
                </Typography>
              </Stack>

              <Stack direction="row" flexWrap="wrap" gap={1}>
                {heroBadges.map((badge) => (
                  <Chip
                    key={badge}
                    label={badge}
                    variant="outlined"
                    sx={{
                      borderColor: alpha("#132433", 0.12),
                      bgcolor: alpha("#ffffff", 0.62),
                    }}
                  />
                ))}
              </Stack>

              <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
                <Button
                  href="#projects"
                  size="large"
                  variant="contained"
                  endIcon={<LaunchRoundedIcon />}
                >
                  Explore projects
                </Button>
                <Button
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="large"
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
                  size="large"
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
                  size="large"
                  variant="text"
                  color="inherit"
                  startIcon={<GitHubIcon />}
                >
                  GitHub
                </Button>
              </Stack>

              <Divider />

              <Box
                sx={{
                  display: "grid",
                  gap: 1.5,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
                }}
              >
                {impactMetrics.map((metric) => (
                  <Paper
                    key={metric.label}
                    variant="outlined"
                    sx={{
                      p: 2.2,
                      borderRadius: "24px",
                      bgcolor: alpha("#ffffff", 0.7),
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {metric.label}
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 0.7 }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {metric.detail}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Stack>
          </Paper>

          <Stack spacing={2.5}>
            <Paper
              sx={{
                ...heroCardSx,
                p: { xs: 3, md: 3.4 },
                background:
                  "linear-gradient(160deg, rgba(19,36,51,0.96) 0%, rgba(32,57,77,0.94) 52%, rgba(15,107,98,0.92) 100%)",
                color: "#f8fbff",
              }}
            >
              <Stack spacing={2.1} sx={{ position: "relative", zIndex: 1 }}>
                <Typography variant="overline" sx={{ letterSpacing: "0.16em", opacity: 0.74 }}>
                  Professional Snapshot
                </Typography>
                <Typography variant="h4" sx={{ maxWidth: 440 }}>
                  Building UI systems that scale with real product constraints.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ maxWidth: 440, opacity: 0.84, lineHeight: 1.78 }}
                >
                  Frontend-heavy by depth, full-stack by delivery, and increasingly focused on
                  AI-native workflows that still respect operability, accessibility, and product
                  clarity.
                </Typography>
                <Stack spacing={1.05}>
                  {careerHighlights.map((item) => (
                    <Typography key={item} variant="body2" sx={{ opacity: 0.84, lineHeight: 1.72 }}>
                      {item}
                    </Typography>
                  ))}
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    icon={<WebRoundedIcon />}
                    label="Frontend systems"
                    sx={{ bgcolor: alpha("#ffffff", 0.14), color: "inherit" }}
                  />
                  <Chip
                    icon={<StorageRoundedIcon />}
                    label="Backend & data"
                    sx={{ bgcolor: alpha("#ffffff", 0.14), color: "inherit" }}
                  />
                  <Chip
                    icon={<PsychologyAltRoundedIcon />}
                    label="AI-native workflows"
                    sx={{ bgcolor: alpha("#ffffff", 0.14), color: "inherit" }}
                  />
                </Stack>
              </Stack>
            </Paper>

            <Paper sx={{ ...heroCardSx, p: { xs: 2.5, md: 3.2 } }}>
              <Stack spacing={2}>
                {heroSignals.map((signal, index) => (
                  <Box key={signal.title}>
                    <Typography variant="subtitle1">{signal.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.6, lineHeight: 1.7 }}
                    >
                      {signal.detail}
                    </Typography>
                    {index !== heroSignals.length - 1 ? <Divider sx={{ mt: 2 }} /> : null}
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
