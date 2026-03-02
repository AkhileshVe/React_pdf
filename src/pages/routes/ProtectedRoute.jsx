import { Navigate, Outlet } from "react-router-dom";

function ProtectedLayout() {
  const isAuthenticated = localStorage.getItem("isAuth");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;