"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Button, CardActions, CardMedia } from "@mui/material";

interface ArticleProps {
  title: string;
  id: string;
  date: string;
  imageId: number;
}

export default function ArticleCard({
  title,
  id,
  imageId,
  date,
}: ArticleProps) {
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          minHeight: 360,
          margin: "2rem",
          backgroundColor: "#d62828",
          position: "relative",
        }}
      >
        <CardMedia
          src={`https://picsum.photos/720/1280?random=${imageId}`}
          component="img"
          alt="balloon"
          sx={{
            height: 140,
          }}
        />
        <CardContent>
          <a
            // href={sessionStorage.getItem("email") && sessionStorage.getItem("password") ? `/articles/${id}` : `/testForm`}
            href={`/articles/${id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              variant="h5"
              component="span"
              sx={{
                color: "#fcbf49",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              fontWeight={'bold'}
            >
              {title}
            </Typography>
          </a>
          <Typography variant="h6" component={"div"} sx={{ color: "#eae2b7" }}>
            {date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className="absolute left-4 bottom-4 border-r-2"
            color="primary"
            variant="contained"
          >
            {/* <a href={sessionStorage.getItem("email") && sessionStorage.getItem("password") ? `/articles/${id}` : `/testForm`}>Read More</a> */}
            <a href={`/articles/${id}`}>Read More</a>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}