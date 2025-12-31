const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const { config: loadEnv } = require("dotenv");
const { resolve } = require("path");

// Load .env file from parent directory (project root)
// Load in priority order: base -> environment -> local (highest priority)
// .env.local should override everything, so it's loaded last
loadEnv({ path: resolve(__dirname, "../.env"), quiet: true });
loadEnv({ path: resolve(__dirname, "../.env.development"), quiet: true });
loadEnv({ path: resolve(__dirname, "../.env.production"), quiet: true });
loadEnv({ path: resolve(__dirname, "../.env.local"), override: true, quiet: true });
 
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const workspaceRoot = resolve(__dirname, "..");
const convexRoot = resolve(workspaceRoot, "convex");

// Add path alias resolution for Metro bundler
config.resolver = {
  ...config.resolver,
  alias: {
    ...config.resolver?.alias,
    "@/convex": convexRoot,
  },
};

config.watchFolders = Array.from(
  new Set([...(config.watchFolders ?? []), convexRoot])
);
 
module.exports = withNativewind(config);
