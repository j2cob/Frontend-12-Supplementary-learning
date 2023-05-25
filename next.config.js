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
      {
        protocol: "http",
        hostname: "backend-practice.codebootcamp.co.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
