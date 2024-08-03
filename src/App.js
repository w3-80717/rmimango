import React, { useState } from "react";
import data from "./components/data/Data"
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Contactus from "./pages/Contactus";

import Products from "./pages/Products";
import Cart from "./pages/Cart"
import Signup from "./pages/Signup";
import Faqs from "./pages/Faqs";
//import LoginSignUp from "./components/LoginSignUp";

function App() {
  // const productItems= 
  const [cartItems, setCartItems] = useState([]);

  const handleAddProduct = (product) => {
    console.log("Helloo add", product)
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity + 1 }
            : item
        ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  const handleRemoveProduct = (product) => {
    const ProductExist = cartItems.find((item) => item.id === product.id);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
            : item
        )
      );
    }
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
            <Route path="/products" element={<Products productItems={data.productItem} handleAddProduct={handleAddProduct} />} ></Route>
            <Route path="/faqs" element={<Faqs />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/cart" element={<Cart cartItems={cartItems}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
              handleCartClearance={handleCartClearance} />}></Route>
          </Routes>
        </article>
      </BrowserRouter>
    </>
  );
}

export default App;