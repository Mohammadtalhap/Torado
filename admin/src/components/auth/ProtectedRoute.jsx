import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="h-20 w-20 animate-spin rounded-full border-b-2 border-gray-900"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
