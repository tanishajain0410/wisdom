import type { NextConfig } from "next";

const rawBackendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
const backendUrl = rawBackendUrl ? rawBackendUrl.replace(/\/+$/, "") : "";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  devIndicators: false,
  async rewrites() {
    if (!backendUrl) {
      return [];
    }
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${backendUrl}/api/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
