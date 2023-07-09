// next.config.js

const { withContentlayer } = require("next-contentlayer");
const { NextConfig } = require("next");

const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
};

module.exports = withContentlayer(nextConfig);
