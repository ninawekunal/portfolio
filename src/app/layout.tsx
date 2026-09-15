import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { withBasePath } from "@/lib/assetPath";
import theme from "@/theme";
import "./globals.css";

// Three body weights and one display weight keep the font payload to four files.
const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "600", "700"],
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700"],
});

const siteTitle = "Kunal Ninawe | Product Engineer";
const siteDescription =
  "Product engineer who ships the whole surface. Founding full-stack engineer at OpenCFO (AI-native AP/AR), ex-Expedia partner identity. 287 merged PRs, 87 BFF endpoints, 0 to 3,200 tests in 21 weeks.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Kunal Ninawe",
    "product engineer",
    "full-stack engineer",
    "React",
    "TypeScript",
    "React Router",
    "BFF",
    "AI engineering",
    "Claude Code",
    "Seattle",
  ],
  authors: [{ name: "Kunal Ninawe", url: "https://github.com/ninawekunal" }],
  icons: {
    icon: withBasePath("/favicon.svg"),
    shortcut: withBasePath("/favicon.svg"),
    apple: withBasePath("/favicon.svg"),
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "profile",
    siteName: "Kunal Ninawe",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
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
