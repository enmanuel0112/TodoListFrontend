import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { Home } from "../pages/Home";
import { SignUp } from "../pages/SignUp";
import { TaskCreate } from "../pages/TaskCreate";
import { TaskEdit } from "../pages/TaskEdit";
import { DashBoard } from "../pages/dashboard";
import { ProtedRouter } from "../components/layout/ProtectedRoute";
export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/*" element={<Home />} />
      <Route element={<ProtedRouter />}>
        <Route path="/task/create" element={<TaskCreate />} />
        <Route path="/task/edit" element={<TaskEdit />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
    </Routes>
  );
};
