import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // To avoid redirection before finishing loading.
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
