import React from 'react';
import { Link } from 'react-router-dom';
import './GeneralFooter.css';

function Footer() {
    return (
      <footer className="footer-main-container"> {/* Encapsulate everything in a footer element */}
      <hr className="footer-horizontal-line" /> {/* Horizontal line */}
      <div className="footer-container">
        <h4 className="footer-title">Our Links</h4>
        <div className="footer-links">
          <div className="footer-column">
          <Link to="/AboutUs" className="footer-link">About Us</Link>
            <Link to="/JoinUs" className="footer-link">Join Us</Link>
            <Link to="/RegisterRole" className="footer-link">Register Role</Link>
            <Link to="/RegisterPartner" className="footer-link">Register Partner</Link>
          </div>
          <div className="footer-column">
            <Link to="/Login" className="footer-link">Login</Link>
            <Link to="/ForgetEmail" className="footer-link">Forget Email</Link>
            <Link to="/ForgetPassword" className="footer-link">Forget Password</Link>
          </div>
        </div>
      </div>
      </footer>
    );
  }

export default Footer;