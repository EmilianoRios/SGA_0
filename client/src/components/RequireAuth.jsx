import { useAuth } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const { user } = useAuth();
    
    if(!user){
        return <Navigate to="/"/>
    }

    return ( children );
}