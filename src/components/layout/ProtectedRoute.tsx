import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Spinner } from "../Spinner";
import { useContext } from "react";
import contextComponent from "../../context/AuthContext";

export const ProtedRouter = () => {
  const { user, loading } = useContext(contextComponent);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
