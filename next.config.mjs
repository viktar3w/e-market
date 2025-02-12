/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'media.dodostatic.net' }, { hostname: 'cdn.dodostatic.net' }],
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
      },
    ];
  },
};

export default nextConfig;
