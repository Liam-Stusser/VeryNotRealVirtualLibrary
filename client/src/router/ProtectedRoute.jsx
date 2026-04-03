import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/authContext.jsx";

export default function ProtectedRoute({ children, role }) {
    const { auth } = useAuth();

    if(auth.loading) return <div>Loading...</div>;

    if(!auth.isAuthenticated)
    {
        return <Navigate to="/login" />;
    }

    if(role && auth.role !== role)
    {
        return <Navigate to="/" />;
    }

    return children;
}