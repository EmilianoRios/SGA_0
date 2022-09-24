// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----
import { useAuth } from "../context/UserProvider";

// ---- REACT-ROUTES ----
import { Link as ReactRouter } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

// ---- COMPONENT ----
export const Otros = () => {
	const { user } = useAuth();

	return (
		<>
			<Flex align="center" justify="center" h="100vh">
				<Box rounded="md" p={6} bg="blackAlpha.300" w="xl">
					<Text fontSize="2xl" align="center" p={4}>
						Otros
					</Text>
					<Stack direction="column" spacing={4}>
						<ReactRouter to="/barrios">
							<Button colorScheme="blue" width="full">
								Barrios
							</Button>
						</ReactRouter>
						<ReactRouter to="/circuitos">
							<Button colorScheme="blue" width="full">
								Circuitos
							</Button>
						</ReactRouter>
						<ReactRouter to="/localidades">
							<Button colorScheme="blue" width="full">
								Localidades
							</Button>
						</ReactRouter>
						<ReactRouter to="/registro/admin">
							<Button colorScheme="blue" width="full">
								Registrar Coordinador / Administrador
							</Button>
						</ReactRouter>
						<ReactRouter to="/home">
							<Button colorScheme="teal" width="full">
								Volver
							</Button>
						</ReactRouter>
					</Stack>
				</Box>
			</Flex>
		</>
	);
};
