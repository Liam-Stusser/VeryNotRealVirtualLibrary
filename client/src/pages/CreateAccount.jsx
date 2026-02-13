import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import '../styles/createAccount.css';

export default function CreateAccount() {
    const [formData, setFormData] = React.useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        //TODO change to actual api route once configured
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if(!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }

            console.log('Account created successfully:', data);
            navigate('/'); //TODO change to dashboard 

        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
}

return (
    <div className="app-shell">
        <HeadNavBar></HeadNavBar>
        <main className="app-content">
            <div id="create-account-container">
                <div id="text-reminder">
                    <h1>Create Account</h1>
                    <p><strong>*Please do not fill in any actual personal info in this form.*</strong></p>
                </div>
                <form id="create-account-form" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input
                            type="text"
                            id="first-name"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input
                            type="text"
                            id="last-name"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        {error && <p className="form-error">{error}</p>}
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}>
                        </input>
                    </div>
                    <button type="submit">Create Account</button>
                </form>
            </div>
        </main>
        <Footer></Footer>
    </div>
)
}