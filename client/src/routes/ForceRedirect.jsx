 import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner/LoadingSpinner";

const ForceRedirect = () => {
  const { IsLoggedIn } = useAuth()

  return IsLoggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </React.Suspense>
  );
};
 
export default ForceRedirect;
