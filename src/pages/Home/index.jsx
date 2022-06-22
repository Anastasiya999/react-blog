import { Tabs, Tab, Grid } from "@mui/material";

import React from "react";
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
          <div>comments</div>
        </Grid>
      </Grid>
    </>
  );
};
