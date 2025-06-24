import { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  adminAddBrandService,
  adminDeleteBrandService,
  adminUpdateBrandService,
} from "../api/apiServices";
import { useAdminContext, useProductsContext } from "../contexts";
import { Pagination } from "../components";
import { v4 as uuid } from "uuid";

const AdminBrands = () => {
  const { token } = useAdminContext();
  const { brandList, refreshBrands } = useProductsContext();
  const getNewBrand = () => ({ _id: uuid(), brandName: "" });
  const [brandForm, setBrandForm] = useState(getNewBrand());
  const [isEditing, setIsEditing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const saveBrand = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isEditing) {
      await adminUpdateBrandService(brandForm._id, brandForm, token);
    } else {
      await adminAddBrandService(brandForm, token);
    }
    setBrandForm(getNewBrand());
    setIsEditing(false);
    setCurrentPage(1);
    setSubmitted(false);
    refreshBrands();
  };

  const deleteBrand = async (id) => {
    await adminDeleteBrandService(id, token);
    setCurrentPage(1);
    refreshBrands();
  };

  const startEdit = (brand) => {
    setBrandForm(brand);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setBrandForm(getNewBrand());
    setIsEditing(false);
  };

  useEffect(() => {
    refreshBrands();
  }, [refreshBrands]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBrands = brandList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Бренды</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={saveBrand} className="flex flex-col gap-2">
          <label className="text-sm">ID</label>
          <input
            type="text"
            className={`border p-2 rounded ${submitted && !brandForm._id ? "border-red-500" : ""}`}
            value={brandForm._id}
            onChange={(e) => setBrandForm({ ...brandForm, _id: e.target.value })}
            required
          />
          <label className="text-sm">Название</label>
          <input
            type="text"
            className={`border p-2 rounded ${submitted && !brandForm.brandName ? "border-red-500" : ""}`}
            value={brandForm.brandName}
            onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
            required
          />
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
        <div className="flex flex-col gap-2">
          <ul className="flex flex-col gap-2">
            {displayedBrands.map((b) => (
              <li key={b._id} className="border p-2 rounded flex justify-between">
                <span>{b.brandName}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600" onClick={() => startEdit(b)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-600" onClick={() => deleteBrand(b._id)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalItems={brandList.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminBrands;
