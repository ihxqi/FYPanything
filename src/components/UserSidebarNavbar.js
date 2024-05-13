import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../components/image/CollaFilter Logo.jpg';
import "./Navbar.css";

const UserSidebarNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setMenuOpen(!menuOpen); // Ensure consistency between collapsed and menuOpen states
  };

  const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
// const apiUrl = "http://localhost:8000"; // Local Backend URL

  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      const response = await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        // Successfully logged out, redirect to login page
        localStorage.removeItem('user_session');
        navigate('/login');
      } else {
        // Handle logout failure
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Sidebar links
  const sidebarLinks = [
    { to: "/UserHomepage", text: "User Homepage" },
    { to: "/UserCategories", text: "User Categories" },
    { to: "/UserBookmarks", text: "My Bookmarks" },
    { to: "/UserProfile", text: "Profile" },
    { to: "/UserRecentlyViewed", text:"Recently Viewed"},
    { to: "/login", text: "Logout", onClick: handleLogout },
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
                {link.text === "Logout" ? (
                  <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    {link.text}
                  </div>
                ) : (
                  <NavLink to={link.to}>{link.text}</NavLink>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default UserSidebarNavbar;
