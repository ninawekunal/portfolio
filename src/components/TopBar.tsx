import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";

import { navigationItems, profile } from "@/data/portfolio";

export function TopBar() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{
        bgcolor: "rgba(246, 242, 234, 0.92)",
      }}
    >
      <Toolbar disableGutters>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            py: 1.2,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 44,
                height: 44,
                borderRadius: "16px",
                bgcolor: "primary.dark",
                color: "primary.contrastText",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              <CodeRoundedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant="subtitle1">{profile.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.role}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {navigationItems.map((item) => (
              <Button key={item.href} href={item.href} color="inherit">
                {item.label}
              </Button>
            ))}
            <Button
              href={profile.linkedInUrl}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              color="inherit"
              startIcon={<LinkedInIcon />}
            >
              LinkedIn
            </Button>
            <Button
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              color="inherit"
              startIcon={<GitHubIcon />}
            >
              GitHub
            </Button>
            <Button
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              startIcon={<DescriptionRoundedIcon />}
            >
              Resume
            </Button>
            <Button href="#projects" variant="text" startIcon={<MenuBookRoundedIcon />}>
              Proof of Work
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
