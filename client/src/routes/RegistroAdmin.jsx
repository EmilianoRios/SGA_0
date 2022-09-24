// ---- REACT ----
import React, { useState } from "react";
import { Link as ReactRouter } from "react-router-dom";

// ---- AUTH-PROVIDER ----
import { useHost } from "../context/HostProvider";
import { useAuth } from "../context/UserProvider";

// ---- FORMIK ----
import { Field, Formik } from "formik";

// ---- YUP-FORMVALIDATION ----
import * as Yup from "yup";

// ---- AXIOS ----

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
	HStack,
	Input,
	Radio,
	RadioGroup,
	Text,
	VStack,
} from "@chakra-ui/react";

export const RegistroAdmin = () => {
	const { user } = useAuth();
	const { DATABASE_BASE_URL_LOCAL } = useHost();

	/**
	 * Variable de estado para mensajes de error o exito de las acciones del usuario
	 */

	const [alertMessaje, setAlertMessaje] = useState();

	const initialValues = {
		usuario: "",
		nombres: "",
		apellidos: "",
		correo: "",
		contrasena: "",
		rol: "",
	};

	const validationSchema = Yup.object().shape({
		usuario: Yup.string().required("Ingrese su Usuario"),
		nombres: Yup.string()
			.matches(
				/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
				"Solo se permiten letras para el Nombre/s"
			)
			.required("Ingrese un Nombre"),
		apellidos: Yup.string()
			.matches(
				/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/,
				"Solo se permiten letras para el Apellido/s"
			)
			.required("Ingrese un Apellido"),
		correo: Yup.string()
			.email("Correo no válido")
			.required("Ingrese un correo"),
		contrasena: Yup.string().required("Ingrese una contraseña"),
		rol: Yup.string().required("Seleccione el rol"),
	});

	return (
		<Flex align="center" justify="center" h="100vh">
			<Box rounded="md" p={6} bg="blackAlpha.300" w="500px">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						if (user.status == true) {
							axios
								.post(`${DATABASE_BASE_URL_LOCAL}admin`, values)
								.then((response) => {
									setAlertMessaje({
										type: "success",
										messaje: "Registrado exitosamente",
									});
									actions.resetForm();
								})
								.catch((error) => {
									setAlertMessaje({
										type: "error",
										messaje: "Ocurrio un error al registrar el usuario",
									});
								});
						} else {
							alert("Sesión no iniciada");
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
							<Heading align="center">Registro</Heading>
							{alertMessaje ? (
								<Alert status={alertMessaje.type}>
									<AlertIcon />
									<AlertDescription>{alertMessaje.messaje}</AlertDescription>
								</Alert>
							) : (
								""
							)}
							<FormControl
								isInvalid={formik.errors.usuario && formik.touched.usuario}
							>
								<FormLabel>
									Usuario{" "}
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="usuario"
									name="usuario"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.usuario}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={formik.errors.nombres && formik.touched.nombres}
							>
								<FormLabel>
									Nombres/s{" "}
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
								isInvalid={formik.errors.apellidos && formik.touched.apellidos}
							>
								<FormLabel>
									Apellidos/s{" "}
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
								isInvalid={formik.errors.correo && formik.touched.correo}
							>
								<FormLabel>
									Correo{" "}
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="correo"
									name="correo"
									type="string"
									variant="flushed"
								/>
								<FormErrorMessage>{formik.errors.correo}</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={
									formik.errors.contrasena && formik.touched.contrasena
								}
							>
								<FormLabel>
									Contraseña{" "}
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<Field
									as={Input}
									id="contrasena"
									name="contrasena"
									type="password"
									variant="flushed"
								/>
							</FormControl>
							<FormErrorMessage>{formik.errors.contrasena}</FormErrorMessage>
							<FormControl isInvalid={formik.errors.rol && formik.touched.rol}>
								<FormLabel>
									Rol{" "}
									<Text as="em" color="tomato">
										*
									</Text>
								</FormLabel>
								<RadioGroup id="RoleGroup">
									<HStack spacing="24px">
										<Field
											as={Radio}
											id="radioOne"
											name="rol"
											value="COORD"
											type="radio"
										>
											Coordinador
										</Field>
										<Field
											as={Radio}
											id="radioTwo"
											name="rol"
											value="ADMIN"
											type="radio"
										>
											Administrador
										</Field>
									</HStack>
								</RadioGroup>
							</FormControl>
							<FormErrorMessage>{formik.errors.rol}</FormErrorMessage>
							<Button type="submit" colorScheme="blue" width="full">
								Registrar
							</Button>
						</VStack>
					)}
				</Formik>
				<ReactRouter to="/otros">
					<Button colorScheme="teal" width="full" mt="2">
						Volver
					</Button>
				</ReactRouter>
			</Box>
		</Flex>
	);
};
