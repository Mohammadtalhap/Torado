import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 bg-slate-100">
            {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
