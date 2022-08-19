// next.config.mjs
import createMDX from "@next/mdx";

import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";

import rehypeStringify from "rehype-stringify";
import rehypeKatex from "rehype-katex";
import rehypeMathjax from "rehype-mathjax";
import rehypeHighlight from "rehype-highlight";

export default {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            providerImportSource: "@mdx-js/react",
            remarkPlugins: [remarkFrontmatter, remarkMath, remarkRehype, remarkGfm],
            rehypePlugins: [
              rehypeHighlight,
              rehypeMathjax,
              rehypeKatex,
              rehypeStringify,
            ],
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx"],
};
