/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        pathname: '/demos/**',
      },
    ],
  },
};

export default nextConfig;
