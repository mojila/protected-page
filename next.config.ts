import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // Changed from SAMEORIGIN
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://app1.localhost:3000 http://app2.localhost:3001 http://localhost:3000 http://localhost:3001;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
