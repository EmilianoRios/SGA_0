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

export const ListadoBarrios = () => {
	const { DATABASE_BASE_URL_LOCAL } = useHost();
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
			`${DATABASE_BASE_URL_LOCAL}divisiones/barrios/todos`
		);
		setDataBarrios(resp.data);
	};

	const queryDeleteBarrio = (barrioId) => {
		setTimeout(() => {
			window.location.reload();
		}, 1500);
		axios
			.delete(
				`${DATABASE_BASE_URL_LOCAL}divisiones/barrio/baja/porid/${barrioId}`
			)
			.then((response) => {
				setAlertMessaje({
					title: "Barrio eliminado",
					description: "A eliminado exitosamente al barrio seleccionado",
					status: "success",
				});
			})
			.catch((err) => {
				setAlertMessaje({
					title: "Barrio no eliminado",
					description:
						"Ha ocurrido un error al eliminar el barrio seleccionado",
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
										<Button colorScheme="yellow" size="sm">
											M
										</Button>
									</ReactRouter>
									<Button
										colorScheme="red"
										size="sm"
										onClick={() => {
											queryDeleteBarrio(barrio.id);
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
							<Th>Barrio</Th>
							<Th>Opciones</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
};
