import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth/auth-hooks";

interface RouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: RouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Include both pathname and search params in the redirect
    const fullPath = location.pathname + location.search;
    return <Navigate to={`/auth/login?next=${encodeURIComponent(fullPath)}`} />;
  }
  return <>{children}</>;
}

export function AuthRoute({ children }: RouteProps) {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" />;
  return <>{children}</>;
}
