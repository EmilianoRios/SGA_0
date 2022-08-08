// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----
import { useAuth } from "../context/UserProvider";

// ---- REACT-ROUTES ----
import { Link as ReactRouter } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Text, Flex, Box, Button, Stack } from "@chakra-ui/react";

// ---- COMPONENT ----
export const Circuitos = () => {
  return (
    <Flex align="center" justify="center" h="100vh">
      <Box rounded="md" p={6} bg="blackAlpha.300" w="xl">
        <Text fontSize="2xl" align="center" p={4}>
          Circuitos
        </Text>
        <Stack direction="column" spacing={4}>
          <ReactRouter to="/otros/gestion/circuitos">
            <Button colorScheme="blue" width="full">
              Alta y Modificación de Circuitos
            </Button>
          </ReactRouter>
          <ReactRouter to="/listadootros/barrios">
            <Button colorScheme="blue" width="full">
              Listado de Circuitos
            </Button>
          </ReactRouter>
          <ReactRouter to="/otros">
            <Button colorScheme="teal" width="full">
              Volver
            </Button>
          </ReactRouter>
        </Stack>
      </Box>
    </Flex>
  );
};
