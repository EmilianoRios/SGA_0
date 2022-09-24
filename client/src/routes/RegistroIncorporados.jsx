// ---- REACT ----
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ---- AUTH-PROVIDER-HOOKS ----
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
	Select,
	Text,
	VStack,
} from "@chakra-ui/react";

export const RegistroIncorporados = () => {
	const { user } = useAuth();
	const { DATABASE_BASE_URL_LOCAL } = useHost();

	/**
	 * Parametro url
	 */

	const { encargado, id } = useParams();

	/**
	 * Declaracion de variable de estado para datos del encargado en caso de modificación
	 */
	const [dataIncorporado, setDataIncorporado] = useState();

	/**
	 *  useEffect que permite la consulta de los campos de Barrio, Circuito y Localidad para su posterior uso en el formulario de registro.
	 */
	useEffect(() => {
		queryBarrios();
		queryCircuitos();
		queryLocalidades();
		queryDelegados();
		if (id) {
			queryDataIncorporado();
		}
	}, []);

	/**
	 *	Funciones y variables de estado para consultar a la base de datos y guardarlas para luego manejarlas en el formulario.
	 */

	const [listDelegados, setListDelegados] = useState([]);

	const queryDelegados = async () => {
		const resp = await axios.get(
			`${DATABASE_BASE_URL_LOCAL}encargados/delegados/todos`
		);
		setListDelegados(resp.data);
	};

	/**
	 *  Database routes y declaracion de constantes
	 */
	const aliasType = "I-";
	const routeLastId = `${DATABASE_BASE_URL_LOCAL}encargados/incorporados/ultimo`;
	const routeCreateManager = `${DATABASE_BASE_URL_LOCAL}encargados/incorporado/alta`;
	const routeModifyManager = `${DATABASE_BASE_URL_LOCAL}encargados/incorporados/porId/${id}`;
	/**
	 * Variable de estado para mensajes de error o exito de las acciones del usuario
	 */

	const [alertMessaje, setAlertMessaje] = useState();

	/**
	 * Valores iniciales del formulario
	 */

	const initialValues = {
		alias: aliasType,
		documento_dni: "",
		apellidos: "",
		nombres: "",
		fecha_nacimiento: "",
		edad: 0,
		telefono_principal: "",
		correo: "",
		domicilio: "",
		barrio: "",
		circuito: "",
		localidad: "",
		provincia: "",
		fecha_ingreso: "",
		DelegadoId: "",
	};

	/**
	 * Squema de validaciones para el formulario
	 */

	const validationSchema = Yup.object().shape({
		alias: Yup.string(),
		documento_dni: Yup.number(),
		apellidos: Yup.string()
			.matches(
				/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
				"Solo se permiten letras para el Apellido/s"
			)
			.required("Ingrese un Apellido"),
		nombres: Yup.string()
			.matches(
				/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
				"Solo se permiten letras para el Nombre/s"
			)
			.required("Ingrese un Nombre"),
		fecha_nacimiento: Yup.date().required("Ingrese una Fecha de Nacimiento"),
		edad: Yup.number().integer(),
		telefono_principal: Yup.number().integer(),
		correo: Yup.string()
			.email("Correo no válido")
			.required("Ingrese un Correo"),
		domicilio: Yup.string().required("Ingrese un Domicilio"),
		barrio: Yup.string().required("Ingrese un Barrio"),
		circuito: Yup.string().required("Ingrese un Circuito"),
		localidad: Yup.string().required("Ingrese una Localidad"),
		provincia: Yup.string().required("Ingrese una Provincia"),
		fecha_ingreso: Yup.date().required("Ingrese una Fecha de Ingreso"),
		DelegadoId: Yup.string().required("Ingrese un Delegado"),
	});

	/**
	 * Funcion que permite a travez de la fecha dada en el formulario sacar la edad exacta de la persona
	 */

	function getAge(dateString) {
		let today = new Date();
		let birthDate = new Date(dateString);
		let age = today.getFullYear() - birthDate.getFullYear();
		let differenceMonths = today.getMonth() - birthDate.getMonth();
		if (
			differenceMonths < 0 ||
			(differenceMonths === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}
		return age;
	}

	/**
	 * Funciones que permiten a la consulta de la base de datos dependiendo del encargado ademas de variables de estado para guardarlas y manejarlas en el formulario.
	 */

	const [listBarrios, setListBarrios] = useState([]);
	const [listCircuitos, setListCircuitos] = useState([]);
	const [listLocalidades, setListLocalidades] = useState([]);

	const queryBarrios = async () => {
		const resp = await axios.get(
			`${DATABASE_BASE_URL_LOCAL}divisiones/barrios/todos`
		);
		setListBarrios(resp.data);
	};

	const queryCircuitos = async () => {
		const resp = await axios.get(
			`${DATABASE_BASE_URL_LOCAL}divisiones/circuitos/todos`
		);
		setListCircuitos(resp.data);
	};

	const queryLocalidades = async () => {
		const resp = await axios.get(
			`${DATABASE_BASE_URL_LOCAL}divisiones/localidades/todos`
		);
		setListLocalidades(resp.data);
	};

	const queryDataIncorporado = async () => {
		const resp = await axios.get(`${routeModifyManager}`);
		const modifyData = {
			...resp.data,
			DelegadoId:
				resp.data.DelegadoId === null ? undefined : resp.data.DelegadoId,
		};
		setDataIncorporado(modifyData);
	};

	/**
	 * Funciones que permiten obtener la ultima id de la base de datos y dar de alta al usuario cargado en el formulario de registro
	 */

	const getLastId = async () => {
		try {
			const resp = await axios.get(`${routeLastId}`);
			return resp;
		} catch (err) {
			return err;
		}
	};

	/**
	 * Renderizado del la vista del formulario
	 */
	return (
		<Flex align="center" justify="center" h="auto">
			<Box rounded="md" p={6} w="full">
				<Formik
					initialValues={dataIncorporado || initialValues}
					validationSchema={validationSchema}
					enableReinitialize
					onSubmit={(values, actions) => {
						if (!id) {
							let edad = getAge(values.fecha_nacimiento);
							values.edad = edad;
							getLastId()
								.then((resp) => {
									if (resp.data == null) {
										values.alias += 1;
									} else {
										values.alias += resp.data?.id + 1;
									}
									axios
										.post(`${routeCreateManager}`, values)
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
												messaje: "Ocurrio un error al cargar los datos",
											});
											values.alias = aliasType;
										});
								})
								.catch((err) => {
									setAlertMessaje({
										type: "error",
										messaje: "Ocurrio un error al asignar un alias",
									});
									values.alias = aliasType;
								});
						} else {
							// alert(JSON.stringify(values, null, 2));
							axios
								.put(
									`${DATABASE_BASE_URL_LOCAL}encargados/incorporados/actualizar/porid/${id}`,
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
							<Heading align="center">
								{"Registro " +
									encargado[0].toUpperCase() +
									encargado.substring(1)}
							</Heading>
							{alertMessaje ? (
								<Alert status={alertMessaje.type}>
									<AlertIcon />
									<AlertDescription>{alertMessaje.messaje}</AlertDescription>
								</Alert>
							) : (
								""
							)}
							<FormControl
								isInvalid={formik.errors.alias && formik.touched.alias}
							>
								<FormLabel>Alias</FormLabel>
								<Field
									as={Input}
									id="alias"
									name="alias"
									isReadOnly={true}
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.alias}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									formik.errors.documento_dni && formik.touched.documento_dni
								}
							>
								<FormLabel>
									Documento DNI
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="documento_dni"
									name="documento_dni"
									type="number"
									variant="flushed"
								/>
								<FormErrorMessage>
									{formik.errors.documento_dni}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.apellidos && formik.touched.apellidos}
							>
								<FormLabel>
									Apellido/s
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="apellidos"
									name="apellidos"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.apellidos}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.nombres && formik.touched.nombres}
							>
								<FormLabel>
									Nombre/s
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="nombres"
									name="nombres"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.nombres}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									formik.errors.fecha_nacimiento &&
									formik.touched.fecha_nacimiento
								}
							>
								<FormLabel>
									Fecha de Nacimiento
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="fecha_nacimiento"
									name="fecha_nacimiento"
									type="date"
									variant="flushed"
								/>
								<FormErrorMessage>
									{formik.errors.fecha_nacimiento}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.edad && formik.touched.edad}
							>
								<Field
									as={Input}
									id="edad"
									name="edad"
									isReadOnly={true}
									type="hidden"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.edad}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									formik.errors.telefono_principal &&
									formik.touched.telefono_principal
								}
							>
								<FormLabel>Teléfono Principal</FormLabel>
								<Field
									as={Input}
									id="telefono_principal"
									name="telefono_principal"
									type="number"
									variant="flushed"
								/>
								<FormErrorMessage>
									{formik.errors.telefono_principal}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.correo && formik.touched.correo}
							>
								<FormLabel>
									Correo
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="correo"
									name="correo"
									type="email"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.correo}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.domicilio && formik.touched.domicilio}
							>
								<FormLabel>
									Domicilio
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="domicilio"
									name="domicilio"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.domicilio}</FormErrorMessage>
							</FormControl>
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
									as={Select}
									id="barrio"
									name="barrio"
									type="string"
									placeholder="Seleccione un Barrio"
									variant="flushed"
								>
									{listBarrios.map((values) => (
										<option key={values.id} value={values.barrio}>
											{values.barrio}
										</option>
									))}
								</Field>
								<FormErrorMessage>{formik.errors.barrio}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.circuito && formik.touched.circuito}
							>
								<FormLabel>
									Circuito
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Select}
									id="circuito"
									name="circuito"
									type="string"
									placeholder="Seleccione un Circuito"
									variant="flushed"
								>
									{listCircuitos.map((values) => (
										<option key={values.id} value={values.circuito}>
											{values.circuito}
										</option>
									))}
								</Field>
								<FormErrorMessage>{formik.errors.circuito}</FormErrorMessage>
							</FormControl>
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
									as={Select}
									id="localidad"
									name="localidad"
									type="string"
									placeholder="Seleccione un Localidad"
									variant="flushed"
								>
									{listLocalidades.map((values) => (
										<option key={values.id} value={values.localidad}>
											{values.localidad}
										</option>
									))}
								</Field>
								<FormErrorMessage>{formik.errors.localidad}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.provincia && formik.touched.provincia}
							>
								<FormLabel>
									Provincia
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="provincia"
									name="provincia"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.provincia}</FormErrorMessage>
								{/* TODO cargar provincias de la DB */}
							</FormControl>
							<FormControl
								isInvalid={
									formik.errors.fecha_ingreso && formik.touched.fecha_ingreso
								}
							>
								<FormLabel>
									Fecha de Ingreso
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="fecha_ingreso"
									name="fecha_ingreso"
									type="date"
									variant="flushed"
								/>
								<FormErrorMessage>
									{formik.errors.fecha_ingreso}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									formik.errors.DelegadoId && formik.touched.DelegadoId
								}
							>
								<FormLabel>
									Delegado
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Select}
									id="DelegadoId"
									name="DelegadoId"
									type="string"
									placeholder="Seleccione un Delegado"
									variant="flushed"
								>
									{listDelegados.map((values) => (
										<option key={values.id} value={values.id}>
											{values.alias} {values.documento_dni} {values.nombres}
											{values.apellidos}
										</option>
									))}
								</Field>
								<FormErrorMessage>{formik.errors.DelegadoId}</FormErrorMessage>
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
