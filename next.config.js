/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Allow Three.js imports
  transpilePackages: ['three'],
};

module.exports = nextConfig;
