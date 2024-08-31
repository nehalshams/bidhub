import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isLoggedIn = localStorage.getItem('user');

    return (
        <>
            { isLoggedIn ? <Outlet/> : <Navigate to={'/sign-in'}/>}
        </>
    )
}

export default ProtectedRoute;