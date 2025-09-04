
import type {NextConfig} from 'next';

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

export default nextConfig;
