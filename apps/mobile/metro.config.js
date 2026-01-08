const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");
const { config: loadEnv } = require("dotenv");
const { resolve } = require("path");

// Load .env file from monorepo root (two levels up from apps/mobile)
// Load in priority order: base -> environment -> local (highest priority)
// .env.local should override everything, so it's loaded last
loadEnv({ path: resolve(__dirname, "../../.env"), quiet: true });
loadEnv({ path: resolve(__dirname, "../../.env.development"), quiet: true });
loadEnv({ path: resolve(__dirname, "../../.env.production"), quiet: true });
loadEnv({ path: resolve(__dirname, "../../.env.local"), override: true, quiet: true });

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const workspaceRoot = resolve(__dirname, "../..");
const convexRoot = resolve(workspaceRoot, "services/convex");

// Extend default watch folders with monorepo packages
config.watchFolders = [
  ...(config.watchFolders || []),
  resolve(workspaceRoot, "packages"),
  resolve(workspaceRoot, "services"),
];

// Add path alias resolution for Metro bundler
config.resolver = {
  ...config.resolver,
  // Exclude web app from Metro's watch to prevent cross-app reloads
  blockList: [/apps\/web\/.*/],
  alias: {
    ...config.resolver?.alias,
    "@/convex": convexRoot,
  },
  // Tell metro where to find node_modules (for deduplication)
  nodeModulesPaths: [
    resolve(__dirname, "node_modules"),
    resolve(workspaceRoot, "node_modules"),
  ],
  // Ensure React is resolved from the mobile app's node_modules (prevents duplicate React)
  extraNodeModules: {
    react: resolve(__dirname, "node_modules/react"),
    "react-native": resolve(__dirname, "node_modules/react-native"),
  },
};

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
  dtsFile: "./uniwind-types.d.ts",
  extraThemes: [],
});
