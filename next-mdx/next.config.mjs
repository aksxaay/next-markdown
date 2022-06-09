// next.config.mjs
import createMDX from "@next/mdx";

import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math'

import rehypeStringify from 'rehype-stringify'
import rehypeKatex from 'rehype-katex'
import rehypeMathjax from 'rehype-mathjax'
import rehypeHighlight from "rehype-highlight";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkParse, remarkFrontmatter, remarkGfm, remarkRehype, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeMathjax, rehypeStringify, rehypeHighlight],
  },
});

export default withMDX(nextConfig);