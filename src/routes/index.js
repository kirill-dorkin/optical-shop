import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";

import SharedLayout from "./SharedLayout";
import RequiresAuth from "./RequiresAuth";
import { authRoutes, contentRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

import {
  ErrorPage,
  Home,
  Login,
  AdminLogin,
  AdminHome,
  AdminProducts,
  AdminCategories,
  AdminBrands,
} from "../pages";
import AdminLayout from "./AdminLayout";
import { useAuthContext, useAdminContext } from "../contexts";

const Index = () => {
  const { token } = useAuthContext();
  const { token: adminToken } = useAdminContext();
  const location = useLocation();

  return (
    <Routes>
      <Route
        element={
          token ? (
            <Navigate
              to={location?.state?.from?.pathname ?? "/"}
              replace={true}
            />
          ) : (
            <Outlet />
          )
        }
      >
        {authRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} exact />
        ))}
      </Route>
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

        <Route element={<RequiresAuth />}>
          {privateRoutes.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export { Index };
