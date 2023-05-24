/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "placehold.it",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
