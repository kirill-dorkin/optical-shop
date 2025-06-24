import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBookmarkHeart } from "react-icons/bs";
import { MdOutlineExplore, MdLocationOn } from "react-icons/md";

import { RxHamburgerMenu } from "react-icons/rx";
import MenuDropdown from "./MenuDropdown";
import Logo from "./Logo";
import { useWishlistContext } from "../../contexts";

import Search from "../filters/Search";

const Navbar = () => {
  const { wishlist } = useWishlistContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <nav
      className={`flex flex-col sm:flex-row py-3 max-w-screen mb-3 fixed left-0 right-0 px-[4%] md:px-[10%] bg-[--theme-color] ${
        colorChange ? "shadow-sm  drop-shadow-sm" : ""
      } z-10 transition delay-75 ease-in-out`}
    >
      <div className="flex justify-between w-full items-center">
        <section className="relative flex items-center">
          <Logo />
        </section>
        <div className="hidden  sm:block sm:w-1/3 relative">
          <Search />
        </div>

        <section className="flex items-center">
          <Link
            to="/products"
            className="mx-2 px-3 py-1 shadow-sm rounded-md text-white bg-yellow-700 text-sm hover:bg-yellow-800 transition"
          >
            <span className="hidden xs:block">Каталог</span>{" "}
            <MdOutlineExplore className="xs:hidden" />
          </Link>
          <ul className=" hidden md:flex justify-between text-2xl ps-1">
            <li
              className="relative bg-gray-200  p-2 rounded-full hover:bg-yellow-800 hover:text-white cursor-pointer mx-2 transition shadow-sm"
              onClick={() => navigate("/wishlist")}
            >
              <BsBookmarkHeart />
              {wishlist.length > 0 && (
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-rose-600 border-2 border-[--theme-color] rounded-full -top-2 -right-2 ">
                  {wishlist.length}
                </div>
              )}
            </li>
            <li
              className="relative bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-800 cursor-pointer mx-2 transition shadow-sm"
              onClick={() => navigate("/location")}
            >
              <MdLocationOn />
            </li>
          </ul>
          <section className="md:hidden cursor-pointer relative">
            <RxHamburgerMenu
              className="text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && <MenuDropdown navigate={navigate} />}
          </section>
        </section>
      </div>

      <section className="mt-4 sm:hidden relative">
        <Search />
      </section>
    </nav>
  );
};

export default Navbar;
