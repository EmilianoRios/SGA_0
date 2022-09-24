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

export const ListadoLocalidades = () => {
	const { DATABASE_BASE_URL_LOCAL } = useHost();
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
			`${DATABASE_BASE_URL_LOCAL}divisiones/localidades/todos`
		);
		setDataLocalidades(resp.data);
	};

	const queryDeleteLocalidad = (localidadId) => {
		setTimeout(() => {
			window.location.reload();
		}, 1500);
		axios
			.delete(
				`${DATABASE_BASE_URL_LOCAL}divisiones/localidad/baja/porid/${localidadId}`
			)
			.then((response) => {
				setAlertMessaje({
					title: "Localidad eliminado",
					description: "A eliminado exitosamente al localidad seleccionado",
					status: "success",
				});
			})
			.catch((err) => {
				setAlertMessaje({
					title: "Localidad no eliminado",
					description:
						"Ha ocurrido un error al eliminar el localidad seleccionado",
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
										<Button colorScheme="yellow" size="sm">
											<EditIcon />
										</Button>
									</ReactRouter>
									<Button
										colorScheme="red"
										size="sm"
										onClick={() => {
											queryDeleteLocalidad(localidad.id);
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
							<Th>Localidad</Th>
							<Th>Opciones</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
};
