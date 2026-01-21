import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import '../styles/landingPage.css';

export default function landingPage() {
    return (
        <div className = "app-shell">
            <HeadNavBar></HeadNavBar>
            <main className="app-content">
                <div id="landing-page-banner" className="app-content">
                    <h1>Welcome to the</h1>
                    <h1>Very Not Real Virtual Library</h1>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}