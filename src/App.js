import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Consulting from "./pages/Consulting";
import Contactus from "./pages/Contactus";
import Design from "./pages/Design";
import Development from "./pages/Development";
import Marketing from "./pages/Marketing";
import Products from "./pages/Products";
//import Faqs from "./pages/Faqs";
import Signup from "./pages/Signup";
import Faqs from "./pages/Faqs";
//import LoginSignUp from "./components/LoginSignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/contactus" element={<Contactus/>}/>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/faqs" element={<Faqs/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/marketing" element={<Marketing/>}></Route>
          <Route path="/development" element={<Development/>}></Route>
          <Route path="/design" element={<Design/>}></Route>
          <Route path="/consulting" element={<Consulting/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;