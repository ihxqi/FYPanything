import React from 'react';
import { Link } from 'react-router-dom';
import './PartnerFooter.css';

function Footer() {
    return (
      <footer className="partnerfooter-main-container"> {/* Encapsulate everything in a footer element */}
      <hr className="partnerfooter-horizontal-line" /> {/* Horizontal line */}
      <div className="partnerfooter-container">
        <h4 className="partnerfooter-title">Our Links</h4>
        <div className="partnerfooter-links">
          <div className="partnerfooter-column">
          <Link to="/PartnerProfile" className="partnerfooter-link">Partner Profile</Link>
          <Link to="/PartnerGenerateReport" className="partnerfooter-link">PartnerGenerateReport</Link>
          </div>
          <div className="partnerfooter-column">
          <Link to="/AddProduct" className="partnerfooter-link">Add Product</Link>
          <Link to="/PartnerAllProducts" className="partnerfooter-link">Partner View All Products</Link>
          </div>
        </div>
      </div>
      </footer>
    );
  }

export default Footer;