import { Response } from "miragejs";
import jwt_decode from "jwt-decode";
const sign = require("jwt-encode");

const isAdminAuthenticated = (request) => {
  const encodedToken = request.requestHeaders.authorization;
  try {
    const decodedToken = jwt_decode(
      encodedToken,
      process.env.REACT_APP_JWT_SECRET
    );
    return decodedToken?.username === "admin";
  } catch (e) {
    return false;
  }
};

export const adminLoginHandler = function (schema, request) {
  const { username, password } = JSON.parse(request.requestBody);
  if (username === "admin" && password === "admin123#") {
    const token = sign({ username }, process.env.REACT_APP_JWT_SECRET);
    return new Response(200, {}, { token });
  }
  return new Response(401, {}, { errors: ["Invalid admin credentials"] });
};

export const addProductHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const newProduct = JSON.parse(request.requestBody);
  const createdProduct = schema.products.create(newProduct);
  return new Response(201, {}, { product: createdProduct.attrs });
};

export const updateProductHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const productId = request.params.productId;
  const updatedAttrs = JSON.parse(request.requestBody);
  const product = schema.products.findBy({ _id: productId });
  if (!product) {
    return new Response(404, {}, { errors: ["Product not found"] });
  }
  product.update(updatedAttrs);
  return new Response(200, {}, { product: product.attrs });
};

export const deleteProductHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const productId = request.params.productId;
  const product = schema.products.findBy({ _id: productId });
  if (!product) {
    return new Response(404, {}, { errors: ["Product not found"] });
  }
  product.destroy();
  return new Response(200, {}, { message: "Product deleted" });
};

export const addCategoryHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const newCategory = JSON.parse(request.requestBody);
  const createdCategory = schema.categories.create(newCategory);
  return new Response(201, {}, { category: createdCategory.attrs });
};

export const updateCategoryHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const categoryId = request.params.categoryId;
  const updatedAttrs = JSON.parse(request.requestBody);
  const category = schema.categories.findBy({ _id: categoryId });
  if (!category) {
    return new Response(404, {}, { errors: ["Category not found"] });
  }
  category.update(updatedAttrs);
  return new Response(200, {}, { category: category.attrs });
};

export const deleteCategoryHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const categoryId = request.params.categoryId;
  const category = schema.categories.findBy({ _id: categoryId });
  if (!category) {
    return new Response(404, {}, { errors: ["Category not found"] });
  }
  category.destroy();
  return new Response(200, {}, { message: "Category deleted" });
};

export const addBrandHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const newBrand = JSON.parse(request.requestBody);
  const createdBrand = schema.brands.create(newBrand);
  return new Response(201, {}, { brand: createdBrand.attrs });
};

export const updateBrandHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const brandId = request.params.brandId;
  const updatedAttrs = JSON.parse(request.requestBody);
  const brand = schema.brands.findBy({ _id: brandId });
  if (!brand) {
    return new Response(404, {}, { errors: ["Brand not found"] });
  }
  brand.update(updatedAttrs);
  return new Response(200, {}, { brand: brand.attrs });
};

export const deleteBrandHandler = function (schema, request) {
  if (!isAdminAuthenticated(request)) {
    return new Response(401, {}, { errors: ["Unauthorized"] });
  }
  const brandId = request.params.brandId;
  const brand = schema.brands.findBy({ _id: brandId });
  if (!brand) {
    return new Response(404, {}, { errors: ["Brand not found"] });
  }
  brand.destroy();
  return new Response(200, {}, { message: "Brand deleted" });
};
