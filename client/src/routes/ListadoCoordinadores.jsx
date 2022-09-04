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
	useToast,
} from "@chakra-ui/react";

export const ListadoCoordinadores = () => {
	const { DATABASE_BASE_URL_LOCAL } = useHost();
	const toast = useToast();

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
			`${DATABASE_BASE_URL_LOCAL}encargados/coordinadores/todos`
		);
		setDataCoordiandores(resp.data);
	};

	const queryDeleteCoordinador = (coordinadorId) => {
		setTimeout(() => {
			window.location.reload();
		}, 1500);
		axios
			.delete(
				`${DATABASE_BASE_URL_LOCAL}encargados/coordinador/baja/porid/${coordinadorId}`
			)
			.then((response) => {
				setAlertMessaje({
					title: "Coordinador eliminado",
					description: "A eliminado exitosamente al coordinador seleccionado",
					status: "success",
				});
			})
			.catch((error) => {
				setAlertMessaje({
					title: "Coordinador no eliminado",
					description:
						"Ha ocurrido un error al eliminar el coordinador seleccionado",
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
										<Button colorScheme="yellow" size="sm">
											M
										</Button>
									</ReactRouter>
									<Button
										colorScheme="red"
										size="sm"
										onClick={() => {
											queryDeleteCoordinador(coordinador.id);
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
