import { NavLink, Outlet } from "react-router-dom";
import { useAdminContext } from "../contexts";

const links = [
  { path: "/admin", label: "Статистика" },
  { path: "/admin/products", label: "Товары" },
  { path: "/admin/categories", label: "Категории" },
  { path: "/admin/brands", label: "Бренды" },
];

const AdminLayout = () => {
  const { logout } = useAdminContext();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-gray-100 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Админ панель</h1>
        <nav className="flex flex-col gap-2 flex-1">
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/admin"}
              className={({ isActive }) =>
                `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={logout} className="btn-secondary mt-auto">
          Выйти
        </button>
      </aside>
      <main className="flex-1 p-6 bg-[--theme-color]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
