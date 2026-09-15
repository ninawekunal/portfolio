"use client";

import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Modal,
  Stack,
  Tooltip,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { navigationItems, profile } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

const navigationIcons = {
  "#wins": EmojiEventsRoundedIcon,
  "#what-i-offer": BuildRoundedIcon,
  "#experience": WorkRoundedIcon,
  "#projects": MenuBookRoundedIcon,
  "#writing": ArticleRoundedIcon,
  "#education-certifications": SchoolRoundedIcon,
} as const;

const utilityLinks = [
  { label: "LinkedIn", href: profile.linkedInUrl, icon: LinkedInIcon },
  { label: "GitHub", href: profile.githubUrl, icon: GitHubIcon },
  { label: "Resume", href: profile.resumeUrl, icon: DescriptionRoundedIcon },
] as const;

const brandCaption = profile.tagline;

function LocationBadge({ compact = false }: { compact?: boolean }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.45,
        px: compact ? 0.72 : 0.92,
        py: compact ? 0.26 : 0.34,
        borderRadius: 999,
        bgcolor: alpha("#ffffff", 0.8),
        border: `1px solid ${alpha("#132433", 0.16)}`,
        color: alpha("#132433", 0.82),
        flexShrink: 0,
      }}
    >
      <PlaceRoundedIcon sx={{ fontSize: compact ? 14 : 15 }} />
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {profile.location}
      </Typography>
    </Box>
  );
}

function OpenToWorkAvatar({ onClick }: { onClick: () => void }) {
  const openToWorkPathId = useId().replace(/:/g, "");

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        position: "relative",
        width: { xs: 64, md: 72 },
        height: { xs: 64, md: 72 },
        borderRadius: "50%",
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 100 100"
        role="img"
        aria-label="Open to work"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: "openToWorkSpin 13s linear infinite",
          "@keyframes openToWorkSpin": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        }}
      >
        <defs>
          <path
            id={openToWorkPathId}
            d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
          />
        </defs>
        <text
          fill={alpha("#2f7a49", 0.94)}
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="0.9px"
        >
          <textPath href={`#${openToWorkPathId}`} startOffset="50%" textAnchor="middle">
            OPEN TO WORK • OPEN TO WORK •
          </textPath>
        </text>
      </Box>
      <Box
        component="span"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        View profile photo
      </Box>
      <Avatar
        src={withBasePath("/profile_avatar.jpeg")}
        alt=""
        sx={{
          width: { xs: 34, md: 38 },
          height: { xs: 34, md: 38 },
          border: `1px solid ${alpha("#2f7a49", 0.45)}`,
          bgcolor: "#ffffff",
        }}
      />
    </ButtonBase>
  );
}

