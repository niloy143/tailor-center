import { createBrowserRouter } from "react-router-dom";
import AddService from "../components/AddService";
import BlogPage from "../components/BlogPage";
import EditReview from "../components/EditReview";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import MyReviews from "../components/MyReviews";
import ServiceDetails from "../components/ServiceDetails";
import ServicesPage from "../components/ServicesPage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Main from "../layouts/Main";
import PrivateRoute from "./PrivateRoute";

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
                path: '/add-service',
                element: <PrivateRoute><AddService /></PrivateRoute>
            },
            {
                path: '/service/:id',
                element: <ServiceDetails />,
                loader: async ({ params }) => fetch(`https://tailor-center-server.vercel.app/service/${params.id}`)
            },
            {
                path: '/review/edit/:id',
                element: <PrivateRoute> <EditReview /> </PrivateRoute>,
                loader: async ({ params }) => fetch(`https://tailor-center-server.vercel.app/review/${params.id}`)
            },
            {
                path: '/my-reviews',
                element: <PrivateRoute><MyReviews /></PrivateRoute>
            },
            {
                path: '/blogs',
                element: <BlogPage />
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])