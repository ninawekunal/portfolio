import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import { Box, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { skillClusters } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const iconMap = {
  "Identity & security": SecurityRoundedIcon,
  "Frontend systems": WebRoundedIcon,
  "Backend & APIs": HubRoundedIcon,
  "Cloud & operations": CloudQueueRoundedIcon,
  "AI & applied systems": SmartToyRoundedIcon,
};

export function CapabilitySection() {
  return (
    <Box
      component="section"
      id="capabilities"
      sx={{ py: { xs: 5, md: 6 }, scrollMarginTop: 100 }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <SectionHeading
            eyebrow="Skill Map"
            title="The technical range behind the portfolio."
            body="Skills below are pulled from current project work plus the identity-focused resume and LinkedIn profile export."
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
            }}
          >
            {skillClusters.map((group) => {
              const Icon = iconMap[group.title as keyof typeof iconMap];

              return (
                <Paper
                  key={group.title}
                  sx={{
                    p: 2.2,
                    borderRadius: "24px",
                    bgcolor: alpha("#fffdf8", 0.8),
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
                        <Icon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="h6">{group.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, lineHeight: 1.6 }}>
                          {group.summary}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" flexWrap="wrap" gap={0.8}>
                      {group.items.map((item) => (
                        <Chip
                          key={item}
                          size="small"
                          label={item}
                          variant="outlined"
                          sx={{
                            borderColor: alpha("#132433", 0.12),
                            bgcolor: alpha("#ffffff", 0.72),
                          }}
                        />
                      ))}
                    </Stack>

                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                      {group.evidence}
                    </Typography>
                  </Stack>
                </Paper>
              );
            })}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
