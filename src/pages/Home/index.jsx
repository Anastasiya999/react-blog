import { Tabs, Tab, Grid } from "@mui/material";

import React from "react";
import { CommentsBlock } from "../../components/CommentsBlock";
import { Post } from "../../components/Post";
import { TagsBlock } from "../../components/TagsBlock";

export const Home = () => {
  return (
    <>
      <Tabs value={0} aria-label="basic tabs example">
        <Tab label="Popular" />
        <Tab label="New" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {[...Array(5)].map(() => (
            <Post
              id={1}
              title="Diffusion"
              imageUrl="https://miro.medium.com/max/1400/1*l2vNxc9a79Es_ryK8mFWtw.jpeg"
              user={{
                avatarUrl:
                  "https://blog.uniproacademy.com/wp-content/uploads/2017/12/come-creare-un-blog-e-come-gestirlo.jpg",
                fullName: "John",
              }}
              createdAt={"22 June 2022. "}
              viewsCount={150}
              commentsCount={3}
              tags={["react", "mern", "typescript"]}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={["react", "typescript", "mern"]}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Vasya Pupkin",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "This is a test comment",
              },
              {
                user: {
                  fullName: "Ivan Ivanov",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
