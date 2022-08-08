import { NavLink } from "react-router-dom";
import { useAuth } from "../context/UserProvider";
import { DarkModeSwitch } from "./DarkModeSwitcher";

export const Navbar = () => {
    const { user } = useAuth();

    return (
        <>
        { user 
        ? (<p>Sesion Iniciada</p>) 
        : (<p>Sesion Cerrada</p>)
        }
        <DarkModeSwitch></DarkModeSwitch>
        </>
    );
}