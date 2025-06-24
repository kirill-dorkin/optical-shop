import { BsBookmarkHeart } from "react-icons/bs";

const MenuDropdown = ({ navigate }) => {
  return (
    <div className="absolute right-0 z-10  bg-amber-50 font-semibold   rounded-lg shadow w-max  overflow-hidden transition-all">
      <ul className="text-sm  ">
        <li onClick={() => navigate("/wishlist")}>
          <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
            <BsBookmarkHeart className="text-lg me-3" /> Избранное
          </span>
        </li>
        <li onClick={() => navigate("/location")}>
          <span className="flex items-center px-5 py-3 hover:bg-amber-100 ">
            📍 <span className="ms-3">Где купить</span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MenuDropdown;
