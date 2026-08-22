import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("admin_jwt");
  
  // Real-world guard check
  if (!token) {
    console.warn("Unauthorized navigation block! Redirecting to secure gate.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

