import React from "react";
import { Route, Routes } from "react-router-dom";
import ForceRedirect from "./ForceRedirect";
import PrivateRoute from "./PrivateRoute";
  
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Login = React.lazy(() => import("../pages/Signin/Signin"));
const Register = React.lazy(() => import("../pages/Signup/Signup"));
  
const Router = () => {
    return (
        <Routes>


            <Route element={<PrivateRoute />}>
                <Route
                    path="/"
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
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};

export default Router;
