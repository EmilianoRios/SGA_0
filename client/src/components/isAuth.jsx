import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserProvider";

export const IsAuth = ({ children }) => {
	const { user } = useAuth();

	if (user.status == false && localStorage.getItem("accessToken") === null) {
		return children;
	}

	return <Navigate to="/home" />;
};
