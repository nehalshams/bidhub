import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import SignIn from "../pages/sign-in"
import ProtectedRoute from "./ProtectedRoute"


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<ProtectedRoute />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/sign-in" element={<SignIn />} />
        </Route>
    )
)
const Router = () => {
    return <RouterProvider router={router} />
}

export default Router;