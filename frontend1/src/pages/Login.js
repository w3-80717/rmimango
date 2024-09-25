import React, { useState } from 'react';
import './Login.css';
import * as authService from '../service/authService';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true); // Default to login state
    const navigate = useNavigate();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passwordTest = (password) => 
        typeof password === 'string' &&
        password.length >= 8 &&
        /[0-9]/.test(password) &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[!@#$%^&*]/.test(password);

    const handleRegister = () => {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!fullName || !/[a-zA-Z]+/.test(fullName)) {
            alert('Full name is invalid!');
            return;
        }
        if (!email || !emailRegex.test(email)) {
            alert('Email is in an incorrect format!');
            return;
        }
        if (!passwordTest(password)) {
            alert('Password should be at least 8 characters, with numbers, capital and small letters, and special characters!');
            return;
        }

        // Call the registration service
        authService.registerUser({ fullName, email, password })
            .then(() => {
                alert("Created Successfully. Please login using the credentials");
                setIsLogin(true); // Switch to login view after successful registration
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleLogin = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Call the login service
        authService.loginUser({ email, password })
            .then((data) => {
                localStorage.setItem('token', data.token);
                navigate("/"); // Navigate to the home page
            })
            .catch(err => {
                alert(err.message);
            });
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='login-header'>
                    <div className='login-title'>{isLogin ? "Login" : "Sign Up"}</div>
                    <div className='underline'></div>
                </div>
                <div className='login-inputs'>
                    {!isLogin && (
                        <div className='login-input'>
                            <img src='/images/person.png' alt="Person Icon" />
                            <input type='text' id='fullName' placeholder='Full Name' />
                        </div>
                    )}
                    <div className='login-input'>
                        <img src='/images/email.png' alt="Email Icon" />
                        <input type='email' id='email' placeholder='Email Id' />
                    </div>
                    <div className='login-input'>
                        <img src='/images/password.png' alt="Password Icon" />
                        <input type='password' id='password' placeholder='Password' />
                    </div>
                </div>
                {isLogin && (
                    <div className="login-forgot-password">
                        Lost Password? <Link to='/forgotpassword'>Click Here</Link>
                    </div>
                )}
                <div className="login-submit-container">
                    <button
                        className="login-submit"
                        onClick={isLogin ? handleLogin : handleRegister}
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                    <div
                        className="login-submit login-submit-gray"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "New? Sign Up" : "Already have an account? Login"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
