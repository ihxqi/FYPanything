import React from 'react';
import { Link } from 'react-router-dom';
import './AdminFooter.css';

function Footer() {
    return (
      <footer className="adminfooter-main-container"> {/* Encapsulate everything in a footer element */}
      <hr className="adminfooter-horizontal-line" /> {/* Horizontal line */}
      <div className="adminfooter-container">
        <h4 className="adminfooter-title">Our Links</h4>
        <div className="adminfooter-links">
          <div className="adminfooter-column">
          <Link to="/AdminGenerateReport" className="footer-link">Admin Generate Report</Link>
        <Link to="/AdminCategories" className="footer-link">Admin Categories</Link>
        <Link to="/AdminManageUser" className="footer-link">Admin Manage Users</Link>
          </div>
          <div className="adminfooter-column">
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