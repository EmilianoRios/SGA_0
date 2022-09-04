// ---- REACT ----
import React from "react";
import { useNavigate } from "react-router-dom";

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

export const Login = () => {
	const { setUser } = useAuth();
	const { DATABASE_BASE_URL_LOCAL } = useHost();
	let navigateTo = useNavigate();

	const initialValues = {
		usuario: "",
		contrasena: "",
	};

	const validationSchema = Yup.object().shape({
		usuario: Yup.string().required("Ingrese su Usuario"),
		contrasena: Yup.string().required("Ingrese su Contrasena"),
	});

	return (
		<Flex align="center" justify="center" h="100vh">
			<Box rounded="md" p={6} bg="blackAlpha.300">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						axios
							.post(`${DATABASE_BASE_URL_LOCAL}admin/login`, values)
							.then((response) => {
								if (response.data.error) {
									alert(response.data.error);
								} else {
									localStorage.setItem("accessToken", response.data.token);
									setUser({
										usuario: response.data.usuario,
										id: response.data.id,
										status: true,
									});
								}
								navigateTo("/home");
							});
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
								<FormLabel>Usuario: </FormLabel>
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
								Iniciar Sesión
							</Button>
						</VStack>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};
