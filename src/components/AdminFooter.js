import React from 'react';
import { Link } from 'react-router-dom';
import './AdminFooter.css';

function Footer() {
    return (
      <footer className="footer-main-container"> {/* Encapsulate everything in a footer element */}
      <hr className="footer-horizontal-line" /> {/* Horizontal line */}
      <div className="footer-container">
        <h4 className="footer-title">Our Links</h4>
        <div className="footer-links">
          <div className="footer-column">
          <Link to="/AdminGenerateReport" className="footer-link">Admin Generate Report</Link>
        <Link to="/AdminCategories" className="footer-link">Admin Categories</Link>
        <Link to="/AdminManageUser" className="footer-link">Admin Manage Users</Link>
          </div>
          <div className="footer-column">
          <Link to="/AdminManagePartner" className="footer-link">Admin Manage Partner</Link>
          <Link to="/UnregisteredBlogshopOwner" className="footer-link">Unregistered Blogshop Owner</Link>
          <Link to="/AdminAllProduct" className="footer-link">Admin View All Products</Link>
         
          </div>
        </div>
      </div>
      </footer>
    );
  }

export default Footer;