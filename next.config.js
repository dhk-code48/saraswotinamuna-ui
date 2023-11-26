/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images2.imgbox.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.18.87",
        port: "1337",
        pathname: "/uploads/**",
      },
    ], // Add the hostname here
  },
};

module.exports = nextConfig;
