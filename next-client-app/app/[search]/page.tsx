import getWikiResults from "@/lib/getWikiResults";
import React from "react";

import Item from "./components/Item";

type Props = {
  params: {
    search: string;
  };
};

// export metadata
export async function generateMetadata({ params: { search } }: Props) {
  const data = await getWikiResults(search);
  const results = data?.query?.pages;
  const displayTerm = search.replaceAll("%20", " ");

  if (!results)
    return {
      title: `${displayTerm} Not Found`,
    };

  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  };
}

export default async function SearchPage({ params: { search } }: Props) {
  /*
  const wikiDataPromise: Promise<SearchResult> = await getWikiResults(search);
  const data = await wikiDataPromise;
  */

  // I type casted the data that getWikiResults is outputting

  // fetch getWikiResults from lib
  const data = await getWikiResults(search);
  const results = data?.query?.pages;

  return (
    <>
      <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
        {results ? (
          Object.values(results).map((result) => {
            return <Item key={result.pageid} result={result}></Item>;
          })
        ) : (
          <h2 className="p-2 text-xl">{`${search} not found!`}</h2>
        )}
      </main>
    </>
  );
}
