"use client";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { ExpertiseSection } from "@/components/ExpertiseSection";
import { PageShell } from "@/components/SiteTiles";
import { hobbies } from "@/data/expertise";
import { profile } from "@/data/portfolio";
import { winsHeading } from "@/data/wins";
import { withBasePath } from "@/lib/assetPath";

const INK = "#132433";

export function AboutView() {
  return (
    <PageShell>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 5 }}
        alignItems={{ xs: "center", md: "flex-start" }}
        sx={{ maxWidth: 980, mx: "auto" }}
      >
        <Avatar
          src={withBasePath("/profile_picture.jpeg")}
          alt={profile.name}
          sx={{ width: { xs: 180, md: 240 }, height: { xs: 180, md: 240 }, flexShrink: 0 }}
        />
        <Box>
          <Typography component="h1" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1.35, fontWeight: 500 }}>
            <Box component="strong" sx={{ fontWeight: 700 }}>
              Hi, I&rsquo;m Kunal
            </Box>
            , a {winsHeading.title.charAt(0).toLowerCase() + winsHeading.title.slice(1, -1)}.
          </Typography>
          <Typography sx={{ mt: 1, fontSize: { xs: "1.05rem", md: "1.15rem" }, color: alpha(INK, 0.75) }}>
            {winsHeading.subtitle}
          </Typography>
          <Stack spacing={1.2} sx={{ mt: 2.4 }}>
            {winsHeading.body.map((paragraph) => (
              <Typography key={paragraph} variant="body1" sx={{ lineHeight: 1.8, color: alpha(INK, 0.82) }}>
                {paragraph}
              </Typography>
            ))}
          </Stack>
          <Typography variant="overline" component="h2" sx={{ display: "block", mt: 3, fontWeight: 700, letterSpacing: "0.14em" }}>
            How I work
          </Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.8} sx={{ mt: 0.8 }}>
            {winsHeading.habits.map((habit) => (
              <Chip
                key={habit}
                icon={<CheckRoundedIcon sx={{ fontSize: 16 }} />}
                label={habit}
                sx={{
                  bgcolor: alpha("#0f6b62", 0.08),
                  color: "secondary.dark",
                  border: `1px solid ${alpha("#0f6b62", 0.22)}`,
                  "& .MuiChip-icon": { color: "secondary.dark" },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Stack>

      <ExpertiseSection />

      <Box component="section" sx={{ mt: { xs: 5, md: 7 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 600 }}>
          Away from the keyboard
        </Typography>
        <Stack direction="row" flexWrap="wrap" useFlexGap gap={1} sx={{ mt: 1.6 }}>
          {hobbies.map((hobby) => (
            <Chip
              key={hobby.label}
              label={`${hobby.emoji}  ${hobby.label}`}
              sx={{ fontSize: "0.95rem", height: 40, px: 0.6, bgcolor: alpha("#ffffff", 0.8), border: `1px solid ${alpha(INK, 0.12)}` }}
            />
          ))}
        </Stack>
      </Box>
    </PageShell>
  );
}
