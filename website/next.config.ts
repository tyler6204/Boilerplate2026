import type { NextConfig } from "next";
import { config as loadEnv } from "dotenv";
import { resolve } from "path";

// Load .env file from parent directory (project root)
// Load in priority order: base -> environment -> local (highest priority)
// .env.local should override everything, so it's loaded last
loadEnv({ path: resolve(__dirname, "../.env"), quiet: true });
loadEnv({ path: resolve(__dirname, "../.env.development"), quiet: true });
loadEnv({ path: resolve(__dirname, "../.env.production"), quiet: true });
loadEnv({ path: resolve(__dirname, "../.env.local"), override: true, quiet: true });

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [],
  },
  allowedDevOrigins: ["lvh.me", "*.lvh.me"],
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/flags",
        destination: "https://us.i.posthog.com/flags",
      },
    ];
  },
  reactCompiler: true,
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
