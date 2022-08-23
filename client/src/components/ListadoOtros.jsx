// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----

// ---- REACT-ROUTES ----
import { Link as ReactRouter, useParams } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Button, Grid, GridItem, Stack, Text } from "@chakra-ui/react";

// ---- COMPONENT ----
import { ListadoBarrios } from "../routes/ListadoBarrios";
import { ListadoCircuitos } from "../routes/ListadoCircuitos";
import { ListadoLocalidades } from "../routes/ListadoLocalidades";

export const ListadoOtros = () => {
	let render;
	const { division } = useParams();

	if (division == "barrios") {
		render = <ListadoBarrios />;
	} else if (division == "circuitos") {
		render = <ListadoCircuitos />;
	} else if (division == "localidades") {
		render = <ListadoLocalidades />;
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
					<ReactRouter to={"/otros/gestion/" + division}>
						<Button colorScheme="blue" width="full">
							Registro
						</Button>
					</ReactRouter>
					<ReactRouter to={"/" + division}>
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
