import React from 'react';
import '../styles/adminBookCard.css';

export default function AdminBookCard({ book })
{
    return (
        <div className="admin-book-card">
            <h3 className="book-title">{book.title}</h3>

            <img className="book-cover" src={book.cover_img_url} alt={book.title} />

            <div className="book-meta">
                <p><strong>ID:</strong> {book.id}</p>
                <p><strong>Author:</strong> {book.author}</p>
            </div>
        </div>
    );
};