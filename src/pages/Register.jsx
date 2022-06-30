import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";

import { fetchRegister, selectIsAuth } from "../redux/slices/auth";

import { formtheme } from "../themes";

export const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Anrew Smith",
      email: "mail123@ukr.net",
      password: "885448",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert("Failure to register!");
    }

    if ("token" in data.paylod) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) return <Navigate to="/" />;
  return (
    <ThemeProvider theme={formtheme}>
      <Paper>
        <Typography variant="h5">Sign up</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={Boolean(errors.fullName?.message)}
            label="Name"
            {...register("fullName", {
              required: "Please enter your full name",
            })}
            fullWidth
          />
          <TextField
            error={Boolean(errors.email?.message)}
            {...register("email", { required: "Please enter your email" })}
            label="E-Mail"
            type="email"
            fullWidth
          />
          <TextField
            error={Boolean(errors.password?.message)}
            {...register("password", { required: "Please enter password" })}
            label="Password"
            type="password"
            fullWidth
          />

          <Button
            disabled={!isValid}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </ThemeProvider>
  );
};
