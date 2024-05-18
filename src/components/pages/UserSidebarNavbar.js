import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../components/image/CollaFilter Logo.jpg";
import "./Navbar.css";

const UserSidebarNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setMenuOpen(!menuOpen); // Ensure consistency between collapsed and menuOpen states
  };

  const session = localStorage.getItem("user_session");
  const userSession = JSON.parse(session);
  const role = userSession?.role; // Access user_id safely using optional chaining

  // Sidebar links
  const sidebarLinks = [
    { to: "/UserHomepage", text: "User Homepage" },
    { to: "/UserCategories", text: "User Categories" },
    { to: "/UserBookmarks", text: "My Bookmarks" },
    { to: "/UserProfile", text: "Profile" },
    { to: "/interestSurvey", text: "Interest Survey" },
    { to: "/Login", text: "Logout" }, // Include logout link in sidebar
  ];

  return (
    <nav className="navbar">
      {role == "User" ? ( // Use strict equality (===) for comparison
        <Link to="/userhomepage" className="title">
          <img src={role} alt="CollaFilter Logo" className="logo" />
        </Link>
      ) : (
        <Link to="/" className="title">
          <img src={logo} alt="CollaFilter Logo" className="logo" />
        </Link>
      )}
      {/* Hamburger icon for toggling sidebar */}
      <div className={`menu ${menuOpen ? "open" : ""}`} onClick={toggleSidebar}>
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidenav ${collapsed ? "collapsed" : ""}`}>
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
    </nav>
  );
};

export default UserSidebarNavbar;
