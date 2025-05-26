import type { NavigateFunction } from "react-router-dom";

function logout(navigate: NavigateFunction, person: "user" | "admin" | "moderator") {
    console.log("clicked")
    localStorage.removeItem("token");
    navigate(`/${person}/login`)
}

export default logout