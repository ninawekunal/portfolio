import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { education, experienceTimeline } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

export function ExperienceSection() {
  return (
    <Box
      component="section"
      id="experience"
      sx={{ py: { xs: 7, md: 9 }, scrollMarginTop: 100 }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <SectionHeading
            eyebrow="Professional Experience"
            title="Recent experience that supports the positioning."
            body="The projects show how I think and build. The timeline below shows the production environments, scale, and operating expectations behind that work."
          />

          <Box
            sx={{
              display: "grid",
              gap: 2.2,
              gridTemplateColumns: {
                xs: "1fr",
                xl: "minmax(300px, 0.74fr) minmax(0, 1fr)",
              },
              alignItems: "start",
            }}
          >
            <Stack spacing={2}>
              <Paper
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: "28px",
                  bgcolor: alpha("#fffdf8", 0.84),
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        width: 46,
                        height: 46,
                        borderRadius: "16px",
                        bgcolor: alpha("#c75b1e", 0.12),
                        color: "primary.dark",
                      }}
                    >
                      <ApartmentRoundedIcon fontSize="small" />
                    </Box>
                    <Typography variant="h5">What teams usually get</Typography>
                  </Stack>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    A frontend-strong engineer who can own product-critical UI systems, work
                    directly with UX and PM, and still reason clearly about APIs, async
                    infrastructure, rollout safety, and production incidents.
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    <Chip label="React + TypeScript" variant="outlined" />
                    <Chip label="GraphQL + REST" variant="outlined" />
                    <Chip label="Accessibility" variant="outlined" />
                    <Chip label="Testing + on-call" variant="outlined" />
                    <Chip label="AI-native prototyping" variant="outlined" />
                  </Stack>
                </Stack>
              </Paper>

              <Paper
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: "28px",
                  bgcolor: alpha("#fffdf8", 0.84),
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        width: 46,
                        height: 46,
                        borderRadius: "16px",
                        bgcolor: alpha("#0f6b62", 0.12),
                        color: "secondary.dark",
                      }}
                    >
                      <SchoolRoundedIcon fontSize="small" />
                    </Box>
                    <Typography variant="h5">Education</Typography>
                  </Stack>
                  <Stack spacing={1.4}>
                    {education.map((entry, index) => (
                      <Box key={entry.school}>
                        <Typography variant="subtitle1">{entry.degree}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                          {entry.school} · {entry.location} · {entry.date}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.7, lineHeight: 1.7 }}
                        >
                          {entry.details}
                        </Typography>
                        {index !== education.length - 1 ? <Divider sx={{ mt: 1.4 }} /> : null}
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Stack>

            <Stack spacing={2}>
              {experienceTimeline.map((entry) => (
                <Paper
                  key={`${entry.company}-${entry.role}`}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: "28px",
                    bgcolor: alpha("#fffdf8", 0.84),
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Box>
                        <Typography variant="h5">{entry.role}</Typography>
                        <Typography variant="subtitle1" color="primary.dark" sx={{ mt: 0.4 }}>
                          {entry.company}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                        <Typography variant="subtitle2">{entry.period}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                          {entry.location}
                        </Typography>
                      </Box>
                    </Stack>

                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {entry.summary}
                    </Typography>

                    <Stack spacing={1}>
                      {entry.highlights.map((highlight) => (
                        <Typography
                          key={highlight}
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.75 }}
                        >
                          {highlight}
                        </Typography>
                      ))}
                    </Stack>

                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {entry.stack.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          variant="outlined"
                          sx={{ bgcolor: alpha("#ffffff", 0.66) }}
                        />
                      ))}
                    </Stack>

                    <Stack direction="row" spacing={0.8} alignItems="center">
                      <CallMadeRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        This experience informs the system design and product tradeoffs shown in the
                        portfolio projects.
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
