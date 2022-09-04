import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";

export const RequireAuth = ({ children }) => {
	const { user } = useAuth();

	if (user.status == false && localStorage.getItem("accessToken") === null) {
		return <Navigate to="/" />;
	}

	return children;
};
