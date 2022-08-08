import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(true);

  // TODO LogIn

  // TODO LogOut

  // TODO Register

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
