import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = false;

    return (
        <>
            { isLoggedIn ? <Outlet/> : <Navigate to={'/sign-in'}/>}
        </>
    )
}

export default ProtectedRoute;