import React from "react";
import axios from "../axios";

import { useParams } from "react-router-dom";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failure to load post");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl
            ? `${process.env.REACT_APP_API_URL}${data.imageUrl}`
            : ""
        }
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={150}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Jane Ostin",
              avatarUrl: "https://mui.com/static/images/avatar/3.jpg",
            },
            text: "Splendid work you have here.",
          },
          {
            user: {
              fullName: "Eric Menson",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "Mission accomplished. It's fun.",
          },
        ]}
        isLoading={false}
      />
    </>
  );
};
