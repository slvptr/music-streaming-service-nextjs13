/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["avatars.yandex.net", "storage.yandexcloud.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        port: "",
        pathname: "/music-streaming-services/**",
      },
    ],
  },
};

module.exports = nextConfig;
