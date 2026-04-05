import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import '../styles/adminDashboard.css';

export default function AdminDashboard() {
    return (
        <div className = "app-shell">
            <HeadNavBar />
            <main className = "admin-dashboard-content">
                <div className="admin-sections">
                    <h2>Overdue Books</h2>
                </div>
                <div className="admin-sections">
                    <h2>Add New Book</h2>
                </div>
                <div className="admin-sections">
                    <h2>Modify Exsisting Book</h2>
                </div>
                <div className="admin-sections">
                    <h2>Delete Book</h2>
                </div>
            </main>
            <Footer />
        </div>
    )
}