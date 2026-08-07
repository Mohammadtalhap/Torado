import { createContext, useContext, useEffect, useState } from "react";
import { getAdminProfile } from "../services/authService.js";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    try {
      const response = await getAdminProfile();
      setAdmin(response.data);
    } catch (error) {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    admin,
    setAdmin,
    loading,
    loadAdmin,
    isAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
