import React from "react";
import axios from "../axios";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

import { selectIsAuth } from "../redux/slices/auth";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { PostSkeleton } from "../components/Post/PostSkeleton";
import { Stack } from "@mui/material";

import { ThemeProvider } from "@mui/material";
import { titleFormTheme } from "../themes";

export const AddPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  React.useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios.get(`/posts/${id}`).then((res) => {
        setText(res.data.text);
        setTitle(res.data.title);
        setTags(res.data.tags.join(", "));
        setImageUrl(res.data.imageUrl);
        setIsLoading(false);
      });
    }
    console.log("now", isEditing, id);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Failure to upload image");
    }
  };

  const handleRemoveImage = () => {
    if (window.confirm("Are you sure want to delete preview image?"))
      setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        text,
        tags,
        imageUrl,
      };

      let post_id;
      if (isEditing) {
        await axios.patch(`/posts/${id}`, fields);
        post_id = id;
      } else {
        const { data } = await axios.post("/posts", fields);
        post_id = data._id;
      }

      navigate(`/posts/${post_id}`);
    } catch (error) {
      console.warn(error);
      alert("Failure to create post");
    }
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  if (!window.localStorage.getItem("token") && !isAuth)
    return <Navigate to="/" />;

  if (isLoading) return <PostSkeleton />;

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        size="medium"
        sx={{ border: "1px dashed black", mr: "1em", mb: "1rem" }}
        onClick={() => inputFileRef.current.click()}
      >
        Download preview
      </Button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <IconButton
            aria-label="delete"
            onClick={handleRemoveImage}
            sx={{ mb: "1rem" }}
          >
            <DeleteIcon />
          </IconButton>

          <img
            alt="uploaded"
            src={`http://localhost:4444${imageUrl}`}
            width="100%"
          />
        </>
      )}

      <br />
      <ThemeProvider theme={titleFormTheme}>
        <TextField
          variant="standard"
          placeholder="Article title ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
      </ThemeProvider>

      <TextField
        sx={{ mb: "1rem" }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE value={text} onChange={onChange} options={options} />
      <br />

      <Stack
        justifyContent="start"
        alignItems="baseline"
        flexDirection="row"
        sx={{ flexShrink: 1, gap: 2 }}
      >
        {" "}
        <Button size="large" variant="contained" onClick={onSubmit}>
          Publish
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </Stack>
    </Paper>
  );
};
