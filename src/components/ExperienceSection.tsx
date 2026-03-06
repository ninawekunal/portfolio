import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
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
      sx={{ py: { xs: 5, md: 6 }, scrollMarginTop: 100 }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <SectionHeading
            eyebrow="Experience"
            title="Production context, not just side projects."
            body="A condensed timeline of the environments, systems, and outcomes behind the portfolio."
          />

          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              },
              alignItems: "start",
            }}
          >
            <Paper
              sx={{
                p: 2.2,
                borderRadius: "24px",
                bgcolor: alpha("#fffdf8", 0.84),
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      width: 42,
                      height: 42,
                      borderRadius: "14px",
                      bgcolor: alpha("#c75b1e", 0.12),
                      color: "primary.dark",
                    }}
                  >
                    <ApartmentRoundedIcon fontSize="small" />
                  </Box>
                  <Typography variant="h6">What teams usually get</Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.68 }}>
                  A frontend-strong engineer who can own product-critical UI systems while
                  reasoning clearly about auth, backend contracts, rollout safety, and production
                  incidents.
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={0.8}>
                  <Chip label="React + TypeScript" size="small" variant="outlined" />
                  <Chip label="OAuth/OIDC + MFA" size="small" variant="outlined" />
                  <Chip label="Reliability + on-call" size="small" variant="outlined" />
                  <Chip label="GraphQL + REST" size="small" variant="outlined" />
                </Stack>
              </Stack>
            </Paper>

            <Paper
              sx={{
                p: 2.2,
                borderRadius: "24px",
                bgcolor: alpha("#fffdf8", 0.84),
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      width: 42,
                      height: 42,
                      borderRadius: "14px",
                      bgcolor: alpha("#0f6b62", 0.12),
                      color: "secondary.dark",
                    }}
                  >
                    <SchoolRoundedIcon fontSize="small" />
                  </Box>
                  <Typography variant="h6">Education</Typography>
                </Stack>

                {education.map((entry, index) => (
                  <Box key={entry.school}>
                    <Typography variant="subtitle2">{entry.degree}</Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.2 }}>
                      {entry.school} · {entry.location} · {entry.date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.55, lineHeight: 1.62 }}>
                      {entry.details}
                    </Typography>
                    {index !== education.length - 1 ? <Divider sx={{ mt: 1.2 }} /> : null}
                  </Box>
                ))}
              </Stack>
            </Paper>

            {experienceTimeline.map((entry, index) => (
              <Paper
                key={`${entry.company}-${entry.role}`}
                sx={{
                  p: 2.2,
                  borderRadius: "24px",
                  bgcolor: alpha("#fffdf8", 0.84),
                  gridColumn: {
                    xs: "auto",
                    xl: index === 0 ? "span 1" : "auto",
                  },
                }}
              >
                <Stack spacing={1.4}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={0.8}
                  >
                    <Box>
                      <Typography variant="h6">{entry.role}</Typography>
                      <Typography variant="body2" color="primary.dark" sx={{ mt: 0.25 }}>
                        {entry.company}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                      <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                        {entry.period}
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                        {entry.location}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.66 }}>
                    {entry.summary}
                  </Typography>

                  <Stack spacing={0.8}>
                    {entry.highlights.map((highlight) => (
                      <Typography
                        key={highlight}
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.62 }}
                      >
                        {highlight}
                      </Typography>
                    ))}
                  </Stack>

                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {entry.stack.map((item) => (
                      <Chip
                        key={item}
                        size="small"
                        label={item}
                        variant="outlined"
                        sx={{ bgcolor: alpha("#ffffff", 0.68) }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
