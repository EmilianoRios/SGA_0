// ---- REACT-REACT-ROUTER ----
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ---- AUTH-PROVIDER ----
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
	Select,
	Text,
	VStack,
} from "@chakra-ui/react";

export const RegistroBarrios = () => {
	const { user } = useAuth();

	/**
	 * Parametros de la url
	 */

	const { id } = useParams();

	/**
	 *  Declaracion de variable de estado para datos del barrio en caso de modificacion
	 */
	const [dataBarrio, setDataBarrio] = useState();

	const [alertMessaje, setAlertMessaje] = useState();

	const routeMofifyManager = `http://localhost:3001/divisiones/barrio/porid/${id}`;

	const [listCircuitos, setListCircuitos] = useState([]);

	useEffect(() => {
		queryCircuitos();
		if (id) {
			queryDataBarrio();
		}
	}, []);

	/**
	 * Funcion que permite la consulta a la base de datos del barrio en caso de modificacion para su autocompletado en el formulario
	 */

	const queryDataBarrio = async () => {
		const resp = await axios.get(`${routeMofifyManager}`);
		setDataBarrio(resp.data);
	};

	/**
	 * Funcion que permite traer todos los circuitos para la etiqueta option del formulario de registro de barrios
	 */

	const queryCircuitos = async () => {
		const resp = await axios.get(
			`http://localhost:3001/divisiones/circuitos/todos`
		);
		setListCircuitos(resp.data);
	};

	const initialValues = {
		barrio: "",
		CircuitoId: "",
	};

	// TODO Traducir validaciones/mensajes personalizados
	const validationSchema = Yup.object().shape({
		barrio: Yup.string().required("Ingrese un Barrio"),
		CircuitoId: Yup.string().required("Ingrese un Circuito"),
	});

	// TODO Verificar ortografía
	return (
		<Flex align="center" justify="center" h="auto">
			<Box rounded="md" p={6} w="full">
				<Formik
					initialValues={dataBarrio || initialValues}
					validationSchema={validationSchema}
					enableReinitialize
					onSubmit={(values, actions) => {
						if (!id) {
							axios
								.post(`http://localhost:3001/divisiones/barrio/alta`, values)
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
							<Heading align="center">Registro Barrios</Heading>
							{alertMessaje ? (
								<Alert status={alertMessaje.type}>
									<AlertIcon />
									<AlertDescription>{alertMessaje.messaje}</AlertDescription>
								</Alert>
							) : (
								""
							)}
							<FormControl
								isInvalid={formik.errors.barrio && formik.touched.barrio}
							>
								<FormLabel>
									Barrio
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="barrio"
									name="barrio"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.barrio}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									formik.errors.CircuitoId && formik.touched.CircuitoId
								}
							>
								<FormLabel>
									Circuito
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Select}
									id="CircuitoId"
									name="CircuitoId"
									type="string"
									placeholder="Seleccione un Circuito"
									variant="flushed"
								>
									{listCircuitos.map((values) => (
										<option key={values.id} value={values.id}>
											{values.circuito}
										</option>
									))}
								</Field>
								<FormErrorMessage>{formik.errors.CircuitoId}</FormErrorMessage>
							</FormControl>
							<Button type="submit" colorScheme="green" width="full">
								Registrar
							</Button>
						</VStack>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};
