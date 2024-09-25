import React, { useEffect, useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import * as cartService from "./service/cartService";
import ContactUs from "./pages/ContactUs";

import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Faqs from "./pages/Faqs";
import Admin from "./pages/Admin";
//import LoginSignUp from "./components/LoginSignUp";

function App() {
  // const productItems=
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    cartService
      .getCartItems()
      .then(setCartItems)
      .catch((err) => {
        console.log(err);
        if (err.message === "Invalid token") {
          alert("You have been logged out.");
          localStorage.removeItem("token");
          document.location = "/";
        }
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");
    const currentTime = new Date().getTime(); // Current timestamp
    // If token and loginTime exist, check if 10 hours have passed
    if (token && loginTime) {
      const timePassed = currentTime - parseInt(loginTime); // Time passed since login (in milliseconds)

      if (timePassed > 10 * 60 * 60 * 1000) {
        // 10 hours = 10 * 60 * 60 * 1000 milliseconds
        // More than 10 hours have passed, log out the user
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
        window.location.href = "/signup"; // Redirect to login page
      }
    }
  });
  const handleAddProduct = (product,quantity=1) => {
    return cartService.addItemToCart(product.id, quantity)
      .then(() =>cartService.getCartItems())
      .then(setCartItems)
      .catch(console.error);
  };

  //const handleRemoveProduct = (product) => {};
  const handleRemoveProduct = (product) => {
   return cartService
      .removeItemFromCart(product.id)
      .then(() => cartService.getCartItems())
      .then(setCartItems)
      .catch(console.error);
  };

  const handleUpdateQuantity = (productId, quantity) => {
   return cartService
    .updateCartQuantity(productId, quantity)
      .then(() => cartService.getCartItems())
      .then(setCartItems)
      .catch(console.error);
  };
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <article className="main-content">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Home
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleAddProduct={handleAddProduct}
                  cartItems={cartItems}
                />
              }
            />
            <Route path="/contactus" element={<ContactUs />} />
            <Route
              path="/products"
              element={
                <Products
                  handleAddProduct={handleAddProduct}
                  handleUpdateQuantity={handleUpdateQuantity}
                  cartItems={cartItems}
                />
              }
            ></Route>
            <Route path="/faqs" element={<Faqs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin" element={<Admin />} /> {/* Admin route */}
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  handleAddProduct={handleAddProduct}
                  handleRemoveProduct={handleRemoveProduct}
                  handleUpdateQuantity={handleUpdateQuantity}
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
