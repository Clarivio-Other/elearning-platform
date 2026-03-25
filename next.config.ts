import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rimosso output: 'export' — necessario per API Routes con DB
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
