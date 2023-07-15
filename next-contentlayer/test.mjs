import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // See Options section below.
      theme: "monokai",
    })
    .use(rehypeStringify)
    .process("`const numbers = [1, 2, 3]{:js}`");

  console.log(String(file));
}

main();
