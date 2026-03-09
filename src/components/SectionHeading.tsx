import { Stack, Typography } from "@mui/material";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function SectionHeading({
  title,
  body,
}: SectionHeadingProps) {
  return (
    <Stack spacing={1.5} sx={{ maxWidth: 720 }}>
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
