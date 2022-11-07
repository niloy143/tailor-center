import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Main from "../layouts/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
])