import React from "react";
import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const ProtectedRoute = () => {
  const {IsLoggedIn}=useAuth()
  return IsLoggedIn ? (
    <>
      <React.Suspense fallback={<LoadingSpinner />}>
      <Outlet />
      </React.Suspense>
    </>
  ) : (

    <Navigate to="/signin" replace />
  );
};
ProtectedRoute.propTypes = {
  children: PropTypes.node
};
export default ProtectedRoute;
