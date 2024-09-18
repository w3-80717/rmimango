import React from 'react';
import { FaBox, FaPhoneAlt } from 'react-icons/fa';
import { FaCity, FaLocationPin, FaMapLocation } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import * as authService from '../service/authService';
import './LoginSignUp.css';
import './Contact.css'

const Contact = () => {

  // hooks
  const navigate = useNavigate();

  // authentication logics:
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegex = /[0-9]{10}/;
  const pincodeRegex = /[0-9]{6}/;
  const handleContact = () => {
    const fullName = document.getElementById('fullName').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pincode = document.getElementById('pincode').value;
    const state = document.getElementById('state').value;
    const messagebox = document.getElementById('messagebox').value;

    console.log(fullName, email, phone, pincode, state);
    if (!messagebox || !/[a-zA-Z]+/.test(messagebox)) {
      alert('Write something to us 😃!');
      return;
    }
    if (!fullName || !/[a-zA-Z]+/.test(fullName)) {
      alert('Full name is invalid!');
      return;
    }
    if (!city || !/[a-zA-Z]+/.test(city)) {
      alert('City name is invalid!');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert('Email incorrect Format!');
      return;
    }
    if (!phone || !phoneRegex.test(phone)) {
      alert("Invalid Phone Number! Phone number should be 10 digits!");
      return;
    }

    if (!pincode || !pincodeRegex.test(pincode)) {
      alert("Invalid Pincode Number! Pincode number should be 6 digits!");
      return;
    }
    if (!state || !/[a-zA-Z]+/.test(state)) {
      alert('State name is invalid!');
      return;
    }
    
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Contact Form</div>
        <div className='underline'></div>

      </div>
      <div>
        <p className='containers'><strong>  Phone no:</strong>   +91-22-48962640<br />

          <strong>Email ID:</strong> support@blobcity.com<br />

          <strong>Address: </strong>NIBR Corporate Park 1Aerocity, Andheri - Kurla Rd, Safed Pool, Shivaji Nagar, Jarimari, Saki Naka, Mumbai, Maharashtra 400072.<br />

          <strong>Headquarters: </strong> WeWork, Enam Sambhav, C-20, G Block Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051.</p>
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
              <input type='text' minLength={10} maxLength={10} id='phone' placeholder='Phone Number' />
            </div>

            <div className='input'>
              <FaCity className='input-icon' size={20} />
              <input type='text' id='city' placeholder='City' />
            </div>
            <div className='input'>
              <FaLocationPin className='input-icon' size={20} />
              <input type='text' minLength={6} maxLength={6} id='pincode' placeholder='Pincode' />
            </div>
            <div className='input'>
              <FaMapLocation className='input-icon' size={20} />
              <input type='text' id='state' placeholder='State' />
            </div>
            <div className='input description-box'>
              <textarea id='messagebox' placeholder='Write Something to us!'></textarea>
            </div>
          </div>
          <div className="submit-container">
            <button className={"submit"} onClick={() => { handleContact() }}>Contact</button>
          </div>
        </>
      }

    </div>
  )
}

export default Contact