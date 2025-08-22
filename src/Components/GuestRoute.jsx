import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/user" replace />; // Already logged in → send to dashboard/user
  }

  return <Outlet />; // Render login/signup pages
}
