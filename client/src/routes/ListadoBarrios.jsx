// ---- REACT ----
import React, { useEffect, useState } from "react";
import { Link as ReactRouter, useParams } from "react-router-dom";

// ---- AXIOS ----
import axios from "axios";

// ---- CHAKRA ----
import {
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";

export const ListadoBarrios = () => {
	/**
	 * Parametros de la url
	 */

	const { division } = useParams();

	/**
	 * Declaracion de variables de estado para la tabla
	 */
	const [dataBarrios, setDataBarrios] = useState([]);

	/**
	 * useEffect
	 */

	useEffect(() => {
		queryBarrios();
	}, []);

	/**
	 * Consultas a la base de datos
	 */

	const queryBarrios = async () => {
		const resp = await axios.get(
			`http://localhost:3001/divisiones/barrios/todos`
		);
		setDataBarrios(resp.data);
	};

	/**
	 * Renderizado del la vista de la tabla
	 */

	return (
		<>
			<TableContainer>
				<Table size="sm">
					<Thead>
						<Tr>
							<Th>Barrio</Th>
							<Th>Opciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dataBarrios.map((barrio) => (
							<Tr key={barrio.id}>
								<Td>{`${barrio.barrio}`}</Td>
								<Td>
									<ReactRouter
										to={"/otros/modificar/" + division + "/" + barrio.id}
									>
										<Button colorScheme="yellow" width="full">
											M
										</Button>
									</ReactRouter>
								</Td>
							</Tr>
						))}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>Barrio</Th>
							<Th>Opciones</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
};
