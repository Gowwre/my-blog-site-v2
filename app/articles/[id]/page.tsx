import React from "react";
import { getPostData } from "@/lib/articles";
import CustomButton from "@/components/Button";
import "./page.module.css"

interface ArticleProps {
  params: {
    id: string;
  };
}

async function ArticlePage({ params }: ArticleProps) {
  const postData = await getPostData(params.id);

  return (
    <>
      <article>
        <div className="mb-2">
          <h1 className={`text-4xl flex justify-center`}>{postData.title}</h1>
          <h2 className="text-xl flex justify-center">{postData.date}</h2>
        </div>

        <main
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml! }}
        ></main>
      </article>
      <div className="mt-6">
        <CustomButton>
          <a href={"/"}>Return home</a>
        </CustomButton>
      </div>
    </>
  );
}

export default ArticlePage;
