// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----

// ---- REACT-ROUTES ----
import { Link as ReactRouter } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";

// ---- COMPONENT ----
export const Incorporados = () => {
	return (
		<Flex align="center" justify="center" h="100vh">
			<Box rounded="md" p={6} bg="blackAlpha.300" w="xl">
				<Text fontSize="2xl" align="center" p={4}>
					Incorporados
				</Text>
				<Stack direction="column" spacing={4}>
					<ReactRouter to="/gestion/incorporados">
						<Button colorScheme="blue" width="full">
							Alta de Incorporados
						</Button>
					</ReactRouter>
					<ReactRouter to="/listado/incorporados">
						<Button colorScheme="blue" width="full">
							Listado, Modificación y Eliminación de Incorporados
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
	);
};
