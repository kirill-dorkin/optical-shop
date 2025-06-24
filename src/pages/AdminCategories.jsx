import { useState } from "react";
import { adminAddCategoryService, adminDeleteCategoryService } from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";

const AdminCategories = () => {
  const { token } = useAdminContext();
  const { categoryList } = useProductsContext();
  const [categoryForm, setCategoryForm] = useState({
    _id: "",
    categoryName: "",
    description: "",
    categoryImg: "",
  });

  const addCategory = async (e) => {
    e.preventDefault();
    await adminAddCategoryService(categoryForm, token);
    setCategoryForm({ _id: "", categoryName: "", description: "", categoryImg: "" });
  };

  const deleteCategory = async (id) => {
    await adminDeleteCategoryService(id, token);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Управление категориями</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={addCategory} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="ID"
            className="border p-2 rounded"
            value={categoryForm._id}
            onChange={(e) => setCategoryForm({ ...categoryForm, _id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Название"
            className="border p-2 rounded"
            value={categoryForm.categoryName}
            onChange={(e) => setCategoryForm({ ...categoryForm, categoryName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Описание"
            className="border p-2 rounded"
            value={categoryForm.description}
            onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL изображения"
            className="border p-2 rounded"
            value={categoryForm.categoryImg}
            onChange={(e) => setCategoryForm({ ...categoryForm, categoryImg: e.target.value })}
          />
          <button className="btn-primary mt-2">Добавить</button>
        </form>
        <ul className="flex flex-col gap-2">
          {categoryList.map((c) => (
            <li key={c._id} className="border p-2 rounded flex justify-between">
              <span>{c.categoryName}</span>
              <button className="text-red-600" onClick={() => deleteCategory(c._id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCategories;
