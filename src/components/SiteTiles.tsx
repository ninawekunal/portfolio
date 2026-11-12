"use client";

import { useEffect, type ReactNode } from "react";
import NextLink from "next/link";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

const INK = "#132433";

/** Nav, a centered column for the page, then any full-width sections, then the footer. */
export function PageShell({ children, after }: { children?: ReactNode; after?: ReactNode }) {
  // Opening a page from a card lower down should start at its title, not mid-page.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <SiteNav />
      <Box component="main">
        {children ? (
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            {children}
          </Container>
        ) : null}
        {after}
        <SiteFooter />
      </Box>
    </>
  );
}

/** A plain section title with a rule above it, like a table of contents entry. */
export function TileSection({
  title,
  eyebrow,
  children,
  moreHref,
  moreLabel,
  moreExternal,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  moreHref?: string;
  moreLabel?: string;
  moreExternal?: boolean;
}) {
  return (
    <Box component="section" sx={{ py: { xs: 3.5, md: 5 } }}>
      <Divider sx={{ mb: { xs: 3, md: 4 } }} />
      <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 600 }}>
        {title}
      </Typography>
      {eyebrow ? (
        <Typography
          variant="overline"
          sx={{ display: "block", mt: 1.5, fontWeight: 700, letterSpacing: "0.16em", color: alpha(INK, 0.6) }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Box sx={{ mt: eyebrow ? 1 : 2.5 }}>{children}</Box>
      {moreHref && moreLabel ? (
        <Stack alignItems="center" sx={{ mt: { xs: 3, md: 4 } }}>
          <DarkButton href={moreHref} external={moreExternal}>
            {moreLabel}
          </DarkButton>
        </Stack>
      ) : null}
    </Box>
  );
}

export function DarkButton({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  const linkProps = external
    ? { component: "a" as const, href, target: "_blank", rel: "noreferrer" }
    : { component: NextLink, href };
  return (
    <Button
      {...linkProps}
      variant="contained"
      disableElevation
      sx={{
        bgcolor: INK,
        color: "#fffaf2",
        borderRadius: "4px",
        px: 3,
        py: 1.2,
        fontSize: "0.74rem",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        "&:hover": { bgcolor: alpha(INK, 0.86) },
      }}
    >
      {children}
    </Button>
  );
}

export function TileGrid({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 2.5, md: 3 },
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
      }}
    >
      {children}
    </Box>
  );
}

/** "Newer" and "older" links at the end of a company or project page. */
export function PrevNext({
  previous,
  next,
}: {
  previous?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{ mt: { xs: 4, md: 6 }, pt: 2.5, borderTop: `1px solid ${alpha(INK, 0.1)}` }}
    >
      <Box>
        {previous ? (
          <Button component={NextLink} href={previous.href} sx={{ color: INK, textAlign: "left", display: "block" }}>
            <Typography variant="overline" sx={{ display: "block", color: alpha(INK, 0.55), lineHeight: 1.4 }}>
              Previous
            </Typography>
            {previous.label}
          </Button>
        ) : null}
      </Box>
      <Box>
        {next ? (
          <Button component={NextLink} href={next.href} sx={{ color: INK, textAlign: "right", display: "block" }}>
            <Typography variant="overline" sx={{ display: "block", color: alpha(INK, 0.55), lineHeight: 1.4 }}>
              Next
            </Typography>
            {next.label}
          </Button>
        ) : null}
      </Box>
    </Stack>
  );
}
