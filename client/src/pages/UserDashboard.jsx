import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";

export default function UserDashboard() {
    return (
        <div className = "app-shell">
            <HeadNavBar />
            <main className = "user-dashboard-content">
                <h1>User Dashboard placeholder text</h1>
            </main>
            <Footer />
        </div>
    )
}