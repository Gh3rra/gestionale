import React from "react";
import { Navigate, useLocation } from "react-router";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(user);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress className="!text-primary-text" />
      </div>
    ); // Show a loading state while checking authentication
  }

  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return (
      <Navigate to={"/login"} replace state={{ from: location.pathname }} />
    ); // Redirect to login if user is not logged in
  }

  return children;
};

export default ProtectedRoute;
