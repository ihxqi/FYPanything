import React from "react";
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import banner from '../image/banner.mp4'; // Import the thumbs up GIF
import bookmark from '../image/Bookmark.jpg'
import bf from '../image/bf.jpg'
import lyla from '../image/lyla.jpg'
import diem from '../image/diem.jpg'
import './Home.css'; 
import GeneralFooter from "../GeneralFooter";

const Home = () => {
  return (
    <div>
      <UnregSidebarNavbar />
      {/* Header */}
      <div className="header">
        <h1>Welcome to CollaFilter!</h1>
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

<div className="interactive-sections">
      {/* Video Section */}

      <div className="video-section">
      <em><h3><b>Thumbs-up</b></h3></em>
      <video src={banner} autoPlay loop muted />
        <p>Revolutionize Your Style: Thumb Through Fashion Picks!</p>
      </div>

      {/* Bookmark Section */}
      <div className="bookmark-section">
        <em><h3><b>Bookmark Your Favorites</b></h3></em>
        <img src={bookmark} alt="Bookmarks" />
        <p>Unlock Your Next Favorite With Us!</p>
      </div>
      </div>
      <GeneralFooter/>
      </div>

  );
};

export default Home;
