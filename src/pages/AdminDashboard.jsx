import { useEffect, useState } from "react";
import {
  adminAddProductService,
  adminDeleteProductService,
  adminAddCategoryService,
  adminDeleteCategoryService,
} from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";
import { Pagination } from "../components";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const { token, logout } = useAdminContext();
  const navigate = useNavigate();
  const { allProducts, categoryList } = useProductsContext();
  const [productForm, setProductForm] = useState({
    _id: "",
    name: "",
    price: "",
    newPrice: "",
    brand: "",
    category: "",
    image: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    _id: "",
    categoryName: "",
    description: "",
    categoryImg: "",
  });
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  const addProduct = async (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: Number(productForm.price),
      newPrice: Number(productForm.newPrice),
    };
    await adminAddProductService(productData, token);
    setProductForm({
      _id: "",
      name: "",
      price: "",
      newPrice: "",
      brand: "",
      category: "",
      image: "",
    });
    setCurrentProductPage(1);
  };

  const addCategory = async (e) => {
    e.preventDefault();
    await adminAddCategoryService(categoryForm, token);
    setCategoryForm({ _id: "", categoryName: "", description: "", categoryImg: "" });
    setCurrentCategoryPage(1);
  };

  const deleteProduct = async (id) => {
    await adminDeleteProductService(id, token);
    setCurrentProductPage(1);
  };

  const deleteCategory = async (id) => {
    await adminDeleteCategoryService(id, token);
    setCurrentCategoryPage(1);
  };

  const productStart = (currentProductPage - 1) * itemsPerPage;
  const displayedProducts = allProducts.slice(productStart, productStart + itemsPerPage);
  const categoryStart = (currentCategoryPage - 1) * itemsPerPage;
  const displayedCategories = categoryList.slice(categoryStart, categoryStart + itemsPerPage);

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Админ панель</h1>
        <button className="btn-secondary" onClick={logout}>
          Выйти
        </button>
      </div>
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Добавить товар</h2>
          <form onSubmit={addProduct} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="ID"
              className="border p-2 rounded"
              value={productForm._id}
              onChange={(e) => setProductForm({ ...productForm, _id: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Название"
              className="border p-2 rounded"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Цена"
              className="border p-2 rounded"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Новая цена"
              className="border p-2 rounded"
              value={productForm.newPrice}
              onChange={(e) => setProductForm({ ...productForm, newPrice: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Бренд"
              className="border p-2 rounded"
              value={productForm.brand}
              onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Категория"
              className="border p-2 rounded"
              value={productForm.category}
              onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="URL изображения"
              className="border p-2 rounded"
              value={productForm.image}
              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              required
            />
            <button className="btn-primary mt-2">Добавить</button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Добавить категорию</h2>
          <form onSubmit={addCategory} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="ID"
              className="border p-2 rounded"
              value={categoryForm._id}
              onChange={(e) => setCategoryForm({ ...categoryForm, _id: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Название"
              className="border p-2 rounded"
              value={categoryForm.categoryName}
              onChange={(e) => setCategoryForm({ ...categoryForm, categoryName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Описание"
              className="border p-2 rounded"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="URL изображения"
              className="border p-2 rounded"
              value={categoryForm.categoryImg}
              onChange={(e) => setCategoryForm({ ...categoryForm, categoryImg: e.target.value })}
              required
            />
            <button className="btn-primary mt-2">Добавить</button>
          </form>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Товары</h2>
        <ul className="flex flex-col gap-2">
          {displayedProducts.map((p) => (
            <li key={p._id} className="border p-2 rounded flex justify-between">
              <span>{p.name}</span>
              <button className="text-red-600" onClick={() => deleteProduct(p._id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentProductPage}
          totalItems={allProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentProductPage}
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Категории</h2>
        <ul className="flex flex-col gap-2">
          {displayedCategories.map((c) => (
            <li key={c._id} className="border p-2 rounded flex justify-between">
              <span>{c.categoryName}</span>
              <button className="text-red-600" onClick={() => deleteCategory(c._id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentCategoryPage}
          totalItems={categoryList.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentCategoryPage}
        />
      </section>
    </div>
  );
};

export default AdminDashboard;
