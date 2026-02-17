import React from 'react';
import { Link } from "react-router-dom";

export default function topNavBar()
{
    return (
        <header id="global-top-nav" className="top-all">
            <div id="logo-container" className="top-all">
                <Link to="/">
                    <img id="site-logo" src="/library-logo.gif" alt="logo"></img>
                </Link>
            </div>
            <nav id="top-nav" className="top-all">
                <ul id="top-nav-ul" className="top-all">
                    <li>Books</li>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/create-account"><li>Create Account</li></Link>
                    <Link to="/login"><li>Login</li></Link>
                </ul>
            </nav>
            <div id="user-logo-container" className="top-all">
                <img id="user-logo" src="/user-logo.png" alt="User Profile"></img>
            </div>
        </header>
    );
}