/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Disable service worker caching to prevent stale content
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig
