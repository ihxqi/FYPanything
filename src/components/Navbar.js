import React, { useState } from "react";
import logo from '../components/image/CollaFilter Logo.jpg'

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className= "navbar">
      <Link to="/" className="title">
      <img src={logo} alt="CollaFilter Logo" className='logo' />
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>      
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
        <NavLink to="/registerrole">Register</NavLink> 
        </li>
        <li>
        <NavLink to="/joinus">Join Us</NavLink>
        </li>
        <li>
        <NavLink to="/about">About Us</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar; // Export Navbar as the default export

