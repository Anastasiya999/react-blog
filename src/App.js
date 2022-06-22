import { Container } from "@mui/material";
import { Header } from "./components/Header";
import { FullPost } from "./pages/FullPost";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Header />
      <Container>
        <Home />
        <FullPost />
      </Container>
    </>
  );
}

export default App;
