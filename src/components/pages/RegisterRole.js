import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterRole.css'; // Ensure you have this CSS file with the correct styles
import logo from '../image/CollaFilter Logo.jpg'
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import GeneralFooter from "../GeneralFooter";


export const RegisterRole = () => {
  return (
    <div>
      <UnregSidebarNavbar/>
    <div className="RolecontainerStyle">
      <img src={logo} alt="CollaFilter Logo" className='iconStyle' />
      <Link to="/RegisterUser">
        <button className='RolebuttonStyle'>Register as User</button>
      </Link>
      <Link to="/RegisterPartner">
        <button className='RolebuttonStyle'>Register as Partner</button>
      </Link>
    </div>
    <GeneralFooter/>
    </div>
  );
};


