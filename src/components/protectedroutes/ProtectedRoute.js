import React from "react";

import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to={"/"} />;
  }
  return children ? children : <Outlet />;
};
