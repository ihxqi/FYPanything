import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../components/image/CollaFilter Logo.jpg";
import "./Navbar.css";

const AdminSidebarNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate(); // Import and use useNavigate for navigation

  const session = localStorage.getItem("user_session");
  const userSession = JSON.parse(session);
  const name = userSession?.name;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setMenuOpen(!menuOpen); // Ensure consistency between collapsed and menuOpen states
  };

  const apiUrl = "http://3.106.171.7:8000"; // Hosted Backend URL
  // const apiUrl = "http://localhost:8000"; // Local Backend URL

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      // You need to implement the logout endpoint on your server
      const response = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        // Successfully logged out, redirect to login page
        localStorage.removeItem("user_session");
        navigate("/login");
      } else {
        // Handle logout failure
        console.error("Failed to log out", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Sidebar links
  const sidebarLinks = [
    { to: "/UnregisteredBlogshopOwner", text: "View Unregistered Blogshops" },
    { to: "/AdminManageUser", text: "View All Accounts" },
    { to: "/AdminManagePartner", text: "View All Partners" },
    { to: "/AdminCategories", text: "View All Categories" },
    { to: "/AdminAllProduct", text: "View All Products" },
    { to: "/AdminGenerateReport", text: "Generate Report" },
    { to: "/Login", text: "Logout", onClick: handleLogout }, // Include logout link in sidebar
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/AdminManageUser" className="title">
        <img src={logo} alt="CollaFilter Logo" className="logo" />
      </Link>

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
                {link.text === "Logout" ? (
                  <div onClick={handleLogout} style={{ cursor: "pointer" }}>
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
      <div
        className="welcome-message"
        style={{ marginRight: "20px", fontWeight: "bold" }}
      >
        Welcome {name}
      </div>
    </nav>
  );
};

export default AdminSidebarNavbar;
