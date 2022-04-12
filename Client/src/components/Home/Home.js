import React from 'react';
import logo from './mettel-logo.png';
import Register from '../Register/Register';
import './Home.css';

//Home page
function Home(props) {

    return (

        <div className='banner'>
            <img src={logo} className='mettellogo' alt='mettle Logo' />
            <div className='buttons'>
                <button type="button" id="registerBtn" className="btn registerbtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Register your interest
                </button>
                <Register />
            </div>
        </div>

    )

}

export default Home;