import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
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
  splunk: "/brand-icons/splunk.svg",
  datadog: "/brand-icons/datadog.svg",
  pagerduty: "/brand-icons/pagerduty.svg",
  php: "/brand-icons/php.svg",
  mysql: "/brand-icons/mysql.svg",
  bootstrap: "/brand-icons/bootstrap.svg",
  apache: "/brand-icons/apache.svg",
  ecs: "/brand-icons/ecs-aws.svg",
  elasticache: "/brand-icons/elasticache-aws.svg",
  dynamodb: "/brand-icons/dynamodb-aws.svg",
  apigateway: "/brand-icons/apigateway-aws.svg",
  cloudformation: "/brand-icons/cloudformation-aws.svg",
  kinesis: "/brand-icons/kinesis-aws.svg",
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

function renderFallbackIcon(label: string) {
  const normalized = normalizeStackKey(label);
  const iconSx = { fontSize: 16, color: alpha("#132433", 0.72) };

  if (normalized.includes("mfa") || normalized.includes("sms")) {
    return <SmsRoundedIcon sx={iconSx} />;
  }

  if (normalized.includes("acr") || normalized.includes("oidc")) {
    return <LockRoundedIcon sx={iconSx} />;
  }

  if (normalized.includes("featureflag")) {
    return <TuneRoundedIcon sx={iconSx} />;
  }

  if (normalized.includes("rest") || normalized.includes("api")) {
    return <ApiRoundedIcon sx={iconSx} />;
  }

  if (normalized.includes("identity")) {
    return <PersonRoundedIcon sx={iconSx} />;
  }

  return <BoltRoundedIcon sx={iconSx} />;
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
        bgcolor: "#ffffff",
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
          renderFallbackIcon(label)
        )}
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
}
