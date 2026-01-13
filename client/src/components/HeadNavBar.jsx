import React from 'react';

export default function topNavBar()
{
    return (
        <header id="global-top-nav" className="top-all">
            <div id="logo-container" className="top-all">
                <img id="site-logo" src="/library-logo.gif" alt="logo"></img>
            </div>
            <nav id="top-nav" className="top-all">
                <ul id="top-nav-ul" className="top-all">
                    <li>Books</li>
                    <li>About</li>
                    <li>Create Account</li>
                    <li>Login</li>
                </ul>
            </nav>
            <div id="user-logo-container" className="top-all">
                <img id="user-logo" src="/user-logo.png" alt="User Profile"></img>
            </div>
        </header>
    );
}