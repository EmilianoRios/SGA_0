import { createContext, useContext } from "react";

export const HostContext = createContext();

export const useHost = () => {
	const context = useContext(HostContext);
	if (!context) throw new Error("Error HostContext");
	return context;
};

export function HostProvider({ children }) {
	const DATABASE_BASE_URL_DEPLOY = "http://localhost:3001/";
	const DATABASE_BASE_URL_LOCAL = "https://api-db-lpmb.herokuapp.com/";

	return (
		<HostContext.Provider
			value={{ DATABASE_BASE_URL_DEPLOY, DATABASE_BASE_URL_LOCAL }}
		>
			{children}
		</HostContext.Provider>
	);
}
