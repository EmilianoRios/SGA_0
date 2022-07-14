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
  Text,
  Heading,
} from "@chakra-ui/react";

export const Registration = () => {
  const { user } = useAuth();

  const initialValues = {
    documento_dni: "",
    apellidos: "",
    nombres: "",
    fecha_nacimiento: "",
    telefono_principal: "",
    correo: "",
    domicilio: "",
    barrio: "",
    circuito: "",
    localidad: "",
    provincia: "",
    fecha_ingreso: "",
  };

  // TODO Traducir validaciones/mensajes personalizados
  const validationSchema = Yup.object().shape({
    documento_dni: Yup.string()
      .required("Ingrese un DNI")
      .min(8, "El DNI debe contener 8 dígitos")
      .max(8, "El DNI debe contener máximo 8 dígitos"),
    apellidos: Yup.string().required("Ingrese un Apellido"),
    nombres: Yup.string().required("Ingrese un Nombre"),
    fecha_nacimiento: Yup.string().required("Ingrese una Fecha de Nacimiento"),
    telefono_principal: Yup.number().integer(),
    correo: Yup.string()
      .email("Correo no válido")
      .required("Ingrese un Correo"),
    domicilio: Yup.string().required("Ingrese un Domicilio"),
    barrio: Yup.string().required("Ingrese un Barrio"),
    circuito: Yup.string().required("Ingrese un Circuito"),
    localidad: Yup.string().required("Ingrese una Localidad"),
    provincia: Yup.string().required("Ingrese un Provincia"),
    fecha_ingreso: Yup.date().required("Ingrese un Fecha de Ingreso"),
  });

  // TODO Verificar ortografía
  return (
    <Flex align="center" justify="center" h="auto">
      <Box rounded="md" p={6} bg="blackAlpha.300" w="xl">
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
              <Heading align="center"> Registro </Heading>
              <FormControl
                isInvalid={
                  formik.errors.documento_dni && formik.touched.documento_dni
                }
              >
                <FormLabel>Documento DNI <Text as="em" color="tomato">*</Text></FormLabel>
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
                <FormLabel>Apellido/s <Text as="em" color="tomato">*</Text></FormLabel>
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
                <FormLabel>Nombre/s <Text as="em" color="tomato">*</Text></FormLabel>
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
                <FormLabel>Fecha de Nacimiento <Text as="em" color="tomato">*</Text></FormLabel>
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
                <FormLabel>Correo <Text as="em" color="tomato">*</Text></FormLabel>
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
                <FormLabel>Domicilio <Text as="em" color="tomato">*</Text></FormLabel>
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
                <FormLabel>Barrio <Text as="em" color="tomato">*</Text></FormLabel>
                <Field
                  as={Input}
                  id="barrio"
                  name="barrio"
                  type="string"
                  variant="flushed"
                />
                <FormErrorMessage>{formik.errors.barrio}</FormErrorMessage>
                {/* TODO cargar barrios de la DB */}
              </FormControl>
              <FormControl
                isInvalid={formik.errors.circuito && formik.touched.circuito}
              >
                <FormLabel>Circuito <Text as="em" color="tomato">*</Text></FormLabel>
                <Field
                  as={Input}
                  id="circuito"
                  name="circuito"
                  type="string"
                  variant="flushed"
                />
                <FormErrorMessage>{formik.errors.circuito}</FormErrorMessage>
                {/* TODO cargar circuitos de la DB */}
              </FormControl>
              <FormControl
                isInvalid={formik.errors.localidad && formik.touched.localidad}
              >
                <FormLabel>Localidad <Text as="em" color="tomato">*</Text></FormLabel>
                <Field
                  as={Input}
                  id="localidad"
                  name="localidad"
                  type="string"
                  variant="flushed"
                />
                <FormErrorMessage>{formik.errors.localidad}</FormErrorMessage>
                {/* TODO cargar localidades de la DB */}
              </FormControl>
              <FormControl
                isInvalid={formik.errors.provincia && formik.touched.provincia}
              >
                <FormLabel>Provincia <Text as="em" color="tomato">*</Text></FormLabel>
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
                <FormLabel>Fecha de Ingreso <Text as="em" color="tomato">*</Text></FormLabel>
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
