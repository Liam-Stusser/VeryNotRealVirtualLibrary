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

    const [error, setError] = React.useState(''); //dont forget to add the error state to the UI later

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

    const [foundBooks, setFoundBooks] = React.useState([]); //for storing the results of the find book form

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

            if(!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }

            setFoundBooks(data);
            console.log('Found books:', data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    }

    const handleAddBookSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
                const response = await fetch('http://localhost:3000/api/admin/add-book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(addBooksForm)
                });

                const data = await response.json();

                if(!response.ok) {
                    setError(data.error || 'An error occurred');
                    return;
                }

                console.log('Book added successfully:', data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    }

    const handleModifyBookSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
                const response = await fetch('http://localhost:3000/api/admin/modify-book', {
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(modifyBooksForm)
                });

                const data = await response.json();

                if(!response.ok) 
                {
                    setError(data.error || 'An error occurred');
                    return;
                }

                console.log('Book modified successfully:', data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    }

    const handleDeleteBookSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(deleteBookForm.confirm !== 'DELETE')
        {
            setError('You must type "DELETE" to confirm');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/admin/delete-book', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(deleteBookForm)
            });

            const data = await response.json();

            if(!response.ok) {
                setError(data.error || 'An error occurred');
                return;
            }

            console.log('Book deleted successfully:', data);
        } catch (err) {
            console.error(err);
            setError('Server not reachable');
        }
    }

    return (
        <div className="app-shell">
            <HeadNavBar />
            <main className="admin-dashboard-content">

                {/*Find book by id section*/}
                <div className="admin-sections" id="find-book-section">
                    <h2>Find Book ID</h2>
                    <form id="find-book-form" onSubmit = {handleFindBookSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" 
                             value = {findBookForm.title} 
                             onChange={(e) => handleChange(e, setFindBookForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text" id="author" name="author" 
                             value = {findBookForm.author}
                             onChange={(e) => handleChange(e, setFindBookForm)} />
                        </div>

                        <button id="find-book-button" type="submit">
                            Find Book
                        </button>
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

                {/*overdue books section*/}
                <div className="admin-sections" id="overdue-section">
                    <h2>Overdue Books</h2>
                </div>

                {/*add books section*/}
                <div className="admin-sections" id="add-book-section">
                    <h2>Add New Book</h2>
                    <form id="add-book-form" onSubmit={handleAddBookSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" required 
                            value={addBooksForm.title} 
                            onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text" id="author" name="author" required
                            value={addBooksForm.author}
                            onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pages">Pages</label>
                            <input type="number" id="pages" name="pages" min="1" required
                             value={addBooksForm.pages}
                             onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="copies">Copies</label>
                            <input type="number" id="copies" name="copies" min="1" required
                             value={addBooksForm.copies}
                             onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre">Genre</label>
                            <select id="genre" name="genre" required
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
                            <label htmlFor="cover-image">Image URL</label>
                            <input type="text" id="cover-image" name="coverImage"
                             value={addBooksForm.coverImage}
                             onChange={(e) => handleChange(e, setAddBooksForm)} />
                        </div>

                        <button id="add-book-button" type="submit">
                            Add Book
                        </button>
                    </form>
                </div>

                {/*modify exsisting book section*/}
                <div className="admin-sections">
                    <h2>Modify Exsisting Book</h2>
                    <form id="modify-book-form" onSubmit={handleModifyBookSubmit}>
                        <input type="number" id = "book-id" name="bookId" placeholder="Book ID" required
                            value={modifyBooksForm.bookId}
                            onChange={(e) => handleChange(e, setModifyBooksForm)} />

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" 
                            value={modifyBooksForm.title} 
                            onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text" id="author" name="author" 
                            value={modifyBooksForm.author}
                            onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pages">Pages</label>
                            <input type="number" id="pages" name="pages"  
                             value={modifyBooksForm.pages}
                             onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="copies">Copies</label>
                            <input type="number" id="copies" name="copies"
                             value={modifyBooksForm.copies}
                             onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="genre">Genre</label>
                            <select id="genre" name="genre" 
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
                            <label htmlFor="cover-image">Image URL</label>
                            <input type="text" id="cover-image" name="coverImage"
                             value={modifyBooksForm.coverImage}
                             onChange={(e) => handleChange(e, setModifyBooksForm)} />
                        </div>

                        <button id="add-book-button" type="submit">
                            Modify Book
                        </button>
                    </form>
                </div>

                {/*delete book section*/}
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
                        <button id="delete-book-button" type="submit">
                            Delete Book
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}