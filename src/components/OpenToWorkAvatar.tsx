"use client";

import { useId } from "react";
import { Avatar, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { withBasePath } from "@/lib/assetPath";

const GREEN = "#2f7a49";

/**
 * A profile photo inside a slowly turning "open to work" ring, like the LinkedIn frame.
 * `size` is the ring's outer width; the photo fills the middle.
 */
export function OpenToWorkAvatar({
  size,
  photoSrc = "/profile_avatar.jpeg",
  alt = "",
}: {
  size: number | { xs: number; md: number };
  photoSrc?: string;
  alt?: string;
}) {
  const pathId = useId();
  const scale = (ratio: number) =>
    typeof size === "number" ? size * ratio : { xs: size.xs * ratio, md: size.md * ratio };
  // A big ring needs a thinner band of text, or the words dwarf the photo.
  const big = (typeof size === "number" ? size : size.md) > 120;

  return (
    <Box sx={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Box
        component="svg"
        viewBox="0 0 100 100"
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: "openToWorkSpin 16s linear infinite",
          "@keyframes openToWorkSpin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        <defs>
          <path
            id={pathId}
            d={big ? "M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" : "M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"}
          />
        </defs>
        <text fill={GREEN} fontSize={big ? 5.4 : 12} fontWeight="800" letterSpacing={big ? "1.6px" : "0.6px"}>
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {big
              ? "OPEN TO WORK • OPEN TO WORK • OPEN TO WORK • OPEN TO WORK •"
              : "OPEN TO WORK • OPEN TO WORK •"}
          </textPath>
        </text>
      </Box>
      <Avatar
        src={withBasePath(photoSrc)}
        alt={alt}
        sx={{
          width: scale(big ? 0.84 : 0.62),
          height: scale(big ? 0.84 : 0.62),
          border: `${big ? 3 : 1.5}px solid ${alpha(GREEN, 0.6)}`,
        }}
      />
    </Box>
  );
}
