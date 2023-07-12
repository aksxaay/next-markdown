import { getSortedPagesData } from "@/lib/pagesHelper";

export default function Posts() {
  const allPages = getSortedPagesData();
  return (
    // bruv embarrassing forgor fragment
    <>
      {allPages.map((page) => (
        <article className="prose py-6 dark:prose-invert">
          <h1 className="mb-2">{page.title}</h1>
          {/* {(page.description = undefined)} */}
          <p className="mt-0 text-xl text-slate-700  dark:text-slate-200 ">
            {page.description}
          </p>
          <hr className="my-4" />
          {/* <MDXComponentInterface code={page.body.code} /> */}
          <p className="mt-0 text-xl text-slate-700  dark:text-slate-200 ">
            {page.body}
          </p>
        </article>
      ))}
    </>
  );
}
