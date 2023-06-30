import React from "react";
import { Route, Routes } from "react-router-dom";
import ForceRedirect from "./ForceRedirect";
import NotFound from "../pages/NotFound";
import AdminRouter from "./AdminRoute";
import NoAccess from "../pages/NoAccess"
import ProtectedRoute from "./PrivateRoute";

const Home = React.lazy(() => import("../pages/Home"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Login = React.lazy(() => import("../pages/Signin"));
const Register = React.lazy(() => import("../pages/Signup"));
const Overview = React.lazy(() => import("../pages/dashboard/Overview"));
const ProductAdd = React.lazy(() => import("../pages/dashboard/Product/ProductAdd"));
const ProductList = React.lazy(() => import("../pages/dashboard/Product/ProductList"));
const ProductEdit = React.lazy(() => import("../pages/dashboard/Product/ProductEdit"));

const Router = () => {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
      
        <Route element={<ForceRedirect />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
      
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      
        <Route element={<AdminRouter />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/add" element={<ProductAdd />} />
          <Route path="/products/:productId/edit" element={<ProductEdit />} />
          <Route path="/overview" element={<Overview />} />
        </Route>
      
        <Route path="/noaccess" element={<NoAccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    );
};

export default Router;
