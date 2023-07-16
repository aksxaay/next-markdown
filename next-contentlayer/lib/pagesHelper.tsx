import fs from "fs";
import path from "path";
import matter from "gray-matter";

// md processing
import { unified } from "unified";
import html from "remark-html";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const pagesDirectory = path.join(process.cwd(), "content/pages");

export async function getSortedPagesData(
  bodyOption: "preview" | "full" = "full"
) {
  // get file under /content/posts
  const fileNames = fs.readdirSync(pagesDirectory);
  /*
  fileNames : [
    'deploying-next-apps-copy.mdx',
    'deploying-next-apps.mdx',
    'sample.mdx',
    'sample2.mdx'
  ]
  */
  const allPages = await Promise.all(
    fileNames.map(async (fileName) => {
      // remove .md to get slug
      const _id = fileName.replace(/\.mdx/, "");

      // read markdown file as string
      const fullPath = path.join(pagesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // use gray-matter to parse the post metadata
      // you get back GrayMatterFile<string>
      /* 
    {
      data: { 
        title: string, 
        description: string, 
        date: Date
      },
      content: string
    }
    */
      const matterData = matter(fileContents);
      /*
      // remark + html processing
      const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      // .use(rehypePrettyCode, {
        //   theme: "monokai",
        // })
        .use(rehypeStringify)
        .process(matterData.content);
        const contentHtml = processedContent.toString();
      */

      const Page: Page = {
        _id,
        type: "Page",
        // required
        title: matterData.data.title,
        date: matterData.data.date,
        description: matterData?.data?.description,
        body: bodyOption == "full" ? matterData?.content : "bodyOption: preview",
        slug: _id, // content/pages/file-name.md
        slugAsParams: _id, // file-name
      };

      return Page;
    })
  );

  return allPages.sort((a, b) => (a.date < b.date ? 1 : -1));
}
