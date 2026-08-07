import { useAuth } from "../../context/AuthContext";
import AdminLayout from "../../layouts/AdminLayout";

function DashboardPage() {
  const { admin } = useAuth();

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <pre className="mt-6">
        {JSON.stringify(admin, null, 2)}
      </pre>
    </AdminLayout>
  );
}

export default DashboardPage;
