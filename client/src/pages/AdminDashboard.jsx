import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import '../styles/adminDashboard.css';

export default function AdminDashboard() {
    return (
        <div className = "app-shell">
            <HeadNavBar />
            <main className = "admin-dashboard-content">
                <h1>Admin Dashboard placeholder text</h1>
            </main>
            <Footer />
        </div>
    )
}