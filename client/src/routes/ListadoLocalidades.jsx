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

export const ListadoLocalidades = () => {
	/**
	 * Parametros de la url
	 */

	const { division } = useParams();

	/**
	 * Declaracion de variables de estado para la tabla
	 */
	const [dataLocalidades, setDataLocalidades] = useState([]);

	/**
	 * useEffect
	 */

	useEffect(() => {
		queryLocalidades();
	}, []);

	/**
	 * Consultas a la base de datos
	 */

	const queryLocalidades = async () => {
		const resp = await axios.get(
			`http://localhost:3001/divisiones/localidades/todos`
		);
		setDataLocalidades(resp.data);
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
							<Th>Localidad</Th>
							<Th>Opciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dataLocalidades.map((localidad) => (
							<Tr key={localidad.id}>
								<Td>{`${localidad.localidad}`}</Td>
								<Td>
									<ReactRouter
										to={"/otros/modificar/" + division + "/" + localidad.id}
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
							<Th>Localidad</Th>
							<Th>Opciones</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
};
