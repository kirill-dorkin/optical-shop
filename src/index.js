import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import App from "./App";
import { makeServer } from "./server";
import {
  AuthContextProvider,
  CartContextProvider,
  ProductsContextProvider,
  WishlistContextProvider,
  AdminContextProvider,
} from "./contexts";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <AuthContextProvider>
        <ProductsContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <Router>
                <App />
              </Router>
            </WishlistContextProvider>
          </CartContextProvider>
        </ProductsContextProvider>
      </AuthContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
);
