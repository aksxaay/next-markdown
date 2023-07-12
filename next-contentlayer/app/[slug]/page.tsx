// "use client";
import React from "react";
import { Metadata } from "next";
import { Page } from "@/.contentlayer/generated";
import { MDX } from "@/.contentlayer/generated";
// import { allPages } from "@/.contentlayer/generated";
import { getSortedPagesData } from "@/lib/pagesHelper";
import { MDXComponentInterface } from "@/components/mdx-components";

type Props = {
  params: {
    slug: string;
  };
};

const allPages = getSortedPagesData();
console.log("allPages :", allPages);

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
  const page = allPages.find((page) => page.slugAsParams === slug);
  // console.log("page", page);
  return page;
}

export default async function PagePage({ params }: Props) {
  const page = await getPageParams({ params });

  if (page)
    return (
      <>
        <article className="prose py-6 dark:prose-invert">
          <h1>{page.title}</h1>
          {page.description && <p className="text-xl">{page.description}</p>}
          <hr />
          {/* <MDXComponentInterface code={page.body.code} /> */}
          <p className="mt-0 text-xl text-slate-700  dark:text-slate-200 ">
            {page.body}
          </p>
        </article>
      </>
    );
}

export async function generateStaticParams() {
  const exportProps: Props[] = allPages.map((page) => ({
    params: { slug: page.slugAsParams },
  }));

  return exportProps;
}
