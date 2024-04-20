import React from 'react';
import './UserBookmarks.css';
import UserSidebarNavbar from "../UserSidebarNavbar";
import UserFooter from "../UserFooter";

import dress1 from '../image/1.jpg';
import dress2 from '../image/2.jpg';
import dress3 from '../image/3.jpg';
import dress4 from '../image/4.jpg';
import dress5 from '../image/5.jpg';
import dress6 from '../image/6.jpg';
import dress7 from '../image/7.jpg';
import dress8 from '../image/8.jpg';

const bookmarks = [
  { id: 1, name: "Product 1", image: dress1, url: "https://shorturl.at/bnprL" },
  { id: 2, name: "Product 2", image: dress2 },
  { id: 3, name: "Product 3", image: dress3 },
  { id: 4, name: "Product 4", image: dress4 },
  { id: 5, name: "Product 5", image: dress5 },
  { id: 6, name: "Product 6", image: dress6 },
  { id: 7, name: "Product 7", image: dress7 },
  { id: 8, name: "Product 8", image: dress8 },
];

function UserBookmarks() {

  const handleClick = (bookmarkId, url) => {
    console.log(`Clicked on bookmark with ID: ${bookmarkId}`);
    if (url) {
      window.open(url, '_blank'); // Open URL in a new tab
    }
  };

   const handleRemoveBookmark = (bookmarkId, event) => {
    event.stopPropagation(); // This stops the click from bubbling up to the parent elements
    console.log(`Remove bookmark with ID: ${bookmarkId}`);
    // Add your logic to remove the bookmark here
  };

  return (
    <div>
      <UserSidebarNavbar />
      <div className="bookmarkheader"><h1>My Bookmarks</h1></div>
      <div className="bookmarks-page">
        <main className="bookmarks-grid">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bookmark-item"
              onClick={() => handleClick(bookmark.id, bookmark.url)}
            >
            <button 
                className="remove-bookmark-button" 
                onClick={(event) => handleRemoveBookmark(bookmark.id, event)}
              >
                &times;
              </button>
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                <img src={bookmark.image} alt={bookmark.name} /> {/* Using the image */}
              </a>
              <p>{bookmark.name}</p>
            </div>
          ))}
        </main>
      </div>
      <UserFooter/>
    </div>
  );
}

export default UserBookmarks;
