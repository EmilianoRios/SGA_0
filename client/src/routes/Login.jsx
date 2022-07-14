// ---- AUTH-PROVIDER ----
import { useAuth } from "../context/UserProvider";

// ---- FORMIK ----
import { Formik, Field } from "formik";

// ---- YUP-FORMVALIDATION ----
import * as Yup from "yup";

// ---- CHAKRA-UI ----
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Select,
} from "@chakra-ui/react";

export const Login = () => {
  const { user } = useAuth();

  const initialValues = {
    documento_dni: "",
    contrasena: "",
  };

  // TODO Traducir validaciones/mensajes personalizados
  const validationSchema = Yup.object().shape({
    documento_dni: Yup.number().required("Ingrese su DNI"),
    contrasena: Yup.string().required(),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  // TODO Verificar ortografía
  return (
    <Flex align="center" justify="center" h="100vh">
      <Box rounded="md" p={6} bg="blackAlpha.300">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
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
                isInvalid={
                  formik.errors.documento_dni && formik.touched.documento_dni
                }
              >
                <FormLabel>Documento DNI</FormLabel>
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
