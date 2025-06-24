import { useState } from "react";
import { useNavigate } from "react-router";
import { Logo } from "../components";
import { useAdminContext } from "../contexts";

const AdminLogin = () => {
  const { login, token, loading } = useAdminContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
    if (token) {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <section className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <div className="flex flex-col gap-6">
          <Logo />
          <h1 className="text-2xl font-bold text-center">Админ панель</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
              Логин
              <input
                type="text"
                className="border rounded-md p-2"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </label>
            <label className="flex flex-col">
              Пароль
              <input
                type="password"
                className="border rounded-md p-2"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </label>
            <button
              className="btn-primary mt-4"
              disabled={!credentials.username || !credentials.password || loading}
            >
              {loading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
