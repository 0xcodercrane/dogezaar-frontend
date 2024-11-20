import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.unisat.io'
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com'
      },
    ],
  },
}

export default nextConfig
