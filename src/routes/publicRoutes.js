import Mockman from "mockman-js";

import { ProductDetails, ProductListing, Wishlist, Location } from "../pages";

const authRoutes = [];

const contentRoutes = [
  {
    path: "/products",
    element: <ProductListing />,
  },

  {
    path: "/wishlist",
    element: <Wishlist />,
  },

  {
    path: "/location",
    element: <Location />,
  },

  {
    path: "/product/:productId",
    element: <ProductDetails />,
  },

  {
    path: "/mockman",
    element: <Mockman />,
  },
];
export { authRoutes, contentRoutes };
