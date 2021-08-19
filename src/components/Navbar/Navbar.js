// Use React Hooks' useState
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        if (this.state.isOpen) {
            this.setState({
                isOpen: false
            })
        } else {
            this.setState({
                isOpen: true
            })
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink
                        className='navbar-brand'
                        activeClassName='is-active'
                        aria-current="page"
                        to='/'
                        exact
                    >
                        Mettle
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menu-links"
                        aria-controls="menu-links"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={this.handleButtonClick}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="menu-links">
                        <div className="navbar-nav active">
                            <NavLink
                                className='nav-link'
                                activeClassName='is-active'
                                aria-current="page"
                                to='/'
                                exact
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className='nav-link'
                                activeClassName='is-active'
                                aria-current="page"
                                to='/quiz'
                            >
                                Demo
                            </NavLink>
                            <NavLink
                                className='nav-link'
                                activeClassName='is-active'
                                aria-current="page"
                                to='/register'
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                            >
                                Register your interest
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;