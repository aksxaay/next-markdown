// "use client";
import React from "react";
import { Metadata } from "next";
import { allPages } from "@/.contentlayer/generated";
import { MDXComponentInterface } from "@/components/mdx-components";

type Props = {
  params: {
    slug: string;
  };
};

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
  };
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
        <article className="py-6 prose dark:prose-invert">
          <h1>{page.title}</h1>
          {page.description && <p className="text-xl">{page.description}</p>}
          <hr />
          {/* this renders MDX */}
          <MDXComponentInterface code={page.body.code} />
          <hr />
          {/* {page.body.code}
          <hr />
          {page.body.raw}
          <hr /> */}
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
