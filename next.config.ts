import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.unisat.io",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "jfccetnvabkrjkwrdwyz.supabase.co",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
