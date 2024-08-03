import React, { useState } from 'react'
import './LoginSignUp.css'
import * as authService from '../service/authService';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
  
  // hooks
  const [action, setAction] = useState("Login");
  const navigate = useNavigate();
  
  // authentication logics:
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /**
   * 
   * @param {string} password 
   * @returns {boolean}
   */
  const passwordTest = (password) => typeof (password) === 'string' && password.length >= 8 && /[0-9]/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[!@#$%^&*]/.test(password);

  const handleRegister = () => {
    const fullName = document.getElementById('fullName').value;

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(fullName, email, password);
    if (!fullName || !/[a-zA-Z]+/.test(fullName)) {
      alert('Full name is invalid!');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert('Email incorrect Format!');
      return;
    }
    if (!passwordTest(password)) {
      alert('Password should be atleast 8 characters, with numbers, capital and small letters and special characters!');
      return;
    }
     authService.registerUser({fullName,email,password}).then((data)=>{
      alert("Created Successfully. Please login using the credentials");
     }).catch((err)=>{
      alert(err.message);
     })
  };
  const handleLogin = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password);
    authService.loginUser({email,password}).then((data)=>{
      localStorage.setItem('token',data.token);
      document.location="/";


    }).catch(err=>{
      alert(err.message);
    });
  };
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === "Login" ? <div></div> :
          <div className='input'>
            <img src='/images/person.png' alt="" />
            <input type='text' id='fullName' placeholder='Full Name' />
          </div>
    
        }


        <div className='input'>
          <img src='/images/email.png' alt="" />
          <input type='email' id='email' placeholder='Email Id' />
        </div>

        <div className='input'>
          <img src='/images/password.png' alt="" />
          <input type='password' id='password' placeholder='Password' />
        </div>
      </div>
      {action === "Sign Up" ? <div></div> : <div className="forget-password">Lost Password? <span>Click Heree</span></div>
      }
      <div className="submit-container">
        <button className={action === "Login" ? "submit gray" : "submit"} onClick={() => { action === "Sign Up" ? handleRegister() : setAction("Sign Up") }}>Sign Up</button>
        <button className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { action === "Login" ? handleLogin() : setAction("Login") }}>Login</button>
      </div>
    </div>
  )
}

export default LoginSignUp
