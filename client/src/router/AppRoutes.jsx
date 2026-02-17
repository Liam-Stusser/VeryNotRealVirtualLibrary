import React from 'react';
import {Routes, Route} from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import LoginPage from "../pages/LoginPage.jsx";

export default function AppRoutes()
{
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    )
}