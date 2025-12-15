/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix turbopack root warning
  turbopack: {
    root: './00_SITE'
  },
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
  // Enable compression
  compress: true,
  // Production optimization
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental performance features
  experimental: {
    optimizePackageImports: ['gsap', 'three', 'framer-motion'],
  },
}

module.exports = nextConfig
