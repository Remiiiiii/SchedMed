import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper routing for Appwrite
  trailingSlash: false,
  // Ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : "",
  /* config options here */
};

export default nextConfig;
