import { GiRoundStar } from "react-icons/gi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
import { useWishlistContext } from "../../contexts";
import { useNavigate } from "react-router";

const SingleProduct = ({ product }) => {
  const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
    useWishlistContext();
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col xs:flex-row sm:flex-col  bg-white/[0.5] rounded-lg shadow-md border-2 border-black/[0.05] overflow-hidden
      cursor-pointer
      transition-transform
      hover:scale-[1.02] hover:shadow-lg"
    >
      <div
        className="bg-black/[0.075] h-40 xs:w-1/2 w-full sm:w-full"
        onClick={() => {
          navigate(`/product/${product._id}`);
        }}
      >
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-cover block"
        />
      </div>

      <div className="p-3 flex flex-col justify-between gap-2 mt-2 h-1/2 xs:h-full sm:h-1/2 xs:w-2/3 w-full sm:w-full">
        <div>
          <div className=" flex justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-medium">{product.name}</span>
              <span className="flex items-center gap-1">
                <span>{product.rating}</span>

                <GiRoundStar className=" text-yellow-400 mb-1" />
                <span className="text-xs text-gray-400">Рейтинг</span>
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-amber-600">{product.newPrice} сом</span>
              <span className="text-sm text-gray-600 line-through">
                {product.price} сом
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>
        <div className="w-full pt-2 border-t flex justify-end items-center">
          <button
            disabled={disableWish}
            className="disabled:cursor-not-allowed"
            onClick={() => {
              if (product?.inWish) {
                deleteProductFromWishlist(product._id);
              } else {
                addProductToWishlist(product);
              }
            }}
          >
            {product.inWish ? (
              <BsFillBookmarkHeartFill className="text-xl text-rose-600 hover:shadow-md transition" />
            ) : (
              <BsBookmarkHeart className="text-xl hover:text-rose-600 hover:shadow-md transition" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
