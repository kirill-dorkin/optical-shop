import { useProductsContext } from "../contexts";

const AdminHome = () => {
  const { allProducts, categoryList } = useProductsContext();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Статистика</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <span className="text-gray-600">Всего товаров:</span>
          <p className="text-3xl font-bold">{allProducts.length}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <span className="text-gray-600">Всего категорий:</span>
          <p className="text-3xl font-bold">{categoryList.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
