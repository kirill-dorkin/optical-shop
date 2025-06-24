import { useState } from "react";
import { v4 as uuid } from "uuid";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  adminAddProductService,
  adminDeleteProductService,
  adminUpdateProductService,
} from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";
import { Pagination } from "../components";
import { gendersList } from "../utils/constants";

const AdminProducts = () => {
  const { token, logout } = useAdminContext();
  const { allProducts, categoryList, brandList, refreshProducts } = useProductsContext();
  const getNewProduct = () => ({
    _id: uuid(),
    name: "",
    description: "",
    price: 0,
    newPrice: 0,
    brand: "",
    category: "",
    gender: "",
    weight: "",
    quantity: 0,
    rating: 0,
    trending: false,
    image: "",
  });
  const [productForm, setProductForm] = useState(getNewProduct());
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await adminUpdateProductService(productForm._id, productForm, token);
    } else {
      await adminAddProductService(productForm, token);
    }
    setProductForm(getNewProduct());
    setIsEditing(false);
    setCurrentPage(1);
    refreshProducts();
  };

  const deleteProduct = async (id) => {
    await adminDeleteProductService(id, token);
    setCurrentPage(1);
    refreshProducts();
  };

  const startEdit = (product) => {
    setProductForm(product);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setProductForm(getNewProduct());
    setIsEditing(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedProducts = allProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Управление товарами</h2>
        <button onClick={logout} className="btn-secondary">Выйти</button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={saveProduct} className="flex flex-col gap-2">
          <label className="text-sm">ID</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm._id}
            onChange={(e) => setProductForm({ ...productForm, _id: e.target.value })}
            required
          />
          <label className="text-sm">Название</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
            required
          />
          <label className="text-sm">Описание</label>
          <textarea
            className="border p-2 rounded"
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
            required
          />
          <label className="text-sm">Цена</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.price}
            min={0}
            onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
            required
          />
          <label className="text-sm">Новая цена</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.newPrice}
            min={0}
            onChange={(e) => setProductForm({ ...productForm, newPrice: Number(e.target.value) })}
            required
          />
          <label className="text-sm">Бренд</label>
          <select
            className="border p-2 rounded"
            value={productForm.brand}
            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
            required
          >
            <option value="">Выберите бренд</option>
            {brandList.map((b) => (
              <option key={b._id} value={b.brandName}>
                {b.brandName}
              </option>
            ))}
          </select>
          <label className="text-sm">Категория</label>
          <select
            className="border p-2 rounded"
            value={productForm.category}
            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
            required
          >
            <option value="">Выберите категорию</option>
            {categoryList.map((c) => (
              <option key={c._id} value={c.categoryName}>
                {c.categoryName}
              </option>
            ))}
          </select>
          <label className="text-sm">Пол</label>
          <select
            className="border p-2 rounded"
            value={productForm.gender}
            onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })}
            required
          >
            <option value="">Выберите пол</option>
            {gendersList
              .filter((g) => g.value !== "all")
              .map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
          </select>
          <label className="text-sm">Вес</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm.weight}
            onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
            required
          />
          <label className="text-sm">Количество</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.quantity}
            min={0}
            onChange={(e) => setProductForm({ ...productForm, quantity: Number(e.target.value) })}
            required
          />
          <label className="text-sm">Рейтинг</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.rating}
            step="0.1"
            min={0}
            max={5}
            onChange={(e) => setProductForm({ ...productForm, rating: Number(e.target.value) })}
            required
          />
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={productForm.trending}
              onChange={(e) => setProductForm({ ...productForm, trending: e.target.checked })}
            />
            Трендовый
          </label>
          <label className="text-sm">Изображение</label>
          <label className="file-label">
            Выберите изображение
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={handleImageChange}
              required
            />
          </label>
          {productForm.image && (
            <img src={productForm.image} alt="preview" className="h-24 object-contain" />
          )}
          <div className="flex gap-2 mt-2">
            <button className="btn-primary" type="submit">
              {isEditing ? "Обновить" : "Добавить"}
            </button>
            {isEditing && (
              <button type="button" className="btn-secondary" onClick={cancelEdit}>
                Отмена
              </button>
            )}
          </div>
        </form>
        <ul className="flex flex-col gap-2">
          {displayedProducts.map((p) => (
            <li key={p._id} className="border p-2 rounded flex justify-between">
              <span>{p.name}</span>
              <div className="flex gap-2">
                <button className="text-blue-600" onClick={() => startEdit(p)}>
                  <FaEdit />
                </button>
                <button className="text-red-600" onClick={() => deleteProduct(p._id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalItems={allProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AdminProducts;
