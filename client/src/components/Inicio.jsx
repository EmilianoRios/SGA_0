// ---- REACT-HOOKS ----
import React from "react";

// ---- AUTH-PROVIDER ----
import { useAuth } from "../context/UserProvider";

// ---- REACT-ROUTES ----
import { Link as ReactRouter } from "react-router-dom";

// ---- CHAKRA-UI ----
import { Text, Flex, Box, Button, Stack } from "@chakra-ui/react";

// ---- COMPONENT ----
export const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Flex align="center" justify="center" h="100vh">
        <Box rounded="md" p={6} bg="blackAlpha.300" w="xl">
          <Text fontSize="2xl" align="center" p={4}>
            Elecciones
          </Text>
          <Stack direction="column" spacing={4}>
            <ReactRouter to="/coordinadores">
              <Button colorScheme="blue" width="full">
                Coordinadores
              </Button>
            </ReactRouter>
            <ReactRouter to="/subcoordinadores">
              <Button colorScheme="blue" width="full">
                Sub-Coordinadores
              </Button>
            </ReactRouter>
            <ReactRouter to="/delegados">
              <Button colorScheme="blue" width="full">
                Delegados
              </Button>
            </ReactRouter>
            <ReactRouter to="/incorporados">
              <Button colorScheme="blue" width="full">
                Incorporados
              </Button>
            </ReactRouter>
            <ReactRouter to="/otros">
              <Button colorScheme="blue" width="full">
                Otros
              </Button>
            </ReactRouter>
            <ReactRouter to="/">
              <Button colorScheme="red" width="full">
                Cerrar Sesión
              </Button>
            </ReactRouter>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
