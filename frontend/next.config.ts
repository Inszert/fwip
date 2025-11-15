/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname: "fwip-backend.railway.app",
      pathname: "/uploads/**",
      },
    ],
  },
  experimental: {
    turbo: false // vypne Turbopack, build prejde na Vercel
  },
};

export default nextConfig;
