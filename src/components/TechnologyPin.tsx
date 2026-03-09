import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { alpha, type SxProps, type Theme } from "@mui/material/styles";

import { withBasePath } from "@/lib/assetPath";

const stackBrandIconMap: Record<string, string> = {
  react: "/brand-icons/react.svg",
  nextjs: "/brand-icons/nextjs.svg",
  typescript: "/brand-icons/typescript.svg",
  materialui: "/brand-icons/materialui.svg",
  nodejs: "/brand-icons/nodejs.svg",
  upstashredis: "/brand-icons/redis.svg",
  qstash: "/brand-icons/redis.svg",
  postgres: "/brand-icons/postgresql.svg",
  mapbox: "/brand-icons/mapbox.svg",
  python: "/brand-icons/python.svg",
  opencv: "/brand-icons/opencv.svg",
  scikitlearn: "/brand-icons/scikitlearn.svg",
  javascript: "/brand-icons/javascript.svg",
  java: "/brand-icons/java.svg",
  kotlin: "/brand-icons/kotlin.svg",
  aws: "/brand-icons/aws.svg",
  kubernetes: "/brand-icons/kubernetes.svg",
  graphql: "/brand-icons/graphql.svg",
  springboot: "/brand-icons/springboot.svg",
  redis: "/brand-icons/redis.svg",
  hapi: "/brand-icons/nodejs.svg",
};

function normalizeStackKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolveBrandIcon(label: string) {
  const normalized = normalizeStackKey(label);

  if (stackBrandIconMap[normalized]) {
    return stackBrandIconMap[normalized];
  }

  const candidate = Object.entries(stackBrandIconMap).find(([key]) => normalized.includes(key));
  return candidate?.[1];
}

type TechnologyPinProps = {
  label: string;
  sx?: SxProps<Theme>;
};

export function TechnologyPin({ label, sx }: TechnologyPinProps) {
  const brandSrc = resolveBrandIcon(label);

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 1.15,
        py: 0.72,
        borderRadius: "14px",
        bgcolor: alpha("#ffffff", 0.82),
        borderColor: alpha("#132433", 0.12),
        ...sx,
      }}
    >
      <Stack direction="row" spacing={0.75} alignItems="center">
        {brandSrc ? (
          <Box
            component="img"
            src={withBasePath(brandSrc)}
            alt={`${label} logo`}
            sx={{ width: 16, height: 16, objectFit: "contain", flexShrink: 0 }}
          />
        ) : (
          <BoltRoundedIcon sx={{ fontSize: 16, color: alpha("#132433", 0.72) }} />
        )}
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
}
