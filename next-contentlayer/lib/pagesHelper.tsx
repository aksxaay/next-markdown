import fs from "fs";
import path from "path";
import matter from "gray-matter";

// md processing
import { remark } from "remark";
import html from "remark-html";

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

      // remark + html processing
      const processedContent = await remark()
        .use(html)
        .process(matterData.content);
      const contentHtml = processedContent.toString();

      const Page: Page = {
        _id,
        type: "Page",
        // required
        title: matterData.data.title,
        date: matterData.data.date,
        description: matterData?.data?.description,
        body: bodyOption == "full" ? contentHtml : "bodyOption: preview",
        slug: _id, // content/pages/file-name.md
        slugAsParams: _id, // file-name 
      };

      return Page;
    })
  );

  return allPages.sort((a, b) => (a.date < b.date ? 1 : -1));
}
