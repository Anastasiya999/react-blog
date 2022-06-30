import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUserData, selectIsAuth } from "../redux/slices/auth";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { formtheme } from "../themes";
import { ThemeProvider } from "@mui/material";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "mail@ukr.net",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const res = await dispatch(fetchUserData(values));
    if (!res.payload) {
      return alert("Failure to authorise");
    }

    if ("token" in res.payload) {
      window.localStorage.setItem("token", res.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <ThemeProvider theme={formtheme}>
      <Paper>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="E-Mail"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            fullWidth
            {...register("email", { required: "Enter your email" })}
          />
          <TextField
            label="Password"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            fullWidth
            {...register("password", { required: "Enter your password" })}
          />
          <Button type="submit" size="large" variant="contained" fullWidth>
            Log in
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};
