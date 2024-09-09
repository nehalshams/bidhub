import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = localStorage.getItem('token');

    return (
        <>
            { isLoggedIn ? <Navigate to={'/'}/> : <Outlet/>}
        </>
    )
}

export default ProtectedRoute;