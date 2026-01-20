import React from 'react';
import HeadNavBar from "./components/HeadNavBar.jsx";
import Footer from "./components/Footer.jsx";

export default function App()
{
    return (
        <div className = "app-shell">
        <HeadNavBar></HeadNavBar>
        <main className = "app-content"></main>
        <Footer></Footer>
        </div>
    );
}