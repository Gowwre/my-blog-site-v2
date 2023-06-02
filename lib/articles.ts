import fs from "fs";
import path from "path";
import matter from "gray-matter";
import  PostData  from "@/interfaces/PostData";
import PostId from "@/interfaces/PostId";
import { remark } from "remark";
import html from "remark-html";

const articleDirectory = path.join(process.cwd(), "articles");

function getAllPostData(): Array<PostData> {
  // Get file names under /articles
  const fileNames = fs.readdirSync(articleDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articleDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as {
        title: string;
        date: string;
      }),
    };
  });

  return allPostsData;
}



export function getSortedPostData(): Array<PostData> {
  const allPostsData = getAllPostData();
  
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(articleDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedResult = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedResult.toString();
  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      date: string;
    }),
  };
}

export function getAllPostIds(): Array<PostId> {
  const fileNames = fs.readdirSync(articleDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
