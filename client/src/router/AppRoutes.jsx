import React from 'react';
import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import UserDashboard from "../pages/UserDashboard.jsx";

export default function AppRoutes()
{
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/create-account" element={<CreateAccount/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            
            {/* Protected routes */}
            <Route
                path="/user-dashboard"
                element={
                    <ProtectedRoute role="user">
                        <UserDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute role="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}