import clsx from "clsx";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import React from "react";
import styles from "./Post.module.scss";
import { PostSkeleton } from "./PostSkeleton";
import { UserInfo } from "../UserInfo";

export const Post = ({
  children,
  isFullPost,
  imageUrl,
  title,
  _id,
  viewsCount,
  commentCount,
  isLoading = false,
}) => {
  if (isLoading) return <PostSkeleton />;

  return (
    <div className={clsx(styles.post, { [styles.postFull]: isFullPost })}>
      <div className={styles.editButtons}>
        <a href={`/posts/${_id}/edit`}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </a>
        <IconButton color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo fullName={"John Newmon"} additionalText="Modern developer" />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <a href={`/posts/${_id}`}>{title}</a>}
          </h2>
          <ul className={styles.tags}>
            <li>
              <a>#tag</a>
            </li>
            <li>
              <a>#tag2</a>
            </li>
            <li>
              <a>#tag3</a>
            </li>
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
