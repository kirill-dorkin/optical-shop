import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";

import {
  useAuthContext,
  useCartContext,
  useProductsContext,
  useWishlistContext,
} from "../contexts";
import { getProductByIdService } from "../api/apiServices";
import { StarRating } from "../components";
import { notify } from "../utils/utils";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { token } = useAuthContext();
  const { getProductById } = useProductsContext();
  const { addProductToCart, disableCart } = useCartContext();
  const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
    useWishlistContext();
  const product = getProductById(productId);

  useEffect(() => {
    (async () => {
      try {
        await getProductByIdService(productId);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [productId]);

  return (
    <div className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
      <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10 ">
        <section className="relative p-7 bg-black/[0.075]  flex items-center justify-center rounded-lg">
          <img
            src={product?.image}
            alt=""
            className="w-full object-contain max-w-xs"
          />
        </section>

        <section className="p-7 px-10 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5 ">
          <div className="flex flex-col gap-2">
            <h1 className=" text-2xl sm:text-4xl font-bold">{product?.name}</h1>
            <p className=" text-gray-600 text-sm sm:text-base">
              {product?.description}
            </p>
            <div className="flex items-center gap-1">
              <StarRating />

              <span className="text-xs text-gray-400">
                ({product?.rating}) Rating
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2  ">
            <h2 className="  text-lg font-semibold">О товаре</h2>
            <ul className="flex gap-5">
              <div>
                <li>
                  <span className="text-gray-500 text-sm">Бренд: </span>
                  {product?.brand}
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Категория: </span>
                  {product?.category}
                </li>
              </div>
              <div>
                <li>
                  <span className="text-gray-500 text-sm">Пол: </span>
                  {product?.gender}
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Вес: </span>
                  {product?.weight}
                </li>
              </div>
            </ul>
          </div>

          <div className="flex gap-2 items-center pb-10 sm:pb-0">
            Price:
            <span className="ms-1 text-xl sm:text-2xl text-amber-600">
              ₹{product?.newPrice}
            </span>
            <span className="text-sm text-gray-600 line-through">
              ₹{product?.price}
            </span>
          </div>

          <div className={`w-full   flex gap-4 items-center   flex-wrap  `}>
            <button
              className="btn-rounded-secondary flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableCart}
              onClick={() => {
                if (!token) {
                  navigate("/login", { state: { from: location.pathname } });
                  notify("warn", "Пожалуйста, войдите, чтобы продолжить");
                } else {
                  if (!product?.inCart) {
                    addProductToCart(product);
                  } else {
                    navigate("/cart");
                  }
                }
              }}
            >
              <HiOutlineShoppingBag />{" "}
              {product?.inCart ? "Перейти в корзину" : "Добавить в корзину"}
            </button>

            <button
              className="btn-rounded-primary rounded-full flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableWish}
              onClick={() => {
                if (!token) {
                  navigate("/login", { state: { from: location.pathname } });
                  notify("warn", "Пожалуйста, войдите, чтобы продолжить");
                } else {
                  if (product?.inWish) {
                    deleteProductFromWishlist(product._id);
                  } else {
                    addProductToWishlist(product);
                  }
                }
              }}
            >
              {product?.inWish ? (
                <>
                  <BsFillBookmarkHeartFill />
                  <span>Убрать из избранного</span>
                </>
              ) : (
                <>
                  {" "}
                  <BsBookmarkHeart /> <span>В избранное</span>
                </>
              )}{" "}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
