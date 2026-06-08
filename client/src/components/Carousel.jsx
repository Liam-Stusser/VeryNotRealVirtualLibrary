import React from 'react';
import '../styles/carousel.css';

export default function Carousel({ books }) {
    return (
        <div className="carousel">
            <div className="carousel-track">
                {[...books, ...books].map((book, index) => (
                    <div
                        key={`${book.id}-${index}`}
                        className="carousel-card"
                    >
                        <div className="carousel-cover-wrapper">
                            <img
                                className="carousel-cover"
                                src={book.coverImgUrl}
                                alt={book.title}
                            />
                        </div>

                        <div className="carousel-info">
                            <h3 className="carousel-title">
                                {book.title}
                            </h3>

                            <p className="carousel-author">
                                by {book.author}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}