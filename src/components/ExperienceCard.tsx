"use client";

import { useState, type MouseEvent } from "react";
import NextLink from "next/link";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, CardActionArea, CardMedia, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import type { CareerEntry } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

const INK = "#132433";
const CARD_HEIGHT = { xs: 248, md: 300 };

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
function monogram(company: string) {
  return company
    .split(/\s+/)
    .filter((word) => !/^(ltd|inc|llc)\.?$/i.test(word))
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

/**
 * A company card that flips to its highlights. Desktop flips on hover or keyboard
 * focus and a click opens the page; a touch screen has no hover, so the first tap
 * flips and the second tap opens the page.
 */
export function ExperienceCard({ entry }: { entry: CareerEntry }) {
  const [flipped, setFlipped] = useState(false);
  const href = `/experience/${entry.slug}/`;

  const handleClick = (event: MouseEvent) => {
    const touchOnly = window.matchMedia("(hover: none)").matches;
    if (touchOnly && !flipped) {
      event.preventDefault();
      setFlipped(true);
    }
  };

  return (
    <Box
      onMouseLeave={() => setFlipped(false)}
      onBlur={() => setFlipped(false)}
      sx={{
        perspective: "1200px",
        height: CARD_HEIGHT,
        "@media (hover: hover)": { "&:hover .flip-inner": { transform: "rotateY(180deg)" } },
        "&:focus-within .flip-inner": { transform: "rotateY(180deg)" },
      }}
    >
      <CardActionArea
        component={NextLink}
        href={href}
        onClick={handleClick}
        aria-label={`${entry.company}: ${entry.role}, ${entry.period}. ${entry.cardHighlights.join(". ")}`}
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
              bgcolor: "#ffffff",
              border: `1px solid ${alpha(INK, 0.1)}`,
              borderBottom: `6px solid ${entry.brandColor}`,
              boxShadow: `0 10px 30px -18px ${alpha(INK, 0.4)}`,
            }}
          >
            <Box sx={{ height: 44, display: "flex", alignItems: "center" }}>
              {entry.logoSrc ? (
                <CardMedia
                  component="img"
                  src={withBasePath(entry.logoSrc)}
                  alt=""
                  sx={{ maxHeight: 36, maxWidth: "70%", width: "auto", objectFit: "contain" }}
                />
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{ height: 40, minWidth: 40, px: 1, borderRadius: "8px", bgcolor: entry.brandColor }}
                >
                  <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#ffffff", lineHeight: 1 }}>
                    {monogram(entry.company)}
                  </Typography>
                </Stack>
              )}
            </Box>
            <Box sx={{ mt: "auto" }}>
              <Typography
                component="h3"
                sx={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: { xs: "1.35rem", md: "1.5rem" }, lineHeight: 1.2, color: INK }}
              >
                {entry.company}
              </Typography>
              <Typography sx={{ mt: 0.6, fontSize: "1rem", fontWeight: 600, color: alpha(INK, 0.82) }}>{entry.role}</Typography>
              <Typography
                sx={{ mt: 0.4, fontFamily: "var(--font-numeric)", fontSize: "0.78rem", fontWeight: 500, color: alpha(INK, 0.6) }}
              >
                {entry.period}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ ...faceSx, bgcolor: entry.brandColor, color: "#ffffff", transform: "rotateY(180deg)" }}>
            <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: "0.16em", opacity: 0.8, lineHeight: 1.6 }}>
              {entry.company} · highlights
            </Typography>
            <Stack component="ul" spacing={1} sx={{ m: 0, mt: 1.2, pl: 2.2 }}>
              {entry.cardHighlights.map((line) => (
                <Typography key={line} component="li" sx={{ fontSize: "0.95rem", lineHeight: 1.45 }}>
                  {line}
                </Typography>
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.6} sx={{ mt: "auto" }}>
              <Typography component="span" sx={{ fontWeight: 700, fontSize: "0.82rem" }}>
                Read the full story
              </Typography>
              <ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Box>
  );
}
