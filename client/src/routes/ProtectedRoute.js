import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  // const { rol } = React.useContext(AuthContext);
  const tokenData = sessionStorage.getItem("token");

  return tokenData ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;