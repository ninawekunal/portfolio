import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Button, Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import { SectionHeading } from "@/components/SectionHeading";
import { publications, writingHeading } from "@/data/writing";

export function WritingSection() {
  return (
    <Box component="section" id="writing" sx={{ py: { xs: 4, md: 5 }, scrollMarginTop: 100 }}>
      <Container maxWidth="xl">
        <Paper
          sx={{
            p: { xs: 1.6, md: 2.4 },
            borderRadius: "30px",
            bgcolor: alpha("#fff8ee", 0.92),
            border: `1px solid ${alpha("#132433", 0.1)}`,
          }}
        >
          <Stack spacing={2.4}>
            <SectionHeading eyebrow={writingHeading.eyebrow} title={writingHeading.title} body={writingHeading.body} />

            <Stack spacing={1.4}>
              {publications.map((post) => (
                <Paper
                  key={post.id}
                  component="article"
                  sx={{
                    p: { xs: 1.8, md: 2.4 },
                    borderRadius: "22px",
                    bgcolor: alpha("#ffffff", 0.8),
                    display: "grid",
                    gap: { xs: 1.6, md: 2.4 },
                    gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(280px, 0.9fr)" },
                    alignItems: "start",
                  }}
                >
                  <Stack spacing={1.2}>
                    <Stack direction="row" spacing={0.8} alignItems="center" flexWrap="wrap" useFlexGap>
                      <ArticleRoundedIcon sx={{ fontSize: 18, color: "secondary.dark" }} aria-hidden />
                      <Typography variant="caption" sx={{ fontWeight: 700, color: "secondary.dark" }}>
                        {post.outlet}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {post.date} · {post.readingTime}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="h3"
                      component="h3"
                      sx={{ fontSize: { xs: "1.3rem", md: "1.55rem" }, lineHeight: 1.22 }}
                    >
                      {post.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.72 }}>
                      {post.summary}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.6}>
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag}
                          size="small"
                          label={tag}
                          variant="outlined"
                          sx={{ borderColor: alpha("#132433", 0.18), bgcolor: alpha("#ffffff", 0.7) }}
                        />
                      ))}
                    </Stack>
                    <Box>
                      <Button
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        variant="contained"
                        color="secondary"
                        endIcon={<OpenInNewRoundedIcon />}
                      >
                        Read the post
                      </Button>
                    </Box>
                  </Stack>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: { xs: 1.4, md: 1.8 },
                      borderRadius: "18px",
                      bgcolor: alpha("#0f6b62", 0.06),
                      borderColor: alpha("#0f6b62", 0.2),
                    }}
                  >
                    <Typography variant="subtitle2" component="h4" sx={{ mb: 1, color: "secondary.dark" }}>
                      If you only read three lines
                    </Typography>
                    <Stack component="ol" spacing={0.8} sx={{ m: 0, pl: 2.2 }}>
                      {post.takeaways.map((takeaway) => (
                        <Typography key={takeaway} component="li" variant="body2" sx={{ lineHeight: 1.62 }}>
                          {takeaway}
                        </Typography>
                      ))}
                    </Stack>
                  </Paper>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
