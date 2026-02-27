import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // if route below /admin and user not admin, redirect home
  if (location.pathname.startsWith("/admin") && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
