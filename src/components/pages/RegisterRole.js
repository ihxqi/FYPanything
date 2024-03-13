import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterRole.css'; // Ensure you have this CSS file with the correct styles
import logo from '../image/CollaFilter Logo.jpg'
import Navbar from "../Navbar";


export const RegisterRole = () => {
  return (
    <div>
      <Navbar/>
    <div className="containerStyle">
      <img src={logo} alt="CollaFilter Logo" className='iconStyle' />
      <Link to="/RegisterUser">
        <button className='buttonStyle'>Register as User</button>
      </Link>
      <Link to="/RegisterPartner">
        <button className='buttonStyle'>Register as Partner</button>
      </Link>
    </div>
    </div>
  );
};


