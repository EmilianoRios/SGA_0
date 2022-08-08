// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----

// ---- REACT-ROUTES ----
import { Link as ReactRouter, useParams } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

// ---- COMPONENT ----
import { ListadoCoordinadores } from "../routes/ListadoCoordinadores";
import { ListadoDelegados } from "../routes/ListadoDelegados";
import { ListadoIncorporados } from "../routes/ListadoIncorporados";
import { ListadoSubCoordinadores } from "../routes/ListadoSubCoordinadores";

export const Listado = () => {
	let render;
	const { encargado } = useParams();

	if (encargado == "coordinadores") {
		render = <ListadoCoordinadores />;
	} else if (encargado == "subcoordinadores") {
		render = <ListadoSubCoordinadores />;
	} else if (encargado == "delegados") {
		render = <ListadoDelegados />;
	} else if (encargado == "incorporados") {
		render = <ListadoIncorporados />;
	} else {
		return <Navigate to="/home" />;
	}

	return (
		<Grid
			templateAreas={`"navbar"
                            "table"`}
			gridTemplateRows={"auto 300px 30px"}
			gridTemplateColumns={"auto"}
			h="container.xxl"
			gap="1"
			color="WhiteAlpha.900"
		>
			<GridItem p="2" bg="blackAlpha.200" rounded="md" area={"navbar"}>
				<Text fontSize="xl" align="center" p={4}>
					Opciones
				</Text>
				<Stack direction="column" spacing={3} align="right">
					<ReactRouter to={"/gestion/" + encargado}>
						<Button colorScheme="blue" width="full">
							Registro
						</Button>
					</ReactRouter>
					<ReactRouter to={"/" + encargado}>
						<Button colorScheme="teal" width="full">
							Volver
						</Button>
					</ReactRouter>
				</Stack>
			</GridItem>
			<GridItem pl="2" bg="blackAlpha.200" rounded="md" area={"table"}>
				{render}
			</GridItem>
		</Grid>
	);
};
