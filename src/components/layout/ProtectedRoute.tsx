import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import contextComponent from "../../context/AuthContext";

export const ProtedRouter = () => {
  const { user } = useContext(contextComponent);
  console.log("este es el user", user);
  const location = useLocation();

  if (user && !Object.keys(user).length) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
};
