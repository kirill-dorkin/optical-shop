import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, wishlistReducer } from "../../reducers/wishlistReducer";
import { actionTypes } from "../../utils/actionTypes";
import { useProductsContext } from "..";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const { updateInCartOrInWish } = useProductsContext();
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [disableWish, setDisableWish] = useState(false);
  const [state, dispatch] = useReducer(wishlistReducer, {
    wishlist: localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : initialState.wishlist,
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const addProductToWishlist = (product) => {
    setDisableWish(true);
    dispatch({
      type: actionTypes.ADD_PRODUCT_TO_WISHLIST,
      payload: [{ ...product, inWish: true }, ...state.wishlist],
    });
    updateInCartOrInWish(product._id, "inWish", true);
    setDisableWish(false);
  };

  const deleteProductFromWishlist = (productId) => {
    setDisableWish(true);
    dispatch({
      type: actionTypes.DELETE_PRODUCTS_FROM_WISHLIST,
      payload: state.wishlist.filter(({ _id }) => _id !== productId),
    });
    updateInCartOrInWish(productId, "inWish", false);
    setDisableWish(false);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.wishlist,
        disableWish,
        loadingWishlist,
        addProductToWishlist,
        deleteProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
