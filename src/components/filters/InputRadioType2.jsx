import React from "react";
import { useProductsContext } from "../../contexts";
const InputRadioType2 = ({ data }) => {
  const {
    applyFilters,
    filters: { gender },
  } = useProductsContext();

  return (
    <label
      className={`p-2 rounded-md shadow-sm text-center capitalize ${
        gender === data.value
          ? "bg-[--primary-text-color] text-white "
          : "bg-black/[0.1] hover:bg-[--primary-text-color] hover:text-white"
      } cursor-pointer`}
    >
      {data.label}
      <input
        type="radio"
        name="gender"
        value={data.value}
        className="invisible"
        checked={gender === data.value}
        onChange={(e) => applyFilters(e.target.name, e.target.value)}
      />
    </label>
  );
};

export default InputRadioType2;
