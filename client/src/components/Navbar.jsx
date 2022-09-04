import { useAuth } from "../context/UserProvider";
import { DarkModeSwitch } from "./DarkModeSwitcher";
// ---- CHAKRA ----
import { Box, Center, Flex, Heading, Spacer } from "@chakra-ui/react";

// ---- REACT ROUTER ----
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { user } = useAuth();

	return (
		<>
			<Flex minWidth="max-content" alignItems="center" gap="2" padding="2">
				<Box p="2">
					<Link to={"/home"}>
						<Heading size="md">Laburo por mi barrio</Heading>
					</Link>
				</Box>
				<Spacer />
				<DarkModeSwitch></DarkModeSwitch>
			</Flex>
			{user.status == true && (
				<Center bg="blackAlpha.100" w="100%" p={1} rounded="md">
					Iniciaste sesion: {user.usuario}
				</Center>
			)}
		</>
	);
};
