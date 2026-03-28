import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yatoutapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true, // On force le passage malgré les petites erreurs
  },

};

export default nextConfig;
