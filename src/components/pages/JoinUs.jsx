import React from 'react';
import './JoinUs.css';
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import GeneralFooter from "../GeneralFooter";

const JoinUs = () => {
  return (
    <div>
      <UnregSidebarNavbar />
    <div className="why-join-us-container">
      <h2>Why Join Us</h2>
      <h1>COLLAFILTER</h1>
      <div className="benefits">
        <div className="benefit-item">
          <span className="icon">🔍</span> {/* Replace with your actual icon */}
          <h3>PERSONALIZED EXPERIENCE:</h3>
          <p>Tell us what you like, and watch as we curate recommendations just for you.</p>
        </div>
        <div className="benefit-item">
        <h3>TARGETED EXPOSURE:</h3>
        <p>Get your product noticed! List them on our platform to reach a wider audience hungry for unique finds.</p>
      </div>
      <div className="benefit-item">
        <h3>ENGAGE AND SHARE:</h3>
        <p>Give products a thumbs up or down, and share your thoughts with our commnuity through reviews and raitngs.</p>
      </div>
      <div className="benefit-item">
        <h3>BOOKMARKING MADE EASY:</h3>
        <p>Save your favorite finds for later with our handy bookmarking feature, keeping your must-haves at your fingertips</p>
      </div>
      <div className="benefit-item">
        <h3>EFFORTLESS DISCOVERY:</h3>
        <p>With intuitive search and filtering options, its easy to explore new favorites through personalized categories.</p>
      </div>
      <div className="benefit-item">
        <h3>INSIGHTS AND ANALYTICS</h3>
        <p>Understand your audience better with access to valuable analytics, helping you refine your offerings for maximum impact</p>
      </div>
      </div>
    </div>
    <GeneralFooter/>
    </div>
  );
};

export default JoinUs;