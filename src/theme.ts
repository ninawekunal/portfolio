"use client";

import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#c75b1e",
      light: "#f0b07b",
      dark: "#85340d",
      contrastText: "#fffaf5",
    },
    secondary: {
      main: "#0f6b62",
      light: "#5da59e",
      dark: "#0a4741",
      contrastText: "#f2fffc",
    },
    info: {
      main: "#285873",
      light: "#5f84a0",
      dark: "#17344d",
    },
    success: {
      main: "#2f7a49",
    },
    warning: {
      main: "#9b5d08",
    },
    background: {
      default: "#f6f2ea",
      paper: "#fffdf8",
    },
    text: {
      primary: "#132433",
      secondary: alpha("#132433", 0.72),
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: "var(--font-body), sans-serif",
    h1: {
      fontFamily: "var(--font-display), sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.04em",
      lineHeight: 0.98,
    },
    h2: {
      fontFamily: "var(--font-display), sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.02,
    },
    h3: {
      fontFamily: "var(--font-display), sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily: "var(--font-display), sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: "var(--font-display), sans-serif",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    subtitle1: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          backgroundColor: alpha("#c75b1e", 0.18),
        },
        body: {
          scrollbarColor: `${alpha("#17344d", 0.35)} transparent`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderBottom: `1px solid ${alpha("#132433", 0.08)}`,
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${alpha("#132433", 0.08)}`,
          boxShadow: `0 18px 44px -28px ${alpha("#132433", 0.2)}`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          paddingBlock: 10,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          backdropFilter: "blur(16px)",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
