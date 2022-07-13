// ---- AUTH-PROVIDER ----
import { useAuth } from "../context/UserProvider";

// ---- FORMIK ----
import { Formik, Form, Field } from "formik";
import { useFormik } from "formik";

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

export const Registration = () => {
  const { user } = useAuth();
  
  const initialValues = {
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
    fecha_ingreso_man: "",
    fecha_ingreso: "",
    imagen_perfil: "",
    contrasena: "",
  };

  // TODO Traducir validaciones/mensajes personalizados
  const validationSchema = Yup.object().shape({
    documento_dni: Yup.string().required().min(8).max(8),
    apellidos: Yup.string().required(),
    nombres: Yup.string().required(),
    fecha_nacimiento: Yup.string().required(),
    edad: Yup.number().required().positive().integer(),
    telefono_principal: Yup.number().integer(),
    correo: Yup.string().email().required(),
    domicilio: Yup.string().required(),
    barrio: Yup.string().required(),
    circuito: Yup.string().required(),
    localidad: Yup.string().required(),
    provincia: Yup.string().required(),
    fecha_ingreso: Yup.date().required(),
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log("submit");
  };

  // TODO Verificar ortografía
  return (
    <Flex align="center" justify="center" h="120vh">
      <Box rounded="md" p={6} bg="blackAlpha.300" w="xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleS}
        >
          <Form>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="documento_dni">Documento DNI</FormLabel>
                <Field
                  as={Input}
                  id="documento_dni"
                  name="documento_dni"
                  type="number"
                  variant="flushed"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="apellidos">Apellido/s</FormLabel>
                <Field
                  as={Input}
                  id="apellidos"
                  name="apellidos"
                  type="string"
                  variant="flushed"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="nombres">Nombre/s</FormLabel>
                <Field
                  as={Input}
                  id="nombres"
                  name="nombres"
                  type="string"
                  variant="flushed"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="fecha_nacimiento">Fecha de Nacimiento</FormLabel>
                <Field
                  as={Input}
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  type="date"
                  variant="flushed"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="telefono_principal">Telefono Principal</FormLabel>
                <Field
                  as={Input}
                  id="telefono_principal"
                  name="telefono_principal"
                  type="number"
                  variant="flushed"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Correo</FormLabel>
                <Field
                  as={Input}
                  id="correo"
                  name="correo"
                  type="email"
                  variant="flushed"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="domicilio">Domicilio</FormLabel>
                <Field
                  as={Input}
                  id="domicilio"
                  name="domicilio"
                  type="string"
                  variant="flushed"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="barrio">Barrio</FormLabel>
                <Field
                  as={Input}
                  id="barrio"
                  name="barrio"
                  type="string"
                  variant="flushed"
                />
                {/* TODO cargar barrios de la DB */}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="circuito">Circuito</FormLabel>
                <Field
                  as={Input}
                  id="circuito"
                  name="circuito"
                  type="string"
                  variant="flushed"
                />
                {/* TODO cargar circuitos de la DB */}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="localidad">Localidad</FormLabel>
                <Field
                  as={Input}
                  id="localidad"
                  name="localidad"
                  type="string"
                  variant="flushed"
                />
                {/* TODO cargar localidades de la DB */}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="provincia">Provincia</FormLabel>
                <Field
                  as={Input}
                  id="provincia"
                  name="provincia"
                  type="string"
                  variant="flushed"
                />
                {/* TODO cargar provincias de la DB */}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="fecha_ingreso">Fecha de Ingreso</FormLabel>
                <Field
                  as={Input}
                  id="fecha_ingreso"
                  name="fecha_ingreso"
                  type="date"
                  variant="flushed"
                />
              </FormControl>
              <Button type="submit" colorScheme="green" width="full">
                  Registrar y finalizar
              </Button>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};
