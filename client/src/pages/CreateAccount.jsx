import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";

export default function CreateAccount() {
    return (
        <div className="app-shell">
            <HeadNavBar></HeadNavBar>
            <main className="app-content">
                <div id="create-account-container">
                    <h1>Create Account Page</h1>
                    <form id="create-account-form" noValidate autoComplete="off">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required></input>
                    </form>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}