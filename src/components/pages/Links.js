import React from 'react';
import { Link } from 'react-router-dom';
import './Links.css'; // Ensure you have this CSS file with the correct styles
import logo from '../image/CollaFilter Logo.jpg'
import Navbar from "../Navbar";


const Links = () => {
  return (
    <div>
      <Navbar/>
    <div className="containerStyle">
      <img src={logo} alt="CollaFilter Logo" className='iconStyle' />

      <Link to="/Home">
        <button className='buttonStyle'>Home</button>
      </Link>
      <Link to="/JoinUs">
        <button className='buttonStyle'>JoinUs</button>
      </Link>
      <Link to="/Login">
        <button className='buttonStyle'>Login</button>
      </Link>
      <Link to="/RegisterRole">
        <button className='buttonStyle'>RegisterRole</button>
      </Link>
      <Link to="/RegisterPartner">
        <button className='buttonStyle'>RegisterPartner</button>
      </Link>
      <Link to="/RegisterPartner">
        <button className='buttonStyle'>RegisterPartner</button>
      </Link>
      <Link to="/ForgetEmail">
        <button className='buttonStyle'>ForgetEmail</button>
      </Link>
      <Link to="/PartnerAllProducts">
        <button className='buttonStyle'>PartnerAllProducts</button>
      </Link>
      <Link to="/ForgetPassword">
        <button className='buttonStyle'>ForgetPassword</button>
      </Link>
      <Link to="/InterestSurvey">
        <button className='buttonStyle'>InterestSurvey</button>
      </Link>
      <Link to="/PartnerProfile">
        <button className='buttonStyle'>PartnerProfile</button>
      </Link>
      <Link to="/AdminCategories">
        <button className='buttonStyle'>AdminCategories</button>
      </Link>
      <Link to="/UnregisteredBlogshopOwner">
        <button className='buttonStyle'>AdminUnregBlogshop</button>
      </Link>
      <Link to="/JoinUs">
        <button className='buttonStyle'>JoinUs</button>
      </Link>
      <Link to="/AddProduct">
        <button className='buttonStyle'>AddProduct</button>
      </Link>
      <Link to="/UserHomepage">
      <button className='buttonStyle'>UserHomepage</button>
      </Link>
      <Link to="/UserCategories">
      <button className='buttonStyle'>UserCategories</button>
      </Link>
      <Link to="/UserProfile">
      <button className='buttonStyle'>UserProfile</button>
      </Link>
      <Link to="/UserBookmarks">
      <button className='buttonStyle'>UserBookmarks</button>
      </Link>
    </div>
    </div>
  );
};

export default Links;


