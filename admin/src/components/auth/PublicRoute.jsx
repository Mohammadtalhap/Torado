import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PublicRoute({ children }) {
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

  return children;
}

export default PublicRoute;
