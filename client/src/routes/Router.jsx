import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ForceRedirect from "./ForceRedirect";
import NotFound from "../pages/NotFound";
import NoAccess from "../pages/NoAccess";
import ProtectedRoute from "./PrivateRoute";
import { CategoryProvider } from "../contexts/CategoryContext"
import Splash from "../components/ui/Splash";



const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/auth/Signin"));
const Register = lazy(() => import("../pages/auth/Signup"));
const ForgetPassword = lazy(() => import("../pages/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const FAQ = lazy(() => import("../pages/FAQ"));
const EmailVerfication = lazy(() => import("../pages/auth/EmailVerfication"));
 
//dashboard
const Overview = lazy(() => import("../pages/dashboard/Overview"));
//product
const ProductAdd = lazy(() => import("../pages/dashboard/Product/ProductAdd"));
const ProductList = lazy(() => import("../pages/dashboard/Product/ProductList"));
const ProductEdit = lazy(() => import("../pages/dashboard/Product/ProductEdit"));
const ProductDetails = lazy(() => import("../pages/product/ProductDetails"));
const Search = lazy(() => import("../pages/product/ProductSearch"));
//size
const SizeList = lazy(() => import("../pages/dashboard/Size/SizeList"));
const SizeAdd = lazy(() => import("../pages/dashboard/Size/SizeAdd"));
const SizeEdit = lazy(() => import("../pages/dashboard/Size/SizeEdit"));
//category
const CategoryList = lazy(() => import("../pages/dashboard/Category/CategoryList"));
const CategoryAdd = lazy(() => import("../pages/dashboard/Category/CategoryAdd"));
const CategoryEdit = lazy(() => import("../pages/dashboard/Category/CategoryEdit"));
//brand
const BrandList = lazy(() => import("../pages/dashboard/Brand/BrandList"));
const BrandAdd = lazy(() => import("../pages/dashboard/Brand/BrandAdd"));
const BrandEdit = lazy(() => import("../pages/dashboard/Brand/BrandEdit"));
//payment
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
//order
const Order = lazy(() => import("../pages/order/Order"));
const OrderHistory = lazy(() => import("../pages/order/OrderHistory"));
const AllOrders = lazy(() => import("../pages/dashboard/Orders"));
 

const Router = () => {


  return (

    <Routes>
      <Route path="/" element={<Suspense fallback={<Splash />}><Home /></Suspense>} />
      <Route path="/ZiwiShop/search" element={<Suspense fallback={<Splash />}><Search /></Suspense>} />
      <Route path="/productDetails/:id" element={<Suspense fallback={<Splash />}><ProductDetails /></Suspense>} />
      <Route path="/ZiwiShop/FAQ" element={<Suspense fallback={<Splash />}><FAQ /></Suspense>} />
      <Route path="/forgotpassword" element={<Suspense fallback={<Splash />}><ForgetPassword /></Suspense>} />
      
      <Route element={<ForceRedirect />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/emailverification" element={<EmailVerfication />} />
      <Route path="/resetpassword" element={<Suspense fallback={<Splash />}><ResetPassword /></Suspense>} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "USER"]} />}>
        <Route path="/profile" element={<Profile />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/order/:id" element={<Order />} />

        <Route path="/OrderHistory" element={<OrderHistory />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        {/* products  */}
        <Route path="/dashboard/products" element={<ProductList />} />
        <Route path="/dashboard/products/add" element={<ProductAdd />} />
        <Route path="/dashboard/products/edit/:id" element={<ProductEdit />} />
        {/* size  */}
        <Route path="/dashboard/sizes" element={<SizeList />} />
        <Route path="/dashboard/sizes/add" element={<SizeAdd />} />
        <Route path="/dashboard/sizes/edit/:id" element={<SizeEdit />} />
        {/* category  */}
        <Route path="/dashboard/categories" element={<CategoryProvider>
          <CategoryList />
        </CategoryProvider>} />
        <Route path="/dashboard/categories/add" element={<CategoryProvider>
          <CategoryAdd />
        </CategoryProvider>} />
        <Route path="/dashboard/categories/edit/:id" element={<CategoryProvider>
          <CategoryEdit />
        </CategoryProvider>} />

        {/* brand  */}
        <Route path="/dashboard/brands" element={<BrandList />} />
        <Route path="/dashboard/brands/add" element={<BrandAdd />} />
        <Route path="/dashboard/brands/edit/:id" element={<BrandEdit />} />
        {/* orders  */}
        <Route path="/dashboard/orders" element={<AllOrders />} />

        <Route path="/dashboard/overview" element={<Overview />} />
      </Route>

      <Route path="/noaccess" element={<NoAccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
