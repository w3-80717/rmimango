import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { navItems } from "./NavItems";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [click, setClick] = useState(false);
  const location = useLocation();
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const logout = () => {
    localStorage.removeItem("token");
    document.location = "/";
  };

  const checkAdminRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.isAdmin;
    }
    return false;
  };

  const isAdmin = checkAdminRole();

  return (
    <>
      <nav className="navbar">
        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src="/images/logo2.jpg" alt="" />
          <span>RMi</span>
        </Link>
        <ul className={click ? "nav-items active" : "nav-items"}>
          {navItems.map((item) => {
            return (
              <li key={item.id} className={item.cName}>
                <Link className={location.pathname===item.path?"nav-item-current":"" } to={item.path} onClick={closeMobileMenu}>
                  {item.title}
                </Link>
              </li>
            );
          })}

          {!isAdmin && (
            <li className="nav-item nav-right">
              <Link className={location.pathname==="/cart"?"nav-item-current":"" } to="/cart" onClick={closeMobileMenu}>
                <FaShoppingCart />
              </Link>
            </li>
          )}

          {isAdmin && (
            <li className="nav-item">
              <Link className={location.pathname==="/admin"?"nav-item-current":"" } to="/admin" onClick={closeMobileMenu}>Admin</Link>
            </li>
          )}

          <li className={"nav-item" + (isAdmin ? " nav-right" : "")}>
            {localStorage.getItem("token") ? (
              <Link onClick={logout}>Log out</Link>
            ) : (
              <Link className={location.pathname==="/login"?"nav-item-current":"" } to="login" onClick={closeMobileMenu}>Login</Link>
            )}
          </li>
        </ul>
      </nav>
        <nav className="nav-padding"></nav>
    </>
  );
}

export default Navbar;
