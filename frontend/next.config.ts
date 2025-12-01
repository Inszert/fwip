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
  // Force Webpack build
  experimental: {
    serverComponentsExternalPackages: ["@tailwindcss/node"],
    forceSwcTransforms: true, // trochu pomáha pri LightningCSS
  },
};

export default nextConfig;
