import React from "react";
import UnregSidebarNavbar from "../UnregSidebarNavbar";
import t from "../image/t.gif"; // Import the thumbs up GIF
import bookmark from "../image/Bookmark.gif";
import hbanner from "../image/hbanner.jpg";
import "./Home.css";
import GeneralFooter from "../GeneralFooter";

const Home = () => {
  return (
    <div>
      <div className="homebanner">
        <img
          src={hbanner}
          alt="hbanner"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <UnregSidebarNavbar />
      <br /> <br />{" "}
      <h4>
        <p style={{ textAlign: "center" }}>
          💕Where Style Meets Personalization and Opportunity💕
        </p>
      </h4>
      <div className="interactive-sections">
        <div className="video-section">
          <video src={t} autoPlay loop muted />
          <p class="section-title">
            <br/>
            Revolutionize Your Style: Thumb Through Fashion Picks!
          </p>
        </div>

        <div className="large-emojis">
          <span role="img" aria-label="crown" className="emoji">👑</span>
          <br />
          <span role="img" aria-label="bow" className="emoji">🎀</span>
          <br />
          <span role="img" aria-label="socks" className="emoji">🧦</span>
          <br />
          <span role="img" aria-label="jeans" className="emoji">👖</span>
          <br />
          <span role="img" aria-label="boots" className="emoji">🥾</span>
          <br />
          <span role="img" aria-label="dress" className="emoji">👗</span>
          <br />
          <span role="img" aria-label="jacket" className="emoji">🧥</span>
        </div>

        <div className="HPbookmark-section">
          <video src={bookmark} autoPlay loop muted />
          <br />
          <p class="section-title">Unlock Your Next Favorite With Us!</p>
        </div>
      </div>
      <div className="tracking-section">
        <div className="tracking-box">
          <h2>Total Users:</h2><br/><br/>
          <p>100</p>
        </div>
        <div className="tracking-box">
          <h2>Total Blogshops:</h2><br/><br/>
          <p>50</p>
        </div>
        <div className="tracking-box">
          <h2>Total Products:</h2><br/><br/>
          <p>200</p>
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default Home;
