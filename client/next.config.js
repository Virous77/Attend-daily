/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
};

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  scope: "/",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA(nextConfig);
