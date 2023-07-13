import { allPosts } from "@/.contentlayer/generated";
import { getSortedPagesData } from "@/lib/pagesHelper";
import { getSortedPostsData } from "@/lib/postsHelper";
import Link from "next/link";

export default async function Home() {
  const posts = await getSortedPostsData();
  const pages = await getSortedPagesData();

  // technically don't need to show posts
  const combinedAssets = [...posts];

  return (
    <div className="prose dark:prose-invert">
      {combinedAssets.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2 className="font-extrabold">{post.title}</h2>
          </Link>
          <p>{post.description}</p>
        </article>
      ))}
    </div>
  );
}
