/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "media.dodostatic.net" }],
  },
};

export default nextConfig;
