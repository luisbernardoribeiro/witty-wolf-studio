/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize image loading and caching
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
  },
  // Enable compression and optimization
  compress: true,
  optimizeFonts: true,
  // Enable SWR for static optimizations
  swcMinify: true,
  // Reduce JavaScript
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Production optimization
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
}

module.exports = nextConfig
