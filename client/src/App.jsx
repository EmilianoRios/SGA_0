// ----- HOST CONTEXT -----

// ---- COMPONENTS ----
import { Barrios } from "./components/Barrios";
import { Circuitos } from "./components/Circuitos";
import { Coordinadores } from "./components/Coordinadores";
import { Delegados } from "./components/Delegados";
import { Gestion } from "./components/Gestion";
import { GestionOtros } from "./components/GestionOtros";
import { Incorporados } from "./components/Incorporados";
import { Home } from "./components/Inicio";
import { Listado } from "./components/Listado";
import { ListadoOtros } from "./components/ListadoOtros";
import { Localidades } from "./components/Localidades";
import { Navbar } from "./components/Navbar";
import { Otros } from "./components/OtrosMenu";
import { SubCoordinadores } from "./components/SubCoordinadores";

// ---- REQUIRE-AUTH ----
import { RequireAuth } from "./components/RequireAuth";

// ---- REACT-ROUTER ----
import { Route, Routes } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Container } from "@chakra-ui/react";

// ---- ROUTES ----
import { Login } from "./routes/Login";

export function App() {
	return (
		<>
			<Container maxW="container.xl">
				<Navbar />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/home"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="/coordinadores"
						element={
							<RequireAuth>
								<Coordinadores />
							</RequireAuth>
						}
					/>
					<Route
						path="/subcoordinadores"
						element={
							<RequireAuth>
								<SubCoordinadores />
							</RequireAuth>
						}
					/>
					<Route
						path="/delegados"
						element={
							<RequireAuth>
								<Delegados />
							</RequireAuth>
						}
					/>
					<Route
						path="/incorporados"
						element={
							<RequireAuth>
								<Incorporados />
							</RequireAuth>
						}
					/>
					<Route
						path="/otros"
						element={
							<RequireAuth>
								<Otros />
							</RequireAuth>
						}
					/>
					<Route
						path="/barrios"
						element={
							<RequireAuth>
								<Barrios />
							</RequireAuth>
						}
					/>
					<Route
						path="/circuitos"
						element={
							<RequireAuth>
								<Circuitos />
							</RequireAuth>
						}
					/>
					<Route
						path="/localidades"
						element={
							<RequireAuth>
								<Localidades />
							</RequireAuth>
						}
					/>
					<Route
						path="/gestion/:encargado"
						element={
							<RequireAuth>
								<Gestion />
							</RequireAuth>
						}
					/>
					<Route
						path="/modificar/:encargado/:id"
						element={
							<RequireAuth>
								<Gestion />
							</RequireAuth>
						}
					/>
					<Route
						path="/otros/gestion/:division"
						element={
							<RequireAuth>
								<GestionOtros />
							</RequireAuth>
						}
					/>
					<Route
						path="/listado/:encargado"
						element={
							<RequireAuth>
								<Listado />
							</RequireAuth>
						}
					/>
					<Route
						path="/otros/listado/:division"
						element={
							<RequireAuth>
								<ListadoOtros />
							</RequireAuth>
						}
					/>
					<Route
						path="/otros/modificar/:division/:id"
						element={
							<RequireAuth>
								<GestionOtros />
							</RequireAuth>
						}
					/>
				</Routes>
			</Container>
		</>
	);
}
