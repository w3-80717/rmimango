import React, {  } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart} from 'react-icons/fa'
import "./Navbar.css";
import { navItems } from "./NavItems";
import Button from "./Button";


function Navbar() {
 return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
        <span>RMI Mangoes</span>
        <img src="/images/logo.jpg" alt=""/>          
        </Link>
        <ul className="nav-items">
          {navItems.map((item) => {
          
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        
         <li className="nav-item">
            <Link to="/cart">
              <FaShoppingCart/>
            </Link>
          </li>
        </ul>
        
        <Button />
      </nav>
    </>
  );
}

export default Navbar;