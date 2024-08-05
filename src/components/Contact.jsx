import React from 'react';
import { FaBox, FaPhoneAlt } from 'react-icons/fa';
import { FaCity, FaLocationPin, FaMapLocation } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import * as authService from '../service/authService';
import './LoginSignUp.css';
import './Contact.css'

const LoginSignUp = () => {

  // hooks
  const navigate = useNavigate();

  // authentication logics:
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

    authService.registerUser({ fullName, email, password }).then((data) => {
      alert("Created Successfully. Please login using the credentials");
    }).catch((err) => {
      alert(err.message);
    })
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Contact Form</div>
        <div className='underline'></div>
      </div>
      {
        <>
          <div className='inputs'>
            <div></div>
            <div className='input'>
              <img className='input-icon' src='/images/person.png' alt="" />
              <input type='text' id='fullName' placeholder='Full Name' />
            </div>
            <div className='input'>
              <img className='input-icon' src='/images/email.png' alt="" />
              <input type='email' id='email' placeholder='Email' />
            </div>

            <div className='input'>
              <FaPhoneAlt className='input-icon' size={20} />
              <input type='number' minLength={10} maxLength={10} id='phone' placeholder='Phone Number' />
            </div>

            <div className='input'>
              <FaCity className='input-icon' size={20} />
              <input type='text' id='city' placeholder='City' />
            </div>
            <div className='input'>
              <FaLocationPin className='input-icon' size={20} />
              <input type='number' minLength={6} maxLength={6} id='pincode' placeholder='Pincode' />
            </div>
            <div className='input'>
              <FaMapLocation className='input-icon' size={20} />
              <input type='text' id='state' placeholder='State' />
            </div>
            <div className='input description-box'>
              <textarea id='description' placeholder='Write Something to us!'></textarea>
            </div>
          </div>
          <div className="submit-container">
            <button className={"submit"} onClick={() => { handleRegister() }}>Contact</button>
          </div>
        </>
      }

    </div>
  )
}

export default LoginSignUp
