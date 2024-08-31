import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from "./ProtectedRoute"
import FormPage from "../pages/FormPage"


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="dashboard" element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path="/sign-in" element={<FormPage />} />
        </Route>
    )
)
const Router = () => {
    return <RouterProvider router={router} />
}

export default Router;