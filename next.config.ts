import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle Prisma Client on the server
      config.externals.push('@prisma/client')
    }
    return config
  }
};

export default nextConfig;
