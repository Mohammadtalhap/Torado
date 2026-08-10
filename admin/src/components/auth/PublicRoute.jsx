import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PublicRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="h-30 w-30 animate-spin rounded-full border-b-2 border-gray-900"></span>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
