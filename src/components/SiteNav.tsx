"use client";

import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
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
  { label: "Resume", href: withBasePath(profile.resumeUrl), external: true },
  { label: "About", href: "/about/" },
];

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/\/?$/, "/");
  return href === "/" ? path === "/" : path.startsWith(href);
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
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 }, justifyContent: "space-between" }}>
          <Button
            component={NextLink}
            href="/"
            sx={{ color: INK, fontWeight: 700, letterSpacing: "0.14em", fontSize: "0.9rem", px: 0, minWidth: 0 }}
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
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
