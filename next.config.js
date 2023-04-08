const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dweb.link', 'ipfs.io', 'arweave.net']
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
