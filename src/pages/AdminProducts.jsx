import { useState } from "react";
import { adminAddProductService, adminDeleteProductService } from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";

const AdminProducts = () => {
  const { token } = useAdminContext();
  const { allProducts } = useProductsContext();
  const [productForm, setProductForm] = useState({
    _id: "",
    name: "",
    price: 0,
    newPrice: 0,
    brand: "",
    category: "",
    image: "",
  });

  const addProduct = async (e) => {
    e.preventDefault();
    await adminAddProductService(productForm, token);
    setProductForm({
      _id: "",
      name: "",
      price: 0,
      newPrice: 0,
      brand: "",
      category: "",
      image: "",
    });
  };

  const deleteProduct = async (id) => {
    await adminDeleteProductService(id, token);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Управление товарами</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={addProduct} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="ID"
            className="border p-2 rounded"
            value={productForm._id}
            onChange={(e) => setProductForm({ ...productForm, _id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Название"
            className="border p-2 rounded"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Цена"
            className="border p-2 rounded"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Новая цена"
            className="border p-2 rounded"
            value={productForm.newPrice}
            onChange={(e) => setProductForm({ ...productForm, newPrice: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Бренд"
            className="border p-2 rounded"
            value={productForm.brand}
            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Категория"
            className="border p-2 rounded"
            value={productForm.category}
            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL изображения"
            className="border p-2 rounded"
            value={productForm.image}
            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
          />
          <button className="btn-primary mt-2">Добавить</button>
        </form>
        <ul className="flex flex-col gap-2">
          {allProducts.map((p) => (
            <li key={p._id} className="border p-2 rounded flex justify-between">
              <span>{p.name}</span>
              <button className="text-red-600" onClick={() => deleteProduct(p._id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProducts;
