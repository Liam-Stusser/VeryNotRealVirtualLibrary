import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/authContext.jsx";
import AppRoutes from './router/AppRoutes.jsx';

export default function App()
{
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app-shell">
                    <AppRoutes />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}