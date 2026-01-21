import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes.jsx';

export default function App()
{
    return (
        <div className = "app-shell">
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </div>
    );
}