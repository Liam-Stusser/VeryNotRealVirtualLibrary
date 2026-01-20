import React from 'react';

export default function footer()
{
    return (
        <footer id = "global-footer" className = "footer-all">
            <p id = "footer-legal" className = "footer-all">© 2026 Fake Virtual Library Inc. All rights reserved.</p>
            <div id = "footer-content" className = "footer-all">
               <div id = "footer-socials" className = "footer-all">
                    <div><a href="https://www.facebook.com" target = "_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></div>
                    <div><a href="https://twitter.com" target = "_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a></div>
                    <div><a href="https://www.instagram.com" target = "_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a></div>
                    <div><a href="https://github.com" target = "_blank" rel="noopener noreferrer"><i className="fa-brands fa-github"></i></a></div>
               </div>
               <div id = "footer-partners" className = "footer-all">
                    <p>Partner 1</p>
                    <p>Partner 2</p>
                    <p>Partner 3</p>
                    <p>Partner 4</p>
               </div>
               <div id = "footer-about" className = "footer-all">
                    <p>About</p>
                    <p>Contact</p>
                    <p>Careers</p>
                    <p>Press</p>
               </div>
            </div>
        </footer>
    )
}