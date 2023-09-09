import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalStore';
import axios from 'axios';
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import '../css/Nav.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavBar = () => {
  const { info } = useContext(GlobalContext);
  const { userid, email, memtype } = info;
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Simulate a click on the search button link
      const searchLink = document.querySelector('.SearchLink');
      if (searchLink) {
        searchLink.click();
      }
    }
  };
  
  return (
    <nav className="navbar">
      {email ? (
        <>
          <div className="social-media-buttons">
            <TwitterShareButton url="https://twitter.com" title="Share on Twitter" tags="#catloverhome">
              <TwitterIcon size={30} round={true} />
            </TwitterShareButton>
            <FacebookShareButton url="https://facebook.com" title="Share on Facebook">
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url="http://whatsapp.com" title="Share on WhatsApp">
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>

            <div className="menuitem">
            <Link to="/books" className="menu-link">
              Home
            </Link>
            {memtype === 'Seller' && (
              <Link to="/books/add" className="menu-link">
                Sell Books
              </Link>
            )}
            
            {memtype === 'Seller' && (
              <Link to={`/books/user/sellerbooks/${userid}`} className="menu-link">
                Books on Sale
              </Link>
            )}
            {memtype === 'Buyer' && (
              <Link to={`/books/user/buyerbooks/${userid}`} className="menu-link">
                Bucket
              </Link>
            )}
            <Link to="/books/user/logout" className="menu-link">
              Logout
            </Link>
          </div>
          </div>
          

          <div className="search-container">
            <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress} // Call the handler on key press
                aria-label="Search books"
                className="search-input"
            />
            <Link to={`/books/BookSearch/${searchTerm}`} className="SearchLink" aria-label="Search">
                <i className="fas fa-search"></i>
            </Link>
            </div>

          <h>{email}</h>
        </>
      ) : (
        <>
        <div className="social-media-buttons">
            <TwitterShareButton url="https://twitter.com" title="Share on Twitter" tags="#catloverhome">
              <TwitterIcon size={30} round={true} />
            </TwitterShareButton>
            <FacebookShareButton url="https://facebook.com" title="Share on Facebook">
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url="http://whatsapp.com" title="Share on WhatsApp">
              <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>

            <div className="menuitem">
            <Link to="/books" className="menu-link">
              Home
            </Link>
            <Link to="/books/user/register" className="menu-link">
              Register
            </Link>
            <Link to="/books/user/login" className="menu-link">
              Login
            </Link>
          </div>
          </div>
          

          <div className="search-container">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search books"
              className="search-input"
            />
            <Link to={`/books/BookSearch/${searchTerm}`} className="SearchLink" aria-label="Search">
              <i className="fas fa-search"></i>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
