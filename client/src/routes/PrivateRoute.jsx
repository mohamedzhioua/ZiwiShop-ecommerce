import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/ui/LoadingSpinner/LoadingSpinner";
import React from 'react';

const ProtectedRoute = ({ allowedRoles }) => {
  const { IsLoggedIn, user } = useAuth();
 
  if (!IsLoggedIn) {

     return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
     return <Navigate to="/noaccess" replace />;   
  }

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </React.Suspense>
  );
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
