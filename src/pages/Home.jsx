import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tabs, Tab, Grid } from "@mui/material";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";

import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { useParams } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const renderPosts = (posts) => {
    if (name) {
      return posts.items.filter((item) =>
        Object.values(item.tags).includes(name)
      );
    }
    return posts.items;
  };

  return (
    <>
      <Tabs value={0} aria-label="basic tabs example" sx={{ mb: "1rem" }}>
        <Tab label="Popular" />
        <Tab label="New" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={12} md={8} lg={8} item>
          {(isPostsLoading ? [...Array(5)] : renderPosts(posts)).map(
            (post, index) => {
              return isPostsLoading ? (
                <Post isLoading />
              ) : (
                <Post
                  key={index}
                  id={post._id}
                  title={post.title}
                  imageUrl={
                    post.imageUrl
                      ? `${process.env.REACT_APP_API_URL}${post.imageUrl}`
                      : ""
                  }
                  user={post.user}
                  createdAt={post.createdAt}
                  viewsCount={post.viewsCount}
                  commentsCount={3}
                  tags={post.tags}
                  isEditable={userData?._id == post.user._id}
                />
              );
            }
          )}
        </Grid>
        <Grid xs={12} md={4} lg={4} item>
          {isTagsLoading ? (
            <TagsBlock items={["react", "node.js", "mern"]} />
          ) : (
            <TagsBlock items={tags.items} />
          )}

          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Tom Holland",
                  avatarUrl:
                    "https://www.themoviedb.org/t/p/w220_and_h330_face/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg",
                },
                text: "Mission accomplished. It's elegant!!",
              },
              {
                user: {
                  fullName: "Jered Wilson",
                  avatarUrl:
                    "https://images.generated.photos/MNpx_7zyOLdhU9Spis69JP1n_DEPnLetb9oAocPraVw/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjUxNjIzLmpwZw.jpg",
                },
                text: "I love your atmosphere.",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
