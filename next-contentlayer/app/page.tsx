import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            {post.description && <p>{post.description}</p>}
          </Link>
        </article>
      ))}
      <h2 className="font-black">OKAY</h2>
    </div>
  );
}
