// ---- REACT ----
import React from "react";
import { Link as ReactRouter, useNavigate } from "react-router-dom";

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
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	VStack,
} from "@chakra-ui/react";

export const RegistroAdmin = () => {
	const { user } = useAuth();
	const { DATABASE_BASE_URL_LOCAL } = useHost();
	let navigateTo = useNavigate();

	const initialValues = {
		usuario: "",
		nombres: "",
		apellidos: "",
		correo: "",
		contrasena: "",
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
			.required("Ingrese su Apellido"),
		contrasena: Yup.string().required(),
	});

	return (
		<Flex align="center" justify="center" h="100vh">
			<Box rounded="md" p={6} bg="blackAlpha.300">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						if (user.status == true) {
							axios
								.post(`${DATABASE_BASE_URL_LOCAL}admin`, values)
								.then((response) => {
									navigateTo("/");
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
							<FormControl
								isInvalid={formik.errors.usuario && formik.touched.usuario}
							>
								<FormLabel>Usuario</FormLabel>
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
								<FormLabel>Nombres/s</FormLabel>
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
								<FormLabel>Apellidos/s</FormLabel>
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
								<FormLabel>Correo</FormLabel>
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
								<FormLabel>Contraseña</FormLabel>
								<Field
									as={Input}
									id="contrasena"
									name="contrasena"
									type="password"
									variant="flushed"
								/>
							</FormControl>
							<FormErrorMessage>{formik.errors.contrasena}</FormErrorMessage>
							<Button type="submit" colorScheme="blue" width="full">
								Registrar
							</Button>
						</VStack>
					)}
				</Formik>
				<ReactRouter to="/home">
					<Button colorScheme="teal" width="full" mt="2">
						Volver
					</Button>
				</ReactRouter>
			</Box>
		</Flex>
	);
};
