import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function getPostParams({ params: { slug } }: Props) {
  return <div>{slug}</div>;
}
