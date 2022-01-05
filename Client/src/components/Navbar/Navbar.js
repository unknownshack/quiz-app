// Use React Hooks' useState
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useState } from "react";
import { logout, selectUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

import './Navbar.css';

const Navbar = () => {

    const [isOpen, setisOpen] = useState(false);


    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const onlogout = () => {
        dispatch(
            logout()
        );
    }


    const handleButtonClick = () => {
        if (isOpen) {
            setisOpen(false);
        } else {
            setisOpen(true);
        }
    }




    return (
        <div className='fullscreen'>
            <nav>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link
                            className='navbar-brand'
                            aria-current="page"
                            to='/'

                        >
                            Mettle
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#menu-links"
                            aria-controls="menu-links"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={handleButtonClick}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="menu-links">
                            <div className="navbar-nav active">
                                <Link
                                    className='nav-link'
                                    aria-current="page"
                                    to="/"

                                >
                                    Home
                                </Link>
                                <Link
                                    className='nav-link'
                                    aria-current="page"
                                    to='/quiz'
                                >
                                    Demo
                                </Link>
                                <Link
                                    className='nav-link'
                                    aria-current="page"
                                    to='/register'
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                >
                                    Register your interest
                                </Link>
                            </div>

                        </div>


                        <div className="userManagenent">

                            <If condition={user.name}>
                                <Then>
                                    <div className="collapse navbar-collapse">
                                        <div className="navbar-nav active">
                                            <Link
                                                className='nav-link'
                                                aria-current="page"
                                                to='/account'
                                            >
                                                Hello {user.name}
                                            </Link>
                                        </div>

                                        <div className="navbar-nav active">
                                            <button onClick={(e) => onlogout(e)} type="button" id="registerBtn" className='btn-primary btn'>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </Then>

                                <Else>
                                    <div className="navbar-nav active">
                                        <Link
                                            className='nav-link'
                                            aria-current="page"
                                            to='/login'
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </Else>
                            </If>
                        </div>


                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

export default Navbar;