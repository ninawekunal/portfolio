import type { ReactNode } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import type { WinMetric } from "@/data/wins";
import { numericSx } from "@/lib/typography";

export type CarlKind = "context" | "action" | "result" | "learning";

// Same edge and fill pairs as the behavioral bible, so a story reads the same in both places.
const CARL_STYLE: Record<
  CarlKind,
  { label: string; edge: string; fill: string }
> = {
  context: { label: "Context", edge: "#3b6c8f", fill: "#eaf0f5" },
  action: { label: "Action", edge: "#a8730a", fill: "#fbf3e2" },
  result: { label: "Result", edge: "#2e7d4f", fill: "#e8f3eb" },
  learning: { label: "Learning", edge: "#6b4e9b", fill: "#f1ecf8" },
};

export function CarlCard({
  kind,
  children,
}: {
  kind: CarlKind;
  children: ReactNode;
}) {
  const style = CARL_STYLE[kind];

  return (
    <Box
      component="section"
      aria-label={style.label}
      sx={{
        bgcolor: style.fill,
        borderLeft: `4px solid ${style.edge}`,
        borderRadius: "4px 12px 12px 4px",
        px: { xs: 1.4, md: 1.7 },
        py: { xs: 1.1, md: 1.25 },
      }}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: style.edge,
          mb: 0.55,
        }}
      >
        {style.label}
      </Typography>
      {children}
    </Box>
  );
}

export function WinMetricsCard({
  metrics,
  accent,
}: {
  metrics: WinMetric[];
  accent: string;
}) {
  return (
    <Paper
      component="section"
      aria-label="By the numbers"
      sx={{
        borderRadius: "14px",
        bgcolor: alpha("#132433", 0.96),
        color: "#f8fbff",
        border: "none",
        px: { xs: 1.4, md: 1.7 },
        py: { xs: 1.2, md: 1.35 },
      }}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.68,
        }}
      >
        By the numbers
      </Typography>
      <Box
        component="dl"
        sx={{
          m: 0,
          mt: 1,
          display: "grid",
          gap: { xs: 1.2, md: 1.6 },
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))`,
          },
        }}
      >
        {metrics.map((metric) => (
          <Box
            key={metric.label}
            sx={{
              borderLeft: `2px solid ${alpha(accent, 0.7)}`,
              pl: 1.1,
              minWidth: 0,
            }}
          >
            <Typography
              component="dt"
              sx={{
                ...numericSx,
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                lineHeight: 1.15,
                color: "#f0b07b",
              }}
            >
              {metric.value}
            </Typography>
            <Typography
              component="dd"
              variant="caption"
              sx={{
                m: 0,
                mt: 0.4,
                display: "block",
                lineHeight: 1.4,
                opacity: 0.78,
              }}
            >
              {metric.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
