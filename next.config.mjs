/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.hovercode.com',
      },
    ],
  },
  // reactStrictMode: false,
}

export default nextConfig
