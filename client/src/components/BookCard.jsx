import React from 'react';
import '../styles/bookCard.css';

export default function BookCard({ book }) {
    const [stock, setStock] = React.useState(book.total_stock);
    
    const handleBorrow = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/borrow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ bookId: book.id })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Book borrowed successfully! Check your account for due date details.');
                setStock(prevStock => prevStock - 1);
            }
            else {
                alert(`Error borrowing book: ${data.error}`);
            }

        } catch (err) {
            alert('An error occurred while borrowing the book.');
            console.error(err);
        }
    }
    return (
        <div className="book-card">
            <div className="book-cover-wrapper">
                <img
                    className="book-cover"
                    src={book.cover_img_url}
                    alt={book.title}
                />
            </div>

            <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">by {book.author}</p>

                <div className="book-meta">
                    <span className="book-genre">{book.genre}</span>
                    <span className="book-pages">{book.pages} pages</span>
                </div>

                <p className="book-stock">
                    {stock > 0 ? `In stock: ${stock}` : "Out of stock"}
                </p>

                <button className="borrow-btn" disabled={stock === 0} onClick={handleBorrow}>
                    Borrow
                </button>
            </div>
        </div>
    );
}