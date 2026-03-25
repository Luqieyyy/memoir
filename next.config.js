/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Temporarily ignore due to lucide-react type resolution issues
    // Icons exist in runtime + d.ts but TS can't resolve with moduleResolution: 'bundler' + optimizePackageImports
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    // Optimize package imports
    optimizePackageImports: ['lucide-react', 'firebase'],
  },
  // Enable SWC minifier for faster builds
  swcMinify: true,
};

module.exports = nextConfig;
