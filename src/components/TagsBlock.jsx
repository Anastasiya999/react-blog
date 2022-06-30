import React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { chooseTag, selectTag } from "../redux/slices/posts";
import { useNavigate } from "react-router-dom";

import { listtheme } from "../themes";

export const TagsBlock = ({ isLoading, items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTag = useSelector(selectTag);
  const [selected, setSelected] = React.useState(selectedTag);

  const handleSelect = (index, name) => {
    dispatch(chooseTag(index));
    setSelected(index);
    navigate(`/tags/${name}`);
  };

  return (
    <Paper
      sx={{
        mb: "15px",
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <ThemeProvider theme={listtheme}>
        <List>
          {(isLoading ? [...Array(5)] : items).map((name, i) => (
            <a style={{ textDecoration: "none", color: "black" }}>
              <ListItem
                disablePadding
                key={i}
                selected={selected == i}
                onClick={() => handleSelect(i, name)}
              >
                <ListItemButton>
                  {isLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    <ListItemText primary={`# ${name}`} />
                  )}
                </ListItemButton>
              </ListItem>
            </a>
          ))}
        </List>
      </ThemeProvider>
    </Paper>
  );
};
