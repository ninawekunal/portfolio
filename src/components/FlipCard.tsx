"use client";

import { useState, type MouseEvent } from "react";
import NextLink from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Button, ButtonBase, CardMedia, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { withBasePath } from "@/lib/assetPath";

const INK = "#132433";

const FLIP_MS = 520;

const faceSx = {
  position: "absolute",
  inset: 0,
  borderRadius: "10px",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  overflow: "hidden",
} as const;

/**
 * Safari ignores backface-visibility on positioned layers inside a face, so the
 * front's text shows through mirrored. Hiding the off-side face outright at the
 * halfway point, when the card is edge-on, works in every browser.
 */
function faceVisibility(shown: boolean) {
  return {
    visibility: shown ? "visible" : "hidden",
    transition: `visibility 0s linear ${FLIP_MS / 2}ms`,
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  } as const;
}

// Content sits above the full-face toggle button; only its links take clicks.
const contentSx = {
  position: "relative",
  zIndex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  p: { xs: 2.2, md: 2.6 },
  pointerEvents: "none",
  "& a, & button": { pointerEvents: "auto" },
} as const;

/** "Global Traffic Technologies" -> "GTT"; legal suffixes like "Ltd." are skipped. */
function monogram(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => !/^(ltd|inc|llc|of)\.?$/i.test(word))
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 4);
}

export type FlipAction = {
  label: string;
  href: string;
  /** Opens in a new tab. */
  external?: boolean;
  /** "github" renders an icon-only button. */
  icon?: "github";
};

export type FlipCardProps = {
  /** Back color, and the tint of the front. */
  color: string;
  /** Bullet and label color on the back. */
  accent?: string;
  logoSrc?: string;
  logoNote?: string;
  /** Text for the badge shown when there is no logo; defaults to the title's initials. */
  badge?: string;
  /** A picture across the top of the front, for projects. Replaces the logo row; without a src, the title shows as a wordmark there. */
  media?: { src?: string; alt: string };
  title: string;
  subtitle: string;
  meta?: string;
  /** A short label in the front's top-right corner, such as a date range. */
  cornerMeta?: string;
  icons?: { label: string; src: string }[];
  /** A short excerpt at the foot of the front, clamped to three lines. */
  preview?: string;
  titleLines?: number;
  backLabel: string;
  backLines: string[];
  /** Links on the back. The card itself never navigates; only these do. */
  actions?: FlipAction[];
  height?: { xs: number; md: number };
};

