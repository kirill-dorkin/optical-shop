import { NavLink, Outlet } from "react-router-dom";
import { useAdminContext } from "../contexts";
import { useState } from "react";

const links = [
  { path: "/admin", label: "Статистика" },
  { path: "/admin/products", label: "Товары" },
  { path: "/admin/categories", label: "Категории" },
  { path: "/admin/brands", label: "Бренды" },
];

const AdminLayout = () => {
  const { logout } = useAdminContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen md:flex">
      <aside
        className={`fixed md:static z-20 top-0 left-0 h-full w-64 bg-gray-800 text-gray-100 p-6 flex flex-col gap-4 transform transition-transform md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Админ панель</h1>
        <nav className="flex flex-col gap-2 flex-1">
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="btn-secondary mt-auto md:block">
          Выйти
        </button>
      </aside>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      <main className="flex-1 p-6 bg-[--theme-color]">
        <button
          className="md:hidden mb-4 btn-secondary"
          onClick={() => setMenuOpen(true)}
        >
          Меню
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
