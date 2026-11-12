"use client";

import { useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { AppBar, Button, Container, Menu, MenuItem, Stack, Toolbar } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { OpenToWorkAvatar } from "@/components/OpenToWorkAvatar";
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

/** One bar on every page: name on the left, plain links on the right, or a page picker on phones. */
export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const currentLabel = navItems.find((item) => !item.external && isActive(pathname, item.href))?.label ?? "Menu";

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
            startIcon={<OpenToWorkAvatar size={58} />}
            sx={{
              color: INK,
              fontWeight: 700,
              letterSpacing: "0.14em",
              fontSize: { xs: "0.78rem", md: "0.9rem" },
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

          <Button
            id="page-menu-button"
            aria-controls={menuAnchor ? "page-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuAnchor ? "true" : undefined}
            onClick={(event) => setMenuAnchor(event.currentTarget)}
            endIcon={<ExpandMoreRoundedIcon />}
            sx={{
              display: { md: "none" },
              color: INK,
              fontSize: "0.76rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: `1px solid ${alpha(INK, 0.18)}`,
              borderRadius: "999px",
              px: 1.4,
            }}
          >
            {currentLabel}
          </Button>
        </Toolbar>
      </Container>

      <Menu
        id="page-menu"
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ list: { "aria-labelledby": "page-menu-button" }, paper: { sx: { minWidth: 200, mt: 0.6 } } }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.label}
            {...linkProps(item)}
            selected={!item.external && isActive(pathname, item.href)}
            onClick={() => setMenuAnchor(null)}
            sx={{ fontWeight: 600, justifyContent: "space-between", gap: 2 }}
          >
            {item.label}
            {item.external ? <OpenInNewRoundedIcon sx={{ fontSize: 18, color: alpha(INK, 0.6) }} aria-label="opens in a new tab" /> : null}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}
