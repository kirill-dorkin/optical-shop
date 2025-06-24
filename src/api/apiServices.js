import axios from "axios";
import {
  CART_URL,
  PRODUCTS_URL,
  LOGIN_URL,
  SIGNUP_URL,
  WISHLIST_URL,
  CATEGORIES_URL,
  ADMIN_LOGIN_URL,
  ADMIN_PRODUCTS_URL,
  ADMIN_CATEGORIES_URL,
} from "./apiUrls";

export const loginService = (email, password) =>
  axios.post(LOGIN_URL, { email, password });

export const signupService = (username, email, password) =>
  axios.post(SIGNUP_URL, { username, email, password });

export const getAllProductsService = () => axios.get(PRODUCTS_URL);

export const getProductByIdService = (productId) =>
  axios.get(`${PRODUCTS_URL}/${productId}`);

export const getCartItemsService = (token) =>
  axios.get(CART_URL, {
    headers: {
      authorization: token,
    },
  });

export const postAddProductToCartService = (product, token) =>
  axios.post(
    CART_URL,
    { product },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const postUpdateProductQtyCartService = (productId, type, token) =>
  axios.post(
    `${CART_URL}/${productId}`,
    {
      action: {
        type,
      },
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteProductFromCartService = (productId, token) =>
  axios.delete(`${CART_URL}/${productId}`, {
    headers: {
      authorization: token,
    },
  });

export const getWishlistItemsService = (token) =>
  axios.get(WISHLIST_URL, {
    headers: {
      authorization: token,
    },
  });

export const postAddProductToWishlistService = (product, token) =>
  axios.post(
    WISHLIST_URL,
    { product },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteProductFromWishlistService = (productId, token) =>
  axios.delete(`${WISHLIST_URL}/${productId}`, {
    headers: {
      authorization: token,
    },
  });

export const getAllCategoriesService = () => axios.get(CATEGORIES_URL);

// admin services
export const adminLoginService = (username, password) =>
  axios.post(ADMIN_LOGIN_URL, { username, password });

export const adminAddProductService = (product, token) =>
  axios.post(ADMIN_PRODUCTS_URL, product, {
    headers: { authorization: token },
  });

export const adminUpdateProductService = (productId, product, token) =>
  axios.put(`${ADMIN_PRODUCTS_URL}/${productId}`, product, {
    headers: { authorization: token },
  });

export const adminDeleteProductService = (productId, token) =>
  axios.delete(`${ADMIN_PRODUCTS_URL}/${productId}`, {
    headers: { authorization: token },
  });

export const adminAddCategoryService = (category, token) =>
  axios.post(ADMIN_CATEGORIES_URL, category, {
    headers: { authorization: token },
  });

export const adminUpdateCategoryService = (categoryId, category, token) =>
  axios.put(`${ADMIN_CATEGORIES_URL}/${categoryId}`, category, {
    headers: { authorization: token },
  });

export const adminDeleteCategoryService = (categoryId, token) =>
  axios.delete(`${ADMIN_CATEGORIES_URL}/${categoryId}`, {
    headers: { authorization: token },
  });
