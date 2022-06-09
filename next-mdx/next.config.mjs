// next.config.mjs
import createMDX from "@next/mdx";

import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkMath from 'remark-math'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkParse, remarkFrontmatter, remarkGfm, remarkRehype, rehypeStringify, remarkMath],
    rehypePlugins: [rehypeStringify],
  },
});

export default withMDX(nextConfig);