import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import AdminBookCard from '../components/AdminBookCard.jsx';
import '../styles/adminDashboard.css';

export default function AdminDashboard() {

    const handleChange = (e, setState) => {
        const {name, value} = e.target;
        setState(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const [error, setError] = React.useState('');

    const [addBooksForm, setAddBooksForm] = React.useState({
        title: '',
        author: '',
        pages: 1,
        copies: 1,
        genre: '',
        coverImage: ''
    });

    const [modifyBooksForm, setModifyBooksForm] = React.useState({
        bookId: '',
        title: '',
        author: '',
        pages: null,
        copies: null,
        genre: '',
        coverImage: ''
    });

    const [findBookForm, setFindBookForm] = React.useState({
        title: '',
        author: ''
    });

    const [deleteBookForm, setDeleteBookForm] = React.useState({
        bookId: '',
        confirm: ''
    });

    const [foundBooks, setFoundBooks] = React.useState([]);
    const [overdueBooks, setOverdueBooks] = React.useState([]);

    React.useEffect(() => {
        fetchOverdueBooks();
    }, []);

    const fetchOverdueBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/admin/overdue-books', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Failed to load overdue books');
                return;
            }
            setOverdueBooks(data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const handleForceReturn = async (loanId) => {
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/admin/force-return', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ loanId })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Failed to force return book');
                return;
            }
            fetchOverdueBooks();
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const handleFindBookSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const query = new URLSearchParams(findBookForm).toString();
            const response = await fetch(`http://localhost:3000/api/admin/find-book?${query}`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }
            setFoundBooks(data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const handleAddBookSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/admin/add-book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(addBooksForm)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }
            console.log('Book added successfully:', data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const handleModifyBookSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3000/api/admin/modify-book', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(modifyBooksForm)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }
            console.log('Book modified successfully:', data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const handleDeleteBookSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (deleteBookForm.confirm !== 'DELETE') {
            setError('You must type "DELETE" to confirm');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/admin/delete-book', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(deleteBookForm)
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }
            console.log('Book deleted successfully:', data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    };

    const getDaysOverdue = (dueDate) => {
        const diffMs = new Date() - new Date(dueDate);
        return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div className="app-shell">
            <HeadNavBar />
            <main className="admin-dashboard-content">

                {error && <div className="admin-error">{error}</div>}

                {/* Find book section */}
                <div className="admin-sections" id="find-book-section">
                    <h2>Find Book ID</h2>
                    <form id="find-book-form" onSubmit={handleFindBookSubmit}>
                        <div className="form-group">
                            <label htmlFor="find-title">Title</label>
                            <input type="text" id="find-title" name="title"
                                value={findBookForm.title}
                                onChange={(e) => handleChange(e, setFindBookForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="find-author">Author</label>
                            <input type="text" id="find-author" name="author"
                                value={findBookForm.author}
                                onChange={(e) => handleChange(e, setFindBookForm)} />
                        </div>
                        <button id="find-book-button" type="submit">Find Book</button>
                    </form>
                    <div id="find-book-result">
                        {foundBooks.length > 0 ? (
                            foundBooks.map(book => (
                                <AdminBookCard key={book.id} book={book} />
                            ))
                        ) : (
                            <p>No books found. Try searching with different criteria.</p>
                        )}
                    </div>
                </div>

                {/* Overdue books section */}
                <div className="admin-sections" id="overdue-section">
                    <h2>⚠ Overdue Books</h2>
                    <div id="overdue-list">
                        {overdueBooks.length > 0 ? (
                            overdueBooks.map(book => (
                                <div key={book.loanId} className="overdue-row">
                                    <div className="overdue-book-info">
                                        <span className="overdue-title">{book.title}</span>
                                        <span className="overdue-author">by {book.author}</span>
                                    </div>
                                    <div className="overdue-borrower-info">
                                        <span className="overdue-username">{book.username}</span>
                                        <span className="overdue-due">Due: {formatDate(book.dueDate)}</span>
                                        <span className="overdue-days">
                                            {getDaysOverdue(book.dueDate)} day{getDaysOverdue(book.dueDate) !== 1 ? 's' : ''} overdue
                                        </span>
                                    </div>
                                    <button
                                        className="force-return-button"
                                        onClick={() => handleForceReturn(book.loanId)}>
                                        Force Return
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="overdue-empty">No overdue books.</p>
                        )}
                    </div>
                </div>

                {/* Add book section */}
                <div className="admin-sections" id="add-book-section">
                    <h2>Add New Book</h2>
                    <form id="add-book-form" onSubmit={handleAddBookSubmit}>
                        <div className="form-group">
                            <label htmlFor="add-title">Title</label>
                            <input type="text" id="add-title" name="title" required
                                value={addBooksForm.title}
                                onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-author">Author</label>
                            <input type="text" id="add-author" name="author" required
                                value={addBooksForm.author}
                                onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-pages">Pages</label>
                            <input type="number" id="add-pages" name="pages" min="1" required
                                value={addBooksForm.pages}
                                onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-copies">Copies</label>
                            <input type="number" id="add-copies" name="copies" min="1" required
                                value={addBooksForm.copies}
                                onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-genre">Genre</label>
                            <select id="add-genre" name="genre" required
                                value={addBooksForm.genre}
                                onChange={(e) => handleChange(e, setAddBooksForm)}>
                                <option value="">Select Genre</option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-Fiction</option>
                                <option value="mystery">Mystery</option>
                                <option value="sci-fi">Sci-Fi</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="biography">Biography</option>
                                <option value="history">History</option>
                                <option value="romance">Romance</option>
                                <option value="thriller">Thriller</option>
                                <option value="self-help">Self-Help</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="add-cover">Image URL</label>
                            <input type="text" id="add-cover" name="coverImage"
                                value={addBooksForm.coverImage}
                                onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>
                        <button id="add-book-button" type="submit">Add Book</button>
                    </form>
                </div>

                {/* Modify existing book section */}
                <div className="admin-sections">
                    <h2>Modify Existing Book</h2>
                    <form id="modify-book-form" onSubmit={handleModifyBookSubmit}>
                        <input type="number" id="book-id" name="bookId" placeholder="Book ID" required
                            value={modifyBooksForm.bookId}
                            onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        <div className="form-group">
                            <label htmlFor="mod-title">Title</label>
                            <input type="text" id="mod-title" name="title"
                                value={modifyBooksForm.title}
                                onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mod-author">Author</label>
                            <input type="text" id="mod-author" name="author"
                                value={modifyBooksForm.author}
                                onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mod-pages">Pages</label>
                            <input type="number" id="mod-pages" name="pages"
                                value={modifyBooksForm.pages}
                                onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mod-copies">Copies</label>
                            <input type="number" id="mod-copies" name="copies"
                                value={modifyBooksForm.copies}
                                onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mod-genre">Genre</label>
                            <select id="mod-genre" name="genre"
                                value={modifyBooksForm.genre}
                                onChange={(e) => handleChange(e, setModifyBooksForm)}>
                                <option value="">Select Genre</option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non-Fiction</option>
                                <option value="mystery">Mystery</option>
                                <option value="sci-fi">Sci-Fi</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="biography">Biography</option>
                                <option value="history">History</option>
                                <option value="romance">Romance</option>
                                <option value="thriller">Thriller</option>
                                <option value="self-help">Self-Help</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mod-cover">Image URL</label>
                            <input type="text" id="mod-cover" name="coverImage"
                                value={modifyBooksForm.coverImage}
                                onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>
                        <button id="modify-book-button" type="submit">Modify Book</button>
                    </form>
                </div>

                {/* Delete book section */}
                <div className="admin-sections">
                    <h2>Delete Book</h2>
                    <form id="delete-book-form" onSubmit={handleDeleteBookSubmit}>
                        <div className="form-group">
                            <label htmlFor="delete-book-id">Book ID</label>
                            <input type="text" id="delete-book-id" name="bookId"
                                value={deleteBookForm.bookId}
                                onChange={(e) => handleChange(e, setDeleteBookForm)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-delete">Type "DELETE" to confirm</label>
                            <input type="text" id="confirm-delete" name="confirm"
                                value={deleteBookForm.confirm}
                                onChange={(e) => handleChange(e, setDeleteBookForm)} />
                        </div>
                        <button id="delete-book-button" type="submit">Delete Book</button>
                    </form>
                </div>

            </main>
            <Footer />
        </div>
    );
}