/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['images.unsplash.com','plus.unsplash.com','unsplash.com','media.istockphoto.com',]
    },
    // Disable static optimization for these pages
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverActions: true,
  },
  // Temporary build error overrides
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
