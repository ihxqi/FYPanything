import React from 'react';
import { Link } from 'react-router-dom';
import './PartnerFooter.css';

function Footer() {
    return (
      <footer className="footer-main-container"> {/* Encapsulate everything in a footer element */}
      <hr className="footer-horizontal-line" /> {/* Horizontal line */}
      <div className="footer-container">
        <h4 className="footer-title">Our Links</h4>
        <div className="footer-links">
          <div className="footer-column">
          <Link to="/PartnerProfile" className="footer-link">Partner Profile</Link>
          <Link to="/PartnerGenerateReport" className="footer-link">PartnerGenerateReport</Link>
          </div>
          <div className="footer-column">
          <Link to="/AddProduct" className="footer-link">Add Product</Link>
          <Link to="/PartnerAllProducts" className="footer-link">Partner View All Products</Link>
          </div>
        </div>
      </div>
      </footer>
    );
  }

export default Footer;