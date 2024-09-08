import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
const logout = ()=>{
  localStorage.removeItem('token');
  document.location="/";
}

  return (
    localStorage.getItem('token')?
    <button className="btn logout" onClick={logout}>Log out</button>
    :
    <Link to="signup">
      <button className="btn">Sign Up</button>
    </Link>
  );
}

export default Button;