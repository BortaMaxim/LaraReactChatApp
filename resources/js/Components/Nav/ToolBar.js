import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export const ToolBar = ({handleActive, id, verifiedToken, logout}) => {
    return (
        <div className="offcanvas offcanvas-start bg-secondary" tabIndex="-1" id="offcanvasNavbar"
             aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">Chat</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                {
                    verifiedToken !== null
                        ? <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mt-3">
                            <button className="btn btn-sm btn-danger" onClick={logout}>
                                logout
                            </button>
                        </ul>
                        : <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mt-3">
                            <li className="nav-item" onClick={() => handleActive('link3')}
                                style={{backgroundColor: id === 'link3' ? '#c28172' : ''}}>
                                <Link className="nav-link text-white" to="/login">Login</Link>
                            </li>
                            <li className="nav-item" onClick={() => handleActive('link2')}
                                style={{backgroundColor: id === 'link2' ? '#c28172' : ''}}>
                                <Link className="nav-link text-white" to="/register">Register</Link>
                            </li>
                        </ul>
                }
            </div>
        </div>
    )
}

ToolBar.propTypes = {
    handleActive: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    verifiedToken: PropTypes.any,
    logout: PropTypes.func.isRequired,
}
