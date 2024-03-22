import React from 'react';
import { Link } from 'react-router-dom';
import './UserFooter.css';

function Footer() {
    return (
      <footer className="footer-main-container"> {/* Encapsulate everything in a footer element */}
      <hr className="footer-horizontal-line" /> {/* Horizontal line */}
      <div className="footer-container">
        <h4 className="footer-title">Our Links</h4>
        <div className="footer-links">
          <div className="footer-column">
          <Link to="/UserProfile" className="footer-link">User Profile</Link>
        <Link to="/InterestSurvey" className="footer-link">Interest Survey</Link>
        <Link to="/UserHomepage" className="footer-link">User Homepage</Link>
          </div>
          <div className="footer-column">
          <Link to="/UserCategories" className="footer-link">User Categories</Link>
          <Link to="/UserBookmarks" className="footer-link">User Bookmarks</Link>
          </div>
        </div>
      </div>
      </footer>
    );
  }

export default Footer;