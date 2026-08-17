import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white p-4">
      <h2 className="text-xl font-bold">Torado Admin</h2>

      <nav className="flex flex-col mt-6 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `flex justify-center items-center px-3 py-2 transition-colors hover:bg-slate-700
            ${isActive ? "bg-slate-600" : ""}
          `}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/properties"
          className={({ isActive }) => `flex justify-center items-center px-3 py-2 transition-colors hover:bg-slate-700
            ${isActive ? "bg-slate-600" : ""}
          `}
        >
          Properties
        </NavLink>

        <NavLink
          to="/agents"
          className={({ isActive }) => `flex justify-center items-center px-3 py-2 transition-colors hover:bg-slate-700
            ${isActive ? "bg-slate-600" : ""}
          `}
        >
          Agents
        </NavLink>

        <NavLink
          to="/blogs"
          className={({ isActive }) => `flex justify-center items-center px-3 py-2 transition-colors hover:bg-slate-700
            ${isActive ? "bg-slate-600" : ""}
          `}
        >
          Blogs
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
