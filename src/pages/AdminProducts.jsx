import { useState } from "react";
import {
  adminAddProductService,
  adminDeleteProductService,
  adminUpdateProductService,
} from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";

const AdminProducts = () => {
  const { token } = useAdminContext();
  const { allProducts, refreshProducts } = useProductsContext();
  const initialProduct = {
    _id: "",
    name: "",
    price: 0,
    newPrice: 0,
    brand: "",
    category: "",
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
      <h2 className="text-2xl font-semibold">Управление товарами</h2>
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
          <label className="text-sm">Изображение</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
                  Редактировать
                </button>
                <button className="text-red-600" onClick={() => deleteProduct(p._id)}>
                  Удалить
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
