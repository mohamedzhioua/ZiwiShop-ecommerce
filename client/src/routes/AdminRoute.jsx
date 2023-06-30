import PropTypes from 'prop-types';
import { Navigate, Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import React from 'react';

const AdminRouter = () => {
  const { IsLoggedIn, role } = useAuth();
  console.log("🚀 ~ file: AdminRoute.jsx:9 ~ AdminRouter ~ role:", role)

  if (!IsLoggedIn) {
    return <Navigate to="/signin" replace />;
  } else {
    if (role !== "ADMIN") {
      return <Navigate to="/noaccess" replace />;
    }
  }

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </React.Suspense>
  );
};

AdminRouter.propTypes = {
  children: PropTypes.node
};

export default AdminRouter;
