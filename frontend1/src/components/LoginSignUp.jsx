import React, { useState } from 'react'
import './LoginSignUp.css'
import * as authService from '../service/authService';
import { Link, useNavigate } from 'react-router-dom';

const LoginSignUp = () => {

  // hooks
  const [isLogin, setIsLogin] = useState(false);
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
    authService.registerUser({ fullName, email, password }).then((data) => {
      alert("Created Successfully. Please login using the credentials");
    }).catch((err) => {
      alert(err.message);
    })
  };
  const handleLogin = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password);
    authService.loginUser({ email, password }).then((data) => {
      localStorage.setItem('token', data.token);
      const loginTime = new Date().getTime(); // Get current timestamp
      localStorage.setItem('loginTime', loginTime); // Store login time
      document.location = "/";


    }).catch(err => {
      alert(err.message);
    });
  };



  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{isLogin ? "Login" : "Sign Up"}</div>
        <div className='underline'></div>
      </div>
      {
        isLogin ? <>
          <div className='inputs'>
            <div></div>
            <div className='input'>
              <img src='/images/email.png' alt="" />
              <input type='email' id='email' placeholder='Email Id' />
            </div>
            <div className='input'>
              <img src='/images/password.png' alt="" />
              <input type='password' id='password' placeholder='Password' />
            </div>
          </div>
          <div className="forget-password">Lost Password? <Link to='/forgotpassword'>Click Here</Link></div>
          <div className="submit-container">
            <button className={"submit"} onClick={() => { handleLogin() }}>Login</button>
            <div className={"submit gray"} onClick={() => { setIsLogin(false) }}>New? Sign Up</div>
          </div>
        </>


          :
          <>
            <div className='inputs'>

              <div className='input'>
                <img src='/images/person.png' alt="" />
                <input type='text' id='fullName' placeholder='Full Name' />
              </div>
              <div className='input'>
                <img src='/images/email.png' alt="" />
                <input type='email' id='email' placeholder='Email Id' />
              </div>
              <div className='input'>
                <img src='/images/password.png' alt="" />
                <input type='password' id='password' placeholder='Password' />
              </div>
            </div>

            <div></div>
            <div className="submit-container">
              <button className={"submit"} onClick={() => { handleRegister() }}>Sign Up</button>
              <div className={"submit gray"} onClick={() => { setIsLogin(true) }}>Have account? Login</div>
            </div>
          </>

      }

    </div>
  )
}

export default LoginSignUp
