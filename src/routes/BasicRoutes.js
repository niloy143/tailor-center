import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import ServiceDetails from "../components/ServiceDetails";
import ServicesPage from "../components/ServicesPage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Main from "../layouts/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/services',
                element: <ServicesPage />
            },
            {
                path: '/service/:id',
                element: <ServiceDetails />,
                loader: async ({ params }) => fetch(`http://localhost:1234/service/${params.id}`)
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])