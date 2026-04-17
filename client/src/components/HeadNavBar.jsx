import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../context/authContext.jsx";

export default function TopNavBar()
{
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleProfileClick = () => {
        if (auth.loading) return;

        if(!auth.isAuthenticated)
        {
            navigate('/login');
        }
        else if(auth.role === 'admin')
        {
            navigate('/admin-dashboard');
        }
        else
        {
            navigate('/user-dashboard');
        }
    };

    return (
        <header id="global-top-nav" className="top-all">
            <div id="logo-container" className="top-all">
                <Link to="/">
                    <img id="site-logo" src="/library-logo.gif" alt="logo"></img>
                </Link>
            </div>
            <nav id="top-nav" className="top-all">
                <ul id="top-nav-ul" className="top-all">
                    <Link to="/books"><li>Books</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/create-account"><li>Create Account</li></Link>
                    <Link to="/login"><li>Login</li></Link>
                </ul>
            </nav>
            <div id="user-logo-container" className="top-all">
                <img id="user-logo" src="/user-logo.png" alt="User Profile" onClick={handleProfileClick}></img>
            </div>
        </header>
    );
}