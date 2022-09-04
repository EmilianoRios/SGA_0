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

export const ListadoSubCoordinadores = () => {
	const { DATABASE_BASE_URL_LOCAL } = useHost();
	const toast = useToast();

	/**
	 * Parametros de la url
	 */

	const { encargado } = useParams();

	/**
	 * Declaracion de variables de estado para la tabla
	 */
	const [dataSubCoordinadores, setDataSubCoordinadores] = useState([]);

	/**
	 * useEffect querySubCoordinadores();
	 */

	useEffect(() => {
		querySubCoordinadores();
	}, []);

	/**
	 * Consultas a la base de datos
	 */

	const querySubCoordinadores = () => {
		axios
			.get(`${DATABASE_BASE_URL_LOCAL}encargados/subcoordinadores/todos`)
			.then((resp) => {
				setDataSubCoordinadores(resp.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const queryDeleteSubCoordinador = (subCoordinadorId) => {
		setTimeout(() => {
			window.location.reload();
		}, 1500);
		axios
			.delete(
				`${DATABASE_BASE_URL_LOCAL}encargados/subcoordinador/baja/porid/${subCoordinadorId}`
			)
			.then((response) => {
				setAlertMessaje({
					title: "Coordinador eliminado",
					description: "A eliminado exitosamente al coordinador seleccionado",
					status: "success",
				});
			})
			.catch((err) => {
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
						{dataSubCoordinadores.map((subcoordinador) => (
							<Tr key={subcoordinador.id}>
								<Td>{`${subcoordinador.alias}`}</Td>
								<Td>{`${subcoordinador.apellidos} ${subcoordinador.nombres}`}</Td>
								<Td>{`${subcoordinador.correo}`}</Td>
								<Td>
									<ReactRouter
										to={"/modificar/" + encargado + "/" + subcoordinador.id}
									>
										<Button colorScheme="yellow" size="sm">
											M
										</Button>
									</ReactRouter>
									<Button
										colorScheme="red"
										size="sm"
										onClick={() => {
											queryDeleteSubCoordinador(subcoordinador.id);
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
