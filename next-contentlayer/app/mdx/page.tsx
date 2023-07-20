"use client";

import HelloWorld, { meta } from "./hello.mdx";

export default function Page() {
  return (
    <>
      <article className="prose py-6 dark:prose-invert">
        <p>{meta.author}</p>
        {/* {HelloWorld.toString()} */}
        <HelloWorld />
      </article>
    </>
  );
}
