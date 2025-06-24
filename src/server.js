import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  addItemToCartHandler,
  getCartItemsHandler,
  removeItemFromCartHandler,
  updateCartItemHandler,
} from "./backend/controllers/CartController";
import {
  getAllCategoriesHandler,
  getCategoryHandler,
} from "./backend/controllers/CategoryController";
import { getAllBrandsHandler } from "./backend/controllers/BrandController";
import {
  getAllProductsHandler,
  getProductHandler,
} from "./backend/controllers/ProductController";
import {
  addItemToWishlistHandler,
  getWishlistItemsHandler,
  removeItemFromWishlistHandler,
} from "./backend/controllers/WishlistController";
import {
  adminLoginHandler,
  addProductHandler,
  updateProductHandler,
  deleteProductHandler,
  addCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  addBrandHandler,
  updateBrandHandler,
  deleteBrandHandler,
} from "./backend/controllers/AdminController";
import { categories } from "./backend/db/categories";
import { products } from "./backend/db/products";
import { users } from "./backend/db/users";
import { brands } from "./backend/db/brands";
import { persistDb } from "./backend/utils/persistDb";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      product: Model,
      category: Model,
      brand: Model,
      user: Model,
      cart: Model,
      wishlist: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      // disballing console logs from Mirage
      server.logging = false;

      const stored = localStorage.getItem("mirageDB");

      if (stored) {
        const { products: storedProducts = [], categories: storedCategories = [], brands: storedBrands = [] } = JSON.parse(stored);
        storedProducts.forEach((item) => server.create("product", { ...item }));
        storedCategories.forEach((item) => server.create("category", { ...item }));
        storedBrands.forEach((item) => server.create("brand", { ...item }));
      } else {
        products.forEach((item) => {
          server.create("product", { ...item });
        });

        categories.forEach((item) => server.create("category", { ...item }));
        brands.forEach((item) => server.create("brand", { ...item }));
        persistDb(server);
      }

      users.forEach((item) =>
        server.create("user", { ...item, cart: [], wishlist: [] })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // products routes (public)
      this.get("/products", getAllProductsHandler.bind(this));
      this.get("/products/:productId", getProductHandler.bind(this));

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:categoryId", getCategoryHandler.bind(this));

      // brands routes (public)
      this.get("/brands", getAllBrandsHandler.bind(this));

      // cart routes (private)
      this.get("/user/cart", getCartItemsHandler.bind(this));
      this.post("/user/cart", addItemToCartHandler.bind(this));
      this.post("/user/cart/:productId", updateCartItemHandler.bind(this));
      this.delete(
        "/user/cart/:productId",
        removeItemFromCartHandler.bind(this)
      );

      // wishlist routes (private)
      this.get("/user/wishlist", getWishlistItemsHandler.bind(this));
      this.post("/user/wishlist", addItemToWishlistHandler.bind(this));
      this.delete(
        "/user/wishlist/:productId",
        removeItemFromWishlistHandler.bind(this)
      );

      // admin routes
      this.post("/admin/login", adminLoginHandler.bind(this));
      this.post("/admin/products", addProductHandler.bind(this));
      this.put("/admin/products/:productId", updateProductHandler.bind(this));
      this.delete(
        "/admin/products/:productId",
        deleteProductHandler.bind(this)
      );
      this.post("/admin/categories", addCategoryHandler.bind(this));
      this.put(
        "/admin/categories/:categoryId",
        updateCategoryHandler.bind(this)
      );
      this.delete(
        "/admin/categories/:categoryId",
        deleteCategoryHandler.bind(this)
      );

      this.post("/admin/brands", addBrandHandler.bind(this));
      this.put(
        "/admin/brands/:brandId",
        updateBrandHandler.bind(this)
      );
      this.delete(
        "/admin/brands/:brandId",
        deleteBrandHandler.bind(this)
      );
    },
  });
}
