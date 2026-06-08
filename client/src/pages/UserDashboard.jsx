import React from 'react';
import HeadNavBar from '../components/HeadNavBar';
import Footer from '../components/Footer';
import '../styles/userDashboard.css';

export default function UserDashboard() {
    const [error, setError] = React.useState('');
    const [profile, setProfile] = React.useState(null);
    const [borrowedBooks, setBorrowedBooks] = React.useState([]);
    const [overdueBooks, setOverdueBooks] = React.useState([]);
    const [borrowHistory, setBorrowHistory] = React.useState([]);

    React.useEffect(() => {
        fetchProfile();
        fetchBorrowedBooks();
        fetchBorrowHistory();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/profile', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Failed to load profile');
                return;
            }
            setProfile(data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const fetchBorrowedBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/borrowed-books', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Failed to load borrowed books');
                return;
            }
            // Split overdue vs current client-side
            const now = new Date();
            setOverdueBooks(data.filter(book => new Date(book.dueDate) < now));
            setBorrowedBooks(data.filter(book => new Date(book.dueDate) >= now));
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const fetchBorrowHistory = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/borrow-history', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Failed to load history');
                return;
            }
            setBorrowHistory(data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const handleReturnBook = async (loanId) => {
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/user/return-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ loanId })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Failed to return book');
                return;
            }
            // Refresh both sections after a successful return
            fetchBorrowedBooks();
            fetchBorrowHistory();
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div className="app-shell">
            <HeadNavBar />
            <main className="user-dashboard-content">

                {error && <div className="dashboard-error">{error}</div>}

                {/* Profile */}
                <div className="dashboard-section" id="profile-section">
                    <h2>My Profile</h2>
                    {profile ? (
                        <div id="profile-card">
                            <div className="profile-field">
                                <span className="profile-label">Username</span>
                                <span className="profile-value">{profile.username}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-label">Email</span>
                                <span className="profile-value">{profile.email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-label">Member Since</span>
                                <span className="profile-value">{formatDate(profile.createdAt)}</span>
                            </div>
                            <div className="profile-field">
                                <span className="profile-label">Total Borrowed</span>
                                <span className="profile-value">{profile.totalBorrowed ?? 0}</span>
                            </div>
                        </div>
                    ) : (
                        <p className="loading-text">Loading profile...</p>
                    )}
                </div>

                {/* Overdue only shown when there are overdue books */}
                {overdueBooks.length > 0 && (
                    <div className="dashboard-section" id="overdue-section">
                        <h2>⚠ Overdue Books</h2>
                        <div className="book-list">
                            {overdueBooks.map(book => (
                                <div key={book.id} className="book-row overdue-row">
                                    <div className="book-row-info">
                                        <span className="book-row-title">{book.title}</span>
                                        <span className="book-row-author">by {book.author}</span>
                                        <span className="book-row-due overdue-label">
                                            Due: {formatDate(book.dueDate)}
                                        </span>
                                    </div>
                                    <button
                                        className="dashboard-button"
                                        onClick={() => handleReturnBook(book.id)}>
                                        Return
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Currently Borrowed */}
                <div className="dashboard-section" id="borrowed-section">
                    <h2>Currently Borrowed</h2>
                    <div className="book-list">
                        {borrowedBooks.length > 0 ? (
                            borrowedBooks.map(book => (
                                <div key={book.id} className="book-row">
                                    <div className="book-row-info">
                                        <span className="book-row-title">{book.title}</span>
                                        <span className="book-row-author">by {book.author}</span>
                                        <span className="book-row-due">
                                            Due: {formatDate(book.dueDate)}
                                        </span>
                                    </div>
                                    <button
                                        className="dashboard-button"
                                        onClick={() => handleReturnBook(book.id)}>
                                        Return
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="empty-text">No books currently borrowed.</p>
                        )}
                    </div>
                </div>

                {/* Borrowing History */}
                <div className="dashboard-section" id="history-section">
                    <h2>Borrowing History</h2>
                    <div className="book-list">
                        {borrowHistory.length > 0 ? (
                            borrowHistory.map(book => (
                                <div key={book.id} className="book-row history-row">
                                    <div className="book-row-info">
                                        <span className="book-row-title">{book.title}</span>
                                        <span className="book-row-author">by {book.author}</span>
                                        <span className="book-row-due">
                                            Returned: {formatDate(book.returnedAt)}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-text">No borrowing history yet.</p>
                        )}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}