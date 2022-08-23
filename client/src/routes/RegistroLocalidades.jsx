// ---- REACT ----
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ---- AUTH-PROVIDER ----
import { useHost } from "../context/HostProvider";
import { useAuth } from "../context/UserProvider";

// ---- FORMIK ----
import { Field, Formik } from "formik";

// ---- YUP-FORMVALIDATION ----
import * as Yup from "yup";

// ---- AXIOS ----
import axios from "axios";

// ---- CHAKRA-UI ----
import {
	Alert,
	AlertDescription,
	AlertIcon,
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";

export const RegistroLocalidades = () => {
	const { user } = useAuth();
	const { DATABASE_BASE_URL_LOCAL } = useHost();

	/**
	 * Parametros de la url
	 */

	const { id } = useParams();

	/**
	 *  Declaracion de variable de estado para datos del circuito en caso de modificacion
	 */
	const [dataLocalidad, setDataLocalidad] = useState();

	/**
	 *  Declaracion de variable de estado para alerta de mensajes
	 */

	const [alertMessaje, setAlertMessaje] = useState();

	useEffect(() => {
		if (id) {
			queryDataLocalidad();
		}
	}, []);

	/**
	 * Funcion que permite la consulta a la base de datos del barrio en caso de modificacion para su autocompletado en el formulario
	 */

	const routeModifyManager = `${DATABASE_BASE_URL_LOCAL}divisiones/localidad/porid/${id}`;

	const queryDataLocalidad = async () => {
		const resp = await axios.get(`${routeModifyManager}`);
		setDataLocalidad(resp.data);
	};

	const initialValues = {
		localidad: "",
	};

	// TODO Traducir validaciones/mensajes personalizados
	const validationSchema = Yup.object().shape({
		localidad: Yup.string().required("Ingrese una Localidad"),
	});

	// TODO Verificar ortografía
	return (
		<Flex align="center" justify="center" h="auto">
			<Box rounded="md" p={6} w="full">
				<Formik
					initialValues={dataLocalidad || initialValues}
					validationSchema={validationSchema}
					enableReinitialize
					onSubmit={(values, actions) => {
						if (!id) {
							axios
								.post(
									`${DATABASE_BASE_URL_LOCAL}divisiones/localidad/alta`,
									values
								)
								.then((response) => {
									setAlertMessaje({
										type: "success",
										messaje: "Registrado exitosamente",
									});
									actions.resetForm();
								})
								.catch((err) => {
									setAlertMessaje({
										type: "error",
										messaje: "Ocurrio un error",
									});
								});
						} else {
							// alert(JSON.stringify(values, null, 2));
							axios
								.put(
									`${DATABASE_BASE_URL_LOCAL}divisiones/localidad/actualizar/porid/${id}`,
									values
								)
								.then((response) => {
									setAlertMessaje({
										type: "success",
										messaje: "Actualizado exitosamente",
									});
									actions.resetForm();
								})
								.catch((err) => {
									setAlertMessaje({
										type: "error",
										messaje: "Ocurrio un error al actualizar",
									});
								});
						}
					}}
				>
					{(formik) => (
						<VStack
							as="form"
							spacing={4}
							align="flex-start"
							onSubmit={formik.handleSubmit}
						>
							<Heading align="center">Registro Localidad</Heading>
							{alertMessaje ? (
								<Alert status={alertMessaje.type}>
									<AlertIcon />
									<AlertDescription>{alertMessaje.messaje}</AlertDescription>
								</Alert>
							) : (
								""
							)}
							<FormControl
								isInvalid={formik.errors.localidad && formik.touched.localidad}
							>
								<FormLabel>
									Localidad
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="localidad"
									name="localidad"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.localidad}</FormErrorMessage>
							</FormControl>
							<Button type="submit" colorScheme="green" width="full">
								{id ? "Actualizar" : "Registrar"}
							</Button>
						</VStack>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};
