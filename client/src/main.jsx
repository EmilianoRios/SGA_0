// ---- REACT ----
import React from "react";
import ReactDOM from "react-dom/client";

// ---- APP ----
import { App } from "./App";

// ---- BROWSER-ROUTER ----
import { BrowserRouter } from "react-router-dom";

// ---- USER-PROVIDER ----
import { UserProvider } from "./context/UserProvider";

// ---- CHAKRA-UI ----
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
