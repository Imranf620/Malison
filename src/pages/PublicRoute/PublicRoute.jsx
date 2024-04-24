import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/userContext";

const ProtectedRoute = ({ redirectPath = "/" }) => {
  const { userDetails } = useContext(UserContext);

  const isUserLoggedIn = userDetails.userName !== "";

  return isUserLoggedIn ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
