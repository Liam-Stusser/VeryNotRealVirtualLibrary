import React from 'react';
import '../styles/bookCard.css';

export default function BookCard({ book }) {
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
                    {book.total_stock > 0 ? `In stock: ${book.total_stock}` : "Out of stock"}
                </p>

                <button className="borrow-btn">
                    Borrow
                </button>
            </div>
        </div>
    );
}