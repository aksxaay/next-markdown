import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

export default function getPageParams({ params: { slug } }: Props) {
  // only catches the first part of slug
  const firstSlug = slug[0];
  return <div>{firstSlug} Page</div>;
}
