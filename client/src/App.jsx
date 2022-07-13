// ---- COMPONENTS ----
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";

// ---- REQUIRE-AUTH ----
import { RequireAuth } from "./components/RequireAuth";

// ---- REACT-ROUTER ----
import { Routes, Route, Link } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Container } from "@chakra-ui/react";

// ---- COMPONENTS-ROUTES ----
import { Profile } from "./routes/Profile";
import { Login } from './routes/Login';
import { Registration } from "./routes/Registration";

export function App() {
  return (
    <>
      <Container maxW="container.xl">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>}/>
        </Routes>
      </Container>
    </>
  );
}
