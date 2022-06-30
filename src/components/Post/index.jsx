import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { PostSkeleton } from "./PostSkeleton";
import { UserInfo } from "../UserInfo";

import { fetchRemovePost } from "../../redux/slices/posts";

import styles from "./Post.module.scss";
import { Typography } from "@mui/material";

export const Post = ({
  children,
  isFullPost,
  imageUrl,
  title,
  id,
  createdAt,
  viewsCount,
  user,
  tags,
  commentsCount,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  const handleRemovePost = () => {
    dispatch(fetchRemovePost(id));
  };

  if (isLoading) return <PostSkeleton />;

  return (
    <div className={[styles.post, isFullPost && styles.postFull].join(" ")}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color="secondary" onClick={handleRemovePost}>
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className={[styles.image, isFullPost && styles.imageFull].join(" ")}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={[styles.title, isFullPost && styles.titleFull].join(" ")}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.tags}>
            {tags.map((item, index) => (
              <li key={index}>
                <a>#{item}</a>
              </li>
            ))}
          </ul>
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
