"use strict";

// next.config.js
var nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false
    };
    return config;
  }
};
module.exports = nextConfig;
