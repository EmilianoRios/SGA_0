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

export const ListadoCoordinadores = () => {
	/**
	 * Parametros de la url
	 */

	const { encargado } = useParams();

	/**
	 * Declaracion de variables de estado para la tabla
	 */
	const [dataCoordinadores, setDataCoordiandores] = useState([]);

	/**
	 * useEffect
	 */

	useEffect(() => {
		queryCoordinadores();
	}, []);

	/**
	 * Consultas a la base de datos
	 */

	const queryCoordinadores = async () => {
		const resp = await axios.get(
			`http://localhost:3001/encargados/coordinadores/todos`
		);
		setDataCoordiandores(resp.data);
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
							<Th>Alias</Th>
							<Th>Nombre Completo</Th>
							<Th>Correo</Th>
							<Th>Opciones</Th>
						</Tr>
					</Thead>
					<Tbody>
						{dataCoordinadores.map((coordinador) => (
							<Tr key={coordinador.id}>
								<Td>{`${coordinador.alias}`}</Td>
								<Td>{`${coordinador.apellidos} ${coordinador.nombres}`}</Td>
								<Td>{`${coordinador.correo}`}</Td>
								<Td>
									<ReactRouter
										to={"/modificar/" + encargado + "/" + coordinador.id}
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
							<Th>Alias</Th>
							<Th>Nombre Completo</Th>
							<Th>Correo</Th>
							<Th>Opciones</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
};
