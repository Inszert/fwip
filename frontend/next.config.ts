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
  serverExternalPackages: ["some-package-if-needed"], // nahraď podľa potreby
};

export default nextConfig;
