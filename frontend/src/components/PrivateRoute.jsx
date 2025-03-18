import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  // const isAuthenticated = useAuth()?.isAuthenticated || false;
  // console.log("isAuth", isAuthenticated);
  if (loading) {
    return <div>Loading...</div>; // 避免错误跳转
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