function ActionLink({ action, accent }: { action: FlipAction; accent: string }) {
  const linkProps = action.external
    ? { component: "a" as const, href: action.href, target: "_blank", rel: "noreferrer" }
    : { component: NextLink, href: action.href };

  if (action.icon === "github") {
    return (
      <Tooltip title={action.label}>
        <IconButton
          {...linkProps}
          aria-label={action.label}
          size="small"
          sx={{ color: "#ffffff", border: `1px solid ${alpha("#ffffff", 0.4)}` }}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      {...linkProps}
      size="small"
      endIcon={action.external ? <OpenInNewRoundedIcon sx={{ fontSize: 16 }} /> : <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />}
      sx={{ color: "#ffffff", fontWeight: 700, px: 0, minWidth: 0, "&:hover": { color: accent, bgcolor: "transparent" } }}
    >
      {action.label}
    </Button>
  );
}

/**
 * A card that flips to a few short lines. A tap (or Enter) flips it and a second
 * tap flips it back; with a mouse, hovering flips it. The card never navigates on
 * its own: only the links on the back do, so a stray tap never leaves the page.
 */
export function FlipCard({
  color,
  accent = alpha("#ffffff", 0.8),
  logoSrc,
  logoNote,
  badge,
  media,
  title,
  subtitle,
  meta,
  cornerMeta,
  icons = [],
  preview,
  titleLines = 2,
  backLabel,
  backLines,
  actions = [],
  height = { xs: 236, md: 240 },
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const canHover = () => window.matchMedia("(hover: hover)").matches;

  // A mouse already flips on hover, so a mouse click on the face does nothing;
  // a tap or a keyboard press (detail 0) toggles.
  const handleToggle = (event: MouseEvent) => {
    if (event.detail > 0 && canHover()) return;
    setFlipped((value) => !value);
  };

  return (
    <Box
      onMouseEnter={() => canHover() && setFlipped(true)}
      onMouseLeave={() => canHover() && setFlipped(false)}
      sx={{ perspective: "1200px", height }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: `transform ${FLIP_MS}ms cubic-bezier(0.2, 0.7, 0.2, 1)`,
          transform: flipped ? "rotateY(180deg)" : "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        <Box
          inert={flipped}
          aria-hidden={flipped}
          sx={{
            ...faceSx,
            ...faceVisibility(!flipped),
            bgcolor: alpha(color, 0.07),
            border: `1px solid ${alpha(color, 0.22)}`,
            borderTop: `5px solid ${color}`,
          }}
        >
          <ButtonBase
            onClick={handleToggle}
            aria-expanded={flipped}
            aria-label={`${title}: ${subtitle}. Show details`}
            sx={{ position: "absolute", inset: 0, zIndex: 0 }}
          />
          <Box sx={{ ...contentSx, ...(media ? { p: 0 } : {}) }}>
            {media?.src ? (
              <CardMedia
                component="img"
                src={withBasePath(media.src)}
                alt={media.alt}
                sx={{ height: "58%", flexShrink: 0, objectFit: "cover", objectPosition: "top", borderBottom: `1px solid ${alpha(color, 0.15)}` }}
              />
            ) : media ? (
              <Stack alignItems="center" justifyContent="center" sx={{ height: "58%", flexShrink: 0, bgcolor: color, px: 2 }}>
                <Typography
                  sx={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", lineHeight: 1.15, color: "#ffffff", textAlign: "center" }}
                >
                  {title}
                </Typography>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
                <Stack direction="row" alignItems="center" sx={{ height: 40, minWidth: 0 }}>
                  {logoSrc ? (
                    <CardMedia
                      component="img"
                      src={withBasePath(logoSrc)}
                      alt=""
                      sx={{ maxHeight: { xs: 24, md: 28 }, maxWidth: { xs: 140, md: 160 }, width: "auto", objectFit: "contain" }}
                    />
                  ) : (
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{ height: 36, minWidth: 36, px: 0.9, borderRadius: "8px", bgcolor: color }}
                    >
                      <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "#ffffff", lineHeight: 1 }}>
                        {badge ?? monogram(title)}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
                {cornerMeta ? (
                  <Typography
                    sx={{
                      fontFamily: "var(--font-numeric)",
                      fontSize: { xs: "0.82rem", md: "0.86rem" },
                      fontWeight: 600,
                      color: alpha(INK, 0.72),
                      whiteSpace: "nowrap",
                      pt: 0.8,
                    }}
                  >
                    {cornerMeta}
                  </Typography>
                ) : null}
              </Stack>
            )}
            <Box sx={media ? { px: { xs: 2, md: 2.2 }, pt: 1.4 } : { mt: 1.6 }}>
              <Typography
                component="h3"
                sx={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", md: "1.35rem" },
                  lineHeight: 1.2,
                  color: INK,
                  display: "-webkit-box",
                  WebkitLineClamp: titleLines,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ mt: 0.5, fontSize: "0.98rem", fontWeight: 600, color: alpha(INK, 0.82) }}>{subtitle}</Typography>
              {logoNote ? (
                <Typography variant="caption" sx={{ display: "block", color: alpha(INK, 0.6), mt: 0.2 }}>
                  {logoNote}
                </Typography>
              ) : null}
              {meta ? (
                <Typography sx={{ mt: 0.3, fontFamily: "var(--font-numeric)", fontSize: "0.8rem", fontWeight: 500, color: alpha(INK, 0.62) }}>
                  {meta}
                </Typography>
              ) : null}
            </Box>
            {preview ? (
              <Typography
                variant="body2"
                sx={{
                  mt: "auto",
                  color: alpha(INK, 0.72),
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {preview}
              </Typography>
            ) : null}
            {icons.length ? (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: "auto" }} aria-label="Main technologies">
                {icons.map((icon) => (
                  <CardMedia
                    key={icon.label}
                    component="img"
                    src={withBasePath(icon.src)}
                    alt={icon.label}
                    title={icon.label}
                    sx={{ width: 22, height: 22, objectFit: "contain" }}
                  />
                ))}
              </Stack>
            ) : null}
          </Box>
        </Box>

        <Box inert={!flipped} aria-hidden={!flipped} sx={{ ...faceSx, ...faceVisibility(flipped), bgcolor: color, color: "#ffffff", transform: "rotateY(180deg)" }}>
          <ButtonBase
            onClick={handleToggle}
            aria-expanded={flipped}
            aria-label={`Hide details for ${title}`}
            sx={{ position: "absolute", inset: 0, zIndex: 0 }}
          />
          <Box sx={contentSx}>
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.16em", color: accent, lineHeight: 1.6 }}>
              {backLabel}
            </Typography>
            <Stack component="ul" spacing={0.8} sx={{ m: 0, mt: 0.8, pl: 2.2 }}>
              {backLines.map((line) => (
                <Typography key={line} component="li" sx={{ fontSize: "0.9rem", lineHeight: 1.42, "&::marker": { color: accent } }}>
                  {line}
                </Typography>
              ))}
            </Stack>
            {actions.length ? (
              <Stack direction="row" alignItems="center" spacing={1.6} sx={{ mt: "auto", pt: 1 }}>
                {actions.map((action) => (
                  <ActionLink key={action.label} action={action} accent={accent} />
                ))}
              </Stack>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
