import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // Allow all websites to embed it
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' *", // Allow embedding on any site
          },
        ],
      },
    ];
  },
};

export default nextConfig;
