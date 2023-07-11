import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      {allPosts.map((post) => (
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
