import React, { useEffect, useState } from "react";
import data from "./components/data/Data";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import * as cartService from "./service/cartService";
import Contactus from "./pages/Contactus";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Faqs from "./pages/Faqs";
//import LoginSignUp from "./components/LoginSignUp";

function App() {
  // const productItems=
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    cartService
      .getCartItems()
      .then((data) => {
        setCartItems(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Invalid token") {
          alert("You have been logged out.");
          localStorage.removeItem("token");
          document.location = "/";
        }
      });
  }, []);

  const handleAddProduct = (product) => {
    cartService
      .addItemToCart(product.id, 1)
      .then((data) => {
        alert("added successfully!");
        setCartItems(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };

  const handleRemoveProduct = (product) => {};
  const handleCartClearance = () => {
    setCartItems([]);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <article className="main-content">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route
              path="/products"
              element={
                <Products
                  productItems={data.productItem}
                  handleAddProduct={handleAddProduct}
                />
              }
            ></Route>
            <Route path="/faqs" element={<Faqs />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  handleCartClearance={handleCartClearance}
                />
              }
            ></Route>
          </Routes>
        </article>
      </BrowserRouter>
    </>
  );
}

export default App;
