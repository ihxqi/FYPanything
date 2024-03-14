import React from "react";
import Navbar from "../Navbar";
import thumbsUpGif from '../image/thumbs-up.gif'; // Import the thumbs up GIF
import logo from '../image/CollaFilter Logo.jpg'

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>

      {/* Introduction Section */}
      <div className="introduction-section">
        <h2>Welcome to [Your Platform Name]</h2>
        <p>Discover personalized product recommendations and enhance your shopping experience with us. Our platform uses collaborative filtering to suggest products tailored to your interests and preferences.</p>
        <img src={thumbsUpGif} alt="Thumbs Up GIF" />
      </div>

      {/* Showcase Section */}
      <div className="showcase-section">
        {/* Logo Slider */}
        <h3>Our Blogshop Partners</h3>
        <div className="logo-slider">
          <img src={logo} alt="CollaFilter Logo" className='logo' />
          <img src={logo} alt="CollaFilter Logo" className='logo' />
          <img src={logo} alt="CollaFilter Logo" className='logo' />
          {/* Add more logo images as needed */}
        </div>
      </div>

      {/* Bookmark and Recommendation Section */}
      <div className="bookmark-section">
        <h3>Bookmark Your Favorites</h3>
        <p>Receive updated product recommendations based on your preferences and interactions.</p>
        <img src={thumbsUpGif} alt="Thumbs Up GIF" />
      </div>
    </div>
  );
};

export default Home;
