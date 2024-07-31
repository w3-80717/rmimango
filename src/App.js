import React, {useState} from "react";
import data  from "./components/data/Data"
import "./App.css";

import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import Contactus from "./pages/Contactus";

import Products from "./pages/Products";
import Cart from "./pages/Cart"
import Signup from "./pages/Signup";
import Faqs from "./pages/Faqs";
//import LoginSignUp from "./components/LoginSignUp";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/contactus" element={<Contactus/>}/>
          <Route path="/products" element={<Products productItems={data.productItem} /> } ></Route>          <Route path="/faqs" element={<Faqs/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
         
          <Route path="/cart" element={<Cart cartItems={cartItems} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;