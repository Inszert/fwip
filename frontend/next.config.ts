/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  experimental: {
    turbo: false // vypne Turbopack, build prejde na Vercel
  },
};

export default nextConfig;
