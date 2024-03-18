import React from 'react';
import './UserBookmarks.css';
import UserNavbar from "../UserNavbar";

const bookmarks = new Array(16).fill(null).map((_, index) => ({
  id: index,
  name: `Product ${index + 1}`,
  // Placeholder for product image path
  image: '',
}));

function UserBookmarks() {
  const handleClick = (bookmarkId) => {
    console.log(`Clicked on bookmark with ID: ${bookmarkId}`);
    // You can handle the click event here, like navigating to the bookmark's details
  };

  return (
    <div>
      <UserNavbar/>
    <div className="bookmarks-page">
      <main className="bookmarks-grid">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bookmark-item"
            onClick={() => handleClick(bookmark.id)}
          >
            <div className="image-placeholder"></div>
            <p>{bookmark.name}</p>
          </div>
        ))}
      </main>
    </div>
    </div>
  );
}

export default UserBookmarks;