import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  adminAddProductService,
  adminDeleteProductService,
  adminUpdateProductService,
} from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";

const AdminProducts = () => {
  const { token, logout } = useAdminContext();
  const { allProducts, refreshProducts } = useProductsContext();
  const initialProduct = {
    _id: "",
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
  };
  const [productForm, setProductForm] = useState(initialProduct);
  const [isEditing, setIsEditing] = useState(false);

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
    setProductForm(initialProduct);
    setIsEditing(false);
    refreshProducts();
  };

  const deleteProduct = async (id) => {
    await adminDeleteProductService(id, token);
    refreshProducts();
  };

  const startEdit = (product) => {
    setProductForm(product);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setProductForm(initialProduct);
    setIsEditing(false);
  };

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
          />
          <label className="text-sm">Название</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          />
          <label className="text-sm">Описание</label>
          <textarea
            className="border p-2 rounded"
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
          />
          <label className="text-sm">Цена</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
          />
          <label className="text-sm">Новая цена</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.newPrice}
            onChange={(e) => setProductForm({ ...productForm, newPrice: Number(e.target.value) })}
          />
          <label className="text-sm">Бренд</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm.brand}
            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
          />
          <label className="text-sm">Категория</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm.category}
            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
          />
          <label className="text-sm">Пол</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm.gender}
            onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })}
          />
          <label className="text-sm">Вес</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={productForm.weight}
            onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
          />
          <label className="text-sm">Количество</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.quantity}
            onChange={(e) => setProductForm({ ...productForm, quantity: Number(e.target.value) })}
          />
          <label className="text-sm">Рейтинг</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={productForm.rating}
            step="0.1"
            onChange={(e) => setProductForm({ ...productForm, rating: Number(e.target.value) })}
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
          {allProducts.map((p) => (
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
      </div>
    </div>
  );
};

export default AdminProducts;
