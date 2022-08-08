// ---- REACT-HOOKS ----
import React from "react";
import { Navigate } from "react-router-dom";

// ---- AUTH-PROVIDER ----

// ---- REACT-ROUTES ----
import { Link as ReactRouter, useParams } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

// ---- COMPONENT ----
import { RegistroBarrios } from "../routes/RegistroBarrios";
import { RegistroCircuitos } from "../routes/RegistroCircuitos";
import { RegistroLocalidades } from "../routes/RegistroLocalidades";

export const GestionOtros = () => {
	let render;
	const { division } = useParams();

	if (division == "barrios") {
		render = <RegistroBarrios />;
	} else if (division == "circuitos") {
		render = <RegistroCircuitos />;
	} else if (division == "localidades") {
		render = <RegistroLocalidades />;
	} else {
		return <Navigate to="/home" />;
	}

	return (
		<Grid
			templateAreas={`"form sidebar"
                      "form sidebar"`}
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
					<ReactRouter to="/otros/gestion/barrios">
						<Button colorScheme="blue" width="full">
							Barrios
						</Button>
					</ReactRouter>
					<ReactRouter to="/otros/gestion/circuitos">
						<Button colorScheme="blue" width="full">
							Circuitos
						</Button>
					</ReactRouter>
					<ReactRouter to="/otros/gestion/localidades">
						<Button colorScheme="blue" width="full">
							Localidades
						</Button>
					</ReactRouter>
				</Stack>
				<Text fontSize="xl" align="center" p={4}>
					Opciones
				</Text>
				<Stack direction="column" spacing={4}>
					<ReactRouter to={"/otros/listado/" + division}>
						<Button colorScheme="blue" width="full">
							Listado
						</Button>
					</ReactRouter>
					<ReactRouter to={"/otros/modificar/" + division}>
						<Button colorScheme="blue" width="full">
							Modificar
						</Button>
					</ReactRouter>
					<ReactRouter to={"/" + division}>
						<Button colorScheme="teal" width="full">
							Volver
						</Button>
					</ReactRouter>
				</Stack>
			</GridItem>
			<GridItem pl="2" bg="blackAlpha.200" rounded="md" area={"form"}>
				{render}
			</GridItem>
		</Grid>
	);
};
