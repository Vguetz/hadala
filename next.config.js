import withImage from 'next-images'
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

export default withImage(nextConfig)
