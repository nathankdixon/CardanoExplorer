const withFonts = require('next-fonts');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dweb.link', 'ipfs.io', 'arweave.net'],
  },
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };

    return config;
  },
};

module.exports = withFonts(nextConfig);
