import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute({ isAuthenticated = false }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
