import { Route, Routes } from "react-router-dom";

import AgentListPage from "../pages/agents/AgentListPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import BlogListPage from "../pages/blogs/BlogListPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import PropertyListPage from "../pages/properties/PropertyListPage.jsx";

import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import PublicRoute from "../components/auth/PublicRoute.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/properties" element={<PropertyListPage />} />
          <Route path="/agents" element={<AgentListPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
