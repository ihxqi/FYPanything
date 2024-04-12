import React from 'react';
import './JoinUs.css';
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import GeneralFooter from "../GeneralFooter";

const JoinUs = () => {
  return (
    <div>
      <UnregSidebarNavbar />
    <div className="why-join-us-container">
      <h2>Why Join Us?</h2><br/>
      <div className="benefits">
        <div className="benefit-item">
          <span className="icon">😊</span> 
          <h3>PERSONALIZED EXPERIENCE:</h3>
          <p>Tell us what you like, and watch as we curate recommendations just for you.</p>
        </div>
      <div className="benefit-item">
      <span className="icon">⭐</span>
        <h3>RATING SYSTEM:</h3>
        <p>Elevate Your Choices with Our Dynamic 5-Star Rating System! Engage, Rate, and Discover Your Perfect Matches with Ease.</p>
      </div>
      <div className="benefit-item">
      <span className="icon">❤️</span>
        <h3>BOOKMARKING MADE EASY:</h3>
        <p>Save your favorite finds for later with our handy bookmarking feature, keeping your must-haves at your fingertips</p>
      </div>
      <div className="benefit-item">
      <span className="icon">🌎</span>
        <h3>EFFORTLESS DISCOVERY:</h3>
        <p>With intuitive search and filtering<br/> options, its easy to explore new<br/> favorites through personalized categories.</p>
      </div>

      <div className="benefit-item">
      <span className="icon">🔍</span>
        <h3>INSIGHTS AND ANALYTICS</h3>
        <p>Understand your audience better with access to valuable analytics, helping you refine your offerings for <br/> maximum impact</p>
      </div>
      <div className="benefit-item">
      <span className="icon">🎯</span>
      <h3>TARGETED EXPOSURE:</h3>
      <p>Get your product noticed! List them on our platform to reach a wider<br/> audience hungry for unique finds.</p>
      </div>
    </div>
    </div>
    <GeneralFooter/>
    </div>
  );
};

export default JoinUs;