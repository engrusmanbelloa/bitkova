/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
