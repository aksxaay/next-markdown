const { withContentlayer } = require("next-contentlayer");
const rehypePrettyCode = require("rehype-pretty-code");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // can't load shiki in next 13 rsc
    // https://github.com/shikijs/shiki/issues/398#issuecomment-1384458154
    serverComponentsExternalPackages: ["vscode-oniguruma", "shiki"],
  },
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  theme: "monokai",
};

const withMDX = require("@next/mdx")({
  // Optionally provide remark and rehype plugins
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, options]],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

// module.exports = withContentlayer(nextConfig);
module.exports = withMDX(nextConfig);
