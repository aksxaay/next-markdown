import { defineDocumentType, makeSource } from "contentlayer/source-files"

// types
import { ComputedFields, LocalDocument } from "contentlayer/source-files";

// MDX Plugins
import rehypeHighlight from "rehype-highlight/lib";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import {
  rehypePrettyCodeClasses,
  rehypePrettyCodeOptions,
} from "./lib/rehypePrettyCode"
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { HEADING_LINK_ANCHOR } from "./lib/constants";


// /** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: ComputedFields<"Post" | "Page"> = {
  slug: {
    type: "string",
    resolve: (doc: LocalDocument) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc: LocalDocument) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
  // MDX Plugins attach
  mdx: {
    remarkPlugins: [[remarkGfm]],
    rehypePlugins: [
      // [rehypeHighlight],
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [rehypePrettyCodeClasses],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: [HEADING_LINK_ANCHOR],
          },
        },
      ],
    ],
  },
})