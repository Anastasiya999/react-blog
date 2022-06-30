import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Container } from "@mui/material";

import { logout, selectIsAuth } from "../../redux/slices/auth";

import styles from "./Header.module.scss";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    if (window.confirm("Are you sure want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  return (
    <div className={styles.header}>
      <Container maxWidth="lg">
        <div className={styles.wrapper}>
          <Link className={styles.logo} to="/">
            <div>Fancy Blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <a href="/add-post">
                  <Button>
                    Write article <span className={styles.outline} />
                  </Button>
                </a>
                <Button onClick={handleLogOut}>
                  Log out <span className={styles.outline} />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button>
                    Log in
                    <span className={styles.outline} />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button>
                    Register
                    <span className={styles.outline} />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
