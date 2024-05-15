const withImages = require('next-images')

module.exports = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hadala-production.up.railway.app'
      }
    ]
  }
})
