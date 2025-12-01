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
  serverExternalPackages: ["@tailwindcss/node"], // nahraď podľa potreby
};

export default nextConfig;
