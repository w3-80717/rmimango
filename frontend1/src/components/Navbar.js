import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import { navItems } from "./NavItems";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    document.location = "/";
  };
  // Function to check if the user is an admin
  const checkAdminRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.isAdmin; // Assuming your token has an isAdmin property
    }
    return false;
  };

  const isAdmin = checkAdminRole();

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo2.jpg" alt="" />
          <span>RMi Mangoes</span>
        </Link>
        <ul className="nav-items">
          {navItems.map((item) => {
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}

          {!isAdmin && (
            <li className="nav-item nav-right">
              <Link to="/cart">
                <FaShoppingCart />
              </Link>
            </li>
          )}

          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li className={"nav-item"+(isAdmin?" nav-right":"")}>
            {
              localStorage.getItem('token') ?
              <Link onClick={logout}>Log out</Link>
              :
              <Link to="login">Login</Link>}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