function BrandIdentity({
  compact = false,
  onAvatarClick,
  captionOverride,
  hideCaption = false,
}: {
  compact?: boolean;
  onAvatarClick: () => void;
  captionOverride?: string;
  hideCaption?: boolean;
}) {
  const captionText = captionOverride ?? brandCaption;

  return (
    <Stack direction="row" spacing={1.3} alignItems="center" sx={{ minWidth: 0 }}>
      <OpenToWorkAvatar onClick={onAvatarClick} />
      <Box
        sx={{
          width: "1px",
          height: compact ? 24 : 30,
          bgcolor: alpha("#132433", 0.2),
        }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" alignItems="baseline" justifyContent="space-between" spacing={1}>
          <Stack direction="row" alignItems="center" spacing={0.8} sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#132433",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              {profile.name}
            </Typography>
            <LocationBadge compact={compact} />
          </Stack>
        </Stack>
        {!hideCaption ? (
          <Typography
            variant="caption"
            paddingTop={0.25}
            sx={{
              display: "block",
              mt: compact ? 0.15 : 0,
              color: alpha("#132433", 0.68),
              letterSpacing: compact ? "0.05em" : "0.08em",
              textTransform: compact ? "none" : "uppercase",
              lineHeight: compact ? 1.28 : 1.2,
              whiteSpace: compact ? "normal" : "nowrap",
              textAlign: compact && captionOverride ? "center" : "left",
              fontWeight: compact && captionOverride ? 700 : 500,
              ...(compact && captionOverride
                ? {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 1.18,
                    py: 0.38,
                    borderRadius: 999,
                    border: `1px solid ${alpha("#132433", 0.28)}`,
                    bgcolor: alpha("#132433", 0.16),
                    color: alpha("#132433", 0.94),
                    mt: 0.4,
                  }
                : {}),
            }}
          >
            {captionText}
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );
}

export function TopBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [activeSectionHref, setActiveSectionHref] = useState(navigationItems[0]?.href ?? "#wins");
  const appBarRef = useRef<HTMLElement | null>(null);

  // Publish the real header height so sticky sub-headers can sit under it
  // instead of guessing a pixel offset per breakpoint.
  useEffect(() => {
    const node = appBarRef.current;
    if (!node) {
      return;
    }

    const publishHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${Math.round(node.getBoundingClientRect().height)}px`,
      );
    };

    publishHeight();
    const observer = new ResizeObserver(publishHeight);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [mobileMenuOpen]);

  // Track the active section with an IntersectionObserver so scrolling never
  // forces layout. The section whose top edge is nearest to the header wins.
  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.href.replace("#", "")))
      .filter((node): node is HTMLElement => node !== null);

    if (!sections.length) {
      return;
    }

    const visible = new Map<string, number>();

    const pickActive = () => {
      let nextActive: string | null = null;
      let nearestTop = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const ratio = visible.get(section.id) ?? 0;
        if (ratio <= 0) {
          return;
        }

        const top = Math.abs(section.getBoundingClientRect().top - 180);
        if (top < nearestTop) {
          nearestTop = top;
          nextActive = `#${section.id}`;
        }
      });

      if (nextActive) {
        const resolved = nextActive;
        setActiveSectionHref((previous) => (previous === resolved ? previous : resolved));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        pickActive();
      },
      { rootMargin: "-160px 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  const activeSectionLabel = useMemo(
    () => navigationItems.find((item) => item.href === activeSectionHref)?.label ?? "Wins",
    [activeSectionHref],
  );
  const ActiveSectionIcon = navigationIcons[activeSectionHref as keyof typeof navigationIcons] ?? EmojiEventsRoundedIcon;

  return (
    <AppBar
      ref={appBarRef}
      position="sticky"
      color="transparent"
      sx={{
        bgcolor: alpha("#fffaf2", 0.88),
        borderBottom: `1px solid ${alpha("#132433", 0.1)}`,
        boxShadow: "none",
      }}
    >
      <Toolbar disableGutters sx={{ px: { xs: 1.5, sm: 2.2, md: 3.2 }, py: { xs: 0.8, md: 1.15 } }}>
        <Box sx={{ width: "100%" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Box
              sx={{
                px: 1.25,
                py: 0.65,
                minWidth: { md: 250, lg: 310 },
                flexShrink: 0,
              }}
            >
              <BrandIdentity onAvatarClick={() => setProfileModalOpen(true)} />
            </Box>

            <Stack
              direction="row"
              spacing={0.55}
              alignItems="center"
              sx={{
                px: 0.7,
                py: 0.55,
                borderRadius: 999,
                bgcolor: alpha("#ffffff", 0.76),
                border: `1px solid ${alpha("#132433", 0.15)}`,
                boxShadow: `0 14px 30px -26px ${alpha("#132433", 0.35)}`,
                ml: "auto",
                flexShrink: 0,
              }}
            >
              {navigationItems.map((item) => {
                const Icon = navigationIcons[item.href as keyof typeof navigationIcons];
                const isActive = activeSectionHref === item.href;

                return (
                  <ButtonBase
                    key={item.href}
                    component="a"
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    aria-current={isActive ? "true" : undefined}
                    sx={{
                      px: { md: 1.05, lg: 1.35 },
                      py: 0.85,
                      borderRadius: 999,
                      color: isActive ? "#132433" : alpha("#132433", 0.86),
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.72,
                      bgcolor: isActive ? alpha("#132433", 0.12) : "transparent",
                      border: isActive
                        ? `1px solid ${alpha("#132433", 0.22)}`
                        : "1px solid transparent",
                      transition: "background-color 180ms ease, color 180ms ease",
                      "&:hover": {
                        bgcolor: alpha("#132433", 0.08),
                        color: "#132433",
                      },
                    }}
                  >
                    {Icon ? <Icon sx={{ fontSize: 18 }} /> : null}
                    <Box component="span" sx={{ display: { md: "none", lg: "inline" } }}>
                      {item.label}
                    </Box>
                  </ButtonBase>
                );
              })}

              <Box
                sx={{
                  width: "1px",
                  height: 26,
                  mx: 0.5,
                  bgcolor: alpha("#132433", 0.15),
                }}
              />

              {utilityLinks.map((item) => {
                const Icon = item.icon;
                const utilityHref = item.href.startsWith("/") ? withBasePath(item.href) : item.href;

                return (
                  <Tooltip key={item.href} title={item.label} arrow enterDelay={120}>
                    <ButtonBase
                      component="a"
                      href={utilityHref}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: "12px",
                        color: alpha("#132433", 0.86),
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 180ms ease, color 180ms ease",
                        "&:hover": {
                          bgcolor: alpha("#132433", 0.08),
                          color: "#132433",
                        },
                      }}
                      aria-label={item.label}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </ButtonBase>
                  </Tooltip>
                );
              })}
            </Stack>
          </Stack>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Box
              sx={{
                width: "100%",
                p: 0.8,
                borderRadius: "26px",
                bgcolor: alpha("#ffffff", 0.8),
                border: `1px solid ${alpha("#132433", 0.14)}`,
                boxShadow: `0 14px 30px -28px ${alpha("#132433", 0.35)}`,
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <Box sx={{ minWidth: 0, pl: 0.5, flex: 1 }}>
                  <BrandIdentity compact hideCaption onAvatarClick={() => setProfileModalOpen(true)} />
                </Box>
                <IconButton
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileMenuOpen((open) => !open)}
                  sx={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    bgcolor: alpha("#132433", 0.08),
                    color: "#132433",
                    "&:hover": {
                      bgcolor: alpha("#132433", 0.16),
                    },
                  }}
                >
                  {mobileMenuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
                </IconButton>
              </Stack>

              <Box sx={{ mt: 0.6, display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 380,
                    borderRadius: "14px",
                    bgcolor: alpha("#132433", 0.1),
                    border: `1px solid ${alpha("#132433", 0.18)}`,
                    px: 1,
                    py: 0.4,
                  }}
                >
                  <Stack direction="row" spacing={0.7} alignItems="center" justifyContent="center">
                    <ActiveSectionIcon sx={{ fontSize: 17, color: alpha("#132433", 0.9) }} />
                    <Typography component="p" variant="subtitle2" sx={{ fontSize: "0.95rem", lineHeight: 1.2 }}>
                      {activeSectionLabel}
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              {mobileMenuOpen ? (
                <Stack spacing={0.8} sx={{ mt: 1.2 }}>
                  {navigationItems.map((item) => {
                    const Icon = navigationIcons[item.href as keyof typeof navigationIcons];

                    return (
                      <ButtonBase
                        key={item.href}
                        component="a"
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        sx={{
                          justifyContent: "center",
                          gap: 1.35,
                          px: 1.4,
                          py: 1.25,
                          borderRadius: "16px",
                          color: alpha("#132433", 0.9),
                          fontWeight: 600,
                          fontSize: "1rem",
                          backgroundColor: alpha("#132433", 0.06),
                          "&:hover": {
                            backgroundColor: alpha("#132433", 0.14),
                          },
                        }}
                      >
                        {Icon ? <Icon sx={{ fontSize: 20 }} /> : null}
                        {item.label}
                      </ButtonBase>
                    );
                  })}

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={0.7}
                    sx={{ pt: 0.4 }}
                  >
                    {utilityLinks.map((item) => {
                      const Icon = item.icon;
                      const utilityHref = item.href.startsWith("/") ? withBasePath(item.href) : item.href;

                      return (
                        <Tooltip key={`mobile-${item.href}`} title={item.label} arrow enterDelay={120}>
                          <ButtonBase
                            component="a"
                            href={utilityHref}
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "12px",
                              color: alpha("#132433", 0.9),
                              backgroundColor: alpha("#132433", 0.06),
                              "&:hover": {
                                backgroundColor: alpha("#132433", 0.14),
                              },
                            }}
                            aria-label={item.label}
                          >
                            <Icon sx={{ fontSize: 20 }} />
                          </ButtonBase>
                        </Tooltip>
                      );
                    })}
                  </Stack>
                </Stack>
              ) : null}
            </Box>
          </Box>
        </Box>
      </Toolbar>

      <Modal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        aria-labelledby="profile-photo-modal-title"
      >
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            p: 2,
            bgcolor: alpha("#03060c", 0.62),
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "min(92vw, 520px)",
              borderRadius: "24px",
              overflow: "hidden",
              border: `1px solid ${alpha("#ffffff", 0.18)}`,
              boxShadow: `0 24px 60px -24px ${alpha("#02050b", 0.95)}`,
              bgcolor: "#ffffff",
            }}
          >
            <IconButton
              aria-label="Close profile photo"
              onClick={() => setProfileModalOpen(false)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 2,
                bgcolor: alpha("#101828", 0.6),
                color: "#ffffff",
                "&:hover": {
                  bgcolor: alpha("#101828", 0.84),
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
            <Box
              component="img"
              id="profile-photo-modal-title"
              src={withBasePath("/profile_picture.jpeg")}
              alt={`${profile.name} profile`}
              width={496}
              height={435}
              loading="lazy"
              decoding="async"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </AppBar>
  );
}
