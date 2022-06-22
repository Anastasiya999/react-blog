import { Tabs, Tab, Grid } from "@mui/material";

import React from "react";
import { Post } from "../../components/Post";

export const Home = () => {
  return (
    <>
      <Tabs value={0} aria-label="basic tabs example">
        <Tab label="Popular" />
        <Tab label="New" />
      </Tabs>
      <Grid>
        <Post
          title="React"
          isFullPost={true}
          _id={0}
          commentCount={2}
          viewsCount={10}
        />
      </Grid>
      <Grid>
        <div>tags</div>
        <div>comments</div>
      </Grid>
    </>
  );
};
