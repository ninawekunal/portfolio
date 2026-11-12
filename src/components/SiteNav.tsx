"use client";

import { useId, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { profile } from "@/data/portfolio";
import { withBasePath } from "@/lib/assetPath";

const INK = "#132433";

type NavItem = { label: string; href: string; external?: boolean };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience/" },
  { label: "Projects", href: "/projects/" },
  { label: "Blog", href: "/blog/" },
  { label: "Resume", href: withBasePath(profile.resumeUrl), external: true },
  { label: "About", href: "/about/" },
];

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/\/?$/, "/");
  return href === "/" ? path === "/" : path.startsWith(href);
}

const OPEN_TO_WORK_GREEN = "#2f7a49";

/** The profile photo inside a slowly turning "open to work" ring, like the LinkedIn frame. */
function OpenToWorkAvatar() {
  const pathId = useId();
  return (
    <Box sx={{ position: "relative", width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box
        component="svg"
        viewBox="0 0 100 100"
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: "openToWorkSpin 14s linear infinite",
          "@keyframes openToWorkSpin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        <defs>
          <path id={pathId} d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
        </defs>
        <text fill={OPEN_TO_WORK_GREEN} fontSize="12" fontWeight="800" letterSpacing="0.6px">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            OPEN TO WORK • OPEN TO WORK •
          </textPath>
        </text>
      </Box>
      <Avatar
        src={withBasePath("/profile_avatar.jpeg")}
        alt=""
        sx={{ width: 36, height: 36, border: `1.5px solid ${alpha(OPEN_TO_WORK_GREEN, 0.6)}` }}
      />
    </Box>
  );
}

/** One bar on every page: name on the left, five plain links on the right. */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const linkProps = (item: NavItem) =>
    item.external
      ? { component: "a" as const, href: item.href, target: "_blank", rel: "noreferrer" }
      : { component: NextLink, href: item.href };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: alpha("#fffaf2", 0.92), backdropFilter: "blur(8px)", color: INK, borderBottom: `1px solid ${alpha(INK, 0.08)}` }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, justifyContent: "space-between" }}>
          <Button
            component={NextLink}
            href="/"
            startIcon={<OpenToWorkAvatar />}
            sx={{
              color: INK,
              fontWeight: 700,
              letterSpacing: "0.14em",
              fontSize: "0.9rem",
              px: 0,
              minWidth: 0,
              "& .MuiButton-startIcon": { mr: 1.2, ml: 0 },
            }}
          >
            {profile.name.toUpperCase()}
          </Button>

          <Stack component="nav" aria-label="Main" direction="row" spacing={0.4} sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => {
              const active = !item.external && isActive(pathname, item.href);
              return (
                <Button
                  key={item.label}
                  {...linkProps(item)}
                  aria-current={active ? "page" : undefined}
                  sx={{
                    color: active ? INK : alpha(INK, 0.66),
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    borderBottom: `2px solid ${active ? INK : "transparent"}`,
                    borderRadius: 0,
                  }}
                >
                  {item.label}
                  {item.external ? <OpenInNewRoundedIcon sx={{ fontSize: 14, ml: 0.5 }} aria-label="opens in a new tab" /> : null}
                </Button>
              );
            })}
          </Stack>

          <IconButton aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { md: "none" }, color: INK }}>
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { width: 260 } } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
          <Typography variant="overline" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <List component="nav" aria-label="Main">
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              {...linkProps(item)}
              selected={!item.external && isActive(pathname, item.href)}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              {item.external ? <OpenInNewRoundedIcon sx={{ fontSize: 18, color: alpha(INK, 0.6) }} aria-label="opens in a new tab" /> : null}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
