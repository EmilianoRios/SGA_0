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

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const ListadoDelegados = () => {
	const { DATABASE_BASE_URL_LOCAL } = useHost();
	/**
	 * Parametros de la url
	 */

	const { encargado } = useParams();

	/**
	 * Declaracion de variables de estado para la tabla
	 */
	const [dataDelegados, setDataDelegados] = useState([]);

	/**
	 * useEffect
	 */

	useEffect(() => {
		queryDelegados();
	}, []);

	/**
	 * Consultas a la base de datos
	 */

	const queryDelegados = async () => {
		const resp = await axios.get(
			`${DATABASE_BASE_URL_LOCAL}encargados/delegados/todos`
		);
		setDataDelegados(resp.data);
	};

	const queryDeleteDelegado = (delegadoId) => {
		setTimeout(() => {
			window.location.reload();
		}, 1500);
		axios
			.delete(
				`${DATABASE_BASE_URL_LOCAL}encargados/delegado/baja/porid/${delegadoId}`
			)
			.then((response) => {
				setAlertMessaje({
					title: "Delegado eliminado",
					description: "A eliminado exitosamente al delegado seleccionado",
					status: "success",
				});
			})
			.catch((err) => {
				setAlertMessaje({
					title: "Delegado no eliminado",
					description:
						"Ha ocurrido un error al eliminar el delegado seleccionado",
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
						{dataDelegados.map((delegado) => (
							<Tr key={delegado.id}>
								<Td>{`${delegado.alias}`}</Td>
								<Td>{`${delegado.apellidos} ${delegado.nombres}`}</Td>
								<Td>{`${delegado.correo}`}</Td>
								<Td>
									<ReactRouter
										to={"/modificar/" + encargado + "/" + delegado.id}
									>
										<Button colorScheme="yellow" size="sm">
											<EditIcon />
										</Button>
									</ReactRouter>
									<Button
										colorScheme="red"
										size="sm"
										onClick={() => {
											queryDeleteDelegado(delegado.id);
										}}
									>
										<DeleteIcon />
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
