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
    cartService.getCartItems().then(setCartItems).catch(console.error);
  }, []);
  const handleAddProduct = (product) => {
    let pr = 
    cartService
      .addItemToCart(product.id, 1);
      console.log(pr)

      pr.then(() => { console.log("getting cart"); return cartService.getCartItems(); })
      .then(setCartItems)
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  };


  //const handleRemoveProduct = (product) => {};
  const handleRemoveProduct = (product) => {
    cartService
      .removeItemFromCart(product.id)
      .then(() => cartService.getCartItems())
      .then(setCartItems)
      .catch(console.error);
  };
  
  const handleUpdateQuantity = (productId, quantity) => {
    cartService
      .updateCartQuantity(productId, quantity)
      .then(() => cartService.getCartItems())
      .then(setCartItems)
      .catch(console.error);
  };
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
