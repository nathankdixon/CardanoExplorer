/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dweb.link'],
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true
    };
    return config;
  },
};
module.exports = nextConfig;