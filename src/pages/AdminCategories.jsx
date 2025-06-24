import { useState } from "react";
import { v4 as uuid } from "uuid";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  adminAddCategoryService,
  adminDeleteCategoryService,
  adminUpdateCategoryService,
} from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";
import { Pagination } from "../components";

const AdminCategories = () => {
  const { token } = useAdminContext();
  const { categoryList, refreshCategories } = useProductsContext();
  const getNewCategory = () => ({
    _id: uuid(),
    categoryName: "",
    description: "",
    categoryImg: "",
  });
  const [categoryForm, setCategoryForm] = useState(getNewCategory());
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryForm((prev) => ({ ...prev, categoryImg: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await adminUpdateCategoryService(categoryForm._id, categoryForm, token);
    } else {
      await adminAddCategoryService(categoryForm, token);
    }
    setCategoryForm(getNewCategory());
    setIsEditing(false);
    setCurrentPage(1);
    refreshCategories();
  };

  const deleteCategory = async (id) => {
    await adminDeleteCategoryService(id, token);
    setCurrentPage(1);
    refreshCategories();
  };

  const startEdit = (category) => {
    setCategoryForm(category);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setCategoryForm(getNewCategory());
    setIsEditing(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCategories = categoryList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Управление категориями</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={saveCategory} className="flex flex-col gap-2">
          <label className="text-sm">ID</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={categoryForm._id}
            onChange={(e) => setCategoryForm({ ...categoryForm, _id: e.target.value })}
            required
          />
          <label className="text-sm">Название</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={categoryForm.categoryName}
            onChange={(e) => setCategoryForm({ ...categoryForm, categoryName: e.target.value })}
            required
          />
          <label className="text-sm">Описание</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={categoryForm.description}
            onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
            required
          />
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
          {categoryForm.categoryImg && (
            <img src={categoryForm.categoryImg} alt="preview" className="h-24 object-contain" />
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
          {displayedCategories.map((c) => (
            <li key={c._id} className="border p-2 rounded flex justify-between">
              <span>{c.categoryName}</span>
              <div className="flex gap-2">
                <button className="text-blue-600" onClick={() => startEdit(c)}>
                  <FaEdit />
                </button>
                <button className="text-red-600" onClick={() => deleteCategory(c._id)}>
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalItems={categoryList.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AdminCategories;
