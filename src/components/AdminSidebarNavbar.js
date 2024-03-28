import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../components/image/CollaFilter Logo.jpg';
import "./Navbar.css";

const AdminSidebarNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setMenuOpen(!menuOpen); // Ensure consistency between collapsed and menuOpen states
  };

  // Sidebar links
  const sidebarLinks = [
    { to: "/AdminManageUser", text: "View All Accounts" }, 
    { to: "/AdminManagePartner", text: "View All Partners" },
    { to: "/AdminCategories", text: "View All Categories" },
    { to: "/AdminAllProduct", text: "View All Products" },
    { to: "/AdminGenerateReport", text: "Generate Report" },
    { to: "/UnregisteredBlogshopOwner", text: "View Unregistered Blogshops" },
    { to: "/#", text: "Edit Homepage" },
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="title">
        <img src={logo} alt="CollaFilter Logo" className='logo' />
      </Link>

      {/* Hamburger icon for toggling sidebar */}
      <div className={`menu ${menuOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidenav ${collapsed ? 'collapsed' : ''}`}>
        {!collapsed && (
          <div className={menuOpen ? "open" : ""}>
            {sidebarLinks.map((link, index) => (
              <div key={index}>
                <NavLink to={link.to}>{link.text}</NavLink>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navbar links */}
      <ul className={menuOpen ? "open" : ""}>
        {sidebarLinks.map((link, index) => (
          <li key={index}>
            <NavLink to={link.to}>{link.text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminSidebarNavbar;
