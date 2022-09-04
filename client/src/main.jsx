// ---- REACT ----
import React from "react";
import ReactDOM from "react-dom/client";

// ---- APP ----
import { App } from "./App";

// ---- BROWSER-ROUTER ----
import { BrowserRouter } from "react-router-dom";

// ---- USER-PROVIDER ----
import { HostProvider } from "./context/HostProvider";
import { UserProvider } from "./context/UserProvider";

// ---- CHAKRA-UI ----
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./styles/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HostProvider>
			<UserProvider>
				<ChakraProvider>
					<BrowserRouter>
						<ColorModeScript initialColorMode={theme.config.initialColorMode} />
						<App />
					</BrowserRouter>
				</ChakraProvider>
			</UserProvider>
		</HostProvider>
	</React.StrictMode>
);
