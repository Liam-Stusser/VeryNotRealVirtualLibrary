import React from 'react';
import HeadNavBar from '../components/HeadNavBar';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import BookCard from '../components/BookCard';
import '../styles/booksPage.css';

export default function BooksPage() {
    const [values, setValues] = React.useState({
        search: '',
        filter: ''
    });

    const [filters, setFilters] = React.useState([]);
    const [books, setBooks] = React.useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const addFilters = () => {
        const newFilters = [];

        if (values.search.trim()) {
            newFilters.push({
                type: 'search',
                value: values.search.trim()
            });
        }

        if (values.filter) {
            newFilters.push({
                type: 'genre',
                value: values.filter
            });
        }

        setFilters(prev => {
            const updated = [...prev];

            newFilters.forEach(newFilter => {
                const isDuplicate = updated.some(
                    f =>
                        f.type === newFilter.type &&
                        f.value.toLowerCase() === newFilter.value.toLowerCase()
                );

                if (!isDuplicate)
                    updated.push(newFilter);
            });

            return updated;
        });

        setValues({
            search: '',
            filter: ''
        });
    };

    const removeFilter = (indexToRemove) => {
        setFilters(prev =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };

    const buildQuery = () => {
        const params = new URLSearchParams();

        if (values.search.trim()) {
            params.append('search', values.search.trim());
        }

        filters.forEach(filter => {
            params.append(filter.type, filter.value);
        });

        return params.toString();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addFilters();
            submitSearch();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitSearch();
    };

    const submitSearch = async () => {
        try {
            const query = buildQuery();

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/user/search-books?${query}`,
                {
                    method: 'GET',
                    credentials: 'include'
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data.err || 'an error occured');
                return;
            }

            console.log('books fetched', data);
            setBooks(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="books-page">
            <HeadNavBar />

            <main className="books-page">
                <h1>Very Not Real Virtual Library - Books</h1>

                <div id="books-container">

                    <div id="search-container">
                        <h3>Search Books</h3>
                        <input
                            id="search-bar"
                            name="search"
                            type="text"
                            placeholder="Search by title or author..."
                            value={values.search}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}>
                        </input>
                    </div>

                    <div id="filter-container">
                        <span>Add Filter:
                            <select id="filters" name="filter"
                                value={values.filter}
                                onChange={handleChange}>
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
                        </span>

                        <div id="filters-components">
                            {filters.map((filter, i) => (
                                <Filter
                                    key={i}
                                    value={filter}
                                    onRemove={() => removeFilter(i)}></Filter>
                            ))}
                        </div>

                        <div id="buttons-container">
                            <button id="submit-filter" onClick={addFilters}>Add Filters</button>
                            <button id="submit-search" onClick={handleSubmit}>Search</button>
                        </div>
                    </div>
                    <div id="found-books">
                        {books.length > 0 ? (
                            books.map((book) => (
                                <BookCard key={book.id} book={book} />
                            ))
                        ) : (
                            <p>No books found.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}