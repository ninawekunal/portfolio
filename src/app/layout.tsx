import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { withBasePath } from "@/lib/assetPath";
import theme from "@/theme";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kunal Ninawe | Full-Stack Engineer",
  description:
    "Engineering portfolio for Kunal Ninawe, a mid-senior full-stack engineer focused on scalable systems and AI-native product delivery.",
  icons: {
    icon: withBasePath("/favicon.svg"),
    shortcut: withBasePath("/favicon.svg"),
    apple: withBasePath("/favicon.svg"),
  },
  openGraph: {
    title: "Kunal Ninawe | Full-Stack Engineer",
    description:
      "Portfolio focused on full-stack delivery, scalable systems, and AI-native engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal Ninawe | Full-Stack Engineer",
    description:
      "Portfolio focused on full-stack delivery, scalable systems, and AI-native engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
