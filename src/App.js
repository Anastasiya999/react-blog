import React from "react";

import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";

import { FullPost, AddPost, Register, Home, Login } from "./pages";
import { Header } from "./components/Header";

import "./style/App.scss";

import { fetchAuthMe } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ pb: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/tags/:name" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
