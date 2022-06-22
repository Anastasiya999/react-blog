import {
  Divider,
  ListItem,
  ListItemAvatar,
  Paper,
  Skeleton,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

export const CommentsBlock = ({ isLoading, items }) => {
  return (
    <Paper>
      <List>
        {(isLoading ? [...Array(9)] : items).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton ariant="circular" width={40} height={40} />
                  ) : (
                    <Avatar
                      alt={item.user.fullName}
                      src={item.user.avatarUrl}
                    />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText
                    primary={item.user.fullName}
                    secondary={item.text}
                  />
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};
