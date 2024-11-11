/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "media.dodostatic.net" }, {hostname: "cdn.dodostatic.net"}],
  },
};

export default nextConfig;
