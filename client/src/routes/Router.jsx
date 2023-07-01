import  {lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ForceRedirect from "./ForceRedirect";
import NotFound from "../pages/NotFound";
import NoAccess from "../pages/NoAccess";
import ProtectedRoute from "./PrivateRoute";
 
const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Signin"));
const Register = lazy(() => import("../pages/Signup"));
const Overview = lazy(() => import("../pages/dashboard/Overview"));
const ProductAdd = lazy(() => import("../pages/dashboard/Product/ProductAdd"));
const ProductList = lazy(() => import("../pages/dashboard/Product/ProductList"));
const ProductEdit = lazy(() => import("../pages/dashboard/Product/ProductEdit"));

const Router = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<ForceRedirect />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/dashboard/products" element={<ProductList />} />
        <Route path="/dashboard/products/add" element={<ProductAdd />} />
        <Route path="/dashboard/products/:productId/edit" element={<ProductEdit />} />
        <Route path="/dashboard/overview" element={<Overview />} />
      </Route>

      <Route path="/noaccess" element={<NoAccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
