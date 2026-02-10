import React from 'react';
import HeadNavBar from "../components/HeadNavBar.jsx";
import Footer from "../components/Footer.jsx";
import '../styles/aboutPage.css';

export default function AboutPage() {
    return (
        <div className="app-shell">
            <HeadNavBar></HeadNavBar>
            <main className="app-content">
                <div id="about-page-content">
                    <div id="about-content-one" className="about-content-one">
                        <h1>About This Project</h1>
                        <ul>
                            <li>
                                Despite the name, this website is not an official library site or a real production service.
                                It is a fully functional example project built to practice and showcase my full-stack web
                                development skills.
                            </li>
                            <li>
                                This project was designed as a hands-on learning experience, covering both front-end and
                                back-end development concepts including authentication, user roles, data management, and
                                UI/UX design.
                            </li>
                            <li>
                                When using this site, please do not enter any real personal information. All forms and inputs
                                are intentionally designed to accept fake or placeholder data for demonstration purposes.
                            </li>
                            <li>
                                If you would like to view the source code for this project, you can find it on my
                                <a href="https://github.com/Liam-Stusser/VeryNotRealVirtualLibrary" target="_blank" rel="noopener noreferrer">
                                    {" "}GitHub profile
                                </a>.
                            </li>
                        </ul>
                    </div>

                    <div id="about-content-two" className="about-content-two">
                        <h1>How to Use the Website</h1>
                        <ul>
                            <li>
                                The website provides a simple and intuitive interface for browsing and checking out books as
                                a regular user, as well as managing books and users as an administrator.
                            </li>
                            <li>
                                To get started, create a user account by clicking the “Create Account” button in the top
                                navigation bar. Please use fake information when creating your account.
                            </li>
                            <li>
                                After creating an account, click the “Books” button in the navigation bar to browse the
                                available books. You can apply filters and try checking out books to your account.
                            </li>
                            <li>
                                You can view and manage your account details by clicking the profile button in the top-right
                                corner of the navigation bar.
                            </li>
                            <li>
                                To try the administrator features, log in using the username <strong>admin</strong> and
                                password <strong>admin123</strong>. After logging in, the profile menu will display the admin
                                dashboard.
                            </li>
                            <li>
                                From the admin dashboard, you can add new books, update existing book quantities, delete
                                books, and manage overdue items. A user ban feature was intentionally omitted to prevent
                                users from interfering with other accounts.
                            </li>
                            <li>
                                When adding a new book, please only use book cover images sourced from a free and
                                publicly available book cover API. Do not upload copyrighted images or images you do not
                                have the rights to use.
                            </li>
                        </ul>
                    </div>

                    <div id="about-content-three" className="about-content-three">
                        <h1>Our Mission</h1>
                        <ul>
                            <li>
                                While this is a demonstration project, it still follows a clear design philosophy and set
                                of goals to guide development.
                            </li>
                            <li>
                                The mission of this virtual library is to provide a simple and accessible way for users to
                                explore and enjoy books from anywhere.
                            </li>
                            <li>
                                We believe in clean, intuitive design and building applications that are easy to understand
                                and use for people of all technical skill levels.
                            </li>
                        </ul>
                    </div>

                    <div id="about-content-four" className="about-content-four">
                        <h1>About the Developer</h1>
                        <ul>
                            <li>
                                My name is Liam Stusser, and I am the developer behind this project. I am a tech enthusiast
                                with a strong interest in learning, building, and experimenting with software.
                            </li>
                            <li>
                                I have been programming since middle school, took multiple programming courses in high
                                school and college, and continue to study and practice programming concepts independently.
                            </li>
                            <li>
                                Outside of software development, I enjoy playing piano (largely self taught, with over
                                seven years of experience), racing both in simulation and on track at Pacific Raceways,
                                and spending time outdoors.
                            </li>
                            <li>
                                I also enjoy hiking throughout the Pacific Northwest and exploring new fishing spots around
                                the greater Seattle area.
                            </li>
                        </ul>
                    </div>

                    <div id="about-content-five" className="about-content-five">
                        <h1>Disclaimer & Data Usage Notice</h1>
                        <ul>
                            <li>
                                This website is provided for educational and demonstration purposes only. All data entered
                                into this site is considered public and may be modified or deleted at any time.
                            </li>
                            <li>
                                While reasonable care is taken to store data securely, this project is not intended for
                                real-world use. Please do not submit real names, email addresses, passwords, or any other
                                sensitive or personal information.
                            </li>
                            <li>
                                Any user may log in as an administrator using the provided credentials and has the ability
                                to modify or remove data stored on the site. As such, data persistence is not guaranteed.
                            </li>
                            <li>
                                By using this site, you acknowledge that the author is not responsible for any loss,
                                modification, or misuse of data entered into the application.
                            </li>
                            <li>
                                All code for this project was written by the author unless otherwise stated, and any third
                                party assets used are sourced from free and publicly available resources.
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}