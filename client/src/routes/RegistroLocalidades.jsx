// ---- REACT ----
import React, { useState } from "react";

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
	const [alertMessaje, setAlertMessaje] = useState();

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
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, actions) => {
						axios
							.post(`http://localhost:3001/divisiones/localidad/alta`, values)
							.then((response) => {
								setAlertMessaje({
									type: "success",
									messaje: "Registrado exitosamente",
								});
								actions.resetForm();
							})
							.catch((err) => {
								setAlertMessaje({ type: "error", messaje: "Ocurrio un error" });
							});
						// alert(JSON.stringify(values, null, 2));
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
									Localidad{" "}
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
								Registrar
							</Button>
						</VStack>
					)}
				</Formik>
			</Box>
		</Flex>
	);
};
