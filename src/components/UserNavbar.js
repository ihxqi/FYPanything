import React from "react";
import logo from '../components/image/CollaFilter Logo.jpg'
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css"; // Assuming you want to reuse the same CSS as Navbar

const UserNavbar = () => {
  const logout = () => {
    console.log("Logged out");
    window.location.href = 'index.html'; // This line might need to be adjusted for React Router
  };

  return (
    <nav className="navbar">
      <Link to="/" className="title">
      <img src={logo} alt="CollaFilter Logo" className='logo' />
      </Link>
      <div className="logout-container">
        <a href="/" onClick={logout}>LOG OUT</a>
      </div>
    </nav>
  );
};

export default UserNavbar;
