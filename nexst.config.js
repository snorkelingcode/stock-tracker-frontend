/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // This helps with more consistent rendering across devices
    optimizeFonts: true,
  },
}

module.exports = nextConfig