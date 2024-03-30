import React, { useState } from "react";
import AdminSidebarNavbar from "../AdminSidebarNavbar";
import banner from '../image/banner.mp4'; // Import the thumbs up GIF
import bookmark from '../image/Bookmark.jpg'
import bf from '../image/bf.jpg'
import lyla from '../image/lyla.jpg'
import diem from '../image/diem.jpg'
import './EditHomepage.css'; 
import GeneralFooter from "../GeneralFooter";

const EditHomepage = ({ onSave }) => {
    const [headerText, setHeaderText] = useState('Welcome to CollaFilter!');
    const [videoHeaderText, setVideoHeaderText] = useState('Thumbs-up');
    const [bookmarkText, setBookmarkText] = useState('Unlock Your Next Favorite With Us!');
    const [videoText, setVideoText] = useState('Revolutionize Your Style: Thumb Through Fashion Picks!');
    const [image, setImage] = useState(null);
  
    const handleSaveChanges = () => {
        onSave(headerText, bookmarkText, videoHeaderText, videoText, image);
      };

    // Event handlers for updating header and bookmark text
    const handleHeaderChange = (e) => {
      setHeaderText(e.target.value);
    };
  
    const handleBookmarkChange = (e) => {
      setBookmarkText(e.target.value);
    };

    const handleVideoHeaderChange = (e) => {
        setVideoHeaderText(e.target.value);
      };

    const handleVideoChange = (e) => {
        setVideoText(e.target.value);
      };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      };
    
  
    // Function to handle saving edits
    const handleSave = () => {
      // Here you can define the logic to save the edited content
      console.log("Saving changes...");
      // For demonstration purposes, we're simply logging a message
    };
  
    return (
      <div>
        <AdminSidebarNavbar/>
        {/* Header */}
        <div className="edithome-header">
          {/* Editable header */}
          <input
            type="text"
            value={headerText}
            onChange={handleHeaderChange}
          />
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
  
        <div className="video-section">
        
          <input
            type="text"
            value={videoHeaderText}
            onChange={handleVideoHeaderChange}
          />
          <video src={banner} autoPlay loop muted />
          {/* Add editable text for video description */}
          
          <input
            type="text"
            value={videoText}
            onChange={handleVideoChange}
          />
        </div>
  
        {/* Bookmark Section */}
        <div className="bookmark-section">
          {/* Editable bookmark text */}
       
          <img src={bookmark} alt="Bookmarks" />
      
          <input
            type="text"
            value={bookmarkText}
            onChange={handleBookmarkChange}
          />
        </div>

        {/* Input field for image upload */}
        <input
          type="file"
          accept="image/*" // Accept only image files
          onChange={handleImageChange} // Handle image change event
        />
        {/* Display the preview of the uploaded image */}
        {image && <img src={image} alt="Uploaded" />}
        
     
  
        {/* Save button */}
        <div className="save-button-container">
          <button onClick={handleSave}>Save Changes</button>
        </div>
        
        <GeneralFooter/>
      </div>
    );
  };
  
  export default EditHomepage;
