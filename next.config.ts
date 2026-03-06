import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const derivedBasePath =
  !configuredBasePath && process.env.GITHUB_ACTIONS && repositoryName
    ? `/${repositoryName}`
    : "";
const basePath = configuredBasePath ?? derivedBasePath;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;

