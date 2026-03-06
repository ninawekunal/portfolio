import { Box, Stack, Typography } from "@mui/material";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
}: SectionHeadingProps) {
  return (
    <Stack spacing={1.5} sx={{ maxWidth: 720 }}>
      <Box
        sx={{
          alignSelf: "flex-start",
          borderRadius: 999,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.62)",
          px: 1.5,
          py: 0.75,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: "primary.dark", display: "block", letterSpacing: "0.12em" }}
        >
          {eyebrow}
        </Typography>
      </Box>
      <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.55rem" } }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.98rem", md: "1.02rem" },
          lineHeight: 1.68,
          color: "text.secondary",
        }}
      >
        {body}
      </Typography>
    </Stack>
  );
}
