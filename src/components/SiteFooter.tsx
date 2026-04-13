import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { footerNotes, profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <Box sx={{ pt: { xs: 2.2, md: 3 }, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: "32px",
            bgcolor: alpha("#132433", 0.96),
            color: "#f8fbff",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 2.4,
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.15fr) minmax(320px, 0.72fr)" },
              alignItems: "start",
            }}
          >
            <Stack spacing={2.2}>
              <Typography variant="h4" sx={{ maxWidth: 780 }}>
                Looking for a full-stack engineer who can ship product surfaces and the systems
                behind them.
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: 760, opacity: 0.82, lineHeight: 1.8 }}>
                This portfolio is intentionally structured for fast review. The case studies show
                engineering range, and the What I Offer section highlights how I approach
                production ownership, scale, and collaboration.
              </Typography>

              <Stack direction="row" spacing={1.3} flexWrap="wrap" useFlexGap>
                <Button
                  href={profile.githubUrl + "/?tab=repositories"}
                  target="_blank"
                  variant="contained"
                  color="secondary"
                  endIcon={<LaunchRoundedIcon />}
                >
                  Review projects
                </Button>
              </Stack>

              <Stack spacing={0.8} sx={{ pt: 1 }}>
                {footerNotes.map((note) => (
                  <Typography key={note} variant="body2" sx={{ opacity: 0.72, lineHeight: 1.7 }}>
                    {note}
                  </Typography>
                ))}
              </Stack>
            </Stack>

            <Paper
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: "28px",
                bgcolor: alpha("#ffffff", 0.08),
                borderColor: alpha("#ffffff", 0.12),
                color: "#f8fbff",
              }}
            >
              <Stack spacing={1.6}>
                <Typography variant="h6">Contact & profile</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PlaceRoundedIcon fontSize="small" sx={{ opacity: 0.74 }} />
                  <Typography variant="body2" sx={{ opacity: 0.84 }}>
                    {profile.location}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailRoundedIcon fontSize="small" sx={{ opacity: 0.74 }} />
                  <Typography variant="body2" sx={{ opacity: 0.84 }}>
                    {profile.email}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ pt: 0.6 }}>
                  <Button
                    href={`mailto:${profile.email}`}
                    variant="outlined"
                    color="inherit"
                    startIcon={<EmailRoundedIcon />}
                    sx={{ borderColor: alpha("#ffffff", 0.2) }}
                  >
                    Email
                  </Button>
                  <Button
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    color="inherit"
                    startIcon={<LinkedInIcon />}
                    sx={{ borderColor: alpha("#ffffff", 0.2) }}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    color="inherit"
                    startIcon={<GitHubIcon />}
                    sx={{ borderColor: alpha("#ffffff", 0.2) }}
                  >
                    GitHub
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
