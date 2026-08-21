import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { logoutAdmin } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutAdmin();

      navigate("/");

      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.message || "Failed to logout");
    }
  }
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded-lg bg-red-500 transition-colors hover:bg-red-600 text-white cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;
