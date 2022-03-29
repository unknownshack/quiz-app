/**
 * login page
 */
import React from 'react';
import { useState, useEffect } from "react";
import logo from '../Home/mettel-logo.png';
import './Login.css';
import Register from '../Register/Register';
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(props) {

    const [Email, setEmail] = useState("");
    const [Mobile, setMobile] = useState("");
    const [loginMessage, setloginMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Login Function
    const callLogin = (e) => {

        // Send post request to server
        fetch("http://localhost:8000/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Email: Email,
                Mobile: Mobile
            })
        })

            .then(res => res.json())
            .then(data => {
                if (data.message) {

                    setloginMessage(data);

                } else {
                    console.log(data[0]);
                    setloginMessage({ message: "login successfully" });

                    //redux function - Set globle variable user to our fetched user
                    dispatch(
                        login({
                            uid:data[0]._id,
                            name: data[0].name,
                            mobile: data[0].mobile,
                            email:data[0].Email,
                            loggedIn: "true",
                        })
                    );

                    //using localstorage to persist login after refresh
                    localStorage.setItem('loginData',
                    JSON.stringify({
                        uid:data[0]._id,
                        name: data[0].name,
                        mobile: data[0].mobile,
                        email:data[0].Email,
                        loggedIn: "true",
                    }));

                    // jump to myaccount page
                    navigate('/myaccount');

                }

            });

    }
    return (

        <div className='banner'>
            <img src={logo} className='mettellogo' alt='mettel Logo' />

            <div className='login-wrap'>
                <h3>LOGIN</h3>
                <div className='login-items'>
                    <input onChange={(e) => setEmail(e.target.value)} value={Email} type='email' name='email' id='email' placeholder='Email' />
                </div>
                <div className='login-items'>
                    <input onChange={(e) => setMobile(e.target.value)} value={Mobile} type='number' name='mobile' id='mobile' placeholder='Mobile' />
                </div>

                <div className='login-items'>
                    <button onClick={(e) => callLogin(e)} type="button" id="registerBtn" className='buttons btn-primary btn'>
                        Login
                    </button>
                </div>
                
                <div className='login-items'>
                    <p>login message:{loginMessage.message}</p>
                </div>


            </div>

            <div className='login-buttons'>
                <Register />

            </div>


        </div>
    )

}
export default Login;