import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import '../styles/loginPage.css';

export default function LoginPage() {
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });

    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }

            console.log('Login successful:', data); // remove later
            navigate('/'); // TODO: change to dashboard

        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    return (
        <div className="app-shell">
            <HeadNavBar />
            <main className="main-content">
                <div className="login-container">
                    <h2>Login</h2>

                    {error && <p className="form-error">{error}</p>}

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit">Login</button>
                    </form>

                    <p className="signup-link">
                        Don't have an account? <Link to="/create-account">Sign up here</Link>
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}