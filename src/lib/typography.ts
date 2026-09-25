import type { SxProps, Theme } from "@mui/material/styles";

/** Every metric on the site: monospace, lined-up digits, slightly tightened. */
export const numericSx = {
  fontFamily: "var(--font-numeric), ui-monospace, monospace",
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "-0.02em",
} satisfies SxProps<Theme>;
