"use client";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import {
  Box,
  ButtonBase,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { SectionHeading } from "@/components/SectionHeading";
import { certifications, certificationsSourceUrl, education } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

function CertificationItem({
  title,
  issuer,
  issueDate,
  credentialId,
  credentialUrl,
}: {
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.2,
        borderRadius: "16px",
        borderColor: alpha("#132433", 0.12),
        bgcolor: alpha("#ffffff", 0.76),
      }}
    >
      <Stack direction="row" spacing={1.15} alignItems="flex-start">
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "11px",
            display: "grid",
            placeItems: "center",
            bgcolor: alpha("#0a66c2", 0.12),
            color: "#0a66c2",
            flexShrink: 0,
            mt: 0.15,
          }}
        >
          {issuer.toLowerCase().includes("linkedin") ? (
            <LinkedInIcon sx={{ fontSize: 20 }} />
          ) : (
            <VerifiedRoundedIcon sx={{ fontSize: 19 }} />
          )}
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.35 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.1 }}>
            {issuer}
          </Typography>

          {issueDate ? (
            <Stack direction="row" spacing={0.55} alignItems="center" sx={{ mt: 0.5 }}>
              <CalendarMonthRoundedIcon sx={{ fontSize: 14, color: alpha("#132433", 0.65) }} />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {issueDate}
              </Typography>
            </Stack>
          ) : null}

          {credentialId ? (
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.3 }}>
              Credential ID: {credentialId}
            </Typography>
          ) : null}
        </Box>

        {credentialUrl ? (
          <ButtonBase
            component="a"
            href={credentialUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${title} on LinkedIn`}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "10px",
              color: alpha("#132433", 0.76),
              border: `1px solid ${alpha("#132433", 0.18)}`,
              flexShrink: 0,
              mt: 0.1,
              "&:hover": {
                bgcolor: alpha("#132433", 0.08),
                color: "#132433",
              },
            }}
          >
            <OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
          </ButtonBase>
        ) : null}
      </Stack>
    </Paper>
  );
}

export function EducationCertificationSection() {
  return (
    <Box
      component="section"
      id="education-certifications"
      sx={{
        py: { xs: 5, md: 6 },
        scrollMarginTop: 100,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2.4}>
          <SectionHeading
            eyebrow="Education and Certifications"
            title="Education and Certifications"
            body="Academic foundation and current certification highlights in one place. Education stays on the left while certifications stay as a vertically scrollable list on the right."
          />

          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: {
                xs: "1fr",
                lg: "minmax(0, 1fr) minmax(0, 1fr)",
              },
              alignItems: "start",
            }}
          >
            <Paper
              sx={{
                p: { xs: 2, md: 2.3 },
                borderRadius: "24px",
                bgcolor: alpha("#fffdf8", 0.9),
              }}
            >
              <Stack spacing={1.35}>
                <Stack direction="row" spacing={1.1} alignItems="center">
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
                  <Typography variant="h5" sx={{ fontSize: { xs: "1.45rem", md: "1.65rem" } }}>
                    Education
                  </Typography>
                </Stack>

                {education.map((entry, index) => (
                  <Box key={entry.school}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {entry.degree}
                    </Typography>

                    <Stack direction="row" spacing={0.7} alignItems="center" sx={{ mt: 0.38 }}>
                      {entry.logoSrc ? (
                        <Box
                          component="img"
                          src={withBasePath(entry.logoSrc)}
                          alt={`${entry.school} logo`}
                          sx={{
                            width: 30,
                            height: 30,
                            objectFit: "contain",
                            borderRadius: "7px",
                            bgcolor: alpha("#ffffff", 0.9),
                            p: 0.3,
                            border: `1px solid ${alpha("#132433", 0.1)}`,
                            flexShrink: 0,
                          }}
                        />
                      ) : null}
                      <Typography
                        variant="body1"
                        sx={{
                          color: entry.schoolColor ?? "text.primary",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        {entry.school}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" sx={{ color: "text.secondary", display: "block", mt: 0.25 }}>
                      {entry.location} · {entry.date}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.6, lineHeight: 1.64 }}>
                      {entry.details}
                    </Typography>
                    {index !== education.length - 1 ? <Divider sx={{ mt: 1.3 }} /> : null}
                  </Box>
                ))}
              </Stack>
            </Paper>

            <Paper
              sx={{
                p: { xs: 2, md: 2.3 },
                borderRadius: "24px",
                bgcolor: alpha("#fffdf8", 0.9),
              }}
            >
              <Stack spacing={1.2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  flexWrap="wrap"
                >
                  <Stack direction="row" spacing={1.1} alignItems="center">
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        width: 42,
                        height: 42,
                        borderRadius: "14px",
                        bgcolor: alpha("#0a66c2", 0.12),
                        color: "#0a66c2",
                      }}
                    >
                      <VerifiedRoundedIcon fontSize="small" />
                    </Box>
                    <Typography variant="h5" sx={{ fontSize: { xs: "1.45rem", md: "1.65rem" } }}>
                      Certifications
                    </Typography>
                  </Stack>

                  <ButtonBase
                    component="a"
                    href={certificationsSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      px: 1.1,
                      py: 0.6,
                      borderRadius: "12px",
                      border: `1px solid ${alpha("#132433", 0.16)}`,
                      color: alpha("#132433", 0.82),
                      gap: 0.55,
                      display: "inline-flex",
                      alignItems: "center",
                      "&:hover": {
                        bgcolor: alpha("#132433", 0.08),
                        color: "#132433",
                      },
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: 18 }} />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      View on LinkedIn
                    </Typography>
                  </ButtonBase>
                </Stack>

                <Box
                  sx={{
                    maxHeight: { xs: 260, md: 320 },
                    overflowY: "auto",
                    pr: 0.4,
                  }}
                >
                  <Stack spacing={0.9}>
                    {certifications.map((certification) => (
                      <CertificationItem
                        key={`${certification.issuer}-${certification.title}`}
                        title={certification.title}
                        issuer={certification.issuer}
                        issueDate={certification.issueDate}
                        credentialId={certification.credentialId}
                        credentialUrl={certification.credentialUrl}
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
