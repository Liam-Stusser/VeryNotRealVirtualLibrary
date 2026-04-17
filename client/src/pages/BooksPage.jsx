import React from 'react';
import HeadNavBar from '../components/HeadNavBar';
import Footer from '../components/Footer';
import '../styles/booksPage.css';

export default function BooksPage() {
    return (
        <div className="books-page">
            <HeadNavBar />
            <main>
                <h1>Books Page</h1>
                <p>This is where the books will be displayed.</p>
            </main>
            <Footer />
        </div>
    )
}