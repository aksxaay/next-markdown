import { allPosts } from "@/.contentlayer/generated";
import { MDXComponentInterface } from "@/components/mdx-components";
import { Page } from "@/contentlayer.config";
import { Metadata } from "next";
import React from "react";

type PostProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PostProps) {
  const page = await getPostParams({ params });

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

// function to get Post from params
async function getPostParams({ params: { slug } }: PostProps) {
  const post = allPosts.find((post) => post.slugAsParams === slug);

  return post;
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostParams({ params });

  if (post)
    return (
      <>
        <article className="">
          <h1>{post.title}</h1>
          {/* {(post.description = undefined)} */}
          <p>{post.description}</p>
          <hr />
          <MDXComponentInterface code={post.body.code} />
        </article>
      </>
    );
}

export async function generateStaticParams() {
  const exportProps: PostProps[] = allPosts.map((post) => ({
    params: {
      slug: post.slugAsParams,
    },
  }));

  return exportProps;
}
