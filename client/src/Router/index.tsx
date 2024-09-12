import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Dashboard from '../pages/Dashboard'
import ProtectedRoute from "./ProtectedRoute"
import FormPage from "../pages/FormPage"
import BidDetail from "../pages/BidDetail"
import { CommingSoon } from "../pages/CommingSoon"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path=":userId" element={<Dashboard/>}/>
            <Route path="/bid/:id" element={<BidDetail />} />
            <Route path="home" element={<CommingSoon/>}/>
            <Route path="contact" element={<CommingSoon/>}/>
            <Route path="about" element={<CommingSoon/>}/>
            <Route path="sign-in" element={<ProtectedRoute />}>
                <Route index element={<FormPage />} />
            </Route>
            <Route path="*" element={<div>Not Found</div>}/>
        </Route>
    )
)
const Router = () => {
    return <RouterProvider router={router} />
}

export default Router;