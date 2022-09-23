// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----
import { useAuth } from "../context/UserProvider";

// ---- REACT-ROUTES ----
import { Link as ReactRouter, useNavigate } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

// ---- COMPONENT ----
export const Home = () => {
	const { user, setUser } = useAuth();
	let navigateTo = useNavigate();

	const logOut = () => {
		localStorage.removeItem("accessToken");
		setUser({ usuario: "", id: 0, status: false });
		navigateTo("/", { replace: true });
	};

	return (
		<>
			<Flex align="center" justify="center" h="100vh">
				<Box rounded="md" p={6} bg="blackAlpha.300" w="xl">
					<Text fontSize="2xl" align="center" p={4}>
						Elecciones
					</Text>
					<Stack direction="column" spacing={4}>
						<ReactRouter to="/coordinadores">
							<Button colorScheme="blue" width="full">
								Coordinadores
							</Button>
						</ReactRouter>
						<ReactRouter to="/subcoordinadores">
							<Button colorScheme="blue" width="full">
								Sub-Coordinadores
							</Button>
						</ReactRouter>
						<ReactRouter to="/delegados">
							<Button colorScheme="blue" width="full">
								Delegados
							</Button>
						</ReactRouter>
						<ReactRouter to="/incorporados">
							<Button colorScheme="blue" width="full">
								Incorporados
							</Button>
						</ReactRouter>
						{user.rol === "ADMIN" ? (
							<ReactRouter to="/otros">
								<Button colorScheme="blue" width="full">
									Otros
								</Button>
							</ReactRouter>
						) : (
							""
						)}
						<Button onClick={logOut} colorScheme="red" width="full">
							Cerrar Sesión
						</Button>
					</Stack>
				</Box>
			</Flex>
		</>
	);
};
