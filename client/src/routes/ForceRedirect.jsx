 import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner/LoadingSpinner";

const ForceRedirect = () => {
  const { IsLoggedIn , user} = useAuth()

  return IsLoggedIn ? (
    <Navigate to={user.role ==="ADMIN" ? "/dashboard/overview" : "/"} replace />
  ) : (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </React.Suspense>
  );
};
 
export default ForceRedirect;
