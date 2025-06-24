import { Routes, Route, Navigate } from "react-router-dom";

import SharedLayout from "./SharedLayout";
import { authRoutes, contentRoutes } from "./publicRoutes";

import {
  ErrorPage,
  Home,
  AdminLogin,
  AdminHome,
  AdminProducts,
  AdminCategories,
  AdminBrands,
} from "../pages";
import AdminLayout from "./AdminLayout";
import { useAdminContext } from "../contexts";

const Index = () => {
  const { token: adminToken } = useAdminContext();

  return (
    <Routes>
      {authRoutes.map((route, idx) => (
        <Route key={idx} path={route.path} element={route.element} exact />
      ))}
      <Route
        element={adminToken ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
      >
        <Route path="/admin" element={<AdminHome />} index />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/brands" element={<AdminBrands />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<SharedLayout />}>
        <Route path="/" element={<Home />} index />
        <Route path="*" element={<ErrorPage />} />
        {contentRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export { Index };
