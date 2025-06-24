import { Response } from "miragejs";

export const getAllBrandsHandler = function () {
  try {
    return new Response(200, {}, { brands: this.db.brands });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const addBrandHandler = function (schema, request) {
  try {
    const newBrand = JSON.parse(request.requestBody);
    const createdBrand = schema.brands.create(newBrand);
    return new Response(201, {}, { brand: createdBrand.attrs });
  } catch (e) {
    return new Response(500, {}, { error: e.message });
  }
};

export const updateBrandHandler = function (schema, request) {
  try {
    const brandId = request.params.brandId;
    const updatedAttrs = JSON.parse(request.requestBody);
    const brand = schema.brands.findBy({ _id: brandId });
    if (!brand) {
      return new Response(404, {}, { errors: ["Brand not found"] });
    }
    brand.update(updatedAttrs);
    return new Response(200, {}, { brand: brand.attrs });
  } catch (e) {
    return new Response(500, {}, { error: e.message });
  }
};

export const deleteBrandHandler = function (schema, request) {
  try {
    const brandId = request.params.brandId;
    const brand = schema.brands.findBy({ _id: brandId });
    if (!brand) {
      return new Response(404, {}, { errors: ["Brand not found"] });
    }
    brand.destroy();
    return new Response(200, {}, { message: "Brand deleted" });
  } catch (e) {
    return new Response(500, {}, { error: e.message });
  }
};
