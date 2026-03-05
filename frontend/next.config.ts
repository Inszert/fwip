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
  // mark server-only packages here
  serverExternalPackages: ["@tailwindcss/node", "resend"],
};

export default nextConfig;