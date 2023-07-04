import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

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
ForceRedirect.propTypes = {
  children: PropTypes.node
};
export default ForceRedirect;
