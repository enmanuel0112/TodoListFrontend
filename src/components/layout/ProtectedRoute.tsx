import { Outlet, Navigate } from "react-router-dom";
import { Spinner } from "../Spinner";
import { useContext } from "react";
import contextComponent from "../../context/AuthContext";

export const ProtedRouter = () => {
  const { user, loading } = useContext(contextComponent);

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  console.log("este es antes de que verifique", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  console.log("este es despues que hace la verificacion", user);
  return <Outlet />;
};
