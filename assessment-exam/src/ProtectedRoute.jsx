import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isLoggedIn = localStorage.getItem("IsLoggedIn")
    return isLoggedIn ? children : <Navigate to="/login"/>
}

export default ProtectedRoute