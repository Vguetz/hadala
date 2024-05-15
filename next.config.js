/** @type {import('next').NextConfig} */
const withImage = require('next-images')
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'hadala-production.up.railway.app'
      }
    ]
  }
}

module.exports = nextConfig
module.exports = withImage()
