import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";

export const RequireAuthAdmin = ({ children }) => {
	const { user } = useAuth();

	if (user.status == false && localStorage.getItem("accessToken") === null) {
		return <Navigate to="/" />;
	}

	if (user.rol === "ADMIN") {
		return children;
	}

	return <Navigate to="/home" />;
};
