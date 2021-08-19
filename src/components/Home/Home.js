import React from 'react';

import './Home.css';
import logo from './updated-aiq-logo.png';
import Register from '../Register/Register';

class Home extends React.Component {
    render() {
        return (
            <div className='banner'>
                <img src={logo} className='aiqLogo' alt='AIQ Logo' />
                <div className='buttons'>
                    <Register />
                </div>
            </div>
        )
    }
}

export default Home;