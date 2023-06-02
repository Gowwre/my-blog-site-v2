"use client";

import PostData  from "@/interfaces/PostData";
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import ArticleCard from "./ArticleCard";

interface ArticleProps {
  data: PostData[];
}

const ArticleList = ({ data }: ArticleProps) => {
  const [postData, setPostData] = useState<PostData[]>(data);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPostData(data);
  }, []);
  return (
    <>
      <Grid container sx={{ marginBottom: "2rem" }}>
        {postData.slice((page - 1) * 6, (page - 1) * 6 + 6).map((post, index) => (
          <Grid item xs={12} md={6} lg={4} key={post.id}>
            <ArticleCard title={post.title} id={post.id} imageId={index} date={post.date}/>
          </Grid>
        ))}
      </Grid>

      <Pagination sx={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
        page={page}
        onChange={(e, page) => setPage(page)}
        count={Math.ceil(postData.length / 6)}
        color="primary"
      />
    </>
  );
};



export default ArticleList;
