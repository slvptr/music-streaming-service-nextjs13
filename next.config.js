/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: { appDir: true },
  images: {
    domains: ["avatars.yandex.net"],
  },
};

module.exports = nextConfig;
