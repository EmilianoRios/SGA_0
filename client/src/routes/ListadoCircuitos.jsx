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

export const ListadoCircuitos = () => {
	/**
	 * Parametros de la url
	 */

	const { division } = useParams();

	/**
	 * Declaracion de variables de estado para la tabla
	 */
	const [dataCircuitos, setDataCircuitos] = useState([]);

	/**
	 * useEffect
	 */

	useEffect(() => {
		queryCircuitos();
	}, []);

	/**
	 * Consultas a la base de datos
	 */

	const queryCircuitos = async () => {
		const resp = await axios.get(
			`http://localhost:3001/divisiones/circuitos/todos`
		);
		setDataCircuitos(resp.data);
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
							<Th>Circuito</Th>
							<Th>Opciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dataCircuitos.map((circuito) => (
							<Tr key={circuito.id}>
								<Td>{`${circuito.circuito}`}</Td>
								<Td>
									<ReactRouter
										to={"/otros/modificar/" + division + "/" + circuito.id}
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
							<Th>Circuito</Th>
							<Th>Opciones</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
};
