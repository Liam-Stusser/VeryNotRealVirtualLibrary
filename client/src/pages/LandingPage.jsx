import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import Carousel from '../components/Carousel.jsx';
import '../styles/landingPage.css';
import '../styles/carousel.css';

export default function landingPage() {
const [books, setBooks] = React.useState([]);

React.useEffect(() => {
    const fetchBooks = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/popular-books`, {
                method: 'GET'
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.err || 'an error occured');
                return;
            }
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }
    fetchBooks();
}, []);
    return (
        <div className="app-shell">
            <HeadNavBar></HeadNavBar>
            <main className="app-content">
                <div id="landing-page-banner" className="app-content">
                    <h1>Welcome to the</h1>
                    <h1>Very Not Real Virtual Library</h1>
                </div>
                <div id="landing-page-content-one" className="app-content-one">
                    <h1>All the books you need in one place!</h1>
                    <div id="content-one-container" className="app-content-one">
                        <div id="content-one-left" className="app-content-one"> {/*Forgot I could use <br> tags instead of multiple p elements*/}
                            <p>Discover a vast collection of books across all genres,</p>
                            <p>from timeless classics to contemporary bestsellers.</p>
                            <p>Our user-friendly interface makes it easy to find your next great read,</p>
                            <p>whether you're looking for fiction, non-fiction, or academic resources.</p>
                            <p>Join our community of book lovers and start exploring today!</p>
                        </div>
                        <div id="content-one-right" className="app-content-one">
                            <img id="looping-book-gif" src="/loopingBook.gif" alt="Looping book animation"></img>
                        </div>
                    </div>
                </div>
                <div id="landing-page-content-two" className="app-content-two">
                    <h1>Take a look at some of our most popular books right now!</h1>
                    <div id="carousel-container" className="app-content-two">
                        <Carousel books={books} />
                    </div>
                </div>
                <div id="landing-page-content-three" className="app-content-three">
                    <h1>Sign up and join our community today!</h1>
                    <div id="content-three-container" className="app-content-three">
                        <p>Simply click the create account <br /> button at the top of the page</p>
                        <img src="/formQuill.gif" alt="Form Quill Animation"></img>
                        <p>Disclaimer: This is not a real website <br /> please read the about section first!</p>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}