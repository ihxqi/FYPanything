import React from 'react';
import { Link } from 'react-router-dom';
import './UserFooter.css';

function Footer() {
    return (
      <footer className="userfooter-main-container"> {/* Encapsulate everything in a footer element */}
      <hr className="userfooter-horizontal-line" /> {/* Horizontal line */}
      <div className="userfooter-container">
        <h4 className="userfooter-title">Our Links</h4>
        <div className="userfooter-links">
          <div className="userfooter-column">
          <Link to="/UserProfile" className="userfooter-link">User Profile</Link>
        <Link to="/InterestSurvey" className="userfooter-link">Interest Survey</Link>
        <Link to="/UserHomepage" className="userfooter-link">User Homepage</Link>
          </div>
          <div className="userfooter-column">
          <Link to="/UserCategories" className="userfooter-link">User Categories</Link>
          <Link to="/UserBookmarks" className="userfooter-link">User Bookmarks</Link>
          </div>
        </div>
      </div>
      </footer>
    );
  }

export default Footer;