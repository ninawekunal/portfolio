import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import LanRoundedIcon from "@mui/icons-material/LanRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { capabilityGroups } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const iconMap = {
  hub: HubRoundedIcon,
  smart: SmartToyRoundedIcon,
  lan: LanRoundedIcon,
  design: DesignServicesRoundedIcon,
};

export function CapabilitySection() {
  return (
    <Box
      component="section"
      id="capabilities"
      sx={{ py: { xs: 7, md: 9 }, scrollMarginTop: 100 }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <SectionHeading
            eyebrow="Capabilities"
            title="Evidence of a mid-senior engineer, not just a project gallery."
            body="This portfolio is structured to show range and engineering judgment quickly: product interfaces, backend architecture, scalable workflows, and applied AI/ML work."
          />

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            {capabilityGroups.map((group) => {
              const Icon = iconMap[group.icon as keyof typeof iconMap];

              return (
                <Paper
                  key={group.title}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 7,
                    bgcolor: alpha("#fffdf8", 0.76),
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <Stack spacing={2.25}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
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
                        <Icon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography variant="h5">{group.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                          {group.description}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {group.items.map((item) => (
                        <Chip
                          key={item}
                          label={item}
                          variant="outlined"
                          sx={{
                            borderColor: alpha("#132433", 0.12),
                            bgcolor: alpha("#ffffff", 0.68),
                          }}
                        />
                      ))}
                    </Stack>

                    <Box
                      sx={{
                        borderRadius: 5,
                        px: 2,
                        py: 1.75,
                        bgcolor: alpha("#132433", 0.03),
                      }}
                    >
                      <Typography variant="subtitle2" color="text.primary">
                        Why this matters
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6, lineHeight: 1.7 }}>
                        {group.evidence}
                      </Typography>
                    </Box>
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

