import React from "react";
import Navbar from "../Navbar";
import thumbsUpGif from '../image/thumbs4.gif'; // Import the thumbs up GIF
import bookmark from '../image/Bookmark.jpg'
import bf from '../image/bf.jpg'
import lyla from '../image/lyla.jpg'
import diem from '../image/diem.jpg'
import './Home.css'; 

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* Header */}
      <div className="header">
        <h1>Welcome to CollaFilter!</h1>
      </div>

      {/* Thumbs Up Section */}
      <div className="thumbs-up-section">
        <h3>Thumbs Up Feature</h3>
        <img src={thumbsUpGif} alt="Thumbs Up GIF" />
      </div>

      {/* Bookmark Section */}
      <div className="bookmark-section">
        <h3>Bookmark Your Favorites</h3>
        <img src={bookmark} alt="Bookmarks" />
      </div>

      {/* Blogshop Partner Logo Slider */}
      <div className="blogshop-partners-section">
        <h3>Our Blogshop Partners</h3>
        <div className="logo-slider logo-container"> {/* Add logo-container class */}
          <img src={bf} alt="bf" className='blogshop' />
          <img src={lyla} alt="lyla" className='blogshop' />
          <img src={diem} alt="diem" className='blogshop' />
          <img src={bf} alt="bf" className='blogshop' />
          <img src={lyla} alt="lyla" className='blogshop' />
          <img src={diem} alt="diem" className='blogshop' />
          <img src={bf} alt="bf" className='blogshop' />
          <img src={lyla} alt="lyla" className='blogshop' />
          <img src={diem} alt="diem" className='blogshop' />
          <img src={bf} alt="bf" className='blogshop' />
          <img src={lyla} alt="lyla" className='blogshop' />
          <img src={diem} alt="diem" className='blogshop' />
          <img src={bf} alt="bf" className='blogshop' />
          <img src={lyla} alt="lyla" className='blogshop' />
          <img src={diem} alt="diem" className='blogshop' />
          {/* Add more logo images as needed */}
        </div>
      </div>
    </div>
  );
};

export default Home;
