"use client";

import { useState, type MouseEvent } from "react";
import NextLink from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, CardActionArea, CardMedia, Stack, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { withBasePath } from "@/lib/assetPath";

const INK = "#132433";

const faceSx = {
  position: "absolute",
  inset: 0,
  borderRadius: "10px",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  display: "flex",
  flexDirection: "column",
  p: { xs: 2.2, md: 2.6 },
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

export type FlipCardProps = {
  /** Where a click goes. Internal paths use client navigation; external ones open a new tab. */
  href?: string;
  external?: boolean;
  /** Back color, and the tint of the front. */
  color: string;
  /** Bullet and label color on the back. */
  accent?: string;
  logoSrc?: string;
  logoNote?: string;
  /** Text for the badge shown when there is no logo; defaults to the title's initials. */
  badge?: string;
  title: string;
  subtitle: string;
  meta: string;
  icons?: { label: string; src: string }[];
  /** A short excerpt at the foot of the front, clamped to three lines. */
  preview?: string;
  titleLines?: number;
  backLabel: string;
  backLines: string[];
  cta?: string;
  height?: { xs: number; md: number };
};

/**
 * A card that flips to a few short lines. Desktop flips on hover or keyboard focus
 * and a click follows the link; a touch screen has no hover, so the first tap flips
 * and the second tap follows the link.
 */
export function FlipCard({
  href,
  external,
  color,
  accent = alpha("#ffffff", 0.8),
  logoSrc,
  logoNote,
  badge,
  title,
  subtitle,
  meta,
  icons = [],
  preview,
  titleLines = 2,
  backLabel,
  backLines,
  cta,
  height = { xs: 236, md: 240 },
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (event: MouseEvent) => {
    const touchOnly = window.matchMedia("(hover: none)").matches;
    if (!href) {
      setFlipped((value) => !value);
    } else if (touchOnly && !flipped) {
      event.preventDefault();
      setFlipped(true);
    }
  };

  const linkProps = !href
    ? {}
    : external
      ? { component: "a" as const, href, target: "_blank", rel: "noreferrer" }
      : { component: NextLink, href };

  return (
    <Box
      onMouseLeave={() => setFlipped(false)}
      onBlur={() => setFlipped(false)}
      sx={{
        perspective: "1200px",
        height,
        "@media (hover: hover)": { "&:hover .flip-inner": { transform: "rotateY(180deg)" } },
        "&:focus-within .flip-inner": { transform: "rotateY(180deg)" },
      }}
    >
      <CardActionArea
        {...linkProps}
        onClick={handleClick}
        aria-label={`${title}: ${subtitle}, ${meta}. ${backLines.join(". ")}`}
        sx={{ height: "100%", borderRadius: "10px", "& .MuiCardActionArea-focusHighlight": { display: "none" } }}
      >
        <Box
          className="flip-inner"
          sx={{
            position: "relative",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 520ms cubic-bezier(0.2, 0.7, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "none",
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          <Box
            sx={{
              ...faceSx,
              bgcolor: alpha(color, 0.07),
              border: `1px solid ${alpha(color, 0.22)}`,
              borderTop: `5px solid ${color}`,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.2} sx={{ height: 40 }}>
              {logoSrc ? (
                <CardMedia
                  component="img"
                  src={withBasePath(logoSrc)}
                  alt=""
                  sx={{ maxHeight: 30, maxWidth: "60%", width: "auto", objectFit: "contain" }}
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
              {logoNote ? (
                <Typography variant="caption" sx={{ color: alpha(INK, 0.6), lineHeight: 1.2 }}>
                  {logoNote}
                </Typography>
              ) : null}
            </Stack>
            <Box sx={{ mt: 1.6 }}>
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
              <Typography sx={{ mt: 0.3, fontFamily: "var(--font-numeric)", fontSize: "0.76rem", fontWeight: 500, color: alpha(INK, 0.6) }}>
                {meta}
              </Typography>
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
                  <Tooltip key={icon.label} title={icon.label}>
                    <CardMedia component="img" src={withBasePath(icon.src)} alt={icon.label} sx={{ width: 22, height: 22, objectFit: "contain" }} />
                  </Tooltip>
                ))}
              </Stack>
            ) : null}
          </Box>

          <Box sx={{ ...faceSx, bgcolor: color, color: "#ffffff", transform: "rotateY(180deg)" }}>
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
            {cta ? (
              <Stack direction="row" alignItems="center" spacing={0.6} sx={{ mt: "auto" }}>
                <Typography component="span" sx={{ fontWeight: 700, fontSize: "0.82rem" }}>
                  {cta}
                </Typography>
                {external ? <OpenInNewRoundedIcon sx={{ fontSize: 16 }} /> : <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />}
              </Stack>
            ) : null}
          </Box>
        </Box>
      </CardActionArea>
    </Box>
  );
}
