
import type {NextConfig} from 'next';

// Only use PWA in production or when explicitly building
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
});

if (!process.env.__STARTUP_LOGGED) {
  console.log('   ❄️  betterlibrus v0.1.0');
  process.env.__STARTUP_LOGGED = 'true';
}

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  serverExternalPackages: ['librus-api'],
};

// Only apply PWA wrapper in production builds to avoid Turbopack conflicts
export default process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);
