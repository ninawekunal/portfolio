"use client";

import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
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
import { useEffect, useId, useMemo, useState } from "react";

import { navigationItems, profile } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

const navigationIcons = {
  "#what-i-offer": BuildRoundedIcon,
  "#experience": WorkRoundedIcon,
  "#projects": MenuBookRoundedIcon,
  "#education-certifications": SchoolRoundedIcon,
} as const;

const utilityLinks = [
  { label: "LinkedIn", href: profile.linkedInUrl, icon: LinkedInIcon },
  { label: "GitHub", href: profile.githubUrl, icon: GitHubIcon },
  { label: "Resume", href: profile.resumeUrl, icon: DescriptionRoundedIcon },
] as const;

const brandCaption = "Front-end | Backend | Distributed Systems | AI-native Engineering";

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
      aria-label="Open profile photo"
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
        aria-hidden
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
      <Avatar
        src={withBasePath("/profile_picture.jpeg")}
        alt={profile.name}
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
  const [activeSectionHref, setActiveSectionHref] = useState(navigationItems[0]?.href ?? "#what-i-offer");

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.scrollY + 180;
      let nextActive = navigationItems[0]?.href ?? "#what-i-offer";

      navigationItems.forEach((item) => {
        const sectionId = item.href.replace("#", "");
        const sectionNode = document.getElementById(sectionId);

        if (!sectionNode) {
          return;
        }

        if (marker >= sectionNode.offsetTop) {
          nextActive = item.href;
        }
      });

      setActiveSectionHref((previous) => (previous === nextActive ? previous : nextActive));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const activeSectionLabel = useMemo(
    () => navigationItems.find((item) => item.href === activeSectionHref)?.label ?? "My Skillset",
    [activeSectionHref],
  );
  const ActiveSectionIcon = navigationIcons[activeSectionHref as keyof typeof navigationIcons] ?? BuildRoundedIcon;

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        bgcolor: alpha("#fffaf2", 0.88),
        borderBottom: `1px solid ${alpha("#132433", 0.1)}`,
        boxShadow: "none",
      }}
    >
      <Toolbar disableGutters sx={{ px: { xs: 2, sm: 2.2, md: 3.2 }, py: 1.15 }}>
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
                minWidth: "fit-content",
                width: "fit-content",
                ml: "auto",
                maxWidth: "100%",
                overflowX: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
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
                    sx={{
                      px: 1.35,
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
                    {item.label}
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
                p: 1,
                borderRadius: "30px",
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

              <Box sx={{ mt: 0.82, display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 380,
                    borderRadius: "18px",
                    bgcolor: alpha("#132433", 0.12),
                    border: `1px solid ${alpha("#132433", 0.2)}`,
                    px: 1,
                    py: 0.72,
                  }}
                >
                  <Stack direction="row" spacing={0.78} alignItems="center" justifyContent="center">
                    <ActiveSectionIcon sx={{ fontSize: 20, color: alpha("#132433", 0.9) }} />
                    <Typography variant="h6" sx={{ fontSize: "1.16rem", lineHeight: 1.2 }}>
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
              sx={{
                width: "100%",
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
