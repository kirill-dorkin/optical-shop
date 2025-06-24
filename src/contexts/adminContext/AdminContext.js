import { createContext, useState } from "react";
import { adminLoginService } from "../../api/apiServices";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [loading, setLoading] = useState(false);

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await adminLoginService(username, password);
      if (res.status === 200) {
        localStorage.setItem("adminToken", res.data.token);
        setToken(res.data.token);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
    <AdminContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
