import { useAuth } from "../../context/AuthContext";

function DashboardPage() {
  const { admin } = useAuth();

  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <pre className="mt-6">{JSON.stringify(admin, null, 2)}</pre>
    </>
  );
}

export default DashboardPage;
