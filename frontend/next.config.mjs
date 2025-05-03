/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
  experimental: {
    serverActions: true,
  },
  transpilePackages: ['@mui/material', '@emotion/react', '@emotion/styled'],
};

export default nextConfig; 