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

export const ListadoCircuitos = () => {
	const { DATABASE_BASE_URL_LOCAL } = useHost();
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
			`${DATABASE_BASE_URL_LOCAL}divisiones/circuitos/todos`
		);
		setDataCircuitos(resp.data);
	};

	const queryDeleteCircuito = (circuitoId) => {
		setTimeout(() => {
			window.location.reload();
		}, 1500);
		axios
			.delete(
				`${DATABASE_BASE_URL_LOCAL}divisiones/circuito/baja/porid/${circuitoId}`
			)
			.then((response) => {
				setAlertMessaje({
					title: "Circuito eliminado",
					description: "A eliminado exitosamente al circuito seleccionado",
					status: "success",
				});
			})
			.catch((err) => {
				setAlertMessaje({
					title: "Circuito no eliminado",
					description:
						"Ha ocurrido un error al eliminar el circuito seleccionado",
					status: "error",
				});
			});
	};

	/**
	 * Variable de estado para mensajes de error o exito de las acciones del usuario
	 */

	const [alertMessaje, setAlertMessaje] = useState();

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
										<Button colorScheme="yellow" size="sm">
											M
										</Button>
									</ReactRouter>
									<Button
										colorScheme="red"
										size="sm"
										onClick={() => {
											queryDeleteCircuito(circuito.id);
										}}
									>
										E
									</Button>
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
