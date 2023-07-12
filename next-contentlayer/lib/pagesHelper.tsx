import fs from "fs";
import path from "path";
import matter from "gray-matter";

const pagesDirectory = path.join(process.cwd(), "content/pages");

export function getSortedPagesData() {
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
  const allPages = fileNames.map((fileName) => {
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

    const Page: Page = {
      _id,
      type: "Page",
      // required
      title: matterData.data.title,
      date: matterData.data.date,
      description: matterData?.data?.description,
      body: matterData?.content,
      slug: _id, // file-name
      slugAsParams: '' + _id, // content/pages/file-name.md
    };

    return Page;
  });

  return allPages.sort((a, b) => (a.date < b.date ? 1 : -1));
}
