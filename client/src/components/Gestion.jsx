// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----

// ---- REACT-ROUTES ----
import { Link as ReactRouter, useParams } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

// ---- COMPONENT ----
import { Registration } from "../routes/RegistroEncargados";

export const Gestion = () => {
	const { encargado } = useParams();

	return (
		<Grid
			templateAreas={`"form sidebar"
                      "form    sidebar"`}
			gridTemplateRows={"auto 1fr 30px"}
			gridTemplateColumns={"1fr 160px"}
			h="container.xxl"
			gap="1"
			color="WhiteAlpha.900"
		>
			<GridItem p="2" bg="blackAlpha.200" rounded="md" area={"sidebar"}>
				<Text fontSize="xl" align="center" p={4}>
					Gestionar
				</Text>
				<Stack direction="column" spacing={4}>
					<ReactRouter to="/gestion/coordinadores">
						<Button colorScheme="blue" width="full">
							Coordinadores
						</Button>
					</ReactRouter>
					<ReactRouter to="/gestion/subcoordinadores">
						<Button colorScheme="blue" width="full">
							SubCoordinadores
						</Button>
					</ReactRouter>
					<ReactRouter to="/gestion/delegados">
						<Button colorScheme="blue" width="full">
							Delegados
						</Button>
					</ReactRouter>
					<ReactRouter to="/gestion/incorporados">
						<Button colorScheme="blue" width="full">
							Incorporados
						</Button>
					</ReactRouter>
				</Stack>
				<Text fontSize="xl" align="center" p={4}>
					Opciones
				</Text>
				<Stack direction="column" spacing={4}>
					<ReactRouter to={"/listado/" + encargado}>
						<Button colorScheme="blue" width="full">
							Listado
						</Button>
					</ReactRouter>
					<ReactRouter to={"/modificar/" + encargado}>
						<Button colorScheme="blue" width="full">
							Modificar
						</Button>
					</ReactRouter>
					<ReactRouter to="/coordinadores/">
						<Button colorScheme="teal" width="full">
							Volver
						</Button>
					</ReactRouter>
				</Stack>
			</GridItem>
			<GridItem pl="2" bg="blackAlpha.200" rounded="md" area={"form"}>
				<Registration />
			</GridItem>
		</Grid>
	);
};
