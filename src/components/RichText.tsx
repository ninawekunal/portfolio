"use client";

import {
  Fragment,
  useId,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { ButtonBase, Link, Popover, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { glossary, isGlossaryKey, type GlossaryKey } from "@/data/glossary";

const MARKUP = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

const UNDERLINE_COLOR = "#d9a21b";

/** Copy with the `[[key|label]]` markup resolved to plain words, for places a popover cannot go. */
export function plainText(text: string): string {
  return text.replace(MARKUP, (_match, key: string, label?: string) => {
    if (label) return label;

    return isGlossaryKey(key) ? glossary[key].term : key;
  });
}

function Jargon({
  termKey,
  children,
}: {
  termKey: GlossaryKey;
  children: ReactNode;
}) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const popoverId = useId();
  const entry = glossary[termKey];
  const readMore = "readMore" in entry ? entry.readMore : undefined;

  const open = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchor(event.currentTarget);
  };

  return (
    <>
      <ButtonBase
        component="span"
        disableRipple
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={Boolean(anchor)}
        aria-controls={anchor ? popoverId : undefined}
        sx={{
          display: "inline",
          font: "inherit",
          color: "inherit",
          verticalAlign: "baseline",
          textAlign: "inherit",
          cursor: "help",
          textDecorationLine: "underline",
          textDecorationStyle: "dotted",
          textDecorationColor: UNDERLINE_COLOR,
          textDecorationThickness: "2px",
          textUnderlineOffset: "3px",
          borderRadius: "3px",
          transition: "background-color 140ms ease",
          "&:hover, &:focus-visible": { bgcolor: alpha(UNDERLINE_COLOR, 0.18) },
        }}
      >
        {children}
      </ButtonBase>
      <Popover
        id={popoverId}
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.6,
              maxWidth: 340,
              p: 1.6,
              borderRadius: "14px",
              bgcolor: "#fffdf8",
              color: "#132433",
              borderTop: `3px solid ${UNDERLINE_COLOR}`,
            },
          },
        }}
      >
        <Stack spacing={0.7}>
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ fontWeight: 700 }}
          >
            {entry.term}
          </Typography>
          <Typography
            variant="body2"
            sx={{ lineHeight: 1.6, color: alpha("#132433", 0.8) }}
          >
            {entry.definition}
          </Typography>
          {readMore ? (
            <Link
              href={readMore.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.4,
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "secondary.main",
              }}
            >
              {readMore.label}
              <OpenInNewRoundedIcon sx={{ fontSize: 14 }} aria-hidden />
            </Link>
          ) : null}
        </Stack>
      </Popover>
    </>
  );
}

/**
 * Renders copy that may carry `[[key]]` or `[[key|label]]` glossary markup.
 * Each marked word gets a dotted yellow underline that opens a plain-English popover.
 * An unknown key renders as plain text rather than a broken control.
 */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(MARKUP)) {
    const [whole, key, label] = match;
    const start = match.index ?? 0;

    if (start > cursor) nodes.push(text.slice(cursor, start));

    if (isGlossaryKey(key)) {
      nodes.push(
        <Jargon key={`${key}-${start}`} termKey={key}>
          {label ?? glossary[key].term}
        </Jargon>,
      );
    } else {
      nodes.push(label ?? key);
    }

    cursor = start + whole.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return <Fragment>{nodes}</Fragment>;
}
