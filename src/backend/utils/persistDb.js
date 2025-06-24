export const persistDb = (server) => {
  if (typeof window === "undefined" || !server) return;
  const data = {
    products: server.db.products || [],
    categories: server.db.categories || [],
    brands: server.db.brands || [],
  };
  localStorage.setItem("mirageDB", JSON.stringify(data));
};
