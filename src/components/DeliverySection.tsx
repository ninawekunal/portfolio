import AltRouteRoundedIcon from "@mui/icons-material/AltRouteRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { deliveryPrinciples } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";

const iconMap = {
  scope: AltRouteRoundedIcon,
  contract: FactCheckRoundedIcon,
  visibility: VisibilityRoundedIcon,
  ship: WorkspacesRoundedIcon,
};

export function DeliverySection() {
  return (
    <Box
      component="section"
      id="delivery"
      sx={{ py: { xs: 5, md: 6 }, scrollMarginTop: 100 }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <SectionHeading
            eyebrow="Delivery Style"
            title="How I tend to work."
            body="The strongest signal in these projects is the pattern: thoughtful scoping, clear boundaries, visible state, and the ability to move across the stack without losing product focus."
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
            {deliveryPrinciples.map((principle) => {
              const Icon = iconMap[principle.icon as keyof typeof iconMap];

              return (
                <Paper
                  key={principle.title}
                  sx={{
                    p: { xs: 2.1, md: 2.4 },
                    borderRadius: "22px",
                    bgcolor: alpha("#fffdf8", 0.78),
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
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
                        <Icon fontSize="small" />
                      </Box>
                      <Typography variant="h5">{principle.title}</Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.68 }}>
                      {principle.description}
                    </Typography>
                    <Box
                      sx={{
                        borderRadius: "18px",
                        px: 2,
                        py: 1.45,
                        bgcolor: alpha("#132433", 0.03),
                      }}
                    >
                      <Typography variant="subtitle2">In the portfolio</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6, lineHeight: 1.7 }}>
                        {principle.example}
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
