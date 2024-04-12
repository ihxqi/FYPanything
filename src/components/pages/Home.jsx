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
          👑
          <br />
          🎀
          <br />
          🧦
          <br />
          👖
          <br />
          🥾
          <br />
          👗
          <br />
          🧥
          <br />
          👜
          <br />
          👒
        </div>

        <div className="HPbookmark-section">
          <video src={bookmark} autoPlay loop muted />
          <br />
          <p class="section-title">Unlock Your Next Favorite With Us!</p>
        </div>
      </div>
      <div className="tracking-section">
        <div className="tracking-box">
          <h2>Total Users:</h2>
          <p>100</p>
        </div>
        <div className="tracking-box">
          <h2>Total Blogshops:</h2>
          <p>50</p>
        </div>
        <div className="tracking-box">
          <h2>Total Products:</h2>
          <p>200</p>
        </div>
      </div>
      <GeneralFooter />
    </div>
  );
};

export default Home;
