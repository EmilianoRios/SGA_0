// ---- REACT ----
import React, { useEffect, useState } from "react";
import { Link as ReactRouter, useParams } from "react-router-dom";

// ----- HOST CONTEXT -----
import { useHost } from "../context/HostProvider";

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

export const ListadoSubCoordinadores = () => {
	const { DATABASE_BASE_URL_LOCAL } = useHost();
	/**
	 * Parametros de la url
	 */

	const { encargado } = useParams();

	/**
	 * Declaracion de variables de estado para la tabla
	 */
	const [dataSubCoordinadores, setDataSubCoordinadores] = useState([]);

	/**
	 * useEffect
	 */

	useEffect(() => {
		querySubCoordinadores();
	}, []);

	/**
	 * Consultas a la base de datos
	 */

	const querySubCoordinadores = async () => {
		const resp = await axios.get(
			`${DATABASE_BASE_URL_LOCAL}encargados/subcoordinadores/todos`
		);
		setDataSubCoordinadores(resp.data);
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
						{dataSubCoordinadores.map((subcoordinador) => (
							<Tr key={subcoordinador.id}>
								<Td>{`${subcoordinador.alias}`}</Td>
								<Td>{`${subcoordinador.apellidos} ${subcoordinador.nombres}`}</Td>
								<Td>{`${subcoordinador.correo}`}</Td>
								<Td>
									<ReactRouter
										to={"/modificar/" + encargado + "/" + subcoordinador.id}
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
