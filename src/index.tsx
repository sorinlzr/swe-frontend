import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./routes/App";
import ErrorPage from "./routes/error-page";
import SignInRegister from "./containers/SignInRegister";
import PublicProfileView from "./components/user/PublicProfileView";
import Navbar from "./components/navbar/Navbar";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <SignInRegister tab="login" />,
    },
    {
        path: "/logout",
        element: <App />,
    },
    {
        path: "/register",
        element: <SignInRegister tab="register" />,
    },
    {
        path: "/user/:username",
        element: <PublicProfileView />,
        errorElement: <ErrorPage />,
    },
]);

root.render(
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <React.StrictMode>
            <Navbar />
            <RouterProvider router={router} />
        </React.StrictMode>
    </CookiesProvider>
);
