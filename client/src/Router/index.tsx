import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from "./ProtectedRoute"
import FormPage from "../pages/FormPage"
import BidDetail from "../pages/BidDetail"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="" element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="/bid/:id" element={<BidDetail/>}/>
            </Route>

            <Route path="/sign-in" element={<FormPage />} />
        </Route>
    )
)
const Router = () => {
    return <RouterProvider router={router} />
}

export default Router;