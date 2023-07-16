// "use client";
import React from "react";
import { Metadata } from "next";
import { Page } from "@/.contentlayer/generated";
import { MDX } from "@/.contentlayer/generated";
// import { allPages } from "@/.contentlayer/generated";
import { getSortedPagesData } from "@/lib/pagesHelper";
import { MDXComponentInterface } from "@/components/mdx-components";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

import { compileMDX } from "next-mdx-remote/rsc";
// formatting options
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";

// components
import Button from "@/components/Button";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 10;

export async function generateMetadata({ params }: Props) {
  const page = await getPageParams({ params });

  if (page)
    return {
      title: page.title,
      description: page.description,
    };
  // else throw new Error("Page Not Found! Error 404");
  return {
    title: "Not Found",
    description: "debug: generateMetadata() : Page doesn't exist",
  } as Metadata;
}

async function getPageParams({ params }: Props) {
  // only catches the first part of slug
  const slug = params.slug;
  // give it preview / full
  const allPages = await getSortedPagesData();
  const page = allPages.find((page) => page.slugAsParams === slug);
  // console.log("page", page);
  return page;
}

export default async function PagePage({ params }: Props) {
  const page = await getPageParams({ params });

  const { content } = await compileMDX<{
    title: string;
    description: string;
    date: string;
  }>({
    source: page?.body,
    components: {
      Button,
      Image,
    },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
          ],
        ],
      },
    },
  });

  if (page) {
    const date = getFormattedDate(page.date);
    return (
      <>
        <article className="prose py-6 dark:prose-invert">
          <h1>{page.title}</h1>
          <p className="text-xl">{date}</p>
          <p className="text-xl">{page.description}</p>
          <hr />
          {/* <MDXComponentInterface code={page.body.code} /> */}
          {/* <section dangerouslySetInnerHTML={{ __html: page.body }} /> */}
          {content}
          <p className="mt-0 text-xl text-slate-700  dark:text-slate-200 ">
            <Link href="/">Back</Link>
          </p>
        </article>
      </>
    );
  }
}

export async function generateStaticParams() {
  // give it preview / full
  const allPages = await getSortedPagesData();
  const exportProps: Props[] = allPages.map((page) => ({
    params: { slug: page.slugAsParams },
  }));

  return exportProps;
}
