import React from "react";
import { Route, Routes } from "react-router-dom";
import ForceRedirect from "./ForceRedirect";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
 
const Home = React.lazy(() => import("../pages/Home"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Login = React.lazy(() => import("../pages/Signin"));
const Register = React.lazy(() => import("../pages/Signup"));

const Router = () => {
    return (
        <Routes>

            <Route
                path="/"
                element={
                    <Home />
                }
            />
            <Route element={<PrivateRoute />}>
                <Route
                    path="/profile"
                    element={
                        <Profile />
                    }
                />

            </Route>
            <Route element={<ForceRedirect />}>
                <Route
                    path="/signin"
                    element={
                        <Login />
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Register />
                    }
                />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
