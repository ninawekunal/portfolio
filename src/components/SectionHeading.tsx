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
    <Stack spacing={2.25} sx={{ maxWidth: 760 }}>
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
      <Typography variant="h2" sx={{ fontSize: { xs: "2.4rem", md: "3.2rem" } }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", md: "1.1rem" },
          lineHeight: 1.75,
          color: "text.secondary",
        }}
      >
        {body}
      </Typography>
    </Stack>
  );
}

