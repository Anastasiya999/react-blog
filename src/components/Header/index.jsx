import { Button, Container } from "@mui/material";
import styles from "./Header.module.scss";
import React from "react";

export const Header = () => {
  const isAuth = false;
  return (
    <div className={styles.header}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <a className={styles.logo} href="/">
            <div>Fancy Blog</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <a href="/posts/create">
                  <Button>Write article</Button>
                </a>
                <Button>Log out</Button>
              </>
            ) : (
              <>
                <a href="/login">
                  <Button>Log in</Button>
                </a>
                <a href="/register">
                  <Button>Register</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
