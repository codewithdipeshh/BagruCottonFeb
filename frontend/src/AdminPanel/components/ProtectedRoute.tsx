import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("jwt");
  
  // Real-world guard check
  if (!token) {
    console.warn("🔒 Unauthorized navigation block! Redirecting to secure gate.");
    return <Navigate to="/admin/login" replace />;
  }

  // Clearance approved! Render child layouts safely
  return <Outlet />;
}