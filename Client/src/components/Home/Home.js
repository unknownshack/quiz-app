import React from 'react';

//import './Home.css';
import logo from './updated-aiq-logo.png';
import Register from '../Register/Register';
import './Home.css';

//Home page
function Home(props) {

    return (

        <div className='banner'>
            <img src={logo} className='aiqLogo' alt='AIQ Logo' />
            <div className='buttons'>
                <button type="button" id="registerBtn" className="registerbtn btn-primary btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Register your interest
                </button>
                <Register />
            </div>
        </div>

    )

}

export default Home;