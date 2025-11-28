import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sakurazaka46.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  }
};

export default nextConfig;
